import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { toyService } from '../services/toys-service'
import { showErrorMsg } from '../services/event-bus.service.js'

export function ToyDetails() {
     const [toy, setToy] = useState(null)
     const { toyId } = useParams()
     const navigate = useNavigate()

     useEffect(() => {
          loadToy()
     }, [toyId])

     function loadToy() {
          toyService
               .getById(toyId)
               .then((toy) => setToy(toy))
               .catch((err) => {
                    console.log('Had issues in toy details', err)
                    showErrorMsg('Cannot load toy')
                    navigate('/toy')
               })
     }

     if (!toy) return <div>Loading...</div>
     return (
          <section className='toy-details'>
               <h1>Toy name : {toy.name}</h1>
               <h5>Price: ${toy.price}</h5>
               <h5>{toy.inStock}</h5>
               <h5>
                    Labels:
                    {toy.labels.map((label) => (
                         <span key={label}>{label}, </span>
                    ))}
               </h5>
               <h5>{toy._id}</h5>
               <button>
                    <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
               </button>
               <button>
                    <Link to={'/toy'}>Back</Link>
               </button>
          </section>
     )
}
