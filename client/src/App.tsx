import './App.css'
import { RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './components/context/UserProvider';
import { router } from './components/router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4081', // ורוד חם
    },
    error: {
      main: '#F44336', // אדום
    },
    background: {
      default: '#F1F1F1', // רקע אפור בהיר
    },
  },
});


function App() {
  return (

    <UserProvider >
     <ThemeProvider theme={theme}>
       <RouterProvider router={router} />
     </ThemeProvider>
    </UserProvider>
    
  )
}

export default App
