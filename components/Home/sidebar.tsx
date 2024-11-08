'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import asset from '@/public/asset'
import { sidebarLinks } from '@/constant'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from '../Home/footer'
const Sidebar = ({ user }: { user:User }) => {
  const pathname = usePathname();
  return (
    <div className='w-[16vw] max-xl:w-[5vw] '>
      <nav>
      <div className='flex items-center gap-2'>
        <Link href='/' className='flex items-center gap-4 mb-4'>
            <Image src={asset.Logo} alt='Logo' className='size-[24px] max-xl-14'/>
            <p className='sidebar-logo'>Horizon</p>
        </Link>
      </div>

      {sidebarLinks.map((item,) => {
        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
        return (
          <div className='flex items-center'>
          <Link href={item.route} key={item.label} className={cn('sidebar-link', { 'side-bar-gradient ': isActive })}>
            <div className='relative size-6'>
              <Image src={item.imgURL} alt={item.label} fill className={cn({
                'brightness-[3] invert-0' : isActive
              })}></Image>
           </div>
              <p className={cn('sidebar-label', {
                '!text-white' : isActive
              })}>{item.label}</p>
           </Link>
          </div>
        )
      })}

      </nav>
      <Footer user={user} type='mobile'/>
    </div>
  )
}

export default Sidebar
