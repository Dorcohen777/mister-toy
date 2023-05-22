import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
     let checkStock = toy.inStock ? 'In stock' : 'Out of stock'
     return (
          <article>
               <h2>Name: {toy.name}</h2>
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
