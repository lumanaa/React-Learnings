import CursorManager from "./components/CustomeCursor/CursorManager";
import CustomCursor from "./components/CustomeCursor/CustomCursor";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <>
      <CursorManager>
        <CustomCursor />
        <div className='main-container'>
          <Gallery />
        </div>
      </CursorManager>
    </>
  );
}

export default App;
