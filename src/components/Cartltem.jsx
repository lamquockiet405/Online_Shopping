"use client"

import { useState } from "react"
import "../styles/CartItem.css"

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    onUpdateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    onRemove(item.id)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <div className="cart-item">
      {/* Product Image */}
      <div className="cart-item-image">
        <img src={item.image || "/placeholder.svg"} alt={item.name} />
      </div>

      {/* Product Details */}
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <div className="item-attributes">
          <p>Size: {item.size}</p>
          <p>Màu: {item.color}</p>
        </div>
        <p className="item-price">{formatPrice(item.price)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="quantity-controls">
        <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1} className="quantity-btn">
          −
        </button>
        <span className="quantity-display">{quantity}</span>
        <button onClick={() => handleQuantityChange(quantity + 1)} className="quantity-btn">
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="item-total">{formatPrice(item.price * quantity)}</div>

      {/* Remove Button */}
      <button onClick={handleRemove} className="remove-btn" title="Xóa sản phẩm">
        🗑️
      </button>
    </div>
  )
}

export default CartItem
