import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ShoppingCart } from '@mui/icons-material';
import logo from '../../assets/logo.jpg';
import { Link, useLocation } from 'react-router-dom';
function Navbar({ totalItems }) {
const location= useLocation();

  return (
    <> 
      <AppBar position="fixed" color="inherit"     sx={{boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  }}>
        <Toolbar LinkComponent={Link} to="/">
        <Typography   variant='h6' color="inherit"   sx={{
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  }}>
            <img src={logo} alt="HibaShop" height="30px" sx={{
    marginRight: '10px',
  }}       />
            HibaShop
      </Typography>
      
      <div sx={ {
    flexGrow: 1,
  }}></div>
     {location.pathname === '/' && (
        <div>
        <IconButton LinkComponent={Link} to="/cart" aria-label='show cart itemes' color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </div> )}
   



    </Toolbar>
  </AppBar>
    </>
  )
}

export default Navbar;
