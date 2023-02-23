import { TextField, styled } from '@mui/material';
// Custom Material UI TextField Intput Styles

// White: Font & Outline
// Cyan: Hover & Focus
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

// White: Font, Outline, Hover, & Focus
const CustomTextField2 = styled(TextField)({
   '& .MuiInputBase-input': {
      color: 'white',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: 'white',
      },
      '&:hover fieldset': {
         borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
         borderColor: 'white',
      },
   },
   '& .MuiFormLabel-root': {
      color: 'white',
      '&.Mui-focused': {
         color: 'white',
      },
   },
});

export {
   CustomTextField1,
   CustomTextField2
}