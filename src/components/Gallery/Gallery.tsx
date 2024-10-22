import { useGSAP } from "@gsap/react";
import img1 from "../../assets/eight.jpg";
import img2 from "../../assets/one.jpg";
import img3 from "../../assets/nine.jpg";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import { CursorContext } from "../CustomeCursor/CursorManager";

const images = [img1, img2, img3];

interface GalleryItemProps {
  img: string;
}

const GalleryItem = ({ img }: GalleryItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mouseContext = useContext(CursorContext);

  const [clipMaskRadius, setClipMaskRadius] = useState(0); // Adjust this for initial masking
  const [clipMask, setClipMask] = useState({ x: 50, y: 50 });

  useGSAP(() => {
    gsap.set(".gallery-item-wrapper", {
      paddingTop: "600px",
    });

    gsap.to(".gallery-item-wrapper", {
      paddingTop: "0px",
      ease: "power2.out",
      stagger: 0.2,
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const imagePosition = ref.current?.getBoundingClientRect();

      if (imagePosition) {
        const posX = clientX - imagePosition.left;
        const posY = clientY - imagePosition.top;

        // Update clip mask coordinates
        setClipMask({
          x: (posX / imagePosition.width) * 100,
          y: (posY / imagePosition.height) * 100,
        });
      }
    };

    const currentRef = ref.current;
    currentRef?.addEventListener("mousemove", handleMouseMove);

    return () => {
      currentRef?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className='gallery-item-wrapper'
      ref={ref}
      onMouseEnter={() => {
        setClipMaskRadius(25);
        mouseContext?.setSize("hide");
      }}
      onMouseLeave={() => {
        setClipMaskRadius(0);
        mouseContext?.setSize("small");
      }}
    >
      <div className='gallery-item'>
        <div
          className='gallery-item-img sepia'
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div
          className='gallery-item-img masked'
          style={{
            backgroundImage: `url(${img})`,
            clipPath: `circle(${clipMaskRadius}% at ${clipMask.x}% ${clipMask.y}%)`,
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
