// import rec from '../img/rec.jpg';
// const Home = () => {
//   return (<>
//   <text>home</text>
//   </>)
// }
// export default Home


"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  Skeleton,
  Fade,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { PhotoCamera, History, EmojiEvents, ArrowForward } from "@mui/icons-material"

interface Challenge {
  id: number
  title: string
  description: string
  endDate: string
}

const Home = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentChallenge = async () => {
      try {
        const res = await axiosInstance.get("/challenge/last")
        setCurrentChallenge(res.data)
      } catch (err) {
        console.error("Error fetching current challenge", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentChallenge()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateDaysLeft = (endDateString: string) => {
    const endDate = new Date(endDateString)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                color: "white",
                textAlign: "center",
                maxWidth: 800,
                mx: "auto",
                p: 4,
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  mb: 2,
                }}
              >
                Weekly Photo Challenge
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontWeight: 300,
                  textShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                Showcase your photography skills, get votes, and win the weekly contest
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PhotoCamera />}
                  onClick={() => navigate("/ImageGallery")}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Current Challenge
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<History />}
                  onClick={() => navigate("/previous-challenges")}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontWeight: 600,
                    borderWidth: 2,
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Previous Challenges
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Current Challenge Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 6,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          This Week's Challenge
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            position: "relative",
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
          {loading ? (
            <Box>
              <Skeleton variant="text" height={60} width="60%" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={24} width="90%" />
              <Skeleton variant="text" height={24} width="80%" />
              <Skeleton variant="text" height={24} width="85%" sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Skeleton variant="text" height={40} width="30%" />
                <Skeleton variant="rectangular" height={40} width="20%" sx={{ borderRadius: 2 }} />
              </Box>
            </Box>
          ) : currentChallenge ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {currentChallenge.title}
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "text.secondary", mb: 3 }}>
                  {currentChallenge.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 4,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: theme.palette.primary.main + "10",
                      border: `1px solid ${theme.palette.primary.main}30`,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Ends on: {formatDate(currentChallenge.endDate)}
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: theme.palette.secondary.main + "10",
                      border: `1px solid ${theme.palette.secondary.main}30`,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {calculateDaysLeft(currentChallenge.endDate)} days left
                    </Typography>
                  </Paper>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/ImageGallery")}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Participate Now
                </Button>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt="Photography contest"
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      How to Win
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload your best photo that matches this week's theme. Get votes from other participants and
                      visitors. The photo with the most votes by the end date wins!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h6" align="center">
              No active challenge found. Please check back later.
            </Typography>
          )}
        </Paper>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[50], py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 6,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            How It Works
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.palette.primary.main + "20",
                      mb: 3,
                    }}
                  >
                    <PhotoCamera sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    1. Upload Your Photo
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Submit your best photo that matches the current week's theme. Make sure it showcases your unique
                    perspective and creativity.
                  </Typography>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.palette.secondary.main + "20",
                      mb: 3,
                    }}
                  >
                    <ThumbUp sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    2. Get Votes
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Other participants and visitors will vote for their favorite photos. Share your submission to get
                    more votes!
                  </Typography>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.palette.success.main + "20",
                      mb: 3,
                    }}
                  >
                    <EmojiEvents sx={{ fontSize: 40, color: theme.palette.success.main }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    3. Win the Contest
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    The photo with the most votes by the end of the week wins the contest and will be featured in our
                    hall of fame!
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

import { ThumbUp } from "@mui/icons-material"
import axiosInstance from "./axiosInstance"

export default Home
