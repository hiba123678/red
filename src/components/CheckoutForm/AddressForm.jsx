import React, {useState, useEffect} from 'react';
import { InputLabel ,  Select,  Typography, Button ,Grid, MenuItem } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import {commerce } from '../../lib/commerce.js';
function AddressForm( { checkoutToken , next} ) {

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();
  
const countries= Object.entries(shippingCountries).map(([code, name]) => ({id: code, label:name}));
// console.log( countries);

const subdivisions= Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label:name}));

// console.log( "subdivisions");
// console.log(subdivisions);
// console.log("shippingOptions");

// console.log(shippingOptions);



    const fetchShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
  //  console.log("contri");
  //  console.log( countries);

      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
   
    };


    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
  
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    };
  


    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
  
      setShippingOptions(options);
      setShippingOption(options[0].id);
    };


useEffect( () => {
  fetchShippingCountries(checkoutToken.id);

}, []);



useEffect( () => {
  if (shippingCountry) fetchSubdivisions(shippingCountry);

}, [shippingCountry]);


useEffect(() => {
  if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
}, [shippingSubdivision]);



  return (
    <>
    <Typography variant='h7' gutterBottom className='fw-bold mb-5'>Shipping Adress</Typography>
    <FormProvider { ...methods }>
     <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
     <Grid container spacing={3}>
         <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />

     </Grid>
           <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={ (e) => setShippingCountry(e.target.value)}>
                 {countries.map((country)=>(
                   <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                 ) 
                 )}

             </Select>



           </Grid>
           <Grid item xs={12} sm={6} >
              <InputLabel>Shipping Subdivision</InputLabel>
               <Select value={shippingSubdivision} fullWidth onChange={ (e) =>setShippingSubdivision(e.target.value)}>
                 {subdivisions.map((subdivision)=>(
                   <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                 ) 
                 )}

             </Select>
           </Grid>

           <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
           </Grid>


           <div style={{display:" flex", justifyContent:'space-between'}}>
             <Button LinkComponent={Link} to='/cart' variant='outlined'>Back to Cart</Button>
             <Button  type="submit" variant='contained' color='primary'>Next</Button>
           </div>




     </form>

        </FormProvider>
    </>
  )
}

export default AddressForm;
