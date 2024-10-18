import { useEffect, useRef, useMemo } from "react";
import "../scss/index.scss";
import gsap from "gsap";

const Div1 = () => {
  const projectsRef = useRef<HTMLDivElement | null>(null); // Change to HTMLDivElement
  const previewRef = useRef<HTMLDivElement | null>(null); // Change to HTMLDivElement
  const previewImgRef = useRef<HTMLDivElement | null>(null); // Change to HTMLDivElement

  let isInside = false;

  const bgImages = useMemo(
    () => ({
      p1: "/src/assets/one.jpg",
      p2: "/src/assets/two.jpg",
      p3: "/src/assets/three.jpg",
      p4: "/src/assets/four.jpg",
      p5: "/src/assets/five.jpg",
      p6: "/src/assets/six.jpg",
    }),
    []
  );

  const bgPositions = useMemo(
    () => ({
      p1: "0 0",
      p2: "0 16%",
      p3: "0 32%",
      p4: "0 58%",
      p6: "0 74%",
      p5: "0 100%",
    }),
    []
  );

  const moveStuff = (e: MouseEvent) => {
    const projects = projectsRef.current;
    const preview = previewRef.current;

    if (!projects || !preview) return;

    const mouseInside = isMouseInsideContainer(e, projects);
    if (mouseInside !== isInside) {
      isInside = mouseInside;
      gsap.to(preview, {
        scale: isInside ? 1 : 0,
        duration: 0.3,
      });
    }
  };

  const moveProject = (e: MouseEvent) => {
    const preview = previewRef.current;
    if (!preview) return;

    const offsetX = preview.offsetWidth / 2;
    const offsetY = preview.offsetHeight / 2;

    preview.style.left = `${e.pageX - offsetX}px`;
    preview.style.top = `${e.pageY - offsetY}px`;
  };

  const moveProjectImg = (project: HTMLDivElement) => {
    const previewImg = previewImgRef.current;
    const projectId = project.id;
    if (!previewImg) return;

    const newImageUrl = bgImages[projectId as keyof typeof bgImages];
    if (newImageUrl) {
      previewImg.style.backgroundImage = `url(${newImageUrl})`;
    }

    gsap.to(previewImg, {
      duration: 0.4,
      backgroundPosition:
        bgPositions[projectId as keyof typeof bgPositions] || "0 0",
    });
  };

  const isMouseInsideContainer = (e: MouseEvent, projects: HTMLDivElement) => {
    const containerRect = projects.getBoundingClientRect();

    return (
      e.pageX >= containerRect.left &&
      e.pageX <= containerRect.right &&
      e.pageY >= containerRect.top &&
      e.pageY <= containerRect.bottom
    );
  };

  const handleMouseMove = (e: MouseEvent) => {
    moveStuff(e);
    const projects = projectsRef.current;
    if (projects && isInside) {
      const projectElements = Array.from(projects.children) as HTMLDivElement[];

      projectElements.forEach((project) => {
        const projectRect = project.getBoundingClientRect();

        if (
          e.pageX >= projectRect.left &&
          e.pageX <= projectRect.right &&
          e.pageY >= projectRect.top &&
          e.pageY <= projectRect.bottom
        ) {
          moveProject(e);
          moveProjectImg(project);
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id='dd1' className='dd'>
      <div className='img-body'>
        <div className='preview' ref={previewRef}>
          <div className='preview-img' ref={previewImgRef}></div>
        </div>
        
        <div className='container'>
          <div className='projects' ref={projectsRef}>
           
            {["p1", "p2", "p3", "p4", "p5", "p6"].map((id) => (
              <div className='project' id={id} key={id}>
                <div className='client'>
                  <p>Project</p>
                </div>
                <div className='location'>
                  <p>Location</p>
                </div>
                <div className='service'>
                  <p>Category</p>
                </div>
                <div className='year'>
                  <p>Year</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Div1;
