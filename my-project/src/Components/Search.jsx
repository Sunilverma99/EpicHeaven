import React from 'react'
import { useState,useEffect,  } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem
 from './ListingItem';
export default function Search() {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const[showMore,setShowMore]=useState(false);
    const[listings,setListings]=useState([]);
    const[sideBarData,setsideBarData]=useState({
        searchTerm:"",
        type:"all",
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',

});
    const handleChange =  (e) => {
        e.preventDefault;
        const { id, type, value, checked } = e.target;
         setsideBarData((prevData) => ({ ...prevData, [id]: type === 'checkbox' ? checked : value }));
         if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
      
            const order = e.target.value.split('_')[1] || 'desc';
      
            setsideBarData({ ...sideBarData, sort, order });
          }
         console.log(sideBarData)
      };

      useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
    
        if (
          searchTermFromUrl ||
          typeFromUrl ||
          parkingFromUrl ||
          furnishedFromUrl ||
          offerFromUrl ||
          sortFromUrl ||
          orderFromUrl
        ) {
          setsideBarData({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
          });
        }
    
        const fetchListings = async () => {
          setLoading(true);
          setShowMore(false);
          const searchQuery = urlParams.toString();
          console.log(searchQuery)
          const res = await fetch(`http://localhost:3000/api/get/allListing?${searchQuery}`);
          const data = await res.json();
          console.log(data)
          if (data.length > 8) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
          setListings(data);
          console.log(listings);
          setLoading(false);
        };
    
        fetchListings();
      }, [location.search]);
 const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sideBarData.searchTerm);
    urlParams.set('type', sideBarData.type);
    urlParams.set('parking', sideBarData.parking);
    urlParams.set('furnished', sideBarData.furnished);
    urlParams.set('offer', sideBarData.offer);
    urlParams.set('sort', sideBarData.sort);
    urlParams.set('order', sideBarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
 }
const onShowMoreClick=async()=>{
  const numberOfListing=listings.length;
  const startIndex=numberOfListing;
  const urlParams=new URLSearchParams(location.search);
  urlParams.set("startIndex",startIndex)
  const searchQuery=urlParams.toString();
  const res=await fetch(`http://localhost:3000/api/get/allListing?${searchQuery}`)
  const data= await res.json();
  if(data.length<9){
    setShowMore(false);
  }
  setListings([...listings,...data])
}
  return (
    <div className='flex flex-col md:flex-row bg-rose-100'>
    <div style={{backgroundColor:'#fad0c4'}} className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
        <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap font-semibold'>
            Search Term:
          </label>
          <input
            type='text'
            id='searchTerm'
            placeholder={sideBarData.searchTerm}
            className='border rounded-lg p-3 w-full'
            onChange={handleChange}         
          />
        </div>
        <div className='flex gap-2 flex-wrap items-center'>
          <label className='font-semibold'>Type:</label>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='all'
              className='w-5'
              onChange={handleChange}
            />
            <span>Rent & Sale</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='rent'
              className='w-5'
              onChange={handleChange}
              checked={sideBarData.rent}
            />
            <span>Rent</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='sale'
              className='w-5'
              onChange={handleChange}
              checked={sideBarData.sale}
            />
            <span>Sale</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='offer'
              className='w-5'
              onChange={handleChange}
              checked={setsideBarData.offer}
            />
            <span>Offer</span>
          </div>
        </div>
        <div className='flex gap-2 flex-wrap items-center'>
          <label className='font-semibold'>Amenities:</label>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='parking'
              className='w-5'
              onChange={handleChange}
              checked={sideBarData.parking}
            />
            <span>Parking</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='furnished'
              className='w-5'
              onChange={handleChange}
              checked={setsideBarData.furnished}
            />
            <span>Furnished</span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <label className='font-semibold'>Sort:</label>
          <select
            defaultValue={'created_at_desc'}
            id='sort_order'
            className='border rounded-lg p-3'
            onChange={handleChange}
          >
            <option value='regularPrice_desc'>Price high to low</option>
            <option value='regularPrice_asc'>Price low to hight</option>
            <option value='createdAt_desc'>Latest</option>
            <option value='createdAt_asc'>Oldest</option>
          </select>
        </div>
        <button type='submit'  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          Search
        </button>
      </form>
    </div>
    <div style={{backgroundColor:' #c2e9fb'}} className='flex-1'>
      <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
        Listing results:
      </h1>
      { <div className='p-7 flex flex-wrap gap-4'>
        {!loading && listings.length === 0 && (
          <p className='text-xl text-slate-700'>No listing found!</p>
        )}
        {loading && (
          <p className='text-xl text-slate-700 text-center w-full'>
            Loading...
          </p>
        )}

        {!loading &&
          listings &&
          listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}

        {showMore && (
          <button
            onClick={onShowMoreClick}
            className='text-green-700 hover:underline p-7 text-center w-full'
          >
            Show more
          </button>
        )}
      </div> }
    </div>
  </div>
  )
}
