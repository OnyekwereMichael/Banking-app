'use client'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJs, ArcElement, Tooltip, Legend, } from 'chart.js'

ChartJs.register(ArcElement, Tooltip, Legend)

interface acc {
    account: number
}
const doughnutChart = ({ account }: acc) => {
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: [1250, 2500, 3750],
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],

            }
        ],
        labels: ['Bank1', 'Bank2', 'Bank3']
    }
    return (
        <div className="chart-container">
            <Doughnut
                data={data}
                width={150}
                height={150}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    )
}

export default doughnutChart
