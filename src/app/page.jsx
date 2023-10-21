"use client"
import React,{useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const FormSend = () => {
  const [file,setfile] = useState(null)
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload()
  };

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
      if(res.status==200){
        setOpen(true)
        
      }
    }catch(err){
      console.log(err.message);
    }
   
  };

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
   {open && (
    <div>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <DialogContentText>
          File Uploaded SuccessFully
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  </div>
   )}


    </Box>
  );
};

export default FormSend;
