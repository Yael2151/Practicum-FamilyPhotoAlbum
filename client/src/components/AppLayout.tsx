import { useState } from "react";
import Login from "./user/Login";
import Registration from "./user/Registration";
import Update from "./user/Update";
import Detailes from "./user/UserDetailes";
import FileUploader from "./files/FileUploader";
// import { SvgIcon, SvgIconProps } from "@mui/material";

const AppLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLoginSuccess = () => {
      setIsLoggedIn(true);
    };

    return (
        <>
         <Registration />
           {
            isLoggedIn ?
              (
                <>
                  <Update />
                  <Detailes />
                </>
              ) :
              (
                <>
                  <Login onLoginSuccess={handleLoginSuccess} />
                  <Registration />
                </>
              )
          }
          <FileUploader/>
        </> 
    );
};

export default AppLayout;

// function HomeIcon(props: SvgIconProps) {
//     return (
//         <SvgIcon {...props}>
//             <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//         </SvgIcon>
//     );
// }
