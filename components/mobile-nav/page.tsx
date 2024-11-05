'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FiMenu } from 'react-icons/fi';
import { sidebarLinks } from '@/constant'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import asset from '@/public/asset'
import Link from 'next/link'
import Footer from '../Home/footer';

const Mobilenav = ({ user }: FooterProps) => {
  const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger><FiMenu size={24} /></SheetTrigger>
        <SheetContent side='left' className='bg-white border-none'>
          <nav>
            <div className='flex items-center gap-2'>
              <Link href='/' className='flex items-center gap-4'>
                <Image src={asset.Logo} alt='Logo' className='size-[24px] max-xl-14' />
                <p className='font-bold text-26 text-black-1'>Horizon</p>
              </Link>
            </div>

            <div className='mobilenav-sheet'>
              <SheetClose asChild>
                <nav className='flex h-full flex-col gap-6 pt-16'>
                  {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    return (
                      <div className='flex items-center' key={item.label}>
                        <SheetClose asChild>
                          <Link href={item.route} className={cn('mobilenav-sheet_close w-full', { 'side-bar-gradient ': isActive })}>
                            <div className='relative size-6'>
                              <Image src={item.imgURL} alt={item.label} width={20} height={20} className={cn({
                                'brightness-[3] invert-0': isActive
                              })}></Image>
                            </div>
                            <p className={cn('mobilenav_label', {
                              '!text-white': isActive
                            })}>{item.label}</p>
                          </Link>
                        </SheetClose>
                      </div>
                    )
                  })}
                </nav>
              </SheetClose>
              <Footer user={user} type='mobile'/>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default Mobilenav
