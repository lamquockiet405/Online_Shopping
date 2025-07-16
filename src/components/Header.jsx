"use client"

import { useState } from "react"
import SeachBar from "./SeachBar"
import NavbarMenu from "./NavbarMenu"
import "../styles/Header.css"
import { useNavigate } from "react-router-dom"

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <h1 onClick={() => navigate("/")}>FashionShop</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <NavbarMenu />
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <SeachBar />
          </div>

          {/* Right Icons */}
          <div className="header-icons">
            <button className="icon-btn search-mobile">
              <span>🔍</span>
            </button>

            <button className="icon-btn" onClick={() => navigate("/login")}>
              <span>👤</span>
            </button>

            <button className="icon-btn cart-btn" onClick={() => navigate("/cart")}>
              <span>🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-search">
              <SeachBar />
            </div>
            <NavbarMenu mobile />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
