// // הגירסה שעבדה עד עכשיו כבר אחרי פסח 
// import axios from 'axios';
// import { useContext, useEffect, useState } from 'react';
// import { ThumbUp } from '@mui/icons-material';
// import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
// import { UsersContext } from '../context/UserProvider';
// import FileUploader from './FileUploader';

// const ImageGallery = () => {
//   const [uploadedFiles, setUploadedFiles] = useState<{ id: number; fileName: string; url: string; votes: number }[]>([]);
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const context = useContext(UsersContext);

//   if (!context) {
//       throw new Error("UserContext must be used within a UserProvider");
//   }
//   const { state } = context;
//   const userId = state.id


//   useEffect(() => {
//     const fetchImagesForCurrentChallenge = async () => {
//       try {
//         console.log("Fetching images for current challenge...");
//         const challengeRes = await axios.get('https://localhost:7263/api/challenge/last');
//         const challengeId = challengeRes.data.id;
//         console.log(challengeId);
//         console.log("challenge response:", challengeRes.data);

  
//         const imageRes = await axios.get(`https://localhost:7263/api/Image?id=${challengeId}`);
//         console.log("imageRes.data:", imageRes.data);
//         console.log("typeof:", typeof imageRes.data);

//         console.log("rrrrrr");

//         const formattedImages = imageRes.data.map((img: any) => ({
//           id: img.id,
//           fileName: img.caption || 'ללא כיתוב',
//           url: img.imageUrl,
//           votes: img.votes || 0,
//         }));
//         setUploadedFiles(formattedImages);
//       } catch (err) {
//         setError("שגיאה בטעינת התמונות");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     // const fetchImages = async () => {
//     //   try {
//     //     const response = await axios.get('https://localhost:7263/api/Image');
//     //     const formattedImages = response.data.map((img: { id: number; imageUrl: string; fileName: string; votes: number }) => ({
//     //       id: img.id,
//     //       fileName: img.fileName, 
//     //       url: img.imageUrl,
//     //       votes: img.votes || 0,
//     //     }));
//     //     setUploadedFiles(formattedImages);
//     //   } catch (err) {
//     //     setError("שגיאה בטעינת התמונות");
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };


//     const fetchUserVote = async () => {
//       try {
//         const response = await axios.get(`https://localhost:7263/api/Vote/user/${userId}`);
//         if (response.data) {
//           setSelectedImageId(response.data.imageId);
//         }
//       } catch (err) {
//         console.error("Error fetching user vote", err);
//       }
//     };

//       // fetchImages();
//     fetchImagesForCurrentChallenge();
//     fetchUserVote();
//   }, [userId]);
    



//   const handleVote = async (imageId: number) => {
//     if (selectedImageId === imageId) return; // אם כבר נבחרה התמונה, לא עושים כלום

//     try {
//       await axios.post(`https://localhost:7263/api/Vote/add?userId=${userId}&imageId=${imageId}`);
//       console.log(userId);
//       console.log(imageId);
      
      
//       setSelectedImageId(imageId);
//       setUploadedFiles(prevFiles =>
//         prevFiles.map(file => ({
//           ...file,
//           votes: file.id === imageId ? file.votes + 1 : file.id === selectedImageId ? file.votes - 1 : file.votes
//         }))
//       );
//     } catch (err) {
//       console.error("Error submitting vote", err);
//     }
//   };

//   if (loading) return <div>טוען תמונות...</div>;
//   if (error) return <div>{error}</div>;
//   if (uploadedFiles.length === 0) return <div>אין תמונות זמינות</div>;

