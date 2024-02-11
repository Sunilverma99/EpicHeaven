import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateInStart, updateInFailure, updateInSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutStart, signOutFailure, signOutSuccess, currentListing } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile1() {
    const history = useNavigate();
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [fileUppercentage, setFileuppercentage] = useState(0);
    const [fileuploadError, setFileuploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [myListingserror, setMyListingserror] = useState("");
    const [myListings, setMyListings] = useState([]);
    const [loadingListings, setLoadingListings] = useState(false);
    const [listingDeleteError, setListingDeleteError] = useState("");
  
    const handleFileUpload = (file) => {
        const storage = getStorage();
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFileuppercentage(Math.round(progress));
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            setFileuploadError(true);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFormData({ ...formData, profilePhoto: downloadURL });
            });
          }
        );
      };
      useEffect(() => {
        if (file) {
          handleFileUpload(file);
        }
      }, [file]);
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
      const updateVariable = () => {
        setUpdateSuccess(false);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateInStart());
    
        try {
          const response = await fetch(`http://localhost:3000/api/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials (cookies) with the request
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
    
          if (data.success === false) {
            dispatch(updateInFailure(data.message));
            return;
          }
          
    
          dispatch(updateInSuccess(data));
          setUpdateSuccess(true);
          { setTimeout(updateVariable, 3000);}
          
        } catch (error) {
          dispatch(updateInFailure('An error occurred during the update.'));
        }
      };

      const deleteCurrentUser = async () => {
        dispatch(deleteUserStart());
        try {
          const response = await fetch(`http://localhost:3000/api/delete/${currentUser._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const data = await response.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
          history("/sign-up");
    
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      };
      const signOutUser = async () => {
        dispatch(signOutStart());
        try {
          const response = await fetch(`http://localhost:3000/api/signout`);
          const data = await response.json();
          if (data.success === false) {
            dispatch(signOutFailure(data.message));
            return;
          }
          dispatch(signOutSuccess(data));
          history("/login");
    
        } catch (error) {
          dispatch(signOutFailure(error.message));
        }
    
      };
      const handleMYListings = async () => {
        
        try {
          console.log("kdfkfkf")
          setLoadingListings(true);
          const config = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          };
          const response = await fetch(`http://localhost:3000/api/allListings/${currentUser._id}`, config);
          const data = await response.json();
          if (data.success === false) {
            setMyListingserror("Please try again");
            setLoadingListings(false);
            return;
          }
          setMyListings(data);
          setLoadingListings(false);
          setMyListingserror("");
        } catch (error) {
          setMyListingserror(error);
          setLoadingListings(false);
        }
      };
      const handleDeleteListing = async (id) => {

        try {
          const config = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          };
          const response = await fetch(`http://localhost:3000/api/deleteListing/${id}`, config);
          const data = await response.json();
          if (data.success === false) {
            setListingDeleteError("Please try again and there is some problem");
            return;
          }
          setMyListings(myListings.filter((listing) => listing._id !== id));
          setListingDeleteError("");
        } catch (error) {
          setListingDeleteError(error);
        }
      };
      const handleEditListing = async (listing) => {
        await dispatch(currentListing(listing));
        history("/update-listing");
      };
  return (
    <div  className='px-10'>
        <section  className=' h-2/3 rounded-3xl '>
          <div className='flex  justify-between '>     
            <div style={{backgroundColor:'#596164'}} className=' w-1/2  h-screen    rounded-l-3xl flex-col items-start'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
             <div className=' flex flex-col items-center  py-4'>
             <h1 className='uppercase font-extrabold text-2xl text-center text-white'>profile</h1>

             <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" ref={fileRef} hidden accept='image/*' />

              <img onClick={() => fileRef.current.click()} src={formData.profilePhoto || currentUser.profilePhoto} alt="" className=' rounded-full w-36 h-36 object-cover ' />
              <p className='flex self-center'>
          {fileuploadError ? (
            <span className='text-red-500 font-semibold'>Error in image upload (image is less than 2 mb)</span>
          ) : fileUppercentage > 0 && fileUppercentage < 100 ? (
            <span className='text-slate-800 font-semibold'>{fileUppercentage}% image uploaded</span>
          ) : fileUppercentage === 100 ? (
            <span className='text-green-700 font-semibold'>File uploaded successfully</span>
          ) : (
            <span></span>
          )}
        </p>
             </div>
             <div className='flex flex-col gap-4 justify-center items-center'>
                <input type="text" className=' w-96 p-2 rounded-xl'defaultValue={currentUser.username} id='username' onChange={handleChange} placeholder='Username' />
                <input type="text" className='w-96 p-2 rounded-xl' id='email' defaultValue={currentUser.email} onChange={handleChange}  placeholder='Email' />
                <input type="password" className='w-96 p-2 rounded-xl'id='password' onChange={handleChange} placeholder='Password' />
                <button disabled={loading} type='sumbit' className='w-96 p-2 rounded-xl bg-slate-950  text-white uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
                {error && <p className='text-red-700 font-semibold '> {error ? "Error : " + error : ""}</p>}
                <p className='text-green-700 font-semibold '> {updateSuccess ? "The user is updated successfully" : ""}</p>
                <div className='w-96  rounded-xl flex  justify-between'>
                    <p onClick={deleteCurrentUser} className='uppercase cursor-pointer text-red-600'>delete account</p>
                    <p onClick={signOutUser} className='uppercase cursor-pointer text-red-600'>sign out</p>
                </div>
             </div>
             </form>
            </div>
            <div style={{backgroundColor:'#fad0c4'}} className='w-1/2 h-screen bg-green-400 flex  flex-col items-center gap-4 rounded-r-3xl'>
                <div className=''> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0ETKByCVDzMtyVpcWudi9s9sbHhdsIv_IqnUvHmEvdlxqxSuJRtyqrFLtglhoeFC2qo&usqp=CAU" alt="" className=' p-4 rounded-full' /></div>
               
                <button className='w-96 p-2 rounded-xl bg-white-950  uppercase '>        <Link to={"/create-listing"} className='text-black' >Create listing</Link>
</button>
                <button onClick={handleMYListings} className='w-96 p-2 rounded-xl bg-white-950  uppercase '>        {loadingListings ? "Loading..." : "Show My Listings"}
</button>
<p className='text-red-700 font-semibold mt-4'> {myListingserror ? "Error : " + myListingserror : ""}</p>
{
  
        myListings && myListings.length > 0 &&
        myListings.map((listing) => (
          <div key={listing._id} className='flex flex-col gap-4 '>
            <div style={{backgroundColor:'#00203FFF'}} className=' w-96  flex justify-between gap-4 my-2 items-center border p-2 rounded-lg '>
              <Link to={`/profile/${listing._id}`}><img src={listing.imageUrls[0]} alt="" className=' w-20 h-20 rounded-lg object-contain' /></Link>
              <Link to={`/profile/${listing._id}`}><p className='font-semibold text-gray-200  text-xl'>{listing.name}</p></Link>
              <div className='flex flex-col gap-2 '>
              <button onClick={() => { handleDeleteListing(listing._id) }} class="h-8 px-4  text-sm text-indigo-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-400">delete</button>
              <button onClick={() => { handleEditListing(listing) }} class="h-8 px-4  text-sm text-indigo-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-500">edit</button>
              </div>
            </div>
          </div>
        ))
      }
                
            </div>
            </div> 
        </section>
    </div>
  )
}
