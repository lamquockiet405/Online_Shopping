"use client"

import { useState } from "react"
import "../styles/ProductDetail.css"
import { useNavigate } from "react-router-dom"

const ProductDetail = ({ product, onBack, onAddToCart, onBuyNow }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("Đen")
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = [
    { name: "Đen", value: "#000000" },
    { name: "Trắng", value: "#FFFFFF" },
    { name: "Xanh dương", value: "#3B82F6" },
    { name: "Đỏ", value: "#EF4444" },
  ]

  // Mock multiple images for gallery
  const productImages = [
    product?.image || "/placeholder.svg",
    "/placeholder.svg?height=500&width=500&text=Image2",
    "/placeholder.svg?height=500&width=500&text=Image3",
    "/placeholder.svg?height=500&width=500&text=Image4",
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    }
    onAddToCart(productWithOptions)
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`)
    navigate("/")
  }

  const handleBuyNow = () => {
    if (typeof onBuyNow === "function") {
      const orderInfo = {
        selectedSize,
        selectedColor,
        quantity,
        totalPrice: product.price * quantity,
      }
      onBuyNow(product, orderInfo)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-header">
          <button onClick={onBack} className="back-btn">
            ← Quay lại
          </button>
        </div>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={productImages[activeImageIndex] || "/placeholder.svg"} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`thumbnail ${index === activeImageIndex ? "active" : ""}`}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1>{product.name}</h1>
              {product.rating && (
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < product.rating ? "star filled" : "star"}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">({product.rating}) • 127 đánh giá</span>
                </div>
              )}
            </div>

            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="discount">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <div className="product-description">
              <h3>Mô tả sản phẩm</h3>
              <p>
                Sản phẩm chất lượng cao được làm từ chất liệu tốt nhất. Thiết kế hiện đại, phù hợp với xu hướng thời
                trang hiện tại. Dễ dàng phối đồ và sử dụng trong nhiều dịp khác nhau.
              </p>
              <ul>
                <li>Chất liệu cao cấp, bền đẹp</li>
                <li>Thiết kế thời trang, hiện đại</li>
                <li>Dễ dàng bảo quản và giặt ủi</li>
                <li>Phù hợp với nhiều dịp khác nhau</li>
              </ul>
            </div>

            {/* Size Selection */}
            <div className="product-options">
              <div className="option-group">
                <h4>Kích thước:</h4>
                <div className="size-options">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="option-group">
                <h4>Màu sắc: {selectedColor}</h4>
                <div className="color-options">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`color-btn ${selectedColor === color.name ? "selected" : ""}`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="option-group">
                <h4>Số lượng:</h4>
                <div className="quantity-selector">
                  <button onClick={() => handleQuantityChange(quantity - 1)} className="quantity-btn">
                    −
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button onClick={() => handleQuantityChange(quantity + 1)} className="quantity-btn">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button onClick={handleAddToCart} className="add-to-cart-btn">
                🛒 Thêm vào giỏ hàng
              </button>
              {typeof onBuyNow === "function" && (
                <button onClick={handleBuyNow} className="buy-now-btn">
                  Mua ngay
                </button>
              )}
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <div className="info-item">
                <span className="info-icon">🚚</span>
                <div>
                  <strong>Miễn phí vận chuyển</strong>
                  <p>Cho đơn hàng từ 500.000đ</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">↩️</span>
                <div>
                  <strong>Đổi trả dễ dàng</strong>
                  <p>Trong vòng 30 ngày</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🛡️</span>
                <div>
                  <strong>Bảo hành chất lượng</strong>
                  <p>Cam kết chính hãng 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
