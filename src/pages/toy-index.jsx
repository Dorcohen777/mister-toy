import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toyService } from '../services/toys-service'

export function ToyIndex() {
     
     const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
     const dispatch = useDispatch()
     const toys = useSelector((storeState) => storeState.carModule.cars)

     

     useEffect(() => {
          loadToys()
     }, [])

     return (
          <section>
               <h1>Toy index</h1>
          </section>
     )
}
