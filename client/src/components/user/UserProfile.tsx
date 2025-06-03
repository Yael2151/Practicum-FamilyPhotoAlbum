"use client"

import {
    Box,
    Paper,
    Typography,
    Avatar,
    Button,
    Divider,
    useTheme,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material"
import { useUserContext } from "./Update"
import { Email, Person, CalendarToday, PhotoCamera } from "@mui/icons-material"
import { useState } from "react"

interface UserProfileProps {
    onClose: () => void
}

const UserProfile = ({ onClose }: UserProfileProps) => {
    const { state } = useUserContext()
    const theme = useTheme()
    const [uploadedPhotos] = useState(0)
    const [contestsWon] = useState(0)
    const [votesReceived] = useState(0)

    return (
        <Paper
            elevation={0}
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: 600 },
                maxWidth: "100%",
                p: 4,
                borderRadius: 3,
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                maxHeight: "90vh",
                overflow: "auto",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 6,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 700,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    My Profile???
                </Typography>
                <Button variant="outlined" onClick={onClose}>
                    Close
                </Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", mb: 4 }}>
                <Avatar
                    alt={state.name ? state.name.charAt(0).toUpperCase() : state.email?.charAt(0).toUpperCase()}
                    src="/static/images/avatar/1.jpg"
                    sx={{
                        width: 120,
                        height: 120,
                        mb: { xs: 2, sm: 0 },
                        mr: { sm: 4 },
                        bgcolor: theme.palette.secondary.main,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        border: `4px solid ${theme.palette.background.paper}`,
                    }}
                />

                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {state.name || "User"}
                    </Typography>

                    <List dense disablePadding>
                        <ListItem disablePadding sx={{ mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <Email fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={state.email || "No email provided"} />
                        </ListItem>

                        <ListItem disablePadding sx={{ mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <CalendarToday fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Joined: January 2023" />
                        </ListItem>
                    </List>
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Statistics
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            textAlign: "center",
                            borderRadius: 2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}10)`,
                        }}
                    >
                        <PhotoCamera sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">
                            {uploadedPhotos}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Photos Uploaded
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            textAlign: "center",
                            borderRadius: 2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            background: `linear-gradient(135deg, ${theme.palette.secondary.light}20, ${theme.palette.secondary.main}10)`,
                        }}
                    >
                        <Person sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">
                            {votesReceived}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Votes Received
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            textAlign: "center",
                            borderRadius: 2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            background: `linear-gradient(135deg, ${theme.palette.success.light}20, ${theme.palette.success.main}10)`,
                        }}
                    >
                        <Person sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold">
                            {contestsWon}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Contests Won
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="contained" color="primary" onClick={onClose}>
                    Close
                </Button>
            </Box>
        </Paper>
    )
}

export default UserProfile