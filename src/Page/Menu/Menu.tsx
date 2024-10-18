import { GiHamburgerMenu } from "react-icons/gi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

const Menu = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const openMenu = () => {
    setOverlayOpen(true);
  };

  const closeMenu = () => {
    gsap.to(".overlay", {
      x: "0vw", // Move back to the right side (off-screen)
      duration: 1, // Closing animation duration
      ease: "power2.out",
      onComplete: () => {
        setOverlayOpen(false); // Change state after the animation is done
        // Set the fill color back to black after closing
        gsap.set(".menu-svg", { fill: "black" });
      },
    });
  };

  useGSAP(() => {
    if (isOverlayOpen) {
      gsap.set(".overlay", {
        x: "100vw", // Start off-screen
      });
      gsap.set(".menu", {
        x: "10vw", // Start off-screen
      });

      gsap.to(".overlay", {
        x: "-150vw", // Fully visible
        duration: 1, // Opening animation duration
        ease: "power2.out",
        onComplete: () => {
          // Change the fill color to white after the overlay is open
          gsap.set(".menu-svg", { fill: "white" });

          gsap.to(".menu-svg", { fill: "white", x: "0vw" });
        },
      });
      gsap.to(".menu", { zIndex: 5, x: 0, duration: 0.2 });
    }
  }, [isOverlayOpen]);

  return (
    <>
      <div className='menu'>
        <svg
          width='50'
          height='600'
          viewBox='0 0 80 809'
          xmlns='http://www.w3.org/2000/svg'
          className='menu-svg'
        >
          <path d='M0.0025508 400.983C-0.5214 567.416 80 809 80 809L80 9.5399e-07C80 9.5399e-07 0.518228 237.177 0.0025508 400.983Z'></path>
        </svg>
        <GiHamburgerMenu
          className='menu-icon'
          size={20}
          color='white'
          onClick={openMenu}
        />
      </div>
      {isOverlayOpen && (
        <div className='overlay'>
          <svg
            viewBox='0 150 1000 1000'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M537 1.97869C483.893 16.4315 165.126 110.622 109.702 303C90.0374 371.257 194.618 409.102 282.48 440.897C342.203 462.51 394.202 481.327 394.202 505C394.202 543.694 348.063 572.118 304.486 598.963C264.078 623.856 225.874 647.392 228.702 676.5C232.812 718.788 266.865 739.945 302.543 762.11C329.621 778.932 357.634 796.336 374.202 824C400.599 868.075 318.97 916.841 225.208 972.856C125.383 1032.49 11.8048 1100.35 0.202176 1179.5C-10.6748 1253.7 420.457 1252.28 537 1250.55V1252H2437V1H544.517L544.5 0C544.5 0 543.165 0.33163 540.642 1H537V1.97869Z'
              fill='#1E1E1E'
            />
          </svg>
          <p onClick={closeMenu}>Close</p>
          <div className='close'>
            <svg
              width='50'
              height='600'
              viewBox='0 0 80 809'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0.0025508 400.983C-0.5214 567.416 80 809 80 809L80 9.5399e-07C80 9.5399e-07 0.518228 237.177 0.0025508 400.983Z'></path>
            </svg>
            <GiHamburgerMenu
              className='menu-icon'
              size={20}
              color='white'
              onClick={openMenu}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
