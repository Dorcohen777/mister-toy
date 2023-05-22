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
}

function query(filterBy = {}) {
     return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
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
     return { name: '', stock: 0 }
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