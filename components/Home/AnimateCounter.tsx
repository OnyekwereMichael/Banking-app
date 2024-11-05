'use client'
import React from 'react'
import CountUp from 'react-countup'

const AnimateCounter = ({amount}: {amount: number}) => {
  return (
    <div className='font-bold text-lg'>
        <CountUp end={amount}
         prefix='$'
         decimal=','
         duration={2.75}
         decimals={2}
        />
    </div>
  )
}

export default AnimateCounter
