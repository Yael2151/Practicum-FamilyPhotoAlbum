import { useState } from "react";
import Login from "./user/Login";
import Registration from "./user/Registration";
import Update from "./user/Update";
import Detailes from "./user/UserDetailes";
import FileUploader from "./files/FileUploader";
import ImageGallery from "./files/ShowImages";
// import { SvgIcon, SvgIconProps } from "@mui/material";

const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    <>
      {
        isLoggedIn ?
          (
            <>
              <Update />
              <Detailes />
              <FileUploader />

              <div style={{marginTop: "100px"}} >
                <h1>גלריית תמונות</h1>
                <ImageGallery />
              </div>

            </>
          ) :
          (
            <>
              <Login onLoginSuccess={handleLoginSuccess} />
              <Registration />
            </>

          )
      }

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
