//עובד גירסה קודם לעיצוב של V0


// import { AppBar, Toolbar, Button, IconButton, Box, Avatar, Typography } from '@mui/material';
// import { Home} from '@mui/icons-material';
// import { useUserContext } from './context/UserProvider';
// import { useNavigate } from 'react-router-dom';
// import Update from './user/Update';

// interface NavbarProps {
//     onLogout: () => void;
// }

// const Navbar = ({ onLogout }: NavbarProps) => {
//     const { state } = useUserContext();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         onLogout();
//     };

//     const handleHomeClick = () => {
//         navigate('/');
//     };

//     const handlePreviousChallengesClick = () => {
//         navigate('/previous-challenges');
//     };

//     const handleImageGalleryClick = () => {

//         navigate('/ImageGallery');
//     };
//     return (
//         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//             <Toolbar sx={{ justifyContent: 'space-between' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <IconButton
//                         color="inherit"
//                         aria-label="home"
//                         onClick={handleHomeClick}
//                         sx={{ mr: 2 }}
//                     >
//                         <Home />
//                     </IconButton>
//                     {/* <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
//                         אתגר התמונות
//                     </Typography> */}
//                     <Button

//                         color="inherit"
//                         onClick={handlePreviousChallengesClick}
//                         sx={{ ml: 2 }}
//                     >
//                         אתגרים קודמים
//                     </Button>

//                     <Button

//                         color="inherit"
//                         onClick={handleImageGalleryClick}
//                         sx={{ ml: 2 }}
//                     >
//                         האתגר הנוכחי
//                     </Button>

//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
//                         <Avatar
//                             alt={state.name ? state.name.charAt(0).toUpperCase() : state.email?.charAt(0).toUpperCase()}
//                             src="/static/images/avatar/1.jpg"
//                             sx={{ mr: 1, bgcolor: 'secondary.main' }}
//                         //   sx={{ mr: 1, bgcolor: state.name ? 'primary.main' : 'secondary.main' }}
//                         //    src={state.profilePicture || '/static/images/avatar/1.jpg'} 
//                         />
//                         <Typography variant="body1" sx={{ color: 'white', fontWeight: 'medium' }}>
//                             {state.name || state.email}
//                         </Typography>
//                     </Box>
//                     <div style={{ color: 'white', fontWeight: 'medium' }}>
//                     <Update />
//                     </div>
//                     <Button
//                         color="inherit"
//                         onClick={handleLogout}
//                         variant="outlined"
//                         sx={{
//                             borderColor: 'white',
//                             '&:hover': {
//                                 borderColor: 'white',
//                                 backgroundColor: 'rgba(255, 255, 255, 0.1)'
//                             }
//                         }}
//                     >
//                         התנתק
//                     </Button>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Navbar;


// עיצוב חדש של V0
// "use client"

// import type React from "react"

// import {
//   AppBar,
//   Toolbar,
//   Button,
//   IconButton,
//   Box,
//   Avatar,
//   Typography,
//   Tooltip,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   useTheme,
// } from "@mui/material"
// import { Home, PhotoLibrary, History, Logout, Settings, Person } from "@mui/icons-material"
// import { useUserContext } from "./context/UserProvider"
// import { useNavigate } from "react-router-dom"
// import Update from "./user/Update"
// import { useState } from "react"

// interface NavbarProps {
//   onLogout: () => void
// }

// const Navbar = ({ onLogout }: NavbarProps) => {
//   const { state } = useUserContext()
//   const navigate = useNavigate()
//   const theme = useTheme()

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const open = Boolean(anchorEl)

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     handleClose()
//     onLogout()
//   }

//   const handleHomeClick = () => {
//     navigate("/")
//   }

//   const handlePreviousChallengesClick = () => {
//     navigate("/previous-challenges")
//   }

