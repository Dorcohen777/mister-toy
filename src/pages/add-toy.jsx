import React, { useState } from 'react'
import { saveToy } from '../store/toy.action'
import deafaultImg from '../assets/img/default.png'
import { cloudinaryService } from '../services/cloudinary-service'

export function AddToy({ onAddToy }) {
     const [toy, setToy] = useState({
          name: '',
          price: 0,
          labels: [],
          inStock: false,
          img: '',
     })

     const handleInputChange = (event) => {
          const { name, value } = event.target
          setToy((prevToy) => ({
               ...prevToy,
               [name]: value,
          }))
     }

     const handleCheckboxChange = (event) => {
          const { name, checked } = event.target
          setToy((prevToy) => ({
               ...prevToy,
               [name]: checked,
          }))
     }

     const handleLabelsChange = (event) => {
          const { value } = event.target
          setToy((prevToy) => ({
               ...prevToy,
               labels: value.split(',').map((label) => label.trim()),
          }))
     }

     async function handleSubmit(ev){
          ev.preventDefault()
          try{
               await onAddToy(toy)
               console.log('new toy added', toy)
          }catch(err){
               console.log('error adding toy', err)
          }
     }

     async function saveImg(ev) {
          try {
               const imgUrl = await cloudinaryService.uploadImg(ev)
               setToy((prevToy) => ({
                    ...prevToy,
                    img: imgUrl,
               }))
          } catch (err) {
               console.log('err saving img', err)
          }
     }

     return (
          <form onSubmit={handleSubmit} className='form-new-toy'>
               <h2>Fill new toy details</h2>
               <label>
                    Name:
                    <input
                         type='text'
                         name='name'
                         value={toy.name}
                         onChange={handleInputChange}
                    />
               </label>
               <label>
                    Price:
                    <input
                         type='number'
                         name='price'
                         value={toy.price}
                         onChange={handleInputChange}
                    />
               </label>
               <label>
                    Labels (separated by comma):
                    <input
                         type='text'
                         name='labels'
                         value={toy.labels.join(', ')}
                         onChange={handleLabelsChange}
                    />
               </label>
               <label>
                    In Stock:
                    <input
                         type='checkbox'
                         name='inStock'
                         checked={toy.inStock}
                         onChange={handleCheckboxChange}
                    />
               </label>

               <label htmlFor=''>
                    upload image
                    <input type='file' onChange={saveImg} />
               </label>
               <button className='btn-style' type='submit'>
                    Add
               </button>
          </form>
     )
}
