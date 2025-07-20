import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3>FashionShop</h3>
            <p>
              Điểm đến hàng đầu cho thời trang trendy và giá cả phải chăng. Khám phá những phong cách mới nhất và thể
              hiện cá tính độc đáo của bạn.
            </p>
            <div className="social-links">
              <span>📘</span>
              <span>🐦</span>
              <span>📷</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Liên Kết Nhanh</h4>
            <ul>
              <li>
                <a href="#about">Về Chúng Tôi</a>
              </li>
              <li>
                <a href="#contact">Liên Hệ</a>
              </li>
              <li>
                <a href="#size-guide">Hướng Dẫn Size</a>
              </li>
              <li>
                <a href="#shipping">Thông Tin Vận Chuyển</a>
              </li>
              <li>
                <a href="#returns">Đổi Trả</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4>Danh Mục</h4>
            <ul>
              <li>
                <a href="#women">Nữ</a>
              </li>
              <li>
                <a href="#men">Nam</a>
              </li>
              <li>
                <a href="#kids">Trẻ Em</a>
              </li>
              <li>
                <a href="#accessories">Phụ Kiện</a>
              </li>
              <li>
                <a href="#sale">Sale</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Liên Hệ</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span>📍</span>
                <span>123 Đường Thời Trang, TP.HCM</span>
              </div>
              <div className="contact-item">
                <span>📞</span>
                <span>+84 (028) 123-4567</span>
              </div>
              <div className="contact-item">
                <span>✉️</span>
                <span>info@fashionshop.vn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 FashionShop. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
