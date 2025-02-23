import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImageData } from "../types";

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    axios
      .get<ImageData[]>("http://localhost:5000/api/images")
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold text-center mb-12">Image Gallery</h1>
      <div className="grid grid-cols-11 gap-4">
        {images.map((img, index) => (
          <div key={index} className="text-center bg-white shadow-md rounded-lg p-2">
            <div className="w-[50px] h-[50px] overflow-hidden rounded-md mx-auto"
            onClick={() => {
              navigator.clipboard.writeText(img.name)
                .then(() => alert(`Copied '${img.name}'.`))
                .catch(err => console.error("Failed to copy:", err));
            }}
          >
              <img 
                src={img.url} 
                alt={img.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-1 text-s text-gray-700 truncate">{img.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
