import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadToys, removeToy, saveToy } from '../store/toy.action'
import { toyService } from '../services/toys-service'
import { ToyList } from '../cmps/toy-list'

export function ToyIndex() {
     const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
     const dispatch = useDispatch()
     const toys = useSelector((storeState) => storeState.toyModule.toys)

     useEffect(() => {
          loadToys()
     }, [])

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

     function onEditToy(toy) {
          const price = +prompt('New price?', toy.price)
          if (!price || price === toy.price) return

          const toyToSave = { ...toy, price }
          saveToy(toyToSave)
               .then((savedToy) => {
                    showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
               })
               .catch((err) => {
                    showErrorMsg('Cannot update toy')
               })
     }

     return (
          <section>
               <h1>Toy index</h1>
               <main>
                    <ToyList
                         toys={toys}
                         onRemoveToy={onRemoveToy}
                         onEditToy={onEditToy}
                    />
               </main>
          </section>
     )
}
