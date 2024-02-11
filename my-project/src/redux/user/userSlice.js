import { createSlice } from '@reduxjs/toolkit';
const initialState={
    currentUser:null,
    error :null,
    loading:false,
    currentuserListing:null,
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=false;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false,
            state.error=null
        },
        signInFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        updateInStart:(state)=>{
            state.loading=true;
        },
        updateInSuccess:(state,action)=>{
            state.loading=false,
            state.currentUser=action.payload,
            state.error=null
        },
        updateInFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        deleteUserStart:(state)=>{
            state.loading=true;
        },
        deleteUserSuccess:(state)=>{
            state.loading=false,
            state.currentUser=null,
            state.error=null
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        signOutStart:(state)=>{
            state.loading=false;
        },
        signOutSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false,
            state.error=null
        },
        signOutFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        currentListing:(state,action)=>{
           state.currentuserListing=action.payload
        }
    }
})

export const { signInStart, signInSuccess, signInFailure,updateInFailure,updateInSuccess,updateInStart,deleteUserStart,deleteUserFailure,deleteUserSuccess,signOutStart,signOutSuccess,signOutFailure,currentListing } = userSlice.actions;
export default userSlice.reducer;