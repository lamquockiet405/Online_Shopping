"use client"

import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Banner from "./components/Banner"
import ProductCard from "./components/ProductCard"
import FilterSidebar from "./components/FilterSidebar"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import CartPage from "./components/CartPage"
import "./App.css"

// Thêm import cho các component mới
import ProductDetail from "./components/ProductDetail"
import OrderPage from "./components/OrderPage"
import { Routes, Route, useNavigate, useParams } from "react-router-dom"

const products = [
  {
    id: 1,
    name: "Áo Thun Cotton Cao Cấp",
    price: 299000,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    category: "shirts",
    rating: 4.5,
    originalPrice: 399000,
  },
  {
    id: 2,
    name: "Áo Khoác Denim",
    price: 899000,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    category: "jackets",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Váy Hè Thanh Lịch",
    price: 599000,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    category: "dresses",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Giày Sneaker Thời Trang",
    price: 799000,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "shoes",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Túi Xách Da Thật",
    price: 1299000,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    category: "accessories",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Áo Len Mùa Đông",
    price: 699000,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    category: "sweaters",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Áo Thun Trẻ Em Dễ Thương",
    price: 199000,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "kids",
    rating: 4.7,
    originalPrice: 249000,
  },
]

function CategoryPage({ products, addToCart }) {
  const { category } = useParams();
  const categoryMap = {
    dresses: "dresses",
    tops: "shirts",
    bottoms: "pants",
    shoes: "shoes",
  };
  const filtered = products.filter(p => p.category === categoryMap[category]);
  return (
    <div className="container">
      <div className="main-content">
        <main className="products-section">
          <h2>Sản phẩm {category}</h2>
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function ProductDetailPage({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find(p => String(p.id) === id);
  if (!product) return <div style={{padding: 40}}>Không tìm thấy sản phẩm!</div>;
  return <ProductDetail product={product} onAddToCart={addToCart} />;
}

function WomenPage({ products, addToCart }) {
  // Giả sử các category này là của nữ
  const womenCategories = ["dresses", "shirts", "bottoms", "shoes"];
  const filtered = products.filter(p => womenCategories.includes(p.category));
  return (
    <div className="container">
      <div className="main-content">
        <main className="products-section">
          <h2>Sản phẩm Nữ</h2>
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function MenPage({ products, addToCart }) {
  // Giả sử các category này là của nam
  const menCategories = ["shirts", "jackets", "pants", "shoes"];
  const filtered = products.filter(p => menCategories.includes(p.category));
  return (
    <div className="container">
      <div className="main-content">
        <main className="products-section">
          <h2>Sản phẩm Nam</h2>
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function KidsPage({ products, addToCart }) {
  // Giả sử category 'kids' là cho trẻ em
  const filtered = products.filter(p => p.category === "kids");
  return (
    <div className="container">
      <div className="main-content">
        <main className="products-section">
          <h2>Sản phẩm Trẻ Em</h2>
          <div className="products-grid">
            {filtered.length === 0 ? <p>Chưa có sản phẩm trẻ em.</p> : filtered.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function SalePage({ products, addToCart }) {
  // Sản phẩm sale là có originalPrice lớn hơn price
  const filtered = products.filter(p => p.originalPrice && p.originalPrice > p.price);
  return (
    <div className="container">
      <div className="main-content">
        <main className="products-section">
          <h2>Sản phẩm Sale</h2>
          <div className="products-grid">
            {filtered.length === 0 ? <p>Chưa có sản phẩm sale.</p> : filtered.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [cartItems, setCartItems] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Thêm state cho selectedProduct và orderData
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [orderData, setOrderData] = useState(null)

  const navigate = useNavigate();

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1, size: "M", color: "Đen" }]
    })
  }

  const updateCartQuantity = (id, quantity) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Cập nhật hàm renderPage để thêm các trang mới
  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginForm onBack={() => setCurrentPage("home")} />
      case "register":
        return <RegisterForm onBack={() => setCurrentPage("home")} />
      case "cart":
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onBack={() => setCurrentPage("home")}
            onCheckout={(data) => {
              setOrderData(data)
              setCurrentPage("order")
            }}
          />
        )
      case "product-detail":
        return (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentPage("home")}
            onAddToCart={addToCart}
            onBuyNow={(product, orderInfo) => {
              setOrderData({ product, ...orderInfo })
              setCurrentPage("order")
            }}
          />
        )
      case "order":
        return (
          <OrderPage
            orderData={orderData}
            onBack={() => setCurrentPage(orderData?.product ? "product-detail" : "cart")}
            onOrderComplete={() => {
              alert("Đặt hàng thành công!")
              setCurrentPage("home")
              setOrderData(null)
            }}
          />
        )
      default:
        return (
          <>
            <Banner />
            <div className="container">
              <div className="main-content">
                <aside className="sidebar">
                  <FilterSidebar products={products} onFilterChange={setFilteredProducts} />
                </aside>
                <main className="products-section">
                  <h2>Sản Phẩm Nổi Bật</h2>
                  <div className="products-grid">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        onViewDetail={(product) => {
                          setSelectedProduct(product)
                          setCurrentPage("product-detail")
                        }}
                      />
                    ))}
                  </div>
                </main>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="App">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} navigate={navigate} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <div className="container">
                <div className="main-content">
                  <aside className="sidebar">
                    <FilterSidebar products={products} onFilterChange={setFilteredProducts} />
                  </aside>
                  <main className="products-section">
                    <h2>Sản Phẩm Nổi Bật</h2>
                    <div className="products-grid">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={addToCart}
                          onViewDetail={() => navigate(`/product/${product.id}`)}
                        />
                      ))}
                    </div>
                  </main>
                </div>
              </div>
            </>
          }
        />
        <Route path="/women" element={<WomenPage products={products} addToCart={addToCart} />} />
        <Route path="/men" element={<MenPage products={products} addToCart={addToCart} />} />
        <Route path="/kids" element={<KidsPage products={products} addToCart={addToCart} />} />
        <Route path="/sale" element={<SalePage products={products} addToCart={addToCart} />} />
        <Route path="/login" element={<LoginForm onBack={() => navigate("/")} />} />
        <Route path="/register" element={<RegisterForm onBack={() => navigate("/")} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemove={removeFromCart}
              onBack={() => navigate("/")}
            />
          }
        />
        <Route path="/women/:category" element={<CategoryPage products={products} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetailPage products={products} addToCart={addToCart} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
