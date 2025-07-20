"use client"

import { useState } from "react"
import "../styles/SearchBar.css"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("Tìm kiếm:", searchQuery)
      // Implement search logic here
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className={`search-container ${isFocused ? "focused" : ""}`}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-input"
        />
        {searchQuery && (
          <button type="button" onClick={clearSearch} className="clear-btn">
            ✕
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {isFocused && searchQuery && (
        <div className="search-suggestions">
          <div className="suggestions-header">Tìm kiếm phổ biến</div>
          <button type="button" className="suggestion-item">
            Váy hè
          </button>
          <button type="button" className="suggestion-item">
            Giày thể thao
          </button>
          <button type="button" className="suggestion-item">
            Áo khoác denim
          </button>
        </div>
      )}
    </form>
  )
}

export default SearchBar
