// // גירסה אחרי פסח עובד 

// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { UsersContext } from '../context/UserProvider';

// const FileUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [challengeId, setChallengeId] = useState('');
//   const [caption, setCaption] = useState('');
//   const context = useContext(UsersContext);

//   if (!context) {
//     throw new Error("UserContext must be used within a UserProvider");
//   }
//   const { state } = context;
//   const userId = state.id

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !challengeId)
//     // (!file || !userId || !challengeId)
//     {
//       alert("יש למלא את כל השדות ולהעלות קובץ.");
//       return;
//     }

//     try {
//       // שלב 1: קבלת Presigned URL מהשרת
//       const response = await axiosInstance.get('https://localhost:7263/api/upload/presigned-url', {
//         params: {
//           fileName: file.name,
//           userId,
//           challengeId,
//           caption
//         }
//       });

//       const presignedUrl = response.data.url;
//       console.log("PreSigned URL:", presignedUrl);

//       // שלב 2: העלאת הקובץ ישירות ל-S3
//       await axiosInstance.put(presignedUrl, file, {
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });

//       alert('הקובץ הועלה בהצלחה!');

//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//       alert("אירעה שגיאה בהעלאת הקובץ");
//     }
//   };

//   return (
//     <div style={{ position: "absolute", top: 10, right: 10 }}>
//       <input type="file" onChange={handleFileChange} />
//       <input
//         type="text"
//         placeholder="Challenge ID"
//         value={challengeId}
//         onChange={(e) => setChallengeId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Caption"
//         value={caption}
//         onChange={(e) => setCaption(e.target.value)}
//       />
//       <button onClick={handleUpload}>העלה קובץ</button>
//       {progress > 0 && <div>התקדמות: {progress}%</div>}
//     </div>
//   );
// };
// export default FileUploader;

// גירסה ב cloud

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useUserContext } from '../context/UserProvider';
// import { Button, TextField, Box, Paper, LinearProgress, Typography, Stack, IconButton } from '@mui/material';
// import { CloudUpload, Close } from '@mui/icons-material';

// const FileUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [challengeId, setChallengeId] = useState('');
//   const [caption, setCaption] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [fileName, setFileName] = useState('');
//   const { state } = useUserContext();
//   const userId = state.id;

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//     }
//   };

//   const clearFile = () => {
//     setFile(null);
//     setFileName('');
//   };

//   const handleUpload = async () => {
//     if (!file || !challengeId) {
//       alert("יש למלא את כל השדות ולהעלות קובץ.");
//       return;
//     }

//     setUploading(true);

//     try {
//       // שלב 1: קבלת Presigned URL מהשרת
//       const response = await axiosInstance.get('https://localhost:7263/api/upload/presigned-url', {
//         params: {
//           fileName: file.name,
//           userId,
//           challengeId,
//           caption
//         }
//       });

//       const presignedUrl = response.data.url;
//       console.log("PreSigned URL:", presignedUrl);

//       // שלב 2: העלאת הקובץ ישירות ל-S3
//       await axiosInstance.put(presignedUrl, file, {
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });

//       alert('הקובץ הועלה בהצלחה!');
//       // איפוס הטופס לאחר העלאה מוצלחת
//       setFile(null);
//       setFileName('');
//       setChallengeId('');
//       setCaption('');
//       setProgress(0);

//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//       alert("אירעה שגיאה בהעלאת הקובץ");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Paper elevation={2} sx={{ p: 3, borderRadius: 2, maxWidth: 600, mx: 'auto' }}>
//       <Typography variant="h6" gutterBottom align="center">
//         העלאת תמונה לאתגר
//       </Typography>
      
//       <Box sx={{ mb: 3 }}>
//         <TextField
//           label="מזהה האתגר"
//           variant="outlined"
//           fullWidth
//           value={challengeId}
//           onChange={(e) => setChallengeId(e.target.value)}
//           margin="normal"
//           required
//           sx={{ direction: 'rtl' }}
//         />
        
