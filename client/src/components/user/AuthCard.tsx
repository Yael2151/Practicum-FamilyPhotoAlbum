"use client"
import { Box, Paper, Typography, useTheme } from "@mui/material"
import type { ReactNode } from "react"

interface AuthCardProps {
  title: string
  children: ReactNode
  icon?: ReactNode
}

const AuthCard = ({ title, children, icon }: AuthCardProps) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: 450 },
        maxWidth: "100%",
        p: 4,
        borderRadius: 3,
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
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
        {icon && <Box sx={{ mr: 2, color: theme.palette.primary.main }}>{icon}</Box>}
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
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  )
}

export default AuthCard