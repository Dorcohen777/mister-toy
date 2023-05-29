import { Link, NavLink } from 'react-router-dom'
import { LoginSignup } from './login-signup'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/user.action'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AppHeader() {
     const dispatch = useDispatch()
     const user = useSelector((storeState) => storeState.userModule.loggedinUser)

     function onLogout() {
          logout()
              .catch((err) => {
                  showErrorMsg('Cannot logout')
              })
      }

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

               {user && <section className="user-info">
                <p>
                    <Link to={`/user/${user._id}`}>{user.fullname}</Link>
                </p>

                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup dispatch={dispatch} />
            </section>}
          </section>
     )
}
