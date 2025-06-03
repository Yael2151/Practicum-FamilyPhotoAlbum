// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import { useContext } from "react";
// import { UsersContext } from "../context/UserProvider";

// const Detailes = () => {
//     const context = useContext(UsersContext);
//     if (!context) {
//         throw new Error("UserContext must be used within a UserProvider");
//     }
//     const { state } = context;
    
//     return (<>
//         <div >
//             <Stack direction="row" spacing={2} sx={{ color: "#FF4081", position: "absolute", top: 0, left: 120, padding: '16px' }}>
//                 <Avatar alt={state.name ? state.name.charAt(0).toUpperCase() : state.email?.charAt(0).toUpperCase()} src="/static/images/avatar/1.jpg" />
//                 <div style={{ top: "1500" }}>{state.name}</div>
//             </Stack>
//         </div>
//     </>)
// }
// export default Detailes