//   return (<>
//     <FileUploader />
//     <Grid container spacing={3} padding={2}>
//       {uploadedFiles.map((file) => (
//         <Grid item xs={12} sm={6} md={4} key={file.id}>
//           <Card>
//             <CardMedia component="img" image={file.url} alt={file.fileName} height="200" />
//             <CardContent>
//               <Typography variant="h6" gutterBottom>{file.fileName}</Typography>
//               <IconButton onClick={() => handleVote(file.id)} color={selectedImageId === file.id ? "primary" : "default"}>
//                 <ThumbUp />
//               </IconButton>
//               {/* <Typography variant="body2" display="inline">{file.votes}</Typography> */}
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//     </>
//   );
// };

// export default ImageGallery;

// גירסה מעוצבת V0

"use client"

import { useContext, useEffect, useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Skeleton,
  Button,
  Modal,
  Fade,
  Tooltip,
  Badge,
  Chip,
  useTheme,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material"
import { ThumbUp, Add, Close, CloudUpload } from "@mui/icons-material"
import { UsersContext } from "../context/UserProvider"
import axios from "axios"
import FileUploader from "./FileUploader"

interface Image {
  id: number
  fileName: string
  url: string
  votes: number
}

interface Challenge {
  id: number
  title: string
  description: string
  endDate: string
}

const ImageGallery = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Image[]>([])
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openUploader, setOpenUploader] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [openSuccess, setOpenSuccess] = useState(false)
  const theme = useTheme()

  const context = useContext(UsersContext)
  if (!context) {
    throw new Error("UserContext must be used within a UserProvider")
  }
  const { state } = context
  const userId = state.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current challenge
        const challengeRes = await axios.get("https://localhost:7263/api/challenge/last")
        setCurrentChallenge(challengeRes.data)
        const challengeId = challengeRes.data.id

        // Fetch images for current challenge
        const imageRes = await axios.get(`https://localhost:7263/api/Image?id=${challengeId}`)
        const formattedImages = imageRes.data.map((img: any) => ({
          id: img.id,
          fileName: img.caption || "No caption",
          url: img.imageUrl,
          votes: img.votes || 0,
        }))
        setUploadedFiles(formattedImages)

        // Fetch user's vote
        try {
          const voteRes = await axios.get(`https://localhost:7263/api/Vote/user/${userId}`)
          if (voteRes.data) {
            setSelectedImageId(voteRes.data.imageId)
          }
        } catch (err) {
          console.log("No vote found for user")
        }
      } catch (err) {
        setError("Error loading images")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const handleVote = async (imageId: number) => {
    try {
      // If user already voted for this image, do nothing
      if (selectedImageId === imageId) return

      // If user already voted for another image, remove that vote first
      if (selectedImageId !== null) {
        // Update UI immediately for better UX
        setUploadedFiles((prevFiles) =>
          prevFiles.map((file) => ({
            ...file,
            votes: file.id === selectedImageId ? Math.max(0, file.votes - 1) : file.votes,
          })),
        )
      }

      // Update UI immediately for better UX
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) => ({
          ...file,
          votes: file.id === imageId ? file.votes + 1 : file.votes,
        })),
      )
      setSelectedImageId(imageId)

      // Send vote to server
      await axios.post(`https://localhost:7263/api/Vote/add?userId=${userId}&imageId=${imageId}`)

      setSuccessMessage("Your vote has been recorded!")
      setOpenSuccess(true)
    } catch (err) {
      console.error("Error submitting vote", err)
      setError("Failed to submit your vote. Please try again.")
      setOpenSuccess(true)

      // Revert UI changes if server request failed
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) => ({
          ...file,
          votes: file.id === imageId ? file.votes - 1 : file.id === selectedImageId ? file.votes + 1 : file.votes,
        })),
      )
      setSelectedImageId(selectedImageId)
    }
  }

  const handleUploadSuccess = async () => {
    setOpenUploader(false)
    setSuccessMessage("Your photo has been uploaded successfully!")
    setOpenSuccess(true)

    // Refresh the image gallery
    try {
      const challengeId = currentChallenge?.id
      const imageRes = await axios.get(`https://localhost:7263/api/Image?id=${challengeId}`)
      const formattedImages = imageRes.data.map((img: any) => ({
        id: img.id,
        fileName: img.caption || "No caption",
        url: img.imageUrl,
        votes: img.votes || 0,
      }))
      setUploadedFiles(formattedImages)
    } catch (err) {
      console.error("Error refreshing images", err)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateDaysLeft = (endDateString: string) => {
    if (!endDateString) return 0
    const endDate = new Date(endDateString)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
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
              Current Challenge
            </Typography>

            {currentChallenge && (
              <Box sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {currentChallenge.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {currentChallenge.description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
                  <Chip label={`Ends on: ${formatDate(currentChallenge.endDate)}`} color="primary" variant="outlined" />
                  <Chip
                    label={`${calculateDaysLeft(currentChallenge.endDate)} days left`}
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
              </Box>
            )}

            <Divider sx={{ maxWidth: 100, mx: "auto", mb: 4, borderColor: theme.palette.primary.main }} />

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenUploader(true)}
              size="large"
              sx={{
                mb: 4,
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(99, 102, 241, 0.6)",
                },
                transition: "all 0.2s",
              }}
            >
              Upload Your Photo
            </Button>
          </Box>
        </Fade>

        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Skeleton variant="rectangular" height={300} animation="wave" />
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : uploadedFiles.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 4,
              backgroundColor: theme.palette.grey[50],
              borderRadius: 3,
            }}
          >
            <CloudUpload sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2, opacity: 0.7 }} />
            <Typography variant="h5" gutterBottom>
              No photos yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Be the first to upload a photo for this challenge!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenUploader(true)}
              size="large"
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Upload Your Photo
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {uploadedFiles.map((file) => (
              <Grid item xs={12} sm={6} md={4} key={file.id}>
                <Fade in={true} timeout={800} style={{ transitionDelay: `${uploadedFiles.indexOf(file) * 100}ms` }}>
                  <Card
                    elevation={0}
                    sx={{
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
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        image={file.url}
                        alt={file.fileName}
                        sx={{
                          height: 300,
                          objectFit: "cover",
                        }}
                      />

                      {/* Vote button overlay */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      >
                        <Tooltip
                          title={selectedImageId === file.id ? "You voted for this photo" : "Vote for this photo"}
                        >
                          <Badge
                            badgeContent={file.votes}
                            color="primary"
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: "1rem",
                                height: "1.5rem",
                                minWidth: "1.5rem",
                                fontWeight: "bold",
                              },
                            }}
                          >
                            <IconButton
                              onClick={() => handleVote(file.id)}
                              sx={{
                                backgroundColor: selectedImageId === file.id ? theme.palette.primary.main : "white",
                                color: selectedImageId === file.id ? "white" : theme.palette.primary.main,
                                "&:hover": {
                                  backgroundColor: selectedImageId === file.id ? theme.palette.primary.dark : "#f0f0f0",
                                },
                                transition: "all 0.2s",
                                width: 56,
                                height: 56,
                              }}
                            >
                              <ThumbUp fontSize="large" />
                            </IconButton>
                          </Badge>
                        </Tooltip>
                      </Box>

                      {/* Caption overlay at bottom */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: 2,
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          backdropFilter: "blur(4px)",
                          color: "white",
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {file.fileName}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                          <ThumbUp fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                          <Typography variant="body2">{file.votes} votes</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Upload Modal */}
        <Modal
          open={openUploader}
          onClose={() => setOpenUploader(false)}
          aria-labelledby="upload-modal"
          aria-describedby="upload-photo-form"
          closeAfterTransition
        >
          <Fade in={openUploader}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: 600 },
                maxWidth: "100%",
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                p: 4,
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
                  Upload Your Photo
                </Typography>
                <IconButton onClick={() => setOpenUploader(false)} aria-label="close">
                  <Close />
                </IconButton>
              </Box>

              <Typography variant="body1" paragraph>
                Submit your photo for the current challenge: <strong>{currentChallenge?.title}</strong>
              </Typography>

              <FileUploader onUploadSuccess={handleUploadSuccess} />
            </Box>
          </Fade>
        </Modal>

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
      </Container>
    </Box>
  )
}

