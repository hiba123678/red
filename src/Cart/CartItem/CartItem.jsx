import React from 'react'
import './style.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
function CartItem({ item,handelRemoveCart,handelUpdateCartQty }) {
  console.log(item);
  return (


  //   <img
  //   component="img"
  //  style={{ height:"200px",
  //  width:"100%"}}
  //  src={product.image.url}
  //   alt="green iguana"
  //   className=' '
  // />

   <Card>
     {/* <CardMedia   component="img" image={item.image.url} alt={item.name} className="media"/> */}
     <img
          component="img"
         style={{ height:"200px",
         width:"100%"}}
         src={item.image.url}
          alt={item.name}
          className="media"
        />

     <CardContent className='cardContent'>
      <Typography variant='h7 ' className='fw-bold'>{item.name}</Typography>
      <Typography variant='h7' className='fw-bold'>{item.line_total.formatted_with_symbol}</Typography>
     </CardContent>

     <CardActions  className='cartActions'>
     <div className='button'>
       <Button type="button" color="secondary" size="medium" onClick={ () => {handelUpdateCartQty(item.id, item.quantity - 1)} }>-</Button>
       <Typography className='fw-bold'> {item.quantity}</Typography>
       <Button type="button" size="medium"  onClick={ () => {handelUpdateCartQty(item.id, item.quantity + 1)} }>+</Button>

     </div>
     <Button type="button" size="small" color='secondary' variant='contained' onClick={() => handelRemoveCart(item.id)}>Remove</Button>



     </CardActions>
    </Card>
  )
}

export default CartItem;
