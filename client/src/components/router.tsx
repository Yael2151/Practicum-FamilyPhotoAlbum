import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./Home";
import PreviousChallenges from "./files/PreviousChallenges";
import ImageGallery from "./files/ShowImages";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'previous-challenges',
        element: <PreviousChallenges />,
      },
      {
        path: 'ImageGallery',
        element: <ImageGallery />
      },

    ]
  }
]);
