"use client"

import { Header } from '@/components/Header';
import Image from 'next/image'
import Link from 'next/link';

const Dapp = () => {
  return (
    <>
      <Header></Header>
      <main className="flex flex-col lg:flex-row w-full h-[85vh] py-4 px-12 text-white bg-black gap-4">
        <div className="flex h-1/4 lg:h-full w-full lg:w-1/4 flex-col bg-lightBlack rounded-15 py-8 px-8 gap-4">
          <div className="flex flex-row lg:flex-col w-full justify-center justify-between items-center lg:items-start gap-4">
            <div className="flex text-large text-orange font-bold">Campaigns</div>
            <Link href={"/create"} className="lg:w-full text-center border border-borderColor rounded-10 py-2 px-4 text-xxsmall hover:border-orange hover:text-white hover:bg-orange hover:cursor-pointer transition">Create +</Link>
          </div>
          <div className="h-full overflow-auto py-8 px-4 border border-borderColor rounded-15">
            <ul className="flex flex-col gap-8 inline-flex">
              <li className="bg-orange rounded-15 inline-flex py-2 px-4 text-xsmall hover:cursor-pointer">Campaign #1</li>
              <li className="inline-flex py-2 px-4 text-xsmall hover:bg-background rounded-15 hover:cursor-pointer transition">Campaign #2</li>
            </ul>
          </div>
        </div>
        <div className="flex h-3/4 lg:h-full w-full lg:w-3/4 bg-lightBlack rounded-15">
          <div className="flex flex-col w-full p-4 gap-8">
            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2 w-1/3 bg-background rounded-15 p-4">
                <div className=" text-large">
                  Claimable:
                </div>
                <div className="text-medium text-orange">
                  8616 $DAI
                </div>
              </div>
              <div className="flex flex-col gap-2 w-1/3 bg-background rounded-15 p-4">
                <div className=" text-large">
                  Amount:
                </div>
                <div className="text-medium text-orange">
                  1 $DAI per
                </div>
              </div>
              <div className="flex flex-col gap-2 w-1/3 bg-background rounded-15 p-4">
                <div className=" text-large">
                  Claimed:
                </div>
                <div className="text-medium text-orange">
                  1484 $DAI
                </div>
              </div>
              <div className="flex flex-col gap-2 w-1/3 bg-background rounded-15 p-4">
                <div className=" text-large">
                  Claimants:
                </div>
                <div className="text-medium text-orange">
                  1484 Wallets
                </div>
              </div>
            </div>

            <div className="w-full h-full flex flex-col bg-background rounded-15 p-8 gap-12">
              <div className="flex justify-between w-full items-center justify-center">
                <div className="text-large">Manage</div>
                <div className="opacity-75">Status: <span className="bg-green text-green rounded-[99px] text-xxsmall">taa</span> Live</div>
              </div>
              <div className="flex w-full gap-4 justify-between">
                <div className="w-1/3 flex items-center justify-center border border-solid border-lightBlack rounded-[15px] py-2 px-4 hover:border-orange hover:text-white hover:bg-orange hover:cursor-pointer transition">
                  Start
                </div>
                <div className="w-1/3 flex items-center justify-center border border-solid border-lightBlack rounded-[15px] py-2 px-4 hover:border-orange hover:text-white hover:bg-orange hover:cursor-pointer transition">
                  Pause
                </div>
                <div className="w-1/3 flex items-center justify-center border border-solid border-lightBlack rounded-[15px] py-2 px-4 hover:border-orange hover:text-white hover:bg-orange hover:cursor-pointer transition">
                  End
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-small">Change claim amount:</div>
                <div className="flex gap-2 items-center">
                  <div className="w-[100px] py-2 border border-solid border-lightBlack rounded-[15px] text-center">1 per</div>
                  <div className="flex items-center justify-center border border-solid border-lightBlack rounded-[15px] py-2 px-4 hover:border-orange hover:text-white hover:bg-orange hover:cursor-pointer transition">Update</div>
                </div>
              </div>
              <div className="flex w-full h-full gap-8">
                <div className="flex flex-col w-1/2 h-full px-6 py-8 border justify-between border-solid border-lightBlack rounded-[15px]">
                  <div className="text-medium">Deposit</div>
                  <div className="flex w-full gap-4">
                    <div className="w-3/4 py-2 border border-solid border-lightBlack rounded-[15px] text-center">amount</div>
                    <div className="flex w-1/4 items-center justify-center border border-solid border-lightBlack rounded-[15px] py-2 px-4 hover:border-orange hover:text-white hover:bg-orange hover:cursor-pointer transition">Deposit</div>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 h-full px-6 py-8 border justify-between border-solid border-lightBlack rounded-[15px]">
                  <div className="text-medium">Withdrawal</div>
                  <div className="flex w-full gap-4">
                    <div className="flex w-full items-center justify-center border border-solid border-lightBlack rounded-[15px] py-2 px-4 hover:border-orange hover:text-white hover:bg-orange hover:cursor-pointer transition">Withdraw Everything</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dapp;