import React, {Fragment } from 'react';
import  Container from '@mui/material/Container';
import  Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import  Grid  from '@mui/material/Grid';
import CartItem from './CartItem/CartItem.jsx';
import './style.css';
function Cart({ cart, handelUpdateCartQty, handelRemoveCart, handelEmptyCart }) {

  const EmptyCart = () => (
    <Typography variant="subtitle1" gutterBottom>
      You have no items in your shopping cart, 
      <Link className='link'>start adding some!</Link>
    </Typography>
  );
    

    const FilledCart = () => (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} handelUpdateCartQty={handelUpdateCartQty} handelRemoveCart={handelRemoveCart}/>
            </Grid>
          ))}
        </Grid>

        <div  className='cardDetails'>
          <Typography variant="h6" className='fw-bold'>
            Subtotal: {cart.subtotal?.formatted_with_symbol}
          </Typography>

          <div>
            <Button
             className='emptyButton'
             size="medium"
              type="button"
              variant="contained"
            
              style={{backgroundColor:'#ab92af'}}
              onClick={handelEmptyCart}
            >
              Empty cart
            </Button>
            <Button
            className='checkoutButton ms-3'
            size="medium"
              type="button"
              variant="contained"
              style={{backgroundColor:'#f5c774'}}
           
            LinkComponent={Link}
            to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
        <div style={{height:'10vh'}}>

        </div>
      </>
    );











   if (!cart.line_items) return "Loading";
console.log(cart.line_items.length);
  return (
    <Container>
    <div  />
    <Typography  variant="h3" gutterBottom className='title'>
      Your shopping Cart
    </Typography>
    {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}

  </Container>
  )
}

export default Cart;
