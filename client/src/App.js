import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/AddCategory";
import CreateProduct from "./pages/Admin/AddProduct";
import Products from "./pages/Admin/Products";
import CartPage from "./pages/User/cartpage";
import UpdateProduct from "./pages/Admin/UpdateProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/carts" element={<CartPage/>}/>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/add-category' element={<CreateCategory/>}/>
          <Route path='admin/add-product' element={<CreateProduct/>}/>
          <Route path='admin/products' element={<Products/>}/>
          <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
