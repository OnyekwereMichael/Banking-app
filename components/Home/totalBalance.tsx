import React from 'react'
import AnimateCounter from './AnimateCounter'
import DoughnutChart from './doughnutChart'

const TotalBalance = ({ account, totalAmount, totalBank }: AccountDetail) => {
  return (
    <section className='total-balance'>
      <div className='total-balance-chart'>
        <DoughnutChart account={account} />
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          <h2 className='header-2'>Bank Accounts: {totalBank}</h2>
        </div>
        <div>
          <p className='total-balance-label'>Tota/l Current Balance</p>
          <div className='total-balance-amount flex-center gap-2 mt-3'>
            <AnimateCounter amount={totalAmount} />
          </div>
        </div>
      </div>

    </section>
  )
}

export default TotalBalance
