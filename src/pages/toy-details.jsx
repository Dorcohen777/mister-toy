import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { toyService } from '../services/toys-service'
import { userService } from '../services/user.service'

import { showErrorMsg } from '../services/event-bus.service.js'

export function ToyDetails() {
     const [toy, setToy] = useState(null)
     const [newMsg, setNewMsg] = useState('')
     const [newReview, setNewReview] = useState('')
     const { toyId } = useParams()
     const navigate = useNavigate()

     useEffect(() => {
          loadToy()
     }, [toyId])

     function loadToy() {
          toyService
               .getById(toyId)
               .then((toy) => {
                    setToy(toy)
               })
               .catch((err) => {
                    console.log('Had issues in toy details', err)
                    showErrorMsg('Cannot load toy')
                    navigate('/toy')
               })
     }
     // adding new message
     function addNewMsg() {
          if (newMsg.trim() === '') {
               // Handle empty message error if desired
               return
          }

          const msg = {
               txt: newMsg,
               by: userService.getLoggedinUser().fullname,
          }

          toyService
               .saveMsg(toy, msg)
               .then((savedMsg) => {
                    console.log('new msg', msg)
                    setToy((prevToy) => ({
                         ...prevToy,
                         msgs: [...prevToy.msgs, savedMsg],
                    }))
                    setNewMsg('')
               })
               .catch((err) => {
                    console.log('Error adding new message:', err)
               })
     }

     function addNewReview() {
          if (newReview.trim() === '') {
               // Handle empty review error if desired
               return
          }

          const review = {
               txt: newReview,
               userId: userService.getLoggedinUser()._id, // Set the appropriate user here
               toyId: toy._id,
          }

          toyService
               .saveReview(review)
               .then((savedReview) => {
                    console.log('saved review', savedReview)
               })
               .catch((err) => {
                    console.log('Error adding new review:', err)
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
               <br />
               <h5>Messages:</h5>
               {toy.msgs && (
                    <ul>
                         {toy.msgs.map((msg) => (
                              <li key={msg.id}>
                                   {msg.txt} - {msg.by.fullname}
                              </li>
                         ))}
                    </ul>
               )}

               <input
                    type='text'
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
               />
               <button onClick={() => addNewMsg()}>Add Message</button>

               <h5>Reviews:</h5>
               

               <input
                    type='text'
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
               />
               <button onClick={addNewReview}>Add Review</button>
          </section>
     )
}
