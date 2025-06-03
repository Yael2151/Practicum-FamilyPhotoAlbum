// עובד גירסה קודם לעיצוב של V0


import { Alert, Snackbar } from '@mui/material';

interface ErrorSnackbarProps {
  error: any;
  open: boolean;
  onClose: () => void;
}

const HandlingErrors = ({ error, open, onClose }: ErrorSnackbarProps) => {
  const getErrorMessage = () => {
    if (!error?.response) {
      return 'An unexpected error occurred.';
    }

    switch (error.response?.status) {
      case 400:
        return 'Error: Invalid details, try again.';
      case 401:
        return 'Error: Unauthorized access.';
      case 403:
        return 'Error: Forbidden access.';
      case 500:
        return 'Server error, try again later.';
      default:
        return 'An unexpected error occurred.';
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity="error" variant="filled" sx={{ width: '100%' }} onClose={onClose}>
        {getErrorMessage()}
      </Alert>
    </Snackbar>
  );
};

export default HandlingErrors;


// עיצוב חדש של V0
// "use client"

// import { Alert, Snackbar, Slide, Typography, Box } from "@mui/material"
// import type { TransitionProps } from "@mui/material/transitions"
// import { ErrorOutline } from "@mui/icons-material"

// interface ErrorSnackbarProps {
//   error: any
//   open: boolean
//   onClose: () => void
// }

// function SlideTransition(props: TransitionProps) {
//   return <Slide {...props} direction="up" />
// }

// const HandlingErrors = ({ error, open, onClose }: ErrorSnackbarProps) => {
//   const getErrorMessage = () => {
//     if (!error?.response) {
//       return "אירעה שגיאה לא צפויה."
//     }

//     switch (error.response?.status) {
//       case 400:
//         return "שגיאה: פרטים לא תקינים, נסה שנית."
//       case 401:
//         return "שגיאה: אין לך הרשאה לבצע פעולה זו."
//       case 403:
//         return "שגיאה: הגישה נדחתה."
//       case 500:
//         return "שגיאת שרת, נסה שנית מאוחר יותר."
//       default:
//         return "אירעה שגיאה לא צפויה."
//     }
//   }

//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={6000}
//       onClose={onClose}
//       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       TransitionComponent={SlideTransition}
//     >
//       <Alert
//         severity="error"
//         variant="filled"
//         sx={{
//           width: "100%",
//           borderRadius: 2,
//           boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
//           "& .MuiAlert-icon": {
//             fontSize: "1.5rem",
//           },
//         }}
//         onClose={onClose}
//         icon={<ErrorOutline fontSize="inherit" />}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column" }}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             שגיאה
//           </Typography>
//           <Typography variant="body2">{getErrorMessage()}</Typography>
//         </Box>
//       </Alert>
//     </Snackbar>
//   )
// }

// export default HandlingErrors


// // V0 2
// "use client"

// import { Alert, Snackbar, Slide, Typography, Box } from "@mui/material"
// import type { TransitionProps } from "@mui/material/transitions"
// import { ErrorOutline } from "@mui/icons-material"

// interface ErrorSnackbarProps {
//   error: any
//   open: boolean
//   onClose: () => void
// }

// function SlideTransition(props: TransitionProps) {
//   return <Slide {...props} direction="up" />
// }

// const HandlingErrors = ({ error, open, onClose }: ErrorSnackbarProps) => {
//   const getErrorMessage = () => {
//     if (!error?.response) {
//       return "An unexpected error occurred."
//     }

//     // Check for custom error message first
//     if (error.response?.data?.message) {
//       return error.response.data.message
//     }

//     switch (error.response?.status) {
//       case 400:
//         return "Error: Invalid details, please try again."
//       case 401:
//         return "Error: Unauthorized access."
//       case 403:
//         return "Error: Forbidden access."
//       case 500:
//         return "Server error, please try again later."
//       default:
//         return "An unexpected error occurred."
//     }
//   }

//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={6000}
//       onClose={onClose}
//       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       TransitionComponent={SlideTransition}
//     >
//       <Alert
//         severity="error"
//         variant="filled"
//         sx={{
//           width: "100%",
//           borderRadius: 2,
//           boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
//           "& .MuiAlert-icon": {
//             fontSize: "1.5rem",
//           },
//         }}
//         onClose={onClose}
//         icon={<ErrorOutline fontSize="inherit" />}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column" }}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             Error
//           </Typography>
//           <Typography variant="body2">{getErrorMessage()}</Typography>
//         </Box>
//       </Alert>
//     </Snackbar>
//   )
// }

// export default HandlingErrors

