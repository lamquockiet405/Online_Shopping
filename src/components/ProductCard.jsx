"use client"

import { useState } from "react"
import "../styles/ProductCard.css"

const ProductCard = ({ product, onAddToCart, onViewDetail }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product)
    alert(`Đã thêm ${product.name} vào giỏ hàng!`)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  // Thêm hàm handleViewDetail
  const handleViewDetail = () => {
    onViewDetail(product)
  }

  // Cập nhật JSX để thêm click handler cho card
  return (
    <div className="product-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onViewDetail} style={{cursor: 'pointer'}}>
      <div className="product-image-container">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleLike()
          }}
          className={`wishlist-btn ${isLiked ? "liked" : ""}`}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

        {/* Sale Badge */}
        {product.originalPrice && <div className="sale-badge">Sale</div>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {/* Rating */}
        {product.rating && (
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < product.rating ? "star filled" : "star"}>
                  ⭐
                </span>
              ))}
            </div>
            <span className="rating-text">({product.rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="original-price">{formatPrice(product.originalPrice)}</span>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
