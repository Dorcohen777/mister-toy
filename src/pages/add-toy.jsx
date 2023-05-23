import React, { useState } from 'react';
import deafaultImg from '../assets/img/default.png';
import { saveToy } from '../store/toy.action';

export function AddToy({ onAddToy }) {
     const [toy, setToy] = useState({
          name: '',
          price: 0,
          labels: [],
          inStock: false,
     });

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setToy((prevToy) => ({
               ...prevToy,
               [name]: value,
          }));
     };

     const handleCheckboxChange = (event) => {
          const { name, checked } = event.target;
          setToy((prevToy) => ({
               ...prevToy,
               [name]: checked,
          }));
     };

     const handleLabelsChange = (event) => {
          const { value } = event.target;
          setToy((prevToy) => ({
               ...prevToy,
               labels: value.split(',').map((label) => label.trim()),
          }));
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          saveToy(toy)
               .then((savedToy) => {
                    onAddToy(savedToy);
                    setToy({
                         name: '',
                         price: 0,
                         labels: [],
                         inStock: false,
                    });
               })
               .catch((err) => {
                    console.log('Cannot save toy:', err);
               });
     };

     return (
          <form onSubmit={handleSubmit}>
               <h2>Add Toy</h2>
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
               <button type='submit'>Add Toy</button>
          </form>
     );
}
