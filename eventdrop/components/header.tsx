"use client"

import { useEffect, useState } from "react";
import Image from 'next/image';
import arrow from '@/public/arrow.png';
import rightArrow from '@/public/right-arrow.png';
import { usePathname } from "next/navigation";

import Link from 'next/link';


export const Header = () => {
  const pathname = usePathname();
  const isLanding = pathname === "/dapp";

	// Mobile Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-full py-4 px-8">
      <div className="w-full flex justify-between items-center">
        <Link href="/" className="flex text-medium text-white items-center font-bold px-4 py-4">
          Event<span className="text-orange">Drop</span>
        </Link>
        {isLanding ? (
          <>
            <div className="flex gap-4">
              {/* Discord Login & User Profile */}
              {isLoggedIn ? (
                  <div className="relative group sm:hidden md:block">
                    {/* Profile trigger */}
                    <div className="flex gap-4 items-center shadow-md py-2 rounded-15 cursor-pointer">
                        <div className="flex w-[160px] justify-between items-center px-2 bg-lightBlack py-2 rounded-10 border border-borderColor">
                            <div className="text-xsmall text-white">Heisenburger</div>
                            <Image src={arrow} width={12} height={12} alt="Account" className="opacity-60" />
                        </div>
                    </div>
                    
                    {/* Invisible bridge */}
                    <div className="absolute left-0 w-full h-[10px] bg-transparent group-hover:block hidden"></div>
                
                    {/* Dropdown Menu */}
                    <div className="absolute w-[160px] rounded-15 w-48 bg-lightBlack divide-y divide-gray-100 rounded-10 shadow-lg group-hover:block hidden">
                        <div className="flex flex-col gap-2 p-2">
                            <button onClick={() => setIsLoggedIn(false)} className="block text-red text-left px-4 py-2 text-sm text-gray-700 hover:bg-background rounded-10 transition">
                                Log Out
                            </button>
                        </div>
                    </div>
                  </div>					
                ) : (
                  <div className="flex sm:hidden md:block">
                      <button onClick={() => setIsLoggedIn(true)} className="bg-sign text-signText px-4 py-2 rounded-10 cursor-pointer font-bold opacity-100 hover:opacity-80 transition duration-200">Log In</button>
                  </div>
                )
              }
            </div>

            <div className="relative group md:hidden">
              {/* The burger icon */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hamburger p-4 focus:outline-none"
              >
                <div className="h-1 w-6 bg-white mb-1 rounded-[5px]"></div>
                <div className="h-1 w-6 bg-white mb-1 rounded-[5px]"></div>
                <div className="h-1 w-6 bg-white rounded-[5px]"></div>
              </button>

              {/* The sidebar menu */}
              <div
                style={{ transform: menuOpen ? 'translateX(0%)' : 'translateX(-100%)' }}
                className="fixed top-0 left-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out text-black"
              >
                <div className="w-full h-full flex flex-col justify-between items-center py-8 px-4 text-black">
                  <div className="flex flex-col gap-8 justify-center items-center text-medium">
                    {session ?
                    (
                    <button onClick={() => setIsLoggedIn(false)} className="block text-left px-4 py-2 shadow-md rounded-15 font-bold">
                        Log Out
                    </button>
                    )
                    :
                    (
                      <button onClick={() => setIsLoggedIn(true)} className="shadow-md px-4 py-2 rounded-15 cursor-pointer font-bold">Log In</button>
                    )}
                  </div>
                  <div className="flex flex-col gap-8">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="w-full text-center text-base block px-4 py-2 rounded-15 font-bold">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
        :
        (
          <div className="flex w-[125px] text-white justify-between items-center py-2 px-4 bg-lightBlack border border-borderColor rounded-10 hover:cursor-pointer hover:opacity-70 transition">
            <Link href={"/dapp"}>Dapp</Link>
            <Image src={rightArrow} width={20} height={24} alt="Account" className="opacity-60 h-[22px]" />
          </div>
        )}
      </div>
    </div>
  );
}