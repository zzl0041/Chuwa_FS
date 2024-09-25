import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import ChangePassword from "./components/Auth/ChangePassword";
import CreateProduct from "./components/Product/CreateProduct";
import ErrorPage from "./components/Error/ErrorPage";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Cart/Cart";
import Default from "./Default";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Default />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          {/* <Route path="/products/" element={<ProductList />} />
          <Route path="/checkout" element={<Checkout />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<ErrorPage />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
