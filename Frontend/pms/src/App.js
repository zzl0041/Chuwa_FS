import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import ChangePassword from "./components/Auth/ChangePassword";
import CreateProduct from "./components/Product/CreateProduct";
import ErrorPage from "./components/Error/ErrorPage";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Cart/Cart";
import Default from "./Default";
import ProductList from "./components/Product/ProductList";
import Checkout from "./components/Checkout/Checkout"; // Uncomment if checkout component exists

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

// Protected Route component
const ProtectedRoute = ({ element }) => {
  if (isAuthenticated()) {
    return element;
  } else {
    alert("You need to sign in to access this page.");
    return <Navigate to="/signin" />;
  }
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Default />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/" element={<ProductList />} />

          {/* Protected Routes */}
          <Route path="/create-product" element={<ProtectedRoute element={<CreateProduct />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          {/* Uncomment below if checkout page exists */}
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
