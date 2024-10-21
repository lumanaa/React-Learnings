import { useEffect, useState } from "react";
import img1 from "../../assets/eight.jpg";
import img2 from "../../assets/one.jpg";
import img3 from "../../assets/seven.jpg";

const images = [img1, img2, img3];

interface GalleryItemProps {
  img: string;
}

const GalleryItem = ({ img }: GalleryItemProps) => {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReveal(true);
    }, 100);
  }, []);

  return (
    <div className={`gallery-item-wrapper ${reveal ? "is-reveal" : ""}`}>
      <div className='gallery-item'>
        <div
          className='gallery-item-img sepia'
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
        <div
          className='gallery-item-img masked'
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <div className='gallery'>
      {images.map((img) => (
        <GalleryItem key={img} img={img} />
      ))}
    </div>
  );
};

export default Gallery;
