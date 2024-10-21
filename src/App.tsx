/* eslint-disable prefer-const */
import { useState } from "react";
import "./App.scss";
import { images } from "./constants";

function App() {
  const [, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide")?.appendChild(items[0]); // Move the first item to the end
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Update the state
  };

  const handlePrevClick = () => {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide")?.prepend(items[items.length - 1]); // Move the last item to the start
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    ); // Update the state
  };

  return (
    <>
      <div className='container'>
        <div className='slide'>
          {images.map((item, i) => (
            <div
              className='item'
              key={i}
              style={{
                backgroundImage: `url(${item.src})`,
              }}
            >
              <div className='content'>
                <div className='name'>{item.name}</div>
                <div className='des'>{item.desc}</div>
                <button>See More</button>
              </div>
            </div>
          ))}
        </div>
        <div className='button'>
          <button className='prev' onClick={handlePrevClick}>
            <i className='fa-solid fa-arrow-left'></i>
          </button>
          <button className='next' onClick={handleNextClick}>
            <i className='fa-solid fa-arrow-right'></i>
          </button>
        </div>
      </div>
      <div id='heart'></div>
    </>
  );
}

export default App;
