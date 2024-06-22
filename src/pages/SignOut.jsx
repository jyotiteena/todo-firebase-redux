import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { clearUser } from '../features/auth/authSlice';
import { persistor } from '../store';

const SignOut = () => {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            dispatch(clearUser());
            await persistor.purge();
            console.log('Signed out successfully.');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className='text-center my-5'>

            <button onClick={handleSignOut} className="btn btn-danger px-5 py-2">Sign Out</button>
        </div>
    );
};

export default SignOut;
