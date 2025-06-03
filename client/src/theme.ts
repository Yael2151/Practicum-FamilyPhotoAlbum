import { createTheme } from "@mui/material/styles"

// סכמת צבעים מודרנית ומרהיבה
const theme = createTheme({
  palette: {
    primary: {
      main: "#6366F1", // סגול-כחול עשיר
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#EC4899", // ורוד חזק
      light: "#F472B6",
      dark: "#DB2777",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F9FAFB",
      paper: "#ffffff",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    info: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
      disabled: "#9CA3AF",
    },
    divider: "#E5E7EB",
  },
  typography: {
    fontFamily: '"Heebo", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 6px rgba(0, 0, 0, 0.05)",
    "0px 6px 8px rgba(0, 0, 0, 0.05)",
    "0px 8px 12px rgba(0, 0, 0, 0.05)",
    "0px 12px 16px rgba(0, 0, 0, 0.05)",
    "0px 16px 24px rgba(0, 0, 0, 0.05)",
    "0px 20px 28px rgba(0, 0, 0, 0.05)",
    "0px 24px 32px rgba(0, 0, 0, 0.05)",
    "0px 28px 36px rgba(0, 0, 0, 0.05)",
    "0px 32px 40px rgba(0, 0, 0, 0.05)",
    "0px 36px 44px rgba(0, 0, 0, 0.05)",
    "0px 40px 48px rgba(0, 0, 0, 0.05)",
    "0px 44px 52px rgba(0, 0, 0, 0.05)",
    "0px 48px 56px rgba(0, 0, 0, 0.05)",
    "0px 52px 60px rgba(0, 0, 0, 0.05)",
    "0px 56px 64px rgba(0, 0, 0, 0.05)",
    "0px 60px 68px rgba(0, 0, 0, 0.05)",
    "0px 64px 72px rgba(0, 0, 0, 0.05)",
    "0px 68px 76px rgba(0, 0, 0, 0.05)",
    "0px 72px 80px rgba(0, 0, 0, 0.05)",
    "0px 76px 84px rgba(0, 0, 0, 0.05)",
    "0px 80px 88px rgba(0, 0, 0, 0.05)",
    "0px 84px 92px rgba(0, 0, 0, 0.05)",
    "0px 88px 96px rgba(0, 0, 0, 0.05)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            },
            "&.Mui-focused": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(4px)",
        },
      },
    },
  },
})

export default theme
