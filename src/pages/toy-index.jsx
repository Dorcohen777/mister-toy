import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadToys, removeToy, saveToy } from '../store/toy.action'
import { toyService } from '../services/toys-service'
import { ToyList } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'
import { AddToy } from './add-toy'

export function ToyIndex() {
     const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
     const toys = useSelector((storeState) => storeState.toyModule.toys)
     const dispatch = useDispatch()
     const [isAdd, setIsAdd] = useState(false)

     useEffect(() => {
          loadToys(filterBy)
     }, [filterBy])

     async function onRemoveToy(toyId) {
          try {
               await removeToy(toyId)
               showSuccessMsg('Toy removed')
          } catch (err) {
               showErrorMsg('Cannot remove toy')
               console.log(err)
          }
     }

     function onSetFilter(filterBy) {
          setFilterBy(filterBy)
     }

     async function handleAddToy(toy) {
          try {
               await saveToy(toy)
               showSuccessMsg('Toy added')
          } catch (err) {
               showErrorMsg('Cannot add toy')
               console.log(err)
          }
     }

     return (
          <section>
               <h1>Toy store</h1>
               <button className='btn-style' onClick={() => setIsAdd(!isAdd)}>
                    Create new toy
               </button>
               {isAdd && <AddToy onAddToy={handleAddToy} />}
               <ToyFilter onSetFilter={onSetFilter} />
               <main>
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} />
               </main>
          </section>
     )
}
