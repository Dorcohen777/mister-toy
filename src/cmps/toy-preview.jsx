import { useState } from 'react'
import { Link } from 'react-router-dom'
import deafaultImg from '../assets/img/default.png'

export function ToyPreview({ toy }) {
     let checkStock = toy.inStock ? 'In stock' : 'Out of stock'

     const getRelativeTime = (timestamp) => {
          const now = new Date()
          const createdAt = new Date(timestamp)
          const timeDiff = now.getTime() - createdAt.getTime()

          const minutes = Math.floor(timeDiff / (1000 * 60))
          if (minutes < 1) {
               return 'right now'
          } else if (minutes === 1) {
               return '1 minute ago'
          } else if (minutes < 60) {
               return `${minutes} minutes ago`
          }

          const hours = Math.floor(minutes / 60)
          if (hours === 1) {
               return '1 hour ago'
          } else if (hours < 24) {
               return `${hours} hours ago`
          }

          const days = Math.floor(hours / 24)
          if (days === 1) {
               return '1 day ago'
          } else {
               return `${days} days ago`
          }
     }

     return (
          <article>
               <img src={toy.img}  className='img-toy'/>
               <h2>Name: {toy.name}</h2>
               <h3>{toy.price}$</h3>
               <h4>{checkStock}</h4>
               <hr />
               {toy.labels.map((label) => (
                    <p key={label}>{label}</p>
               ))}
               <hr />
               <h5>{getRelativeTime(toy.createdAt)}</h5>
               <Link to={`/toy/${toy._id}`}>Details</Link> |
               <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
          </article>
     )
}
