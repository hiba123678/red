import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


function FormInput({ name, label, required }) {
  const { control } = useFormContext();



  return (
    <Grid item xs={12} sm={6}>
        <p>{label}</p>
    <Controller
  name={name}
  
  control={control}
  label= {label}

  required={required}
  render={() =>  < TextField />}
/>

    </Grid>
  );
}

export default FormInput;
