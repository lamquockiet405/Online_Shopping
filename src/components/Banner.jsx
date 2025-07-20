"use client"

import { useState, useEffect } from "react"
import "../styles/Banner.css"

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    title: "Bộ Sưu Tập Hè 2025",
    subtitle: "Khám phá xu hướng thời trang mới nhất",
    cta: "Mua Ngay",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    title: "Giảm Giá Lên Đến 50%",
    subtitle: "Ưu đãi có thời hạn",
    cta: "Nhận Ưu Đãi",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    title: "Hàng Mới Về",
    subtitle: "Phong cách mới vừa ra mắt",
    cta: "Khám Phá",
  },
]

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="banner">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`banner-slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="banner-overlay" />
          <div className="banner-content">
            <h2>{banner.title}</h2>
            <p>{banner.subtitle}</p>
            <button className="banner-cta">{banner.cta}</button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button className="banner-nav prev" onClick={prevSlide}>
        ‹
      </button>
      <button className="banner-nav next" onClick={nextSlide}>
        ›
      </button>

      {/* Dots Indicator */}
      <div className="banner-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`banner-dot ${index === currentSlide ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner
