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


import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { FaThumbsUp } from 'react-icons/fa';

const ImageGallery = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{ id: number; fileName: string; url: string; votes: number }[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = 1; // יש להחליף ב-ID האמיתי של המשתמש

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://localhost:7263/api/Image');
        const formattedImages = response.data.map((img: { id: number; imageUrl: string; fileName: string; votes: number }) => ({
          id: img.id,
          fileName: img.fileName, 
          url: img.imageUrl,
          votes: img.votes || 0,
        }));
        setUploadedFiles(formattedImages);
      } catch (err) {
        setError("שגיאה בטעינת התמונות");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserVote = async () => {
      try {
        const response = await axios.get(`https://localhost:7263/api/Vote/user/${userId}`);
        if (response.data) {
          setSelectedImageId(response.data.imageId);
        }
      } catch (err) {
        console.error("Error fetching user vote", err);
      }
    };

    fetchImages();
    fetchUserVote();
  }, [userId]);

  const handleVote = async (imageId: number) => {
    if (selectedImageId === imageId) return; // אם כבר נבחרה התמונה, לא עושים כלום

    try {
      await axios.post(`https://localhost:7263/api/Vote/add?userId=${userId}&imageId=${imageId}`);
      setSelectedImageId(imageId);
      setUploadedFiles(prevFiles =>
        prevFiles.map(file => ({
          ...file,
          votes: file.id === imageId ? file.votes + 1 : file.id === selectedImageId ? file.votes - 1 : file.votes
        }))
      );
    } catch (err) {
      console.error("Error submitting vote", err);
    }
  };

  if (loading) return <div>טוען תמונות...</div>;
  if (error) return <div>{error}</div>;
  if (uploadedFiles.length === 0) return <div>אין תמונות זמינות</div>;

  return (
    <div style={galleryStyle}>
      {uploadedFiles.map((file) => (
        <div key={file.id} style={imageContainerStyle}>
          <img src={file.url} alt={file.fileName} style={imageStyle} />
          <p style={fileNameStyle}>{file.fileName}</p>
          <button onClick={() => handleVote(file.id)} style={{ ...likeButtonStyle, color: selectedImageId === file.id ? 'blue' : 'gray' }}>
            {/* <FaThumbsUp /> {file.votes} */}
            <span>👍</span> {file.votes} 
          </button>
        </div>
      ))}
    </div>
  );
};

const galleryStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '10px',
  padding: '20px',
};

const imageContainerStyle: React.CSSProperties = {
  textAlign: 'center',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};

const fileNameStyle: React.CSSProperties = {
  marginTop: '5px',
  fontSize: '14px',
  color: '#333',
};

const likeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5px',
};

export default ImageGallery;
