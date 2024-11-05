import React from 'react'
import { types } from 'util'
import Image from 'next/image'
import asset from '@/public/asset'
import Link from 'next/link'
import { IoMdAdd } from 'react-icons/io';
import Bankcard from '../Bankcard'

const Rightsidebar = ({ transaction, user, banks }:Rightsidebar) => {
    return (
        <div className='right-sidebar'>
          <section className='flex flex-col pb-8'>
             <div >
                  <Image src={asset.Mesh} width={30} height={30} alt='Mesh' className='profile-banner '/>
                  <div className='profile'>
                      <div className='profile-img'>
                              <span className='profile-span '>
                                {user.name[1]}
                              </span>
                      </div>

                      <div className='profile-details'>
                         <h1 className='profile-name'>
                          {user.name}</h1>
                         <p className='profile-email'>
                          {user.email}
                         </p>
                      </div>
                  </div>
             </div>
          </section>

          <section className='banks'>
             <div className='flex w-full justify-between items-center'>
                  <h2 className='header-2'>
                     My Banks
                  </h2>

                  <Link href='/' className='flex gap-2'>
                     <IoMdAdd />
                     <h2 className='text-14 font-semibold text-gray-600 capitalize'>add bank</h2>
                  </Link>
             </div>

             {banks?.length > 0 && (
              <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                <div className='relative z-10'>
                  <Bankcard 
                  key={banks[0].$id}
                  account = {banks[0]}
                  userName= {`${user?.name}`}
                  showBalance = {false}
                  />
                </div>

                {banks[1] && (
                  <div className='absolute top-8 right-0 z-0 w-[90%]'>
                    <Bankcard 
                      key={banks[0].$id}
                      account = {banks[1]}
                      userName= {`${user?.name}`}
                      showBalance = {false}
                    />
                  </div>
                )}
              </div>
             )}
          </section>
        </div>
    )
}

export default Rightsidebar
