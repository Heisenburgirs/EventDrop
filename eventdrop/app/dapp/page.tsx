"use client"

import { Header } from '@/components/Header';
import Image from 'next/image'

const Dapp = () => {
  return (
    <>
      <Header></Header>
      <main className="flex flex-col lg:flex-row w-full h-[85vh] py-4 px-12 text-white bg-black gap-4">
        <div className="flex h-1/4 lg:h-full w-full lg:w-1/4 flex-col bg-lightBlack rounded-15 py-8 px-8 gap-4">
          <div className="flex flex-row lg:flex-col w-full justify-center justify-between items-center lg:items-start gap-4">
            <div className="flex text-large text-orange font-bold">Campaigns</div>
            <div className="lg:w-full text-center border border-borderColor rounded-10 py-2 px-4 text-xxsmall hover:border-orange hover:text-white hover:bg-orange hover:cursor-pointer transition">Create +</div>
          </div>
          <div className="h-full overflow-auto py-8 px-4 border border-borderColor rounded-15">
            <ul className="flex flex-col gap-8 inline-flex">
              <li className="bg-orange rounded-15 inline-flex py-2 px-4 text-xsmall hover:cursor-pointer">Selected campaign</li>
              <li className="inline-flex py-2 px-4 text-xsmall hover:bg-background rounded-15 hover:cursor-pointer transition">Regular campaign</li>
            </ul>
          </div>
        </div>
        <div className="flex h-3/4 lg:h-full w-full lg:w-3/4 bg-lightBlack rounded-15">
          
        </div>
      </main>
    </>
  )
}

export default Dapp;