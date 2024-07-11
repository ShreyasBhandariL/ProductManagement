import "./App.css";
import Nav from "./nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./footer";
import Signup from "./signup";
import PrivateComponent from "./PrivateComponent";
import Login from "./login";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import UpdateProduct from "./updateProduct";
import BuyedProductList from "./BuyedProductList";
function App() {
  return (
    <div className="1">
      <header className="A">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/products" element={<ProductList />}></Route>
              <Route path="/AddProduct" element={<AddProduct />}></Route>
              <Route path="/update/:id" element={<UpdateProduct />}></Route>
              <Route path="/CustomerList" element={<BuyedProductList />}></Route>
              <Route path="/ContactUs" element={<h1>Contact Us</h1>}></Route>
              <Route path="/Stories" element={<h1>Stories</h1>}></Route>
            </Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </header>
    </div>
  );
}

export default App;
