import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import ListingItem from './ListingItem.jsx';
import { Carousel } from "@material-tailwind/react";
import Demo from './Demo.jsx';



export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [animation ,setAnimation]=useState(true);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setter(data);
      } catch (error) {
        console.log(error);
      }
    };
    { setTimeout(updateVariable, 3000)}
    fetchData('http://localhost:3000/api/get/allListing?offer=true&limit=4', setOfferListings);
    fetchData('http://localhost:3000/api/get/allListing?type=rent&limit=4', setRentListings);
    fetchData('http://localhost:3000/api/get/allListing?type=sale&limit=4', setSaleListings);
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const updateVariable = () => {
    setAnimation(false);
  };
  return (
    <div style={{backgroundColor:' #fad0c4'}} >
      <div className={`flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto `}>
        <div className='flex justify-between'>
        <h1 className={`text-slate-700 font-bold text-3xl lg:text-6xl${animation?" animate-bounce":""} `}>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div><img className=' w-96  object-cover rounded-xl' src="https://i.ytimg.com/vi/zumJJUL_ruM/maxresdefault.jpg" alt="" /></div>
        </div>
        <div className='text-gray-900 text-xs sm:text-sm'>
          Sunil Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>  
      <Demo offerListings={offerListings}/>

      <div className='max-w-6xl mx-auto p-2 flex flex-col gap-4 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}