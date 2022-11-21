import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AddShoppingCart } from '@mui/icons-material';

function Product({ product, onAddToCart}) {
  
  return (
    <Card  sx={{
      maxwidth: '100%',
   
    }}>
      {/* <CardMedia  component="img"
        height="100%" image={product.image.url} title={product.name}
    width='100%'
      
      /> */}
       <img
          component="img"
         style={{ height:"200px",
         width:"100%"}}
         src={product.image.url}
          alt="green iguana"
          className=' '
        />

       <CardContent >
        <div sx={{display: 'flex',
    justifyContent: 'space-between'}}>
            <Typography variant='h6' gutterBottom >
                {product.name}
            </Typography>
            <Typography variant='body' className='fw-bold text-uppercase' style={{color:'#ab92af'}} gutterBottom>
                {product.price.formatted_with_symbol}
            </Typography>
            
        </div >
        <Typography  dangerouslySetInnerHTML={{ __html: product.description }} variant='body1' color="textSecondary" />
     
       </CardContent>

     <CardActions disableSpacing sx={{ display: 'flex',
                                      justifyContent: 'flex-end'}} >
      <IconButton aria-label='Add to Cart' onClick={()=> onAddToCart(product.id,1)}>
        <AddShoppingCart  sx={{ color:'#ab92af' }} />
      </IconButton>
     </CardActions>
      

    </Card>
  )
}

export default Product;
