import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function Contact({listing}) {
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const [landlord,setLandlord]=useState("");
    const [message,setMessage]=useState("");
    const onChange=(e)=>{
        setMessage(e.target.value)
    }
    useEffect(() => {
        const fetchListing = async () => {
          try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/get/listing/${listing.userRef}`);
            const data = await res.json();
            if (data.success === false) {
              setError(true);
              setLoading(false);
              return;
            }
            setLandlord(data);
            console.log(landlord);
            setLoading(false);
            setError(false);
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchListing();
      }, [listing]);
  return (
    <div>
    {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
      </div>
  )
}
