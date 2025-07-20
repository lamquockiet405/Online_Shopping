"use client"

import { useState } from "react"
import "../styles/NavbarMenu.css"
import { Link } from "react-router-dom"

const menuItems = [
  {
    name: "Trang Chủ",
    href: "/",
    hasDropdown: false,
  },
  {
    name: "Nữ",
    href: "/women",
    hasDropdown: true,
    dropdownItems: [
      { name: "Váy", href: "/women/dresses" },
      { name: "Áo", href: "/women/tops" },
      { name: "Quần", href: "/women/bottoms" },
      { name: "Giày", href: "/women/shoes" },
    ],
  },
  {
    name: "Nam",
    href: "/men",
    hasDropdown: true,
    dropdownItems: [
      { name: "Áo sơ mi", href: "/men/shirts" },
      { name: "Quần", href: "/men/pants" },
      { name: "Áo khoác", href: "/men/jackets" },
      { name: "Giày", href: "/men/shoes" },
    ],
  },
  {
    name: "Trẻ Em",
    href: "/kids",
    hasDropdown: false,
  },
  {
    name: "Sale",
    href: "/sale",
    hasDropdown: false,
  },
]

const NavbarMenu = ({ mobile = false }) => {
  const [activeDropdown, setActiveDropdown] = useState(null)

  const handleMouseEnter = (itemName) => {
    if (!mobile) {
      setActiveDropdown(itemName)
    }
  }

  const handleMouseLeave = () => {
    if (!mobile) {
      setActiveDropdown(null)
    }
  }

  const toggleDropdown = (itemName) => {
    if (mobile) {
      setActiveDropdown(activeDropdown === itemName ? null : itemName)
    }
  }

  if (mobile) {
    return (
      <nav className="mobile-nav">
        {menuItems.map((item) => (
          <div key={item.name} className="mobile-nav-item">
            <div className="mobile-nav-header">
              <Link to={item.href} className="mobile-nav-link">
                {item.name}
              </Link>
              {item.hasDropdown && (
                <button onClick={() => toggleDropdown(item.name)} className="mobile-dropdown-toggle">
                  {activeDropdown === item.name ? "▲" : "▼"}
                </button>
              )}
            </div>
            {item.hasDropdown && activeDropdown === item.name && (
              <div className="mobile-dropdown">
                {item.dropdownItems?.map((dropdownItem) => (
                  <Link key={dropdownItem.name} to={dropdownItem.href} className="mobile-dropdown-link">
                    {dropdownItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    )
  }

  return (
    <nav className="desktop-nav">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className="nav-item"
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={item.href} className="nav-link">
            {item.name}
            {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
          </Link>

          {item.hasDropdown && activeDropdown === item.name && (
            <div className="dropdown-menu">
              {item.dropdownItems?.map((dropdownItem) => (
                <Link key={dropdownItem.name} to={dropdownItem.href} className="dropdown-link">
                  {dropdownItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

export default NavbarMenu
