"use client"
import React, { useEffect, useState } from 'react';
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Switch } from "@nextui-org/react";
import Link from "next/link"
import { ContextSearch } from '@/context/DataContext';
import styles from '../styles/Navbar.module.css'
import { useSession, signIn, signOut } from 'next-auth/react';
import { FeedbackIcon, LoginIcon, LogoutIcon, SettingsIcon, ProfileIcon } from '@/lib/SvgIcons';

function Navbarcomponent({ home = false }) {
    const iconClasses = "w-5 h-5 text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { Isopen, setIsopen } = ContextSearch();
    const { data, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, [status])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'KeyS' && e.ctrlKey) {
                e.preventDefault();
                setIsopen((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setIsopen]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navbarClass = isScrolled
        ? `${home ? styles.homenavbar : styles.navbar} ${home && styles.navbarscroll}`
        : home
            ? styles.homenavbar
            : styles.navbar;

    return (
        <div className={navbarClass}>
            <div className={styles.navleft}>
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logoLink}>
                        Bertoo.pro
                    </Link>
                </div>
                <div className={styles.navItemsContainer}>
                    <Link href="/anime/catalog" className={styles.navItem}>Catalog</Link>
                    <Link href="/anime/catalog?sortby=TRENDING_DESC" className={styles.navItem}>Trending</Link>
                    <Link href="/anime/catalog?format=MOVIE" className={styles.navItem}>Movies</Link>
                </div>
            </div>
            <div className={styles.navright}>
                <button
                    type="button"
                    title="Search"
                    onClick={() => setIsopen(true)}
                    className="w-[26px] h-[26px] outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z"
                        ></path>
                    </svg>
                </button>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            isDisabled={status === 'loading'}
                            as="button"
                            className="transition-transform w-[28px] h-[28px] backdrop-blur-sm"
                            color="secondary"
                            name={data?.user?.name}
                            size="sm"
                            src={data?.user?.image?.large || data?.user?.image?.medium || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                        />
                    </DropdownTrigger>
                    {isLoggedIn ? (
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="info" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{data?.user?.name}</p>
                            </DropdownItem>
                            <DropdownItem key="profile" startContent={<ProfileIcon className={iconClasses}/>}>Profile</DropdownItem>
                            <DropdownItem key="help_and_feedback" startContent={<FeedbackIcon className={iconClasses}/>}>Help & Feedback</DropdownItem>
                            <DropdownItem key="settings" startContent={<SettingsIcon className={iconClasses}/>}>
                                <Link href={`/anime/settings`} className='w-full h-full block '>Settings</Link>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" startContent={<LogoutIcon className={iconClasses} />}>
                                <button className="font-semibold outline-none border-none w-full h-full block text-left" onClick={() => signOut('AniListProvider')}>Log Out</button>
                            </DropdownItem>
                        </DropdownMenu>
                    ) : (
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="notlogprofile" startContent={<LoginIcon className={iconClasses}/>}>
                                <button className="font-semibold outline-none border-none w-full h-full block text-left" onClick={() => signIn('AniListProvider')}>Login With Anilist</button>
                            </DropdownItem>
                            <DropdownItem key="notloghelp_and_feedback" startContent={<FeedbackIcon className={iconClasses}/>}>Help & Feedback</DropdownItem>
                            <DropdownItem key="settings" startContent={<SettingsIcon className={iconClasses}/>}>
                                <Link href={`/anime/settings`} className='w-full h-full block '>Settings</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    )}
                </Dropdown>
            </div>
        </div>
    )
}

export default Navbarcomponent
