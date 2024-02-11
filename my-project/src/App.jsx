import React from 'react'
import * as ReactDOM from "react-dom/client";
import Home from './Components/Home.jsx';
import Sign1 from "./Components/Sign1.jsx";
import Login from "./Components/Login.jsx";
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import About from './Components/About.jsx';
import Profile from './Components/Profile.jsx';
import Toaster from "react-hot-toast"
import {
    BrowserRouter,
    Route,
    Routes,
  } from "react-router-dom";
import Listing from './Components/Listing.jsx';
import UpdateListing from './Components/UpdateListing.jsx';
import CreateListing from './Components/CreateListing.jsx';
import Search from './Components/Search.jsx';
import Demo from './Components/Demo.jsx';
export default function App() {

  

  return (

    
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<Sign1/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/> '
        <Route path='/profile' element={<Profile/>}/>'
        <Route path='/search' element={<Search/>}/>'
        <Route path='/create-listing'element={<CreateListing/>}/>
        <Route path="/update-listing" element={<UpdateListing/>}/>
        <Route path='/profile/:listingId' element={<Listing/>}/>
        <Route path='search/profile/:listingId' element={<Listing/>}/>'
            </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
