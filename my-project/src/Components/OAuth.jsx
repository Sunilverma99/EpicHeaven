import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result);

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            }),
        };
        // Ensure the user actually signed in
        if (result.user) {
            const res = await fetch('http://localhost:3000/api/google', config);
            const data = await res.json();

            console.log(data);

            if (data.success === false) {
                dispatch(signInFailure(data.message));
                toast.error("Please try again");
                return;
            }

            dispatch(signInSuccess(data));
            toast.success("You are logged in successfully")
            navigate('/');
        } else {
            toast.error('Please try again');
            console.error('User not signed in');
        }
    } catch (error) {
        console.error('Could not sign in with Google', error);
        toast.error("Please try again");
    }
};

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-600 w-full hover:opacity-80'>
      Continue with Google
    </button>
  );
}
