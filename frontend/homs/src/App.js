import './App.css';
import Header from './Components/Layout/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './Components/Layout/HomePage';
import Footer from './Components/Layout/Footer';
import AllProducts from './Components/Layout/AllProducts';
import ProductDetail from './Components/Layout/ProductDetail';
import ProductsPage from './Components/Layout/ProductsPage/ProductsPage';
import Login from './Components/userLayout/Login';
import Register from './Components/userLayout/Register';
import UserAccount from './Components/userLayout/UserAccount';
import UserOrders from './Components/orderLayout/UserOrders';
import OrderDetail from './Components/orderLayout/OrderDetail';
import Dashboard from './Dashboard/Dashboard';

function App() {

  return (
    <div className="App">
      <Router>

      <Header/>

        <Routes>
          <Route path="/" element={<HomePage/>}/>  
        </Routes>

        <Routes>
          <Route path="/" element={<AllProducts/>}/> 
        </Routes>

        <Routes>
            <Route path="/products/detail/:_id" element={<ProductDetail/>}/>
        </Routes>

        <Routes>
            <Route path="/products" element={<ProductsPage/>}/>
        </Routes>

        <Routes>
            <Route path="/products/:keyword" element={<ProductsPage/>}/>
        </Routes>

        <Routes>
            <Route path="/user/login" element={<Login/>}/>
        </Routes>

        <Routes>
            <Route path="/user/new" element={<Register/>}/>
        </Routes>

        <Routes>
            <Route path="/users/:_id" element={<UserAccount/>}/>
        </Routes>

        <Routes>
            <Route path="/orders/user/myorders/:_id" element={<UserOrders/>}/>
        </Routes>

        <Routes>
            <Route path="/orders/:_id" element={<OrderDetail/>}/>
        </Routes>

        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>

        <Footer/>

      </Router>
    </div>
  );
}

export default App;
