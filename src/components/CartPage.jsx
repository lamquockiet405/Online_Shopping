"use client"
import CartItem from "./Cartltem"
import "../styles/CartPage.css"
import { useNavigate } from "react-router-dom"

const CartPage = ({ cartItems, onUpdateQuantity, onRemove, onBack, onCheckout }) => {
  const navigate = useNavigate();
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50000
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    const checkoutData = {
      items: cartItems,
      subtotal,
      shipping,
      tax,
      total,
    }
    if (typeof onCheckout === "function") {
      onCheckout(checkoutData)
    }
    navigate("/")
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <button onClick={onBack} className="back-btn">
            ← Quay lại
          </button>
          <h1>Giỏ Hàng</h1>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <p>Giỏ hàng của bạn đang trống</p>
                  <button className="continue-shopping" onClick={onBack}>
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="order-summary-section">
              <div className="order-summary">
                <h2>Tóm Tắt Đơn Hàng</h2>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Thuế</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                  Tiến Hành Thanh Toán
                </button>

                <button className="continue-shopping-btn" onClick={onBack}>
                  Tiếp Tục Mua Sắm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage
