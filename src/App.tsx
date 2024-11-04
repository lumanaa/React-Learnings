import aboutImg from "./assets/about.jpg";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";

const App = () => {
  return (
    <div className='container'>
      <section className='hero'>
        <h1>JINX</h1>
        <p>
          Power doesn't come to those who were born strongest, fastest or
          smartest. It comes to those who will do anything to achieve it.
        </p>
      </section>
      <section className='about'>
        <div className='about-img'>
          <img src={aboutImg} alt='' />
        </div>
        <div className='about-copy'>
          <h1>League of Legends - Arcane</h1>
        </div>
      </section>
      <section className='sticky'>
        <div className='intro'>
          <div className='intro-col'>
            <p>Don't cry</p>
            <p>You're perfect</p>
          </div>
          <div className='intro-col'>
            <p>Fear haunts us all , child.</p>
          </div>
        </div>
        <div className='img-1'>
          <img src={img1} alt='' />
        </div>
        <div className='img-2'>
          <img src={img2} alt='' />
        </div>
        <div className='img-3'>
          <img src={img3} alt='' />
        </div>
        <div className='copy'>
          <h1>
            Imprisonment. What a curious principle , we confine the physical
            body yet the mind is still free
          </h1>
        </div>
      </section>
      <section className='footer'>
        <p>Loneliness is a byproduct of a gifted mind.</p>
      </section>
    </div>
  );
};

export default App;
