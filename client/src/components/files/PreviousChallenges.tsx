// גירסה שעובדת מצוין לפני שניסיתי את ה V0

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Challenge {
//   id: number;
//   title: string;
//   description: string;
//   endDate: string;
//   winningImg: {
//     id: number;
//     imageUrl: string;
//     caption: string;
//   };
// }

// const PreviousChallenges: React.FC = () => {
//   const [challenges, setChallenges] = useState<Challenge[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPastChallenges = async () => {
//       try {
//         console.log('PreviousChallenges loaded')
//         const res = await axiosInstance.get('https://localhost:7263/api/challenge/past');
//         setChallenges(res.data);
//       } catch (err) {
//         setError('שגיאה בטעינת האתגרים הקודמים');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPastChallenges();
//   }, []);

//   if (loading) return <p>טוען...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {challenges.map((challenge) => (
//         <div key={challenge.id} className="rounded-2xl shadow-lg p-4 border bg-white">
//           <h2 className="text-xl font-bold mb-2">{challenge.title}</h2>
//           <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
//           <img
//             src={challenge.winningImg?.imageUrl}
//             alt={challenge.winningImg?.caption}
//             className="w-full h-48 object-cover rounded-xl mb-2"
//           />
//           <p className="text-center text-gray-800">🏆 {challenge.winningImg?.caption || 'ללא כיתוב'}</p>
//           <p className="text-xs text-center text-gray-400 mt-1">
//             הסתיים בתאריך: {new Date(challenge.endDate).toLocaleDateString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PreviousChallenges;


"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Chip,
  useTheme,
  Divider,
  Fade,
} from "@mui/material"
import { EmojiEvents, CalendarToday } from "@mui/icons-material"
import axiosInstance from "../axiosInstance"

interface Challenge {
  id: number
  title: string
  description: string
  endDate: string
  winningImg: {
    id: number
    imageUrl: string
    caption: string
  }
}

const PreviousChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const theme = useTheme()

  useEffect(() => {
    const fetchPastChallenges = async () => {
      try {
        console.log("PreviousChallenges loaded")
        const res = await axiosInstance.get("/challenge/past")
        setChallenges(res.data)
      } catch (err) {
        setError("Error loading previous challenges")
      } finally {
        setLoading(false)
      }
    }

    fetchPastChallenges()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Previous Challenges
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
              Explore our past photo challenges and their winning entries. Each challenge showcases incredible talent
              and creativity.
            </Typography>
            <Divider sx={{ maxWidth: 100, mx: "auto", mb: 6, borderColor: theme.palette.primary.main }} />
          </Box>
        </Fade>

        {loading ? (
          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Skeleton variant="rectangular" height={240} animation="wave" />
                  <CardContent>
                    <Skeleton variant="text" height={32} width="80%" />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={20} width="90%" />
                    <Skeleton variant="text" height={20} width="40%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : challenges.length === 0 ? (
          <Typography variant="h6" align="center">
            No previous challenges found.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {challenges.map((challenge) => (
              <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                <Fade in={true} timeout={800} style={{ transitionDelay: `${challenges.indexOf(challenge) * 100}ms` }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
                      },
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        zIndex: 1,
                      }}
                    >
                      <Chip
                        icon={<EmojiEvents sx={{ color: theme.palette.warning.main }} />}
                        label="Winner"
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(4px)",
                          fontWeight: 600,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </Box>

                    <CardMedia
                      component="img"
                      height={240}
                      image={
                        challenge.winningImg?.imageUrl || "https://via.placeholder.com/400x300?text=No+Winning+Image"
                      }
                      alt={challenge.winningImg?.caption || challenge.title}
                      sx={{
                        objectFit: "cover",
                      }}
                    />

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                        {challenge.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          height: 60,
                        }}
                      >
                        {challenge.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <CalendarToday fontSize="small" color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Ended: {formatDate(challenge.endDate)}
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="body2" fontWeight={500} gutterBottom>
                        Winning Caption:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontStyle: "italic",
                        }}
                      >
                        "{challenge.winningImg?.caption || "No caption provided"}"
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default PreviousChallenges
