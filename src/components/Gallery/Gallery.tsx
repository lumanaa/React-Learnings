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

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const { clientX, clientY } = event;
      const imagePosition = {
        posX: ref.current?.offsetLeft || 0,
        posY: ref.current?.offsetTop || 0,
      };
      const posX = clientX - imagePosition.posX;
      const posY = clientY - imagePosition.posY;

      setClipMask({
        x: (posX / ref.current?.clientWidth) * 100,
        y: (posY / ref.current?.clientHeight) * 100,
      });

      console.log(`X : ${clientX}, Y: ${clientY}`);
    }

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
