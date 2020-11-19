import React, { useState } from 'react';
import Link from 'next/link';

const Header = ({ }) => {
  return (
    <div>
      <header className="section-header">
        <section className="header-top-light border-bottom">
          <div className="container">
            <nav className="d-flex justify-content-end row">
              <ul className="nav">
                <li className="nav-item">
                  <a href="/" className="nav-link">Home</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <section className="header-main border-bottom py-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 col-lg-3 col-sm-4 col-12">
                <a href="/admin/dashboard">
                  <img className="logo" src="/images/banner-ncr-logo.png"></img>
                </a>
              </div>
              <div className="col text-md-right">
                <div>
                  <a href="/admin/site/new" className="btn btn-primary ml-1">New Site</a>
                  <a href="/admin/category/new" className="btn btn-primary ml-1">New Category</a>
                  <a href="/admin/item/new" className="btn btn-primary ml-1">New Item</a>
                  <a href="#" className="btn btn-outline-primary ml-1">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </div>
  )
}

export default Header;