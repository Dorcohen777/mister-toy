import { Link } from 'react-router-dom'

import heroImg from '../assets/img/home-page/hero.png'
import dashboardImg from '../assets/img/home-page/dashboard.png'

export function HomePage() {
     return (
          <section className='section-homepage'>
               <div className='div-hero-section'>
                    <div>
                         <h1>Playtime Wonderland: Where Dreams Come to Life</h1>
                         <h2>
                              Explore a World of Wonder and Endless Fun with Our
                              Delightful Toy Collection
                         </h2>

                         <Link to='/toy' className='button-link'>
                              <button>Toy Shop</button>
                         </Link>
                    </div>

                    <div className='div-hero-img'>
                         <img
                              src={heroImg}
                              alt='main-img'
                              className='hero-img'
                         />
                    </div>
               </div>

               <div className='div-homepage-dashboard-section'>
                    <div>
                         <img
                              src={dashboardImg}
                              alt='img-dashboard'
                              className='img-dashboard'
                         />
                    </div>

                    <div className='div-section-dashboard'>
                         <h2>
                              Effortless Insights and Real-time Statistics:
                              Explore Your Toy Collection's Value and Inventory
                              Composition
                         </h2>
                    </div>
                    <Link to='/dashboard' className='button-link'>
                         <button>Dashboard</button>
                    </Link>
               </div>
          </section>
     )
}
