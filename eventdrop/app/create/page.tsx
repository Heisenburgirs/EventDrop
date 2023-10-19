"use client"

import { Header } from '@/components/Header';
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

const Create = () => {
  const [ERC20, setERC20] = useState<boolean>(true);
  const [ERC721, setERC721] = useState<boolean>(false);
  const [isDropDownTokenSet, setIsDropDownTokenSet] = useState<boolean>(false);
  const [dropDownToken, setDropDownToken] = useState<string>("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isCampaignCreated, setIsCampaignCreated] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCampaignCreation = () => {
    setIsCampaignCreated(true)
    confetti({particleCount: 150, spread: 180, })
  }

  const baseButtonStyle = "w-full py-2 rounded-15 transition";
  const defaultButtonStyle = "border border-borderColor hover:border-orange hover:bg-orange hover:text-white cursor-pointer";
  const activeButtonStyle = "bg-orange border border-orange text-white opacity-50 hover:cursor-not-allowed";
  const disabledButtonStyle = "opacity-50 cursor-not-allowed border border-borderColor";
  
  return (
    <>
      <Header></Header>
      <main className="flex flex-col lg:flex-row w-full h-[85vh] py-4 px-12 text-white bg-black gap-4">
        <div className="flex h-full w-full bg-lightBlack rounded-15 py-8 px-8 gap-4">
          <div className={`w-1/2 flex ${isCampaignCreated ? 'opacity-50 pointer-events-none' : ''}`}>
            <form className="flex w-full h-full flex-col justify-between">
              <div className="flex flex-col gap-8 h-4/5">
                <div className="text-large text-orange font-bold">Create Campaign</div>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4 mt-4">
                    <div className={`w-1/2 text-center ${ERC20 ? "bg-orange" : "bg-lightBlack hover:bg-background"} rounded-15 py-2 hover:cursor-pointer transition`}
                      onClick={() => {setERC20(!ERC20); setERC721(!ERC721); setIsDropDownTokenSet(false); setDropDownToken("")}}>
                      ERC20</div>
                    <div className={`w-1/2 text-center ${ERC721 ? "bg-orange" : "bg-lightBlack hover:bg-background"} rounded-15 py-2 hover:cursor-pointer transition`}
                      onClick={() => {setERC721(!ERC721); setERC20(!ERC20); setIsDropDownTokenSet(false); setDropDownToken("")}}
                      >ERC721</div>
                  </div>
                  {/*<div onClick={() => {console.log(dropDownToken)}}>test</div>*/}

                  <div className="flex flex-col w-full gap-2" ref={ref}>
                    <span className="text-xsmall opacity-75">Token Address:</span>
                    
                    <div className="relative">
                      <input
                        type="text"
                        className="border-2 border-borderColor border-opacity-75 rounded-10 p-2 bg-lightBlack cursor-pointer w-full"
                        value={isDropDownTokenSet ? dropDownToken : ""}
                        placeholder="Select or Paste Address"
                        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                        onChange={e => {
                          setIsDropDownTokenSet(true);
                          setDropDownToken(e.target.value);
                        }}
                      />
                        
                      {isDropDownOpen && (
                        ERC20 ? (
                          <div className="absolute left-0 right-0 mt-2 border-2 p-2 border-borderColor border-opacity-75 rounded-10 bg-lightBlack z-10">
                              <div className="cursor-pointer p-2 hover:bg-orange rounded-10 transition" onClick={() => {setIsDropDownOpen(false); setIsDropDownTokenSet(true); setDropDownToken("DAI")}}>DAI</div>
                              <div className="cursor-pointer p-2 hover:bg-orange rounded-10 transition" onClick={() => {setIsDropDownOpen(false); setIsDropDownTokenSet(true); setDropDownToken("USDC")}}>USDC</div>
                          </div>
                        )
                        :
                        (
                          <div className="absolute left-0 right-0 mt-2 border-2 p-2 border-borderColor border-opacity-75 rounded-10 bg-lightBlack z-10">
                              <div className="cursor-pointer p-2 hover:bg-orange rounded-10 transition" onClick={() => {setIsDropDownOpen(false); setIsDropDownTokenSet(true); setDropDownToken("BAYC")}}>BAYC</div>
                              <div className="cursor-pointer p-2 hover:bg-orange rounded-10 transition" onClick={() => {setIsDropDownOpen(false); setIsDropDownTokenSet(true); setDropDownToken("NAKAMIGOS")}}>NAKAMIGOS</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-2">
                    <div className="text-xsmall opacity-75">
                      Amount per claim
                    </div>
                      <input className="border-2 border-borderColor border-opacity-75 rounded-10 p-2 bg-lightBlack cursor-pointer w-full" type="number" min="1" />
                  </div>

                  <div className="flex flex-col w-full gap-2">
                    <div className="text-xsmall opacity-75">
                      Claim Token
                    </div>
                    <input className="border-2 border-borderColor border-opacity-75 rounded-10 p-2 bg-lightBlack cursor-pointer w-full" type="text" min="1" />
                  </div>
                </div>
              </div>

              <div className="h-1/5 w-full flex items-end h-full text-center">
                <div
                  className="w-full py-4 hover:opacity-100 opacity-50 border border-borderColor rounded-15 hover:border-orange hover:bg-orange hover:text-white hover:cursor-pointer transition"
                  onClick={handleCampaignCreation}
                  >
                  {isCampaignCreated ? "Campaign Created🎉" : "Create Campaign"}</div>
              </div>
            </form>
          </div>
          
          <div className={`w-1/2 ${isCampaignCreated ? "" : "opacity-50 pointer-events-none"}`}>
            <div className="flex w-full h-full flex-col justify-between">
              <div className="flex flex-col gap-12 h-4/5 px-24">
                <div className="text-large text-orange font-bold">
                  Complete Setup
                </div>
                  <div className="flex flex-col justify-center items-center gap-8">
                    <div className="flex justify-center items-center w-full">
                      <button
                        onClick={() => setStep(2)}
                        disabled={step > 1}
                        className={`${baseButtonStyle} ${step === 1 ? defaultButtonStyle : step > 1 ? activeButtonStyle : disabledButtonStyle}`}
                      >
                        Approve Contract
                      </button>
                    </div>

                    <div className={`h-6 border-l-2 border-black ${step > 1 && "opacity-50"}`}></div>

                    <div className="flex flex-col gap-4 justify-center items-center w-full">
                      <input
                        disabled={step !== 2} 
                        value={depositAmount}
                        onChange={(e) => setDepositAmount((e.target as HTMLInputElement).value)}className={`${step === 2 ? "" : "cursor-not-allowed opacity-50 disabled"} w-full border-2 border-borderColor border-opacity-75 rounded-10 p-2 bg-lightBlack cursor-pointer w-full`} type="number" min="1" placeholder="e.g. 1"/>
                      <button
                        onClick={() => setStep(3)}
                        disabled={step < 2}
                        className={`${baseButtonStyle} ${step === 2 ? defaultButtonStyle : step > 2 ? activeButtonStyle : disabledButtonStyle}`}
                      >
                        Deposit Tokens
                      </button>
                    </div>

                    <div className={`h-6 border-l-2 border-black ${step !== 2 && "opacity-50"}`}></div>

                    <div className="flex justify-center items-center w-full">
                      <Link href="/dapp" className={`${baseButtonStyle} ${step === 3 ? defaultButtonStyle : step > 3 ? activeButtonStyle : disabledButtonStyle} text-center`}>
                        <button
                          disabled={step < 3}
                          
                        >
                          Enable Claiming
                        </button>
                      </Link>
                    </div>
                  </div>
              </div>
              <div className="h-1/5">
                  
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Create;