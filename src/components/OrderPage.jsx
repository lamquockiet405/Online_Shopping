"use client"

import { useState } from "react"
import "../styles/OrderPage.css"
import { Link, useLocation } from "react-router-dom";

const OrderPage = ({ orderData, onBack, onOrderComplete }) => {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Họ tên là bắt buộc"
    }
    if (!customerInfo.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Email không hợp lệ"
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc"
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }
    if (!customerInfo.address.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc"
    }
    if (!customerInfo.city.trim()) {
      newErrors.city = "Thành phố là bắt buộc"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Đơn hàng:", {
        orderData,
        customerInfo,
        paymentMethod,
      })
      setIsProcessing(false)
      onOrderComplete()
    }, 2000)
  }

  const calculateTotal = () => {
    if (orderData?.items) {
      // From cart checkout
      return orderData.total
    } else if (orderData?.product) {
      // From buy now
      const shipping = 50000
      const tax = orderData.totalPrice * 0.1
      return orderData.totalPrice + shipping + tax
    }
    return 0
  }

  const renderOrderItems = () => {
    if (orderData?.items) {
      // From cart checkout
      return orderData.items.map((item) => (
        <div key={item.id} className="order-item">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />
          <div className="item-details">
            <h4>{item.name}</h4>
            <p>
              Size: {item.size} • Màu: {item.color}
            </p>
            <p>Số lượng: {item.quantity}</p>
          </div>
          <div className="item-price">{formatPrice(item.price * item.quantity)}</div>
        </div>
      ))
    } else if (orderData?.product) {
      // From buy now
      return (
        <div className="order-item">
          <img
            src={orderData.product.image || "/placeholder.svg"}
            alt={orderData.product.name}
            className="item-image"
          />
          <div className="item-details">
            <h4>{orderData.product.name}</h4>
            <p>
              Size: {orderData.selectedSize} • Màu: {orderData.selectedColor}
            </p>
            <p>Số lượng: {orderData.quantity}</p>
          </div>
          <div className="item-price">{formatPrice(orderData.totalPrice)}</div>
        </div>
      )
    }
    return null
  }

  if (!orderData) {
    return <div>Không có thông tin đơn hàng</div>
  }

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="order-header">
          <button onClick={onBack} className="back-btn">
            ← Quay lại
          </button>
          <h1>Đặt Hàng</h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="order-form">
          <div className="order-content">
            {/* Customer Information */}
            <div className="customer-info-section">
              <h2>Thông Tin Khách Hàng</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? "error" : ""}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "error" : ""}
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className={errors.email ? "error" : ""}
                    placeholder="Nhập địa chỉ email"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              <h3>Địa Chỉ Giao Hàng</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="city">Thành phố *</label>
                  <select
                    id="city"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    className={errors.city ? "error" : ""}
                  >
                    <option value="">Chọn thành phố</option>
                    <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                    <option value="ha-noi">Hà Nội</option>
                    <option value="da-nang">Đà Nẵng</option>
                    <option value="can-tho">Cần Thơ</option>
                  </select>
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="district">Quận/Huyện</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={customerInfo.district}
                    onChange={handleInputChange}
                    placeholder="Nhập quận/huyện"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ward">Phường/Xã</label>
                  <input
                    type="text"
                    id="ward"
                    name="ward"
                    value={customerInfo.ward}
                    onChange={handleInputChange}
                    placeholder="Nhập phường/xã"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Địa chỉ cụ thể *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className={errors.address ? "error" : ""}
                    placeholder="Số nhà, tên đường..."
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="note">Ghi chú đơn hàng</label>
                  <textarea
                    id="note"
                    name="note"
                    value={customerInfo.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                    rows={3}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <h3>Phương Thức Thanh Toán</h3>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <strong>💵 Thanh toán khi nhận hàng (COD)</strong>
                    <p>Thanh toán bằng tiền mặt khi nhận được hàng</p>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <strong>🏦 Chuyển khoản ngân hàng</strong>
                    <p>Chuyển khoản trước khi giao hàng</p>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <strong>📱 Ví MoMo</strong>
                    <p>Thanh toán qua ví điện tử MoMo</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-section">
              <div className="order-summary">
                <h2>Đơn Hàng Của Bạn</h2>

                <div className="order-items">{renderOrderItems()}</div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Tạm tính</span>
                    <span>
                      {orderData?.items ? formatPrice(orderData.subtotal) : formatPrice(orderData?.totalPrice || 0)}
                    </span>
                  </div>
                  <div className="total-row">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(50000)}</span>
                  </div>
                  <div className="total-row">
                    <span>Thuế</span>
                    <span>
                      {orderData?.items ? formatPrice(orderData.tax) : formatPrice((orderData?.totalPrice || 0) * 0.1)}
                    </span>
                  </div>
                  <div className="total-row final-total">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                <button type="submit" disabled={isProcessing} className="place-order-btn">
                  {isProcessing ? "Đang xử lý..." : "Đặt Hàng"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderPage
