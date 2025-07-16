"use client"

import { useState } from "react"
import "../styles/LoginForm.css"
import { Link, useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Đăng nhập:", formData)
      alert("Đăng nhập thành công!")
      setIsLoading(false)
      navigate("/")
    }, 1000)
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-header">
          <button onClick={() => navigate("/")} className="back-btn">
            ← Quay lại
          </button>
          <h2>Chào Mừng Trở Lại</h2>
          <p>Đăng nhập vào tài khoản của bạn</p>
        </div>

        <form onSubmit={handleSubmit}>
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
                required
                placeholder="Nhập email của bạn"
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
                required
                placeholder="Nhập mật khẩu"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#forgot" className="forgot-link">
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
        </form>

        {/* Social Login */}
        <div className="social-login">
          <div className="divider">
            <span>Hoặc tiếp tục với</span>
          </div>
          <div className="social-buttons">
            <button className="social-btn">Google</button>
            <button className="social-btn">Facebook</button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="signup-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
