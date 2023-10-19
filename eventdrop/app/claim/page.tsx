"use client"

import { Header } from '@/components/Header';
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

const Claim = () => {
  
  return (
    <>
      <Header></Header>
      <main className="flex flex-col lg:flex-row w-full h-[85vh] py-4 px-12 text-white bg-black gap-4">
        <div className="flex w-full h-full justify-center items-center">
          <div className="flex bg-lightBlack w-[800px] rounded-[15px] p-8 justify-center items-center flex-col gap-12">
            <div className="flex flex-col gap-6 w-full">
              <div className="text-medium">Campaign Details:</div>
              <div className="flex flex-col gap-4">
                <div className="w-full flex justify-between">
                  <div>Campaign:</div>
                  <div>EventDrop Airdrop</div>
                </div>
                <div className="w-full flex justify-between">
                  <div>Token:</div>
                  <div>$DAI</div>
                </div>
              </div>
            </div>
            <div className="text-small">Amount to Claim: <span className="text-orange text-small">1 $DAI</span></div>
            <div className="w-full bg-orange rounded-[15px] text-center py-2 text-small hover:cursor-pointer">Claim</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Claim;