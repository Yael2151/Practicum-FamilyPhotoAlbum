"use client"

import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  useTheme,
  Switch,
  FormControlLabel,
  FormGroup,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material"
import { Settings } from "@mui/icons-material"
import { useState } from "react"

interface UserSettingsProps {
  onClose: () => void
}

const UserSettings = ({ onClose }: UserSettingsProps) => {
  const theme = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [successMessage, setSuccessMessage] = useState("")
  const [openSuccess, setOpenSuccess] = useState(false)

  const handleSave = () => {
    // Save settings logic would go here
    setSuccessMessage("Settings saved successfully!")
    setOpenSuccess(true)

    // In a real app, you would save these settings to your backend
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: 500 },
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
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Settings sx={{ mr: 2, color: theme.palette.primary.main }} />
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
          Settings
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Preferences
      </Typography>

      <FormGroup sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              color="primary"
            />
          }
          label="Email Notifications"
        />

        <FormControlLabel
          control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} color="primary" />}
          label="Dark Mode"
        />
      </FormGroup>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          label="Language"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="he">Hebrew</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="fr">French</MenuItem>
        </Select>
      </FormControl>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Security
      </Typography>

      <TextField label="Current Password" type="password" fullWidth margin="normal" variant="outlined" />

      <TextField label="New Password" type="password" fullWidth margin="normal" variant="outlined" />

      <TextField label="Confirm New Password" type="password" fullWidth margin="normal" variant="outlined" />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default UserSettings