//   const handleImageGalleryClick = () => {
//     navigate("/ImageGallery")
//   }

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Tooltip title="home" arrow>
//             <IconButton
//               color="inherit"
//               aria-label="home"
//               onClick={handleHomeClick}
//               sx={{
//                 mr: 2,
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 "&:hover": {
//                   backgroundColor: "rgba(255, 255, 255, 0.2)",
//                 },
//               }}
//             >
//               <Home />
//             </IconButton>
//           </Tooltip>

//           {/* <Typography
//             variant="h6"
//             component="div"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               fontWeight: "bold",
//               mr: 4,
//               background: "linear-gradient(90deg, #ffffff, #f0f0f0)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textShadow: "0 2px 10px rgba(0,0,0,0.1)",
//             }}
//           >
//             אתגר התמונות
//           </Typography> */}

//           <Button
//             color="inherit"
//             onClick={handlePreviousChallengesClick}
//             startIcon={<History />}
//             sx={{
//               ml: 2,
//               borderRadius: 2,
//               "&:hover": {
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//               },
//             }}
//           >
//             previous challenges
//           </Button>

//           <Button
//             color="inherit"
//             onClick={handleImageGalleryClick}
//             startIcon={<PhotoLibrary />}
//             sx={{
//               ml: 2,
//               borderRadius: 2,
//               "&:hover": {
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//               },
//             }}
//           >
//             current challenge
//           </Button>
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Update />

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//               mr: 2,
//               padding: "4px 8px",
//               borderRadius: 2,
//               transition: "all 0.2s",
//               "&:hover": {
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//               },
//             }}
//             onClick={handleClick}
//           >
//             <Avatar
//               alt={state.name ? state.name.charAt(0).toUpperCase() : state.email?.charAt(0).toUpperCase()}
//               src="/static/images/avatar/1.jpg"
//               sx={{
//                 mr: 1,
//                 bgcolor: theme.palette.secondary.main,
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//                 border: "2px solid white",
//               }}
//             />
//             <Typography variant="body1" sx={{ color: "white", fontWeight: "medium" }}>
//               {state.name || state.email}
//             </Typography>
//           </Box>

//           <Menu
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             PaperProps={{
//               elevation: 3,
//               sx: {
//                 overflow: "visible",
//                 filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
//                 mt: 1.5,
//                 borderRadius: 2,
//                 minWidth: 180,
//                 "&:before": {
//                   content: '""',
//                   display: "block",
//                   position: "absolute",
//                   top: 0,
//                   right: 14,
//                   width: 10,
//                   height: 10,
//                   bgcolor: "background.paper",
//                   transform: "translateY(-50%) rotate(45deg)",
//                   zIndex: 0,
//                 },
//               },
//             }}
//             transformOrigin={{ horizontal: "right", vertical: "top" }}
//             anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//           >
//             <MenuItem onClick={handleClose}>
//               <ListItemIcon>
//                 <Person fontSize="small" />
//               </ListItemIcon>
//               <ListItemText>My profile</ListItemText>
//             </MenuItem>
//             <MenuItem onClick={handleClose}>
//               <ListItemIcon>
//                 <Settings fontSize="small" />
//               </ListItemIcon>
//               <ListItemText>Settings</ListItemText>
//             </MenuItem>
//             <Divider />
//             <MenuItem onClick={handleLogout}>
//               <ListItemIcon>
//                 <Logout fontSize="small" color="error" />
//               </ListItemIcon>
//               <ListItemText sx={{ color: theme.palette.error.main }}>Log out</ListItemText>
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default Navbar


"use client"

import type React from "react"

import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Box,
    Avatar,
    Typography,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme,
    Modal,
} from "@mui/material"
import { Home, PhotoLibrary, History, Logout, Settings, Person, Edit } from "@mui/icons-material"
import { useUserContext } from "./user/Update"
import { useNavigate } from "react-router-dom"
import Update from "./user/Update"
import { useState } from "react"
import UserProfile from "./user/UserProfile.tsx"
import UserSettings from "./user/UserSettings.tsx"

interface NavbarProps {
    onLogout: () => void
}

const Navbar = ({ onLogout }: NavbarProps) => {
    const { state } = useUserContext()
    const navigate = useNavigate()
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const [profileOpen, setProfileOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleClose()
        onLogout()
    }

    const handleHomeClick = () => {
        navigate("/")
    }

    const handlePreviousChallengesClick = () => {
        navigate("/previous-challenges")
    }

    const handleImageGalleryClick = () => {
        navigate("/ImageGallery")
    }

    const handleProfileClick = () => {
        handleClose()
        setProfileOpen(true)
    }

    const handleUpdateClick = () => {
        handleClose()
        setUpdateOpen(true)
    }

    const handleSettingsClick = () => {
        handleClose()
        setSettingsOpen(true)
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                // background: 'grey'
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Home" arrow>
                        <IconButton
                            color="inherit"
                            aria-label="home"
                            onClick={handleHomeClick}
                            sx={{
                                mr: 2,
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                        >
                            <Home />
                        </IconButton>
                    </Tooltip>

                    {/* <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
              mr: 4,
              background: "linear-gradient(90deg, #ffffff, #f0f0f0)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            Photo Challenge
          </Typography> */}

                    <Button
                        color="inherit"
                        onClick={handlePreviousChallengesClick}
                        startIcon={<History />}
                        sx={{
                            ml: 2,
                            borderRadius: 2,
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                        }}
                    >
                        Previous Challenges
                    </Button>

                    <Button
                        color="inherit"
                        onClick={handleImageGalleryClick}
                        startIcon={<PhotoLibrary />}
                        sx={{
                            ml: 2,
                            borderRadius: 2,
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                        }}
                    >
                        Current Challenge
                    </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            mr: 2,
                            padding: "4px 8px",
                            borderRadius: 2,
                            transition: "all 0.2s",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                        }}
                        onClick={handleClick}
                    >
                        <Avatar
                            alt={state.name ? state.name.charAt(0).toUpperCase() : state.email?.charAt(0).toUpperCase()}
                            src="/static/images/avatar/1.jpg"
                            sx={{
                                mr: 1,
                                bgcolor: theme.palette.secondary.main,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                border: "2px solid white",
                            }}
                        />
                        <Typography variant="body1" sx={{ color: "white", fontWeight: "medium" }}>
                            {state.name || state.email}
                        </Typography>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 3,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                                mt: 1.5,
                                borderRadius: 2,
                                minWidth: 200,
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem onClick={handleProfileClick}>
                            <ListItemIcon>
                                <Person fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>My Profile</ListItemText>
                        </MenuItem>

                        {/* <MenuItem>
                            <ListItemIcon>
                              
                                <Update />
                            </ListItemIcon>
                            <ListItemText>Update Profile</ListItemText>
                        </MenuItem> */}

                        <MenuItem onClick={handleUpdateClick}>
                            <ListItemIcon>
                                <Edit fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Update Profile</ListItemText>
                        </MenuItem>

                        <MenuItem onClick={handleSettingsClick}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Settings</ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText sx={{ color: theme.palette.error.main }}>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>

            {/* Profile Modal */}
            <Modal open={profileOpen} onClose={() => setProfileOpen(false)} aria-labelledby="profile-modal">
                <div>
                    <UserProfile onClose={() => setProfileOpen(false)} />
                </div>
            </Modal>

            {/* Update */}
            <Modal open={updateOpen} onClose={() => setUpdateOpen(false)} aria-labelledby="update-modal">
                <div>
                    <Update onClose={() => setUpdateOpen(false)} />
                </div>
            </Modal>

            {/* Settings Modal */}
            <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)} aria-labelledby="settings-modal">
                <div>
                    <UserSettings onClose={() => setSettingsOpen(false)} />
                </div>
            </Modal>

        </AppBar>
    )
}

export default Navbar