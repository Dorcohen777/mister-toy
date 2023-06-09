import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
     login,
     logout,
     signup,
     getById,
     getLoggedinUser,
}

window.us = userService

function getById(userId) {
     return httpService.get(BASE_URL + userId)
}

function login({ username, password }) {
     return httpService
          .post(BASE_URL + 'login', { username, password })
          .then((user) => {
               if (user) return _setLoggedinUser(user)
          })
}

// function login({ username, password }) {
//     return storageService.query(STORAGE_KEY)
//         .then(users => {
//             const user = users.find(user => user.username === username)
//             if (user) return _setLoggedinUser(user)
//             else return Promise.reject('Invalid login')
//         })
// }

function signup({ username, password, fullname }) {
     const user = { username, password, fullname }
     return httpService.post(BASE_URL + 'signup', user).then(_setLoggedinUser)
}

function logout() {
     return httpService.post(BASE_URL + 'logout').then(() => {
          sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
     })
}

function getLoggedinUser() {
     return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
     const userToSave = {
          _id: user._id,
          fullname: user.fullname,
     }
     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
     return userToSave
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})
