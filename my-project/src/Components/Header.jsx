import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  const history = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    history(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    setSearchTerm(searchTermFromUrl);
  }, [window.location.search]);

  return (
      // <div className=" bg-zinc-100 text-white">
      //   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      //     <div className="flex h-16 items-center">
      //       <div className="flex items-center">
      //         <Link to={''} className="text-yellow-600 font-extrabold text-3xl">
      //           CashShift
      //         </Link>
      //         <form onSubmit={handleSubmit} className="ml-8 flex items-center">
      //           <div className="relative flex items-stretch">
      //             <input
      //               onChange={(e) => setSearchTerm(e.target.value)}
      //               type="search"
      //               className="w-full p-2 rounded-l border border-solid border-neutral-300 bg-transparent focus:outline-none focus:ring focus:border-primary placeholder-gray-400 text-black"
      //               placeholder={searchTerm || 'Search'}
      //               aria-label="Search"
      //             />
      //             <button
      //               onClick={handleSubmit}
      //               className="px-4 py-2 rounded-l bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring focus:border-primary text-white"
      //             >
      //               <FaSearch />
      //             </button>
      //           </div>
      //         </form>


      //       </div>

      //       <div className="hidden md:block ml-auto">
      //         <div className="flex items-center space-x-4">
      //           <Link to={''} className="nav-link" aria-current="page">
      //             Home
      //           </Link>
      //           <Link to={'about'} className="nav-link" aria-current="page">
      //             About
      //           </Link>
      //           {!currentUser ? (
      //             <Link to={'sign-up'} className="nav-link" aria-current="page">
      //               Sign Up
      //             </Link>
      //           ) : (
      //             <Link to={'profile'} className="nav-link">
      //               <img
      //                 className="w-10 h-10 object-cover rounded-full"
      //                 src={currentUser.profilePhoto}
      //                 alt=""
      //               />
      //             </Link>
      //           )}
      //         </div>
      //       </div>

      //       <div className="md:hidden ml-auto">
      //         <div className="flex items-center">
      //           <button
      //             id="mobile-menu"
      //             className="p-2 -mr-1 text-yellow-600 focus:outline-none focus:ring focus:border-primary"
      //           >
      //             <FaSearch />
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>

      //   {/* Mobile Menu */}
      //   <div className="md:hidden" id="mobile-menu">
      //     <div className="px-2 pt-2 pb-3 space-y-1">
      //       <Link to={''} className="mobile-nav-link" aria-current="page">
      //         Home
      //       </Link>
      //       <Link to={'about'} className="mobile-nav-link" aria-current="page">
      //         About
      //       </Link>
      //       {!currentUser ? (
      //         <Link to={'sign-up'} className="mobile-nav-link" aria-current="page">
      //           Sign Up
      //         </Link>
      //       ) : (
      //         <Link to={'profile'} className="mobile-nav-link">
      //           <img
      //             className="w-8 h-8 object-cover rounded-full"
      //             src={currentUser.profilePhoto}
      //             alt=""
      //           />
      //         </Link>
      //       )}
      //     </div>
      //   </div>
      // </div>
      <div className="bg-brown text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row h-16 items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to={''} className="text-yellow-600 font-extrabold sm:text-3xl text-2xl">
              CashShift
            </Link>
            <form onSubmit={handleSubmit} className="mt-4 md:ml-8 sm flex items-center  md:mt-0">
              <div className="relative flex items-stretch mx-4">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="search"
                  className=" sm:w-full w-20 p-2 rounded-l border border-solid border-neutral-300 bg-transparent focus:outline-none focus:ring focus:border-primary placeholder-gray-400 text-black"
                  placeholder={searchTerm || 'Search'}
                  aria-label="Search"
                />
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-l bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring focus:border-primary text-white md:rounded-l-none"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>

          <div className="hidden md:flex ml-auto">
            <div className="flex items-center space-x-4">
              <Link to={''} className="nav-link" aria-current="page">
                Home
              </Link>
              <Link to={'about'} className="nav-link" aria-current="page">
                About
              </Link>
              {!currentUser ? (
                <Link to={'sign-up'} className="nav-link" aria-current="page">
                  Sign Up
                </Link>
              ) : (
                <Link to={'profile'} className="nav-link">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={currentUser.profilePhoto}
                    alt=""
                  />
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden ml-auto">
            <div className="flex items-center">
              <button
                id="mobile-menu"
                className="p-2 -mr-1 text-yellow-600 focus:outline-none focus:ring focus:border-primary"
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to={''} className="mobile-nav-link px-4" aria-current="page">
            Home
          </Link>
          <Link to={'about'} className="mobile-nav-link px-4" aria-current="page">
            About
          </Link>
          {!currentUser ? (
            <Link to={'sign-up'} className="mobile-nav-link px-4" aria-current="page">
              Sign Up
            </Link>
          ) : (
            <Link to={'profile'} className="mobile-nav-link">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={currentUser.profilePhoto}
                alt=""
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
