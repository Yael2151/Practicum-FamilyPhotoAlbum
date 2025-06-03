// import './App.css'
// import { RouterProvider } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { UserProvider } from './components/context/UserProvider';
// import { router } from './components/router';
// import { Provider } from 'react-redux';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#FF4081', // ורוד חם
//     },
//     error: {
//       main: '#F44336', // אדום
//     },
//     background: {
//       default: '#F1F1F1', // רקע אפור בהיר
//     },
//   },
// });


// function App() {
//   return (
//     // <Provider store={store}>
//       <UserProvider >
//         <ThemeProvider theme={theme}>
//           <RouterProvider router={router} />
//         </ThemeProvider>
//       </UserProvider>
//     // </Provider >
//   )
// }

// export default App


import "./App.css"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import { UserProvider } from "./components/context/UserProvider"
import { router } from "./components/router"
import { CssBaseline } from "@mui/material"
import theme from "./theme"

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
