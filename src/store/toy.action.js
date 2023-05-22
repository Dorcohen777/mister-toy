import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY } from './toy.reducer.js'
import { store } from './store.js'
import { toyService } from '../services/toys-service.js'

export function loadToys(filterBy) {
     return toyService
          .query(filterBy)
          .then((toys) => {
               store.dispatch({ type: SET_TOYS, toys })
          })
          .catch((err) => {
               console.log('toy action -> Cannot load toys', err)
          })
}

export function removeToy(toyId) {
     return toyService
          .remove(toyId)
          .then(() => {
               store.dispatch({ type: REMOVE_TOY, toyId })
          })
          .catch((err) => {
               console.log('toy action -> Cannot remove toy', err)
          })
}

export function saveToy(toy) {
     const type = toy._id ? UPDATE_TOY : ADD_TOY
     return toyService
          .save(toy)
          .then((savedToy) => {
               store.dispatch({ type, toy: savedToy })
               return savedToy
          })
          .catch((err) => {
               console.log('toy action -> Cannot save toy', err)
          })
}
