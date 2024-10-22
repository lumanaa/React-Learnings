import React, { useContext, useEffect, useRef } from "react";
import { CursorContext } from "./CursorManager";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorContext = useContext(CursorContext);

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => {
      if (cursorRef.current) {
        const { clientX, clientY } = event; // x and y position on the screen
        const mouseX = clientX - cursorRef.current.clientWidth / 2;
        const mouseY = clientY - cursorRef.current.clientHeight / 2;

        // Apply transform if cursorRef is not null
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    document.addEventListener("mousemove", moveCursor);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className={`app-cursor ${cursorContext?.size}`} ref={cursorRef}></div>
  );
};

export default CustomCursor;
