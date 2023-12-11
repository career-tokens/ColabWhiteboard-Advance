import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#3C41C2"),
    backgroundColor: "#3C41C2",
    '&:hover': {
      backgroundColor: "#635DFF",
    },
}));
const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#dc3545"),
    backgroundColor: "#dc3545",
    '&:hover': {
      backgroundColor: "rgb(220,53,69,0.7)",
    },
}));
  
export { ColorButton, ColorButton2 }; 