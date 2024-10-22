import { useGSAP } from "@gsap/react";
import img1 from "../../assets/eight.jpg";
import img2 from "../../assets/one.jpg";
import img3 from "../../assets/nine.jpg";
import gsap from "gsap";
import { useContext, useRef, useState } from "react";
import { CursorContext } from "../CustomeCursor/CursorManager";

const images = [img1, img2, img3];

interface GalleryItemProps {
  img: string;
}

const GalleryItem = ({ img }: GalleryItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mouseContext = useContext(CursorContext);

  const [clipMaskRadius, setClipMaskRadius] = useState(0);
  const [clipMask, setClipMask] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    gsap.set(".gallery-item-wrapper", {
      paddingTop: "600px", // Correct property notation
    });

    gsap.to(".gallery-item-wrapper", {
      paddingTop: "0px", // Transition padding-top from 200px to 0px
      ease: "power2.out",
      stagger: 0.2, // Delay between animations for multiple items
    });
  }, []);

  return (
    <div
      className='gallery-item-wrapper'
      ref={ref}
      onMouseEnter={() => mouseContext?.setSize("hide")} // Set size to hide on mouse enter
      onMouseLeave={() => mouseContext?.setSize("small")} // Set size to small on mouse leave
    >
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
