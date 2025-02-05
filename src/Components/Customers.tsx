import { Box, Button, Popover, Snackbar, SnackbarContent, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { addCustomer as addCustomerAction, deleteCustomer, updateCustomer as updateCustomerAction } from "../Store/Customers/customerSlice"
import { useDispatch, useSelector } from "react-redux"
import { AddCustomerStyle, BoxStyle, ButtonStyle, PopoverStyle, textfield } from "../Styles/Customers.style"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RootState, AppDispatch } from '../Store/index';


export const Customers = () => {
  const [ Name, setName ] = useState('');
  const [ Age, setAge ] = useState('');
  const [ Gender, setGender ] = useState('');
  const [ Mobile, setMobile ] = useState('');
  const [ edit, setEdit ] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  

  const dispatch = useDispatch<AppDispatch>();
  const customer = useSelector((state : RootState) => state.customers)
  console.log(customer,'customer');
  console.log(customer.length,'length');

  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAddCustomer = () => {
    if(Name && Age && Gender && Mobile){
      dispatch(addCustomerAction({Name, Age, Gender, Mobile}))
      setName('')
      setAge('')
      setGender('')
      setMobile('')
      setAnchorEl(null);
      showSnackbar(`New Customer Added '${Name}'`)
    }
  }

  const handleDeleteCustomer = (index: any) => {
    dispatch(deleteCustomer(index))
    showSnackbar(`${customer[index].Name} is Removed`)

  }

  const handleEditCustomer = (index: any, event: any) => {
    setAnchorEl(event.currentTarget);
    if (edit === index) {
      // If we're already editing this customer, set to null (to "cancel" editing)
      setEdit(null);
    } else {
      // Otherwise, start editing the customer at this index
      setEdit(index);
      setName(customer[index].Name)
      setAge(customer[index].Age)
      setGender(customer[index].Gender)
      setMobile(customer[index].Mobile)
    }
  }

  const handleUpdateCustomer = (index: any) => {
    if (Name && Age && Gender && Mobile) {
      const updatedCustomer = { Name, Age, Gender, Mobile };
      dispatch(updateCustomerAction({ index, customer: updatedCustomer }));
      setEdit(null);  
      setName('');
      setAge('');
      setGender('');
      setMobile('');
      showSnackbar(`${customer[index].Name} Details was Updated`)
    }
    setAnchorEl(null)
  }

  return (
    <>
    <Button sx={{...ButtonStyle, bgcolor:'green', "&:hover": { backgroundColor: "green" }, ml:'700px'}} onClick={handleClick}>Add Customer</Button>
    <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorReference="anchorPosition" anchorPosition={{top: 350, left: 740}} anchorOrigin={{vertical:'center', horizontal:'center'}} transformOrigin={{vertical:'center', horizontal:'center'}} sx={PopoverStyle}>
      <Box sx={{display:'flex', flexDirection: 'column',  alignItems: 'center', padding:'14px 20px'}}>
      <h2>Add Customer Details :</h2>
      <Box sx={BoxStyle}>
        <Typography variant="h6" sx={AddCustomerStyle}>Name  :</Typography>
        <TextField sx={textfield} label='Enter Your Name' value={Name} onChange={(e) => setName(e.target.value)}/>
      </Box>
      <Box sx={{...BoxStyle, mt:'20px'}}>
        <Typography variant="h6" sx={AddCustomerStyle}>Age  :</Typography>
        <TextField sx={textfield} label='Enter Your Age' value={Age} onChange={(e) => setAge(e.target.value)}/>
      </Box>
      <Box sx={{...BoxStyle, mt:'20px'}}>
        <Typography variant="h6" sx={{ width:'140px', pt:'4px'}}>Gender  :</Typography>
        <FormControl>
          <RadioGroup value={Gender} onChange={(e) => setGender(e.target.value)}>
            <Box sx={{display:'flex', flexDirection:'row', mr:'30px'}}>
            <FormControlLabel value='Male' control={<Radio />} label='Male'></FormControlLabel>
            <FormControlLabel value='Female' control={<Radio />} label='Female'></FormControlLabel>
            </Box>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{...BoxStyle, mt:'20px'}}>
      <Typography variant="h6" sx={AddCustomerStyle}>Mobile No  :</Typography>
      <TextField sx={textfield} label='Enter Your Number' value={Mobile} onChange={(e) => setMobile(e.target.value)}/>
      </Box>
      <Box sx={BoxStyle}>
       <Button onClick={edit === null ? handleAddCustomer : () => handleUpdateCustomer(edit)} sx={{...ButtonStyle, bgcolor:'green', "&:hover": { backgroundColor: "green" }}}>{edit === null ? 'Add' : 'Update'}</Button> 
      </Box>
      </Box>
    </Popover>
      <Box sx={{width:'500px', ml:'400px'}}>
        <h2 style={{paddingLeft:'40px'}}>Customer List :</h2>
        <ul style={{ listStyle:'none'}}>
        <Table border={1} sx={{width:'600px'}}>
          <TableHead sx={{borderBottom: '1px solid red'}}>
            <TableRow>
              <TableCell><h3>Name</h3></TableCell>
              <TableCell><h3>Age</h3></TableCell>
              <TableCell><h3>Gender</h3></TableCell>
              <TableCell><h3>Mobile No</h3></TableCell>
              <TableCell><h3>Edit/Update/Delete</h3></TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {customer.length > 0 ? customer.map((item: any, index: any) => 
              <TableRow key={index}>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Age}</TableCell>
                <TableCell>{item.Gender}</TableCell>
                <TableCell>{item.Mobile}</TableCell>
                <TableCell>
                  <Box sx={{display:'flex', justifyContent:'space-around', padding:"0px 10px"}}>
                  <Button sx={{...ButtonStyle, bgcolor:'orange', "&:hover": { backgroundColor: "orange" }}} onClick={(e) => handleEditCustomer(index, e)}>Edit</Button>
                  <Button sx={{...ButtonStyle, bgcolor:'red', "&:hover": { backgroundColor: "red" }}} onClick={() => handleDeleteCustomer(index)}>Delete</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ):
            <TableRow>
              <TableCell colSpan={5}>
                <Typography sx={{ fontSize: "16px", fontWeight: 540, textAlign: "center", padding: "10px 0px",}}>
                  No Data Available
                </Typography>
              </TableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
        </ul>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} 
        sx={{
          // position: 'fixed',
          zIndex: 1400,
          bottom: { xs: '8px', sm: '20px' }, // `sm` is for screen width >= 600px
          left: { xs: '8px', sm: 'auto' },
          right: { xs: '8px', sm: '20px' },
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center', 
          // backgroundColor:"transparent",
          // color:"#0092D2",
        }} 
      >
      <SnackbarContent message={snackbarMessage}
          sx={{
            backgroundColor: '#D1F1FF',
            borderRadius:"10px",
            border:"1px solid #0092D2",
            color: '#0092D2',
            boxShadow: 'none',
            transition: 'none',
            fontFamily: 'DM Sans',
            fontWeight: 500,  
            height:'30px',
            padding:'6px 10px',
            widows:"fit-content"
          }}
        />
      </Snackbar>
    </>
  )
}