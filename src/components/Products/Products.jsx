// build for Layout our products
import React from 'react'
import Grid from '@mui/material/Grid';
import Product from './Product/Product.jsx';


function Products({ products, onAddToCart }) {

  return (
    <main>
        <Grid container justifyContent="center" spacing={4}>
          {products.map((product)=>
           <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}/>
            </Grid>

          )}


        </Grid>
    </main>
  )
}

export default Products;