export default ImageGallery






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ImageGallery = () => {
//   const [images, setImages] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         console.log("response");
//         const response = await axios.get('https://localhost:7263/api/Image');
//         console.log(response);
        
//         setImages(response.data); // מחזיר מערך של URL-ים לתמונות
//       } catch (err) {
//         setError("שגיאה בטעינת התמונות");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   if (loading) return <div>טוען תמונות...</div>;
//   if (error) return <div>{error}</div>;
//   if (images.length === 0) return <div>אין תמונות זמינות</div>;
//   console.log(images);

//   return (
//     <div style={galleryStyle}>
//       {images.map((img, index) => (
//         <img key={index} src={img} alt={`תמונה ${index + 1}`} style={imageStyle} />
//         // <img
//         // src={`https://my-buckets-testpnoren.s3.amazonaws.com/${img.name}`} // שימוש בכתובת ה-URL שקיבלנו מה-API
//         // style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '10px' }}
//     //   />
//       ))}
//     </div>
//   );
// };

// const galleryStyle: React.CSSProperties = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//   gap: '10px',
//   padding: '20px',
// };

// const imageStyle: React.CSSProperties = {
//   width: '100%',
//   height: 'auto',
//   borderRadius: '8px',
//   boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
// };

// export default ImageGallery;

// זה עבד אבל מיכל אמרה לשנות בגלל שנטפרי חסם תתמונות בעיה ביוז סטיט לטענתה
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ImageGallery = () => {
//   const [images, setImages] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         console.log("Fetching images...");
//         const response = await axios.get('https://localhost:7263/api/Image');
//         console.log("Response:", response.data);

//         // שמירת כתובות ה-URL בלבד
//         setImages(response.data.map((img: { imageUrl: string }) => img.imageUrl));

//       } catch (err) {
//         console.error("Error fetching images:", err);
//         setError("שגיאה בטעינת התמונות");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   if (loading) return <div>טוען תמונות...</div>;
//   if (error) return <div>{error}</div>;
//   if (images.length === 0) return <div>אין תמונות זמינות</div>;
//   console.log("llllllllllllll");
  
//   console.log(images);
  

//   return (
//     <div style={galleryStyle}>
//       {images.map((img, index) => (
//         <img key={index} src={img} alt={`תמונה ${index + 1}`} style={imageStyle} />
//       ))}
//     </div>
//   );
// };

// const galleryStyle: React.CSSProperties = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//   gap: '10px',
//   padding: '20px',
// };

// const imageStyle: React.CSSProperties = {
//   width: '100%',
//   height: 'auto',
//   borderRadius: '8px',
//   boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
// };

// export default ImageGallery;


//הקוד המעודכן שעבד עד לשינוי שעכשיו אני מנסה
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ImageGallery = () => {
//   const [uploadedFiles, setUploadedFiles] = useState<{ fileName: string; url: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         console.log("Fetching images...");
//         const response = await axios.get('https://localhost:7263/api/Image');
//         console.log("Response:", response.data);

//         // שמירת הנתונים בפורמט המתאים
//         const formattedImages = response.data.map((img: { imageUrl: string; fileName: string }) => ({
//           fileName: img.fileName, 
//           url: img.imageUrl
//         }));

//         setUploadedFiles(formattedImages);
//       } catch (err) {
//         console.error("Error fetching images:", err);
//         setError("שגיאה בטעינת התמונות");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   if (loading) return <div>טוען תמונות...</div>;
//   if (error) return <div>{error}</div>;
//   if (uploadedFiles.length === 0) return <div>אין תמונות זמינות</div>;

//   return (
//     <div style={galleryStyle}>
//       {uploadedFiles.map((file, index) => (
//         <div key={index} style={imageContainerStyle}>
//           <img src={file.url} alt={file.fileName} style={imageStyle} />
//           <p style={fileNameStyle}>{file.fileName}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const galleryStyle: React.CSSProperties = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//   gap: '10px',
//   padding: '20px',
// };

// const imageContainerStyle: React.CSSProperties = {
//   textAlign: 'center',
// };

// const imageStyle: React.CSSProperties = {
//   width: '100%',
//   height: 'auto',
//   borderRadius: '8px',
//   boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
// };

// const fileNameStyle: React.CSSProperties = {
//   marginTop: '5px',
//   fontSize: '14px',
//   color: '#333',
// };

// export default ImageGallery;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaThumbsUp } from 'react-icons/fa';

// const ImageGallery = () => {
//   const [uploadedFiles, setUploadedFiles] = useState<{ id: number; fileName: string; url: string; votes: number }[]>([]);
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const userId = 1; // יש להחליף ב-ID האמיתי של המשתמש

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get('https://localhost:7263/api/Image');
//         const formattedImages = response.data.map((img: { id: number; imageUrl: string; fileName: string; votes: number }) => ({
//           id: img.id,
//           fileName: img.fileName, 
//           url: img.imageUrl,
//           votes: img.votes || 0,
//         }));
//         setUploadedFiles(formattedImages);
//       } catch (err) {
//         setError("שגיאה בטעינת התמונות");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchUserVote = async () => {
//       try {
//         const response = await axios.get(`https://localhost:7263/api/Vote/user/${userId}`);
//         if (response.data) {
//           setSelectedImageId(response.data.imageId);
//         }
//       } catch (err) {
//         console.error("Error fetching user vote", err);
//       }
//     };

//     fetchImages();
//     fetchUserVote();
//   }, [userId]);

//   const handleVote = async (imageId: number) => {
//     if (selectedImageId === imageId) return; // אם כבר נבחרה התמונה, לא עושים כלום

//     try {
//       await axios.post(`https://localhost:7263/api/Vote/add?userId=${userId}&imageId=${imageId}`);
//       setSelectedImageId(imageId);
//       setUploadedFiles(prevFiles =>
//         prevFiles.map(file => ({
//           ...file,
//           votes: file.id === imageId ? file.votes + 1 : file.id === selectedImageId ? file.votes - 1 : file.votes
//         }))
//       );
//     } catch (err) {
//       console.error("Error submitting vote", err);
//     }
//   };

//   if (loading) return <div>טוען תמונות...</div>;
//   if (error) return <div>{error}</div>;
//   if (uploadedFiles.length === 0) return <div>אין תמונות זמינות</div>;

//   return (
//     <div style={galleryStyle}>
//       {uploadedFiles.map((file) => (
//         <div key={file.id} style={imageContainerStyle}>
//           <img src={file.url} alt={file.fileName} style={imageStyle} />
//           <p style={fileNameStyle}>{file.fileName}</p>
//           <button onClick={() => handleVote(file.id)} style={{ ...likeButtonStyle, color: selectedImageId === file.id ? 'blue' : 'gray' }}>
//             <FaThumbsUp /> {file.votes}
//             {/* <span>👍</span> {file.votes}  */}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// const galleryStyle: React.CSSProperties = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//   gap: '10px',
//   padding: '20px',
// };

// const imageContainerStyle: React.CSSProperties = {
//   textAlign: 'center',
// };

// const imageStyle: React.CSSProperties = {
//   width: '100%',
//   height: 'auto',
//   borderRadius: '8px',
//   boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
// };

// const fileNameStyle: React.CSSProperties = {
//   marginTop: '5px',
//   fontSize: '14px',
//   color: '#333',
// };

// const likeButtonStyle: React.CSSProperties = {
//   background: 'none',
//   border: 'none',
//   cursor: 'pointer',
//   fontSize: '16px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginTop: '5px',
// };

// export default ImageGallery;

