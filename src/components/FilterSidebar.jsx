"use client"

import { useState, useEffect } from "react"
import "../styles/FilterSidebar.css"

const categories = ["Tất cả", "Áo thun", "Váy", "Áo khoác", "Giày", "Phụ kiện", "Áo len"]

const colors = [
  { name: "Đen", value: "#000000" },
  { name: "Trắng", value: "#FFFFFF" },
  { name: "Đỏ", value: "#EF4444" },
  { name: "Xanh dương", value: "#3B82F6" },
  { name: "Xanh lá", value: "#10B981" },
  { name: "Hồng", value: "#EC4899" },
]

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

const FilterSidebar = ({ products, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
  })

  useEffect(() => {
    filterProducts()
  }, [selectedCategory, selectedColors, selectedSizes, priceRange])

  const filterProducts = () => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "Tất cả") {
      const categoryMap = {
        "Áo thun": "shirts",
        Váy: "dresses",
        "Áo khoác": "jackets",
        Giày: "shoes",
        "Phụ kiện": "accessories",
        "Áo len": "sweaters",
      }
      filtered = filtered.filter((product) => product.category === categoryMap[selectedCategory])
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    onFilterChange(filtered)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleColorChange = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const clearFilters = () => {
    setSelectedCategory("Tất cả")
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 2000000])
  }

  return (
    <div className="filter-sidebar">
      <h3>Bộ Lọc</h3>

      {/* Category Filter */}
      <div className="filter-section">
        <button onClick={() => toggleSection("category")} className="filter-header">
          Danh Mục
          <span>{expandedSections.category ? "▲" : "▼"}</span>
        </button>
        {expandedSections.category && (
          <div className="filter-content">
            {categories.map((category) => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <button onClick={() => toggleSection("price")} className="filter-header">
          Khoảng Giá
          <span>{expandedSections.price ? "▲" : "▼"}</span>
        </button>
        {expandedSections.price && (
          <div className="filter-content">
            <div className="price-inputs">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                placeholder="Tối thiểu"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                placeholder="Tối đa"
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
              className="price-range"
            />
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="filter-section">
        <button onClick={() => toggleSection("color")} className="filter-header">
          Màu Sắc
          <span>{expandedSections.color ? "▲" : "▼"}</span>
        </button>
        {expandedSections.color && (
          <div className="filter-content">
            <div className="color-grid">
              {colors.map((color) => (
                <label key={color.name} className="color-option">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color.name)}
                    onChange={() => handleColorChange(color.name)}
                  />
                  <div
                    className={`color-swatch ${selectedColors.includes(color.name) ? "selected" : ""}`}
                    style={{ backgroundColor: color.value }}
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="filter-section">
        <button onClick={() => toggleSection("size")} className="filter-header">
          Kích Thước
          <span>{expandedSections.size ? "▲" : "▼"}</span>
        </button>
        {expandedSections.size && (
          <div className="filter-content">
            <div className="size-grid">
              {sizes.map((size) => (
                <label key={size} className="size-option">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  <div className={`size-box ${selectedSizes.includes(size) ? "selected" : ""}`}>{size}</div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <button className="clear-filters" onClick={clearFilters}>
        Xóa Tất Cả Bộ Lọc
      </button>
    </div>
  )
}

export default FilterSidebar
