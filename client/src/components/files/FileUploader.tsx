// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     try {
//       // שלב 1: קבלת Presigned URL מהשרת
//       const response = await axios.get('https://localhost:7263/api/upload/presigned-url', {
//         params: { fileName: file.name }
//       });

//       const presignedUrl = response.data.url;
//       console.log("PreSigned URL:", presignedUrl);
//       // שלב 2: העלאת הקובץ ישירות ל-S3
//       await axios.put(presignedUrl, file, {
//         // headers: {
//         //   'Content-Type': file.type,
//         // },
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
//     }
//   };

//   // const fetchUploadedFiles = async () => {
//   //   try {
//   //     const token = getToken();
//   //     const response = await api.get("upload/list-files", {
//   //       params: { userId: context.state.id },
//   //       headers: { Authorization: Bearer ${token} },
//   //     });

//   //     // הפקת Presigned URL לכל קובץ
//   //     const signedUrls = await Promise.all(
//   //       response.data.map(async (fileName: string) => {
//   //         const presignedResponse = await api.get("/upload/presigned-url", {
//   //           params: { fileName, userId: context.state.id },
//   //           headers: { Authorization: Bearer ${token} },
//   //         });
//   //         return { fileName, url: presignedResponse.data.url };
//   //       })
//   //     );

//   //     setUploadedFiles(signedUrls);
//   //   } catch (error) {
//   //     console.error("שגיאה בהבאת רשימת הקבצים:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchUploadedFiles(); // קריאה לשליפת הקבצים כשעמוד נטען
//   // }, []);

//   // // הצגת רשימת הקבצים כאשר הכפתור נלחץ
//   // const toggleFilesDisplay = () => {
//   //   setShowFiles((prev) => !prev);
//   // };

//   return (
//     <div style={{ position: "absolute", top: 10, right: 10 }}>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>העלה קובץ</button>
//       {progress > 0 && <div>התקדמות: {progress}%</div>}
//     </div>
//   );
// };

// export default FileUploader;

import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState('');
  // const [challengeId, setChallengeId] = useState('');
  const [caption, setCaption] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId )
      // (!file || !userId || !challengeId)
       {
      alert("יש למלא את כל השדות ולהעלות קובץ.");
      return;
    }

    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axios.get('https://localhost:7263/api/upload/presigned-url', {
        params: {
          fileName: file.name,
          userId,
          // challengeId,
          caption
        }
      });

      const presignedUrl = response.data.url;
      console.log("PreSigned URL:", presignedUrl);

      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axios.put(presignedUrl, file, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      alert('הקובץ הועלה בהצלחה!');
      
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
      alert("אירעה שגיאה בהעלאת הקובץ");
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="Challenge ID"
        value={challengeId}
        onChange={(e) => setChallengeId(e.target.value)}
      /> */}
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleUpload}>העלה קובץ</button>
      {progress > 0 && <div>התקדמות: {progress}%</div>}
    </div>
  );
};
export default FileUploader;
