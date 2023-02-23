import { TextField, styled } from '@mui/material';

const CustomTextField1 = styled(TextField)({
    '& .MuiInputBase-input': {
       color: 'white',
    },
    '& .MuiOutlinedInput-root': {
       '& fieldset': {
          borderColor: 'white',
       },
       '&:hover fieldset': {
          borderColor: '#2DEDF3',
       },
       '&.Mui-focused fieldset': {
          borderColor: '#2DEDF3',
       },
    },
    '& .MuiFormLabel-root': {
       color: 'white',
       '&.Mui-focused': {
          color: '#2DEDF3',
       },
    },
 });

 export {CustomTextField1}