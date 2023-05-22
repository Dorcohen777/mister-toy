import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'toyDB'
_createToys() // creating demo data

export const toyService = {
     query,
     getById,
     remove,
     save,
     getDefaultFilter,
     getEmptyToy,
}

function query(filterBy = {}) {
     return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
     console.log('from service', toyId)
     return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
     return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
     if (toy._id) {
          return storageService.put(STORAGE_KEY, toy)
     } else {
          return storageService.post(STORAGE_KEY, toy)
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

function _createToys() {
     let toys = utilService.loadFromStorage(STORAGE_KEY)
     if (!toys || !toys.length) {
          toys = []
          toys.push(_createToy('digimon', 125, true))
          toys.push(_createToy('pokimon', 200, false))
          toys.push(_createToy('lion', 50, true))
          toys.push(_createToy('ball', 100, true))
          toys.push(_createToy('light magic', 150, true))
          toys.push(_createToy('laser', 25, true))
          toys.push(_createToy('puzzle', 70, false))
          toys.push(_createToy('robot', 100, false))
          utilService.saveToStorage(STORAGE_KEY, toys)
     }
}

function _createToy(name, price, inStock) {
     const toy = {
          _id: utilService.makeId(),
          name,
          price,
          labels: ['Doll', 'Battery Powered', 'Baby'],
          createdAt: Date.now(),
          inStock,
     }

     return toy
}
