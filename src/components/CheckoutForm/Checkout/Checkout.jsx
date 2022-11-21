import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import PaymentForm from '../PaymentForm.jsx';
import AddressForm from '../AddressForm.jsx';
import './style.css';
import { commerce } from '../../../lib/commerce';
import { useEffect } from 'react';
import {
 
  Link
} from 'react-router-dom';


const steps = ['Shipping adreess','Payment Detail' ];

function Checkout({ cart, onCaptureCheckout, order, error }) {
    const [activeStep, setActiveStep]=useState(0);
    
    const [checkoutToken, setCheckoutToken] = useState({});
    const [shippingData, setShippingData] = useState({});



    useEffect( () => {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

         console.log("token");      console.log(token);
         setCheckoutToken(token);
          console.log("checkoutToken"); console.log(checkoutToken);
        } catch (error){
         
        }
      };

      generateToken();

  }, [cart]);




  

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

const next = (data)=>{
  setShippingData(data);
  nextStep();
}


let Confirmation = () => (order.customer ? (
  <>
    <div>
      <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
      <Divider />
      <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
    </div>
    <br />
    <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
  </>
) : (
  <div >
    <CircularProgress />
  </div>
));

if (error) {
  Confirmation = () => (
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button LinkComponent={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  );
}




    const Form = () => activeStep===0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> :



     <PaymentForm checkoutToken={checkoutToken}  shippingData={shippingData} backStep={backStep}  nextStep={nextStep} onCaptureCheckout={onCaptureCheckout}/>

  return (
    <div className=''>
     
       <Paper className='paper mx-auto' style={{width:'100vh', height:'auto'}}>
     <Typography variant='h5' align='center' className='mb-3'>Checkout</Typography>
        
      <Stepper activeStep={activeStep}  className="stepper">
        {steps.map((step) => (
      <Step key={step}>
      <StepLabel>{step}</StepLabel>
      </Step>
         ))}
    </Stepper>
    { activeStep === steps.length ? <Confirmation /> :checkoutToken && <Form />}
       </Paper>
      
    </div>
  )
}

export default Checkout;
