import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { httpService } from './http.service'

// const STORAGE_KEY = 'toyDB'
// _createToys() // creating demo data
const BASE_URL = 'toy/'

export const toyService = {
     query,
     getById,
     remove,
     save,
     getDefaultFilter,
     getEmptyToy,
}

function query(filterBy = {}) {
     // return storageService.query(STORAGE_KEY)
     return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
     // return storageService.get(STORAGE_KEY, toyId)
     return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
     // return storageService.remove(STORAGE_KEY, toyId)
     return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
     if (toy._id) {
          // return storageService.put(STORAGE_KEY, toy)
          return httpService.put(BASE_URL, toy)
     } else {
          // return storageService.post(STORAGE_KEY, toy)
          return httpService.post(BASE_URL, toy)
     }
}

function getDefaultFilter() {
     return { name: '', price: 0 }
}

function getEmptyToy() {
     return {
          _id: '',
          name: '',
          price: 0,
          labels: [],
          createdAt: Date.now(),
          inStock: false,
     }
}

// *********** Private functions ***********

// function _createToys() {
//      let toys = utilService.loadFromStorage(STORAGE_KEY)
//      if (!toys || !toys.length) {
//           toys = []
//           toys.push(_createToy('digimon', 125, true))
//           toys.push(_createToy('pokimon', 200, false))
//           toys.push(_createToy('lion', 50, true))
//           toys.push(_createToy('ball', 100, true))
//           toys.push(_createToy('light magic', 150, true))
//           toys.push(_createToy('laser', 25, true))
//           toys.push(_createToy('puzzle', 70, false))
//           toys.push(_createToy('robot', 100, false))
//           utilService.saveToStorage(STORAGE_KEY, toys)
//      }
// }

// function _createToy(name, price, inStock) {
//      const toy = {
//           _id: utilService.makeId(),
//           name,
//           price,
//           labels: ['Doll', 'Battery Powered', 'Baby'],
//           createdAt: Date.now(),
//           inStock,
//      }

//      return toy
// }
