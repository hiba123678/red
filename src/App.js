import React,{ useState, useEffect} from 'react';
import Cart from '../src/Cart/Cart.jsx';
import { Products, Navbar} from './components';
import { commerce } from './lib/commerce';
import { createTheme } from '@mui/material/styles';
import Checkout from './components/CheckoutForm/Checkout/Checkout.jsx';
import Home from './components/WebSite/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as mdb from 'mdb-ui-kit'; 
// using router dom in reactjs
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  // get data from backend
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

const fetchCart  = async () => {
  const cart = await commerce.cart.retrieve();
  setCart(cart);
};


// all fetcher that execute in data add update delet
const handelAddToCart = async (productId,quantity) => {
  const { cart } =await commerce.cart.add(productId,quantity);
  setCart(cart);
}


const handelUpdateCartQty =async ( productId,quantity ) =>{
  const { cart } = await commerce.cart.update( productId , { quantity });
  setCart(cart);
}

const handelRemoveCart =async (productId) => {
const { cart } = await commerce.cart.remove(productId);
setCart(cart);

}

const handelEmptyCart = async () => {
  const { cart }= await commerce.cart.empty();
  setCart(cart);
} 

const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();

  setCart(newCart);
};

const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

    setOrder(incomingOrder);

    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.message);
  }
};


//execute fetch data befor render app
useEffect(() => {
  fetchProducts();
fetchCart();

}, []);

  return (
    <Router>
    
    <div>
<Navbar totalItems={cart.total_items}/><br/><br/><br/>

<Routes>
  <Route exact path='/' element={<Products products={products} onAddToCart={handelAddToCart}/>}></Route>
  <Route exact path='/cart' element={
  
  
  
  <Cart cart={ cart }
  handelUpdateCartQty={handelUpdateCartQty} 
  handelRemoveCart={handelRemoveCart}
  handelEmptyCart={handelEmptyCart}
  />
  }></Route>
  
<Route exact path="/checkout"  element={ <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}
  ></Route>

  </Routes>
</div>
</Router>
  )
}

export default App;
