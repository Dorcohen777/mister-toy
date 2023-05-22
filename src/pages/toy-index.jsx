import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadToys, removeToy, saveToy } from '../store/toy.action'
import { toyService } from '../services/toys-service'
import { ToyList } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'

export function ToyIndex() {
     const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
     const dispatch = useDispatch()
     const toys = useSelector((storeState) => storeState.toyModule.toys)

     useEffect(() => {
          loadToys(filterBy)
     }, [filterBy])

     function onRemoveToy(toyId) {
          removeToy(toyId)
               .then(() => {
                    showSuccessMsg('Toy removed')
               })
               .catch((err) => {
                    showErrorMsg('Cannot remove toy')
                    console.log(err)
               })
     }

     function onAddToy() {
          const toyToSave = toyService.getEmptyToy()

          saveToy(toyToSave)
               .then((savedToy) => {
                    showSuccessMsg(`Toy added (id: ${savedToy._id})`)
               })
               .catch((err) => {
                    showErrorMsg('Cannot add car')
                    console.log(err)
               })
     }

     function onSetFilter(filterBy) {
          console.log('FilterBy', filterBy)
          setFilterBy(filterBy)
     }

     return (
          <section>
               <h1>Toy index</h1>
               
               <ToyFilter onSetFilter={onSetFilter} />
               <main>
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} />
               </main>
          </section>
     )
}
