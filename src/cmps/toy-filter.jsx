import { useEffect, useRef, useState } from 'react'
import { toyService } from '../services/toys-service'
import { utilService } from '../services/util.service.js'
import { useSelector } from 'react-redux'

export function ToyFilter({ onSetFilter }) {
     const [filterByToEdit, setFilterByToEdit] = useState(
          toyService.getDefaultFilter()
     )
     const [inStock, setInStock] = useState(true)
     const toys = useSelector((storeState) => storeState.toyModule.toys)

     onSetFilter = useRef(utilService.debounce(onSetFilter))
     const elInputRef = useRef(null)

     useEffect(() => {
          elInputRef.current.focus()
     }, [])

     useEffect(() => {
          // update father cmp that filters change very type
          onSetFilter.current(filterByToEdit)
          // eslint-disable-next-line
     }, [filterByToEdit])

     function handleChange({ target }) {
          let { value, name: field, type } = target
          value = type === 'number' ? +value : value

          if (field === 'inStock') {
               setInStock(!inStock)
          }

          setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
     }

     function onSubmitFilter(ev) {
          // update father cmp that filters change on submit
          ev.preventDefault()
          onSetFilter(filterByToEdit)
     }

     return (
          <section className='toy-filter'>
               <h2>Toys Filter</h2>
               <form onSubmit={onSubmitFilter}>
                    <label htmlFor='name'>Name:</label>
                    <input
                         type='text'
                         id='name'
                         name='name'
                         placeholder='By name'
                         value={filterByToEdit.name}
                         onChange={handleChange}
                         ref={elInputRef}
                    />

                    <label htmlFor='price'>Price:</label>
                    <input
                         type='number'
                         id='price'
                         name='price'
                         placeholder='By price'
                         value={filterByToEdit.price}
                         onChange={handleChange}
                    />

                    <label htmlFor='inStock'>In Stock:</label>
                    <input
                         type='checkbox'
                         id='inStock'
                         name='inStock'
                         value={inStock}
                         onChange={handleChange}
                    />
                    <label htmlFor='label'>Sort by label:</label>
                    <select
                         id='label'
                         name='label'
                         value={filterByToEdit.label}
                         onChange={handleChange}
                    >
                         <option value=''>All</option>{' '}
                         {/* Option to select all labels */}
                         {Array.from(
                              new Set(toys.flatMap((toy) => toy.labels))
                         ).map((label) => (
                              <option key={label} value={label}>
                                   {label}
                              </option>
                         ))}
                    </select>
                    <button hidden>Filter</button>
               </form>
          </section>
     )
}
