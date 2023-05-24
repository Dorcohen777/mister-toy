import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {
     return (
          <section className='main-nav'>
               <div className='div-navbar'>
                    <h2>Mister-Toys</h2>
                    <nav className='nav-links'>
                         <NavLink to='/'>Home</NavLink> 
                         <NavLink to='/toy'>Toys</NavLink> 
                         <NavLink to='/dashboard'>Dashboard</NavLink> 
                         <NavLink to='/about'>About</NavLink> 
                    </nav>
               </div>
          </section>
     )
}
