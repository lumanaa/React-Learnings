import { GiHamburgerMenu } from "react-icons/gi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Menu = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  // Handle mouse movement

  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX;
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    // Check if the overlay is not open
    if (!isOverlayOpen) {
      // Show the menu only when the user is not at the top of the page
      if (currentScrollPosition !== 0) {
        // Show the menu when the mouse is within 40px of the right edge of the window
        if (mouseX >= window.innerWidth - 40) {
          setIsHovered(true);
          setIsVisible(true); // Show menu when mouse is on the right edge
        } else {
          setIsHovered(false);
          setIsVisible(false); // Hide menu when mouse is not on the right edge
        }
      } else {
        // If at the top, ensure the menu is visible
        setIsVisible(true); // Always show menu at the top
      }
    }
  };

  // Handle scroll event
  const handleScroll = () => {
    if (isOverlayOpen) return; // Skip if the overlay is open

    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    // Show menu when scrolled to the top of the page
    if (currentScrollPosition === 0) {
      setIsVisible(true); // Show menu at the top
    }
    // Hide the menu only when scrolling down
    else if (currentScrollPosition > lastScrollPosition) {
      setIsVisible(false); // Hide menu on scrolling down
    }
    // Do not show the menu when scrolling up
    else if (currentScrollPosition < lastScrollPosition) {
      // Only show menu if the user has scrolled back to the top
      if (currentScrollPosition === 0) {
        setIsVisible(true); // Show menu at the top
      }
    }

    // Update last scroll position
    setLastScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up event listeners on component unmount
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]); // Dependencies for cleanup

  const openMenu = () => {
    setOverlayOpen(true);
  };

  const closeMenu = () => {
    setIsVisible(false);
    setTimeout(() => {
      setOverlayOpen(false); // Change state after the animation is done
    }, 490);
    gsap.to(".overlay", {
      x: "0vw", // Move back to the right side (off-screen)
      duration: 1, // Closing animation duration
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".menu-svg", {
          fill: "black",
        });
        gsap.to(".menu-icon", {
          fill: "white",
        });
      },
    });
    gsap.set(".menu", {
      x: "10vw",
    });
    gsap.to(".menu", {
      x: 0,
      duration: 1,
    });
    gsap.to(".menu-svg", {
      fill: "black",
    });
    gsap.to(".menu-icon", {
      fill: "white",
    });
  };

  useGSAP(() => {
    if (isOverlayOpen) {
      gsap.set(".menu", {
        x: "10vw",
      });

      gsap.to(".menu", { zIndex: 5, x: 0, duration: 0.3 });
      gsap.to(".menu-svg", {
        fill: "white",
      });
      gsap.to(".menu", {
        duration: 0.8,
        x: 0,
      });
      gsap.to(".menu-icon", {
        fill: "black",
      });

      gsap.to(".overlay", {
        x: "-140vw", // Fully visible
        duration: 1, // Opening animation duration
        ease: "power2.out",
      });
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    if (isVisible) {
      gsap.to(".menu", {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(".menu", {
        x: "10vw",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  return (
    <>
      <div className={`menu ${isVisible && isHovered ? "visible" : "hidden"}`}>
        <svg
          width='50'
          height='600'
          viewBox='0 0 80 809'
          xmlns='http://www.w3.org/2000/svg'
          className='menu-svg'
        >
          <path d='M0.0025508 400.983C-0.5214 567.416 80 809 80 809L80 9.5399e-07C80 9.5399e-07 0.518228 237.177 0.0025508 400.983Z'></path>
        </svg>
        {!isOverlayOpen ? (
          <GiHamburgerMenu
            className='menu-icon'
            size={20}
            color='white'
            onClick={openMenu}
          />
        ) : (
          <RxCross2
            className='menu-icon'
            size={28}
            color='black'
            onClick={closeMenu}
          />
        )}
      </div>
      {isOverlayOpen && (
        <div className='overlay'>
          <svg
            viewBox='0 0 1000 1000'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M171.542 0H334.23H1164.27H2437V1024H334.23V1023.18H35.4155V982.254H76.3639V961.79H0V920.863L35.4155 920.863V879.936H61.9762V839.009H108.458V798.082H61.9762V757.154H12.1737V716.227H49.8025V675.3H12.1737V634.373H49.8025V593.445H92.9643V552.518H132.807V511.591H108.458V470.664H76.3639V429.736H35.4155V388.809H76.3639V347.882H334.23V347.881H49.8025V306.954H92.9643V266.027H132.807V225.1H334.23V225.1H171.542V204.637H108.458V163.709H334.23V163.709H49.8025V122.782L92.9643 122.782V81.8545L132.807 81.8545V40.9272L171.542 40.9273V0Z'
              fill='#1E1E1E'
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Menu;
