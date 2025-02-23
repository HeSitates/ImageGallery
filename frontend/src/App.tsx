import React from "react";
import ImageGallery from "./components/ImageGallery";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <ImageGallery />
    </div>
  );
};

export default App;
