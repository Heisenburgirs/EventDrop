"use client"

import Link from "next/link"

export const Landing = () => {
  return (
    <main className="flex flex-col w-full py-4 px-4 text-white">
            <div className="flex flex-col gap-4 w-full md:h-[1150px] lg:h-[900px] xl:h-[820px] border border-dashed border-orange border-2 rounded-5 border-opacity-50 py-8 justify-between items-center">
                <div className=" rounded-10 py-4 px-8 font-bold text-center text-xlarge text-orange">
                    Transform events <br/ > Instant digital asset distribution via email.
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                        <div className="grid sm:px-4 base:px-8 lg:px-32 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            <div className="flex flex-col max-w-[500px] text-left gap-8 bg-lightBlack py-4 px-6 rounded-10 border border-borderColor">
                                <div className="text-medium opacity-90">
                                    Account Abstraction
                                </div>
                                <div className="opacity-80 text-left">
                                    Using Account Abstraction, setting up campaigns and claiming rewards have never been easier
                                </div>
                                <Link className="w-[120px] text-center py-2 px-4 bg-background opacity-50 rounded-10 hover:opacity-100 hover:cursor-pointer transition" href={""}>
                                    Learn More
                                </Link>
                            </div>
                            <div className="flex flex-col max-w-[500px] text-left gap-8 bg-lightBlack py-4 px-6 rounded-10 border border-borderColor">
                                <div className="text-medium opacity-90">
                                    Automated Notification
                                </div>
                                <div className="opacity-80 text-left">
                                    As attendees claim, we automatically notify them via email, ensuring they stay in the loop
                                </div>
                                <Link className="w-[120px] text-center py-2 px-4 bg-background opacity-50 rounded-10 hover:opacity-100 hover:cursor-pointer transition" href={""}>
                                    Learn More
                                </Link>
                            </div>
                            <div className="flex flex-col max-w-[500px] text-left gap-8 bg-lightBlack py-4 px-6 rounded-10 border border-borderColor">
                                <div className="text-medium opacity-90">
                                    No Sign-Up
                                </div>
                                <div className="opacity-80 text-left">
                                    Users can claim assets effortlessly - their wallets are directly linked to their emails
                                </div>
                                <Link className="w-[120px] text-center py-2 px-4 bg-background opacity-50 rounded-10 hover:opacity-100 hover:cursor-pointer transition" href={""}>
                                    Learn More
                                </Link>
                            </div>
                            <div className="flex flex-col max-w-[500px] text-left gap-8 bg-lightBlack py-4 px-6 rounded-10 border border-borderColor">
                                <div className="text-medium opacity-90">
                                    Campaign Management</div>
                                <div className="opacity-80 text-left">
                                    Campaigners have the flexibility to start, pause, edit, or end campaigns on-the-fly, ensuring full control.
                                </div>
                                <Link className="w-[120px] text-center py-2 px-4 bg-background opacity-50 rounded-10 hover:opacity-100 hover:cursor-pointer transition" href={""}>
                                    Learn More
                                </Link>
                            </div>
                            <div className="flex flex-col max-w-[500px] text-left gap-8 bg-lightBlack py-4 px-6 rounded-10 border border-borderColor">
                                <div className="text-medium opacity-90">
                                ERC20/ERC721
                                </div>
                                <div className="opacity-80 text-left">
                                    Create campaigns with the flexibility of either ERC721 or ERC20, catering to your specific asset distribution needs.
                                </div>
                                <Link className="w-[120px] text-center py-2 px-4 bg-background opacity-50 rounded-10 hover:opacity-100 hover:cursor-pointer transition" href={""}>
                                    Learn More
                                </Link>
                            </div>
                            <div className="flex flex-col max-w-[500px] text-left gap-8 bg-lightBlack py-4 px-6 rounded-10 border border-borderColor">
                                <div className="text-medium opacity-90">
                                    Customizable Security
                                </div>
                                <div className="opacity-80 text-left">
                                    Enhance campaign's security by setting custom coupon codes or whitelisting certain email addresses.
                                </div>
                                <Link className="w-[120px] text-center py-2 px-4 bg-background opacity-50 rounded-10 hover:opacity-100 hover:cursor-pointer transition" href={""}>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center opacity-50">
                        <div>
                            @EventDrop
                        </div>
                    </div>
                </div>
            </div>
    </main>
  )
}
