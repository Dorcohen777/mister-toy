export function ToyPreview({ toy }) {
     let checkStock = toy.inStock ? 'In stock' : 'Out of stock'
     return (
          <article>
               <h2>{toy.name}</h2>
               <h3>{toy.price}</h3>
               <h4>Stock: {checkStock}</h4>
               {toy.labels.map((label) => (
                    <p key={label}>{label}</p>
               ))}
          </article>
     )
}
