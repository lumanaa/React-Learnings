import { GiHamburgerMenu } from "react-icons/gi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

gsap.registerPlugin(useGSAP);

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
        if (mouseX >= window.innerWidth - 70) {
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
    }, 520);
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
        ease: "circ.out",
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
      <div
        className={`menu ${
          isOverlayOpen || (isVisible && isHovered) ? "visible" : "hidden"
        }`}
      >
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
            viewBox='0 0 1300 1000'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M122.487 0H2740.03V25V50V75V100V125V150V175V200V225V250V275V300V325V350V375V400V425V450V475V500V525V550V575V600V625V650V675V700V725V750V775V800V825V850V875V900V925V950V975V1000V1025H153.108V1000H459.325V975H61.2433V950H214.352V925H139.635V900H367.46V875H260.897V850H324.59V825H139.635V800H459.325V775H69.8174V750H91.865V725H260.897V700H336.838V675H398.082V650H416.455V625H520.568V600H69.8174V575H306.217V550H398.082V525H139.635V500H336.838V475H306.217V450H244.973V425H367.46V400H214.352V375H100.439V350H172.706V325H139.635V300H100.439V275H61.2433V250H30.6217V225H107.788V200H183.73V175H153.108V150H0V125H91.865V100H61.2433V75H30.6217V50H69.8174V25H122.487V0Z'
              fill='#1E1E1E'
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Menu;
