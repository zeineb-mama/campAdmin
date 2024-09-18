import React from 'react'
import './Sidebar.css'
import list_product_icon from '../Assets/Product_list_icon.svg'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" className='icon-sidebar' />
          <p className='title-sidebar'>Dashboard</p>
        </div>
      </Link>
      <Link to='/listproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" className='icon-sidebar' />
          <p className='title-sidebar'>Product List</p>
        </div>
      </Link>

      <Link to='/listcategory' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" className='icon-sidebar' />
          <p className='title-sidebar'>Category List</p>
        </div>
      </Link>

      <Link to='/listorders' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" className='icon-sidebar' />
          <p className='title-sidebar'>Order List</p>
        </div>
      </Link>

      <Link to='/users' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" className='icon-sidebar' width={20} />
          <p className='title-sidebar'>user List</p>
        </div>
      </Link>

    </div>
  )
}

export default Sidebar
