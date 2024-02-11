import React from 'react'
import { Link } from 'react-router-dom';
import {
    FaBath,
    FaBed,
    FaChair,
    FaParking,
  } from 'react-icons/fa';

export default function ListingItem({listing}) {
  return (
    <div>
      <Link to={`profile/${listing._id}`}>
    <div className=" max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img className="rounded-t-lg" src={listing.imageUrls} alt="" />
        </a>
        <div className="p-5">
            <Link to={"/"}>
                <h5 className=" truncate mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{listing.name}</h5>
            </Link>
            <p className=" mb-3 font-normal dark:text-gray-400 line-clamp-2 text-sm text-gray-500">{listing.
description}</p>

<p className='text-xl font-semibold pb-4'>
              Price - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
              <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
        </div>
    </div>
    </Link>
    </div>
  )
}
