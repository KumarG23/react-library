import { Link } from 'react-router-dom';
import Logo from './assets/Designer.png'

import React from 'react'

export const Header = () => {
  return (
    <nav id='navbar' className='navbar navbar-expand-md navbar-light sticky-top nav-bar'>
        <div className='container d-flex flex-row'>
        <img src={Logo} alt='Logo' className='rounded float-start' id='logo'/>
        <span className='mx-auto fs-1 fw-bold' id='library'>My Books</span>
        <div className='navbar-nav'>
        <Link to='/' className='nav-item nav-link' id='navitem'>Home</Link>
        <Link to='/login' className='nav-item nav-link' id='navitem'>Login</Link>
        </div>
        </div>
    </nav>
  )
}

export default Header
