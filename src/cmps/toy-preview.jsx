import { useState } from 'react'
import { Link } from 'react-router-dom'
import deafaultImg from '../assets/img/default.png'

export function ToyPreview({ toy }) {
     let checkStock = toy.inStock ? 'In stock' : 'Out of stock'

     const imageName = toy.name.replace(/\s/g, '_') // Replace spaces with underscores

     return (
          <article>
               <h2>Name: {toy.name}</h2>
               <img
                    src={require(`../assets/img/${imageName}.jpg`)}
                    onError={(e) => {e.target.onerror = null; e.target.src = deafaultImg}}
                    alt={toy.name}
               />
               <h3>{toy.price}$</h3>
               <h4>{checkStock}</h4>
               <hr />
               {toy.labels.map((label) => (
                    <p key={label}>{label}</p>
               ))}
               <hr />
               <Link to={`/toy/${toy._id}`}>Details</Link> |
               <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
          </article>
     )
}
