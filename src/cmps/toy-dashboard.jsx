import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie, Doughnut } from 'react-chartjs-2'
import { loadToys } from '../store/toy.action'

ChartJS.register(ArcElement, Tooltip, Legend)

export function ToyDashboard() {
     const toys = useSelector((storeState) => storeState.toyModule.toys)

     // for showing the percentage of toys that are in stock by labels
     const inventoryCount = []
     const inStockCount = []
     const labels = []

     useEffect(() => {
          loadToys()
     }, [])

     // for showing the percentage of toys that are in stock by labels
     toys.forEach((toy) => {
          toy.labels.forEach((label) => {
               if (!labels.includes(label)) {
                    labels.push(label)
                    inventoryCount.push(1)
                    inStockCount.push(toy.inStock ? 1 : 0)
               } else {
                    const index = labels.indexOf(label)
                    inventoryCount[index] += 1
                    inStockCount[index] += toy.inStock ? 1 : 0
               }
          })
     })

     const labelPricesMap = new Map()

     // Calculate sum of prices for each label
     toys.forEach((toy) => {
          toy.labels.forEach((label) => {
               if (labelPricesMap.has(label)) {
                    const currentPrice = labelPricesMap.get(label)
                    labelPricesMap.set(label, currentPrice + toy.price)
               } else {
                    labelPricesMap.set(label, toy.price)
               }
          })
     })

     const prices = Array.from(labelPricesMap.values())

     // for showing the percentage of toys that are in stock by labels
     const inStockPercentage = inStockCount.map((count, index) =>
          ((count / inventoryCount[index]) * 100).toFixed(2)
     )

     const dataPricePerLabel = {
          labels: labels,
          datasets: [
               {
                    label: 'Prices per Label',
                    data: prices,
                    backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         'rgba(255, 206, 86, 0.2)',
                         'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)',
                         'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                         'rgba(255, 99, 132, 1)',
                         'rgba(54, 162, 235, 1)',
                         'rgba(255, 206, 86, 1)',
                         'rgba(75, 192, 192, 1)',
                         'rgba(153, 102, 255, 1)',
                         'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
               },
          ],
     }

     const dataPercentage = {
          labels: labels,
          datasets: [
               {
                    label: 'Inventory by Label',
                    data: inStockPercentage,
                    backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         'rgba(255, 206, 86, 0.2)',
                         'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)',
                         'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                         'rgba(255, 99, 132, 1)',
                         'rgba(54, 162, 235, 1)',
                         'rgba(255, 206, 86, 1)',
                         'rgba(75, 192, 192, 1)',
                         'rgba(153, 102, 255, 1)',
                         'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
               },
          ],
     }

     return (
          <section>
               <h1 className='h1-dashboard-title'>Toys Dashboard</h1>
               <section className='section-dashboard-charts'>
                    <div className='div-chart-1'>
                         <h2>Prices per label</h2>
                         <Pie data={dataPricePerLabel} responsive maintainAspectRatio={false} />
                    </div>
                    <div className='div-chart-2'>
                         <h2>percentage of toys that are in stock by labels</h2>
                         <Doughnut data={dataPercentage} responsive maintainAspectRatio={false}/>
                    </div>
               </section>
          </section>
     )
}
