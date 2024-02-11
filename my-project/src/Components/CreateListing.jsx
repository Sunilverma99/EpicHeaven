import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function CreateListing() {
  const history=useNavigate();
  const {currentUser}=useSelector((state)=>state.user)
  const [images, setImages] = useState([]);
  const [error,setError]=useState("");
  const[loading,setLoading]=useState(false);
  const [formData ,setFormData ]=useState({
     imageUrls:[],
     name:"",
     description:"",
     address:"",
     sale:false,
     rent:false,
     parking:false,
     furnished:false,
     offer:false,
     beds:1,
     bedrooms:1,
     bathrooms:1,
     regularPrice:50,
     discountedPrice:0,
     userRef:currentUser._id
  });
  
  const uploadImages = async (e) => {
    e.preventDefault();
  
    if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
      const promises = [];
  
      try {
        setLoading(true);
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const fileName = new Date().getTime() + file.name;
          const storage = getStorage();
          const storageRef = ref(storage, `images/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
  
          promises.push(uploadTask);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log(progress);
            },
            (error) => {
              setLoading(false);
              setError(error);
              console.log(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setFormData((prevData) => ({
                ...prevData,
                imageUrls: [...prevData.imageUrls, downloadURL],
              }));
              setError('');
              console.log("File available at", downloadURL);
            }
          );
        }
  
        await Promise.all(promises);
        setLoading(false);
        console.log("All images uploaded successfully");
        console.log(formData); // This will now log the updated state
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false);
      }
    } else {
      setError("You can only upload 6 images");
      console.log(error);
      setLoading(false);
    }
  
    // console.log(formData); // Avoid logging the state outside the async block
  };
  
const handleRemoveImage=(index)=>{
  setFormData({...formData,imageUrls:formData.imageUrls.filter((_,i)=>i!==index)})
}
const handleChange =  (e) => {
  e.preventDefault;
  const { id, type, value, checked } = e.target;
   setFormData((prevData) => ({ ...prevData, [id]: type === 'checkbox' ? checked : value }));
   console.log(formData)
};

const formSubmit=async(e)=>{
  e.preventDefault();
  const config = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
};

try {
  setLoading(true);
    const response = await fetch('http://localhost:3000/api/createListing', config);
    const data = await response.json();
    if (data.success == false) {
        setError("There is some problem")
        return;
    }
    setError("")
   setLoading(false);
   history("/profile")
   console.log(data)
} catch (error) {
    setError('An error occurred during listing.');
    setLoading(false);
}
}

  return (
   <div style={{ backgroundColor:'#fad0c4' }} >
<main  className='p-3 max-w-4xl w-full mx-auto h-full'>
    <h1 className=' text-3xl font-semibold text-center my-7'>
      Create a Listing
    </h1>
    
    <form onSubmit={formSubmit}  className='flex flex-col sm:flex-row gap-4'>
      <div className='flex flex-col gap-4 flex-1'>
        <input
        onChange={handleChange}
        defaultValue={formData.name}
          type='text'
          placeholder='Name'
          className='border p-3 rounded-lg'
          id='name'
          maxLength='62'
          minLength='10'
          required
          
        />
        <textarea
        onChange={handleChange}
    defaultValue={formData.description}
          type='text'
          placeholder='Description'
          className='border p-3 rounded-lg'
          id='description'
          required
          
        />
        <input
                onChange={handleChange}
                defaultValue={formData.address}
          type='text'
          placeholder='Address'
          className='border p-3 rounded-lg'
          id='address'
          required
          
        />
        <div className='flex gap-6 flex-wrap'>
          <div className='flex gap-2'>
            <input
             onChange={handleChange}
             checked={formData.sale}
              type='checkbox'
              id='sale'
              className='w-5'
            />
            <span>Sell</span>
          </div>
          {!formData.sale&&
          <div className='flex gap-2'>
            <input
              onChange={handleChange}
              checked={formData.rent}
              type='checkbox'
              id='rent'
              className='w-5'
              
            />
            <span>Rent</span>
          </div>}
          <div className='flex gap-2'>
            <input
              onChange={handleChange}
              checked={formData.parking}
              type='checkbox'
              id='parking'
              className='w-5'
              
            />
            <span>Parking spot</span>
          </div>
          <div className='flex gap-2'>
            <input
             onChange={handleChange}
             checked={formData.furnished}
              type='checkbox'
              id='furnished'
              className='w-5'
             
            />
            <span>Furnished</span>
          </div>
          <div className='flex gap-2'>
            <input
             onChange={handleChange}
             checked={formData.offer}
              type='checkbox'
              id='offer'
              className='w-5'

            />
            <span>Offer</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex items-center gap-2'>
            <input
             onChange={handleChange}
             defaultValue={formData.bedrooms}
              type='number'
              id='bedrooms'
              min='1'
              max='10'
              required
              className='p-3 border border-gray-300 rounded-lg'
            />
            <p>Beds</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
            onChange={handleChange}
            defaultValue={formData.bathrooms}
              type='number'
              id='bathrooms'
              min='1'
              max='10'
              required
              className='p-3 border border-gray-300 rounded-lg'
            />
            <p>Bathrooms</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
            onChange={handleChange}
            defaultValue={formData.regularPrice}
              type='number'
              id='regularPrice'
              min='50'
              max='10000000'
              required
              className='p-3 border border-gray-300 rounded-lg'
            />
            <div className='flex flex-col items-center'>
              <p>Regular price</p>
                <span className='text-xs'>($ / month)</span>
            </div>
          </div>

           {formData.offer&& <div className='flex items-center gap-2'>
              <input
              onChange={handleChange}
              defaultValue={formData.discountedPrice}
                type='number'
                id='discountPrice'
                min='0'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>

                  <span className='text-xs'>($ / month)</span>
              </div>
            </div>}
          
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'>
          Images:
          <span className='font-normal text-gray-600 ml-2'>
            The first image will be the cover (max 6)
          </span>
        </p>
        <div className='flex gap-4'>
          <input
          onChange={(e)=>{setImages(e.target.files)}}
            className='p-3 border border-gray-300 rounded w-full'
            type='file'
            id='images'
            accept='image/*'
            multiple
          />
          <button
           onClick={uploadImages}
            type='button'
            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
          >{loading ?"...Loading":"Upload"}
          </button>
        </div>
        <p className='text-red-700 text-sm'>{error}
        </p>
        {formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
  <div className='flex justify-between p-3 border items-center' key={url}>
    <img
      src={url}
      alt='listing image'
      className='w-20 h-20 object-contain rounded-lg'
    />
    <button
      type='button'
      onClick={()=>handleRemoveImage(index)}
      className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
    >
      Delete
    </button>
  </div>
))}

        <button disabled={loading}
          className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >{loading ?"...Loading": "Create listing"}
        </button>
       <p className='text-red-700 text-sm'></p>
      </div>
    </form>
  </main>
  </div>
  )
}