//         <TextField
//           label="כיתוב לתמונה"
//           variant="outlined"
//           fullWidth
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           margin="normal"
//           sx={{ direction: 'rtl' }}
//         />
//       </Box>
      
//       <Box sx={{ mb: 3 }}>
//         <input
//           accept="image/*"
//           style={{ display: 'none' }}
//           id="file-upload-button"
//           type="file"
//           onChange={handleFileChange}
//         />
        
//         {!file ? (
//           <label htmlFor="file-upload-button">
//             <Button
//               component="span"
//               variant="contained"
//               fullWidth
//               startIcon={<CloudUpload />}
//               sx={{ py: 1.5 }}
//             >
//               בחר תמונה
//             </Button>
//           </label>
//         ) : (
//           <Stack direction="row" spacing={1} alignItems="center">
//             <TextField
//               variant="outlined"
//               fullWidth
//               value={fileName}
//               disabled
//               size="small"
//             />
//             <IconButton onClick={clearFile} color="error" size="small">
//               <Close />
//             </IconButton>
//           </Stack>
//         )}
//       </Box>
      
//       {progress > 0 && (
//         <Box sx={{ mb: 2 }}>
//           <LinearProgress variant="determinate" value={progress} sx={{ mb: 1, borderRadius: 1 }} />
//           <Typography variant="body2" align="center">
//             {`${progress}%`}
//           </Typography>
//         </Box>
//       )}
      
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleUpload}
//         disabled={!file || uploading}
//         sx={{ py: 1.5 }}
//       >
//         {uploading ? 'מעלה...' : 'העלה תמונה'}
//       </Button>
//     </Paper>
//   );
// };

// export default FileUploader;


// גירסה ג שבה לא צריך לכתוב את מזהה האתגר הוא נשלח אוטומטית מהשרת
// גירסה זו בעצם לקחתי את גירסה א ושלחתי לבינה וזה מה שהביא
//עבד מצוין
// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { UsersContext } from '../context/UserProvider';

// const FileUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [challengeId, setChallengeId] = useState<number | null>(null);
//   const [caption, setCaption] = useState('');
//   const context = useContext(UsersContext);

//   if (!context) throw new Error("UserContext must be used within a UserProvider");
//   const { state } = context;
//   const userId = state.id;

//   useEffect(() => {
//     const fetchCurrentChallenge = async () => {
//       try {
//         const res = await axiosInstance.get('https://localhost:7263/api/challenge/last');
//         setChallengeId(res.data.id);
//       } catch (err) {
//         console.error('שגיאה בקבלת אתגר נוכחי', err);
//       }
//     };
//     fetchCurrentChallenge();
//   }, []);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !challengeId) {
//       alert("יש להעלות קובץ ולהמתין לטעינת אתגר.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.get('https://localhost:7263/api/upload/presigned-url', {
//         params: {
//           fileName: file.name,
//           userId,
//           challengeId,
//           caption
//         }
//       });

//       const presignedUrl = response.data.url;

//       await axiosInstance.put(presignedUrl, file, {
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
//           setProgress(percent);
//         },
//       });

//       alert('הקובץ הועלה בהצלחה!');
//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//       alert("אירעה שגיאה בהעלאת הקובץ");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
//       <h3>העלאת תמונה לאתגר השבועי</h3>
//       <input type="file" onChange={handleFileChange} />
//       <input
//         type="text"
//         placeholder="כתוב כיתוב לתמונה (לא חובה)"
//         value={caption}
//         onChange={(e) => setCaption(e.target.value)}
//         style={{ display: 'block', margin: '10px 0', width: '100%' }}
//       />
//       <button onClick={handleUpload}>העלה קובץ</button>
//       {progress > 0 && <div>התקדמות: {progress}%</div>}
//     </div>
//   );
// };

// export default FileUploader;


//גירסה מעוצבת  V0
"use client"

import type React from "react"

