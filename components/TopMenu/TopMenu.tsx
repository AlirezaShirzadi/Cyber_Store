"use client"
import React, {useEffect, useState, useRef} from 'react';
import Image from "next/image";
import Link from "next/link";

export default function TopMenu() {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTime = () => {
            const time = new Date().toLocaleString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Tehran'
            });
            setCurrentTime(time);
        };

        updateTime();
        const timer = setInterval(updateTime, 60000);

        // Close drawer when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setIsDrawerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            clearInterval(timer);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Focus search input when search is opened
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <header className={`container mx-auto relative`}>
            <div
                className={`absolute z-30 flex items-center justify-between w-full rounded-[15px] top-[15px] shadow-menu bg-[#ffffffb3] py-[7.5px] px-[15px]`}>
                {/* Logo - visible on all screen sizes */}
                <a className={`flex items-center gap-x-3.5`} href={`/`}>
                    <Image 
                        className={`w-[25px] h-[25px]`} 
                        src={`/logo.png`} 
                        alt={`logo`} 
                        width={25} 
                        height={25}
                        sizes="25px"
                    />
                    <h1 className={`text-primary text-base font-medium`}>سایبر گیم‌استور</h1>
                </a>

                {/* Desktop Navigation - hidden on mobile and tablet */}
                <nav className={`hidden lg:flex items-center gap-x-[46px] text-primary font-medium text-base`}>
                    <Link className={`text-secondary`} href={`/`}>خانه</Link>
                    <Link href={`/shop`}>فروشگاه</Link>
                    <Link href={`/`}>درباره ما</Link>
                    <Link href={`/`}>تماس با ما</Link>
                    <Link href={`/`}>وبلاگ</Link>
                </nav>

                {/* Desktop Right Section - hidden on mobile and tablet */}
                <div className={`hidden lg:flex items-center gap-x-[23px] text-primary text-base font-light`}>
                    <div dir={`ltr`}>{currentTime}</div>

                    {/* Search Icon and Input */}
                    <div className="relative">
                        {isSearchOpen ? (
                            <div className="flex items-center bg-white rounded-full overflow-hidden pr-2 pl-1 py-1 border border-primary">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="جستجو..."
                                    className="outline-none text-sm w-[150px] bg-transparent"
                                />
                                <button onClick={toggleSearch} className="ml-1 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                        <path d="M8.04297 1.5C11.9327 1.5 15.0859 4.65324 15.0859 8.54297C15.0859 12.4327 11.9327 15.5859 8.04297 15.5859C4.15324 15.5859 1 12.4327 1 8.54297C1.00005 4.65327 4.15327 1.50005 8.04297 1.5Z" stroke="#7673D5" strokeWidth="2"/>
                                        <rect x="12.0645" y="14.9343" width="3.35127" height="9.2853" rx="1" transform="rotate(-45 12.0645 14.9343)" fill="#7673D5"/>
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <button onClick={toggleSearch} className={`cursor-pointer`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M8.04297 1.5C11.9327 1.5 15.0859 4.65324 15.0859 8.54297C15.0859 12.4327 11.9327 15.5859 8.04297 15.5859C4.15324 15.5859 1 12.4327 1 8.54297C1.00005 4.65327 4.15327 1.50005 8.04297 1.5Z" stroke="#7673D5" strokeWidth="2"/>
                                    <rect x="12.0645" y="14.9343" width="3.35127" height="9.2853" rx="1" transform="rotate(-45 12.0645 14.9343)" fill="#7673D5"/>
                                </svg>
                            </button>
                        )}
                    </div>

                    <div>
                        <Link href={`#`}>ورود / ثبت نام</Link>
                    </div>
                </div>

                {/* Mobile/Tablet Hamburger Menu Button - visible only on mobile and tablet */}
                <div className="lg:hidden flex items-center gap-x-4">
                    {/* Mobile Search Icon */}
                    <button onClick={toggleSearch} className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                            <path d="M8.04297 1.5C11.9327 1.5 15.0859 4.65324 15.0859 8.54297C15.0859 12.4327 11.9327 15.5859 8.04297 15.5859C4.15324 15.5859 1 12.4327 1 8.54297C1.00005 4.65327 4.15327 1.50005 8.04297 1.5Z" stroke="#7673D5" strokeWidth="2"/>
                            <rect x="12.0645" y="14.9343" width="3.35127" height="9.2853" rx="1" transform="rotate(-45 12.0645 14.9343)" fill="#7673D5"/>
                        </svg>
                    </button>

                    {/* Hamburger Icon */}
                    <button onClick={toggleDrawer} className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Search Input - appears at the top when search is clicked */}
            {isSearchOpen && (
                <div className="lg:hidden absolute top-[70px] left-0 right-0 px-4 z-50">
                    <div className="bg-white rounded-[15px] shadow-menu p-3 flex items-center">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="جستجو..."
                            className="flex-1 outline-none text-sm bg-transparent"
                        />
                        <button onClick={toggleSearch} className="text-primary ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile/Tablet Drawer Menu */}
            <div 
                ref={drawerRef}
                className={`lg:hidden fixed top-0 right-0 h-full w-[250px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b">
                        <a className={`flex items-center gap-x-3.5`} href={`/`}>
                            <Image 
                                className={`w-[25px] h-[25px]`} 
                                src={`/logo.png`} 
                                alt={`logo`} 
                                width={25} 
                                height={25}
                                sizes="25px"
                            />
                            <h1 className={`text-primary text-base font-medium`}>سایبر گیم‌استور</h1>
                        </a>
                        <button onClick={toggleDrawer} className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-y-4 text-primary font-medium text-base mb-6">
                        <Link className={`text-secondary`} href={`/`} onClick={() => setIsDrawerOpen(false)}>خانه</Link>
                        <Link href={`/shop`} onClick={() => setIsDrawerOpen(false)}>فروشگاه</Link>
                        <Link href={`/`} onClick={() => setIsDrawerOpen(false)}>درباره ما</Link>
                        <Link href={`/`} onClick={() => setIsDrawerOpen(false)}>تماس با ما</Link>
                        <Link href={`/`} onClick={() => setIsDrawerOpen(false)}>وبلاگ</Link>
                    </nav>

                    <div className="text-primary text-base font-light mb-4" dir="ltr">
                        {currentTime}
                    </div>

                    <div className="mt-auto pb-6 text-primary text-base font-medium">
                        <Link href={`#`} onClick={() => setIsDrawerOpen(false)}>ورود / ثبت نام</Link>
                    </div>
                </div>
            </div>
            {isDrawerOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/70 bg-opacity-50 z-40"
                    onClick={() => setIsDrawerOpen(false)}
                ></div>
            )}
        </header>
    );
}
