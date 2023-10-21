"use client"
import React,{useState} from 'react';
import { Box, Button, Typography } from '@mui/material';

const FormSend = () => {
  const [file,setfile] = useState(null)
  

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!file) return

    try{
      const data = new FormData()
      data.set('file' , file)

      const res = await fetch('/api/readPdf' ,{
        method:'POST',
        body:data
      })
      console.log(res);
    }catch(err){
      console.log(err.message);
    }
   
  };
console.log(file,"file");
  return (
    <Box
      sx={{
        display: 'flex',     
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent: 'center',
        height:'100vh'
      }}
    >
      <form onSubmit={handleSubmit} style={{display:'flex' ,alignItems:'center',justifyContent:'center',gap:'2rem'}}>
        
        
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={(e)=>setfile(e.target.files[0])}
        />
        
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
          >
            Upload File
          </Button>
        </label>
        
        <Typography variant="subtitle1" marginRight='5rem' >
          Selected File: {/* Display the selected file name here */}
        </Typography>
        <Typography>{file?.name}</Typography>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormSend;