import { useContext, useEffect, useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
  Paper,
  useTheme,
  Alert,
  IconButton,
  Fade,
} from "@mui/material"
import { CloudUpload, Close, Image } from "@mui/icons-material"
import { UsersContext } from "../context/UserProvider"
import axiosInstance from "../axiosInstance"
interface FileUploaderProps {
  onUploadSuccess?: () => void
}

const FileUploader = ({ onUploadSuccess }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [challengeId, setChallengeId] = useState<number | null>(null)
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const theme = useTheme()

  const context = useContext(UsersContext)
  if (!context) throw new Error("UserContext must be used within a UserProvider")
  const { state } = context
  const userId = state.id

  useEffect(() => {
    const fetchCurrentChallenge = async () => {
      try {
        const res = await axiosInstance.get("/challenge/last")
        setChallengeId(res.data.id)
      } catch (err) {
        console.error("Error fetching current challenge", err)
        setError("Could not fetch current challenge. Please try again later.")
      }
    }
    fetchCurrentChallenge()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check if file is an image
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select an image file (JPEG, PNG, etc.)")
        return
      }

      // Check file size (limit to 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit")
        return
      }

      setFile(selectedFile)
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file || !challengeId) {
      setError("Please select a file and ensure the challenge is loaded.")
      return
    }

    setLoading(true)
    setProgress(0)
    setError(null)

    try {
      const response = await axiosInstance.get("https://localhost:7263/api/upload/presigned-url", {
        params: {
          fileName: file.name,
          userId,
          challengeId,
          caption,
        },
      })

      const presignedUrl = response.data.url

      await axiosInstance.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setProgress(percent)
        },
      })

      setSuccess(true)
      setFile(null)
      setPreview(null)
      setCaption("")
      setProgress(0)

      // Call the success callback if provided
      if (onUploadSuccess) {
        setTimeout(() => {
          onUploadSuccess()
        }, 1500)
      }
    } catch (error) {
      console.error("Upload error:", error)
      setError("An error occurred during upload. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    setError(null)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {success ? (
        <Fade in={true}>
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            action={
              <IconButton aria-label="close" color="inherit" size="small" onClick={() => setSuccess(false)}>
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Your photo has been uploaded successfully!
          </Alert>
        </Fade>
      ) : null}

      {error ? (
        <Fade in={true}>
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
              <IconButton aria-label="close" color="inherit" size="small" onClick={() => setError(null)}>
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Fade>
      ) : null}

      {!preview ? (
        <Box
          sx={{
            border: `2px dashed ${theme.palette.primary.main}40`,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            backgroundColor: theme.palette.primary.main + "05",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: theme.palette.primary.main + "10",
              borderColor: theme.palette.primary.main,
            },
          }}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2, opacity: 0.7 }} />
          <Typography variant="h6" gutterBottom>
            Drag & Drop or Click to Upload
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supported formats: JPEG, PNG, GIF (Max size: 5MB)
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mb: 3, position: "relative" }}>
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              width: "100%",
              height: 300,
              objectFit: "contain",
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          />
          <IconButton
            onClick={handleRemoveFile}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
      )}

      <TextField
        fullWidth
        label="Caption (optional)"
        variant="outlined"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        margin="normal"
        placeholder="Add a caption to your photo"
        disabled={loading}
      />

      {progress > 0 && progress < 100 && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Uploading: {progress}%
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          onClick={() => document.getElementById("file-input")?.click()}
          disabled={loading}
          startIcon={<Image />}
        >
          {file ? "Change Photo" : "Select Photo"}
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || loading}
          startIcon={<CloudUpload />}
          sx={{
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
              transform: "translateX(-100%)",
              transition: "transform 0.6s ease-in-out",
            },
            "&:not(:disabled):hover::after": {
              transform: "translateX(100%)",
            },
          }}
        >
          {loading ? "Uploading..." : "Upload Photo"}
        </Button>
      </Box>
    </Paper>
  )
}

export default FileUploader