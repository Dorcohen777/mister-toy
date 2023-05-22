import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { HomePage } from './pages/home-page'
import { AboutUs } from './pages/about-page'
import { ToyIndex } from './pages/toy-index'
import { AppHeader } from './cmps/app-header'
import { store } from './store/store'

export default function App() {
     return (
          <Provider store={store}>
               <Router>
                    <section className='main-layout-app'>
                         <AppHeader />
                         <main>
                              <h1>main app</h1>
                              <Routes>
                                   <Route element={<HomePage />} path='/' />
                                   <Route element={<AboutUs />} path='/about' />
                                   <Route element={<ToyIndex />} path='/toy' />
                                   <Route element={<ToyEdit/>} path='toy/edit'/>
                                   <Route element={<ToyEdit/>} path='toy/edit/:toyId'/>
                              </Routes>
                         </main>
                    </section>
               </Router>
          </Provider>
     )
}
