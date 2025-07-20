"use client"

import { useState } from "react"
import "../styles/RegisterForm.css"
import { Link, useNavigate } from "react-router-dom"

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Họ là bắt buộc"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Tên là bắt buộc"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Đăng ký:", formData)
      alert("Đăng ký thành công!")
      setIsLoading(false)
      navigate("/")
    }, 1000)
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="form-header">
          <button onClick={() => navigate("/")} className="back-btn">
            ← Quay lại
          </button>
          <h2>Tạo Tài Khoản</h2>
          <p>Tham gia cùng chúng tôi ngay hôm nay</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="name-fields">
            <div className="form-group">
              <label htmlFor="firstName">Họ</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                  placeholder="Họ"
                />
              </div>
              {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Tên</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                  placeholder="Tên"
                />
              </div>
              {errors.lastName && <p className="error-text">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Địa chỉ Email</label>
            <div className="input-container">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="Nhập email của bạn"
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại (Tùy chọn)</label>
            <div className="input-container">
              <span className="input-icon">📞</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Tạo mật khẩu"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
                placeholder="Xác nhận mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>

          {/* Terms and Conditions */}
          <div className="terms-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              Tôi đồng ý với <a href="#terms">Điều khoản và Điều kiện</a> và <a href="#privacy">Chính sách Bảo mật</a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản"}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="signin-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
