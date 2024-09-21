import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import ChangePassword from "./components/Auth/ChangePassword";
import ChangedPassword from "./components/Auth/ChangedPassword";
import Product from "./components/Product/CreateProduct";
import CreateProduct from "./components/Product/CreateProduct";
import ProductList from "./components/Product/ProductList";
import ErrorPage from "./components/ErrorPage";
import ProductDetail from "./components/Product/ProductDetail";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Default />} />
          {/* 
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<ErrorPage />} />
           */}

          <Route path="/" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
