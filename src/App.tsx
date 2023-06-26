import './index.css';
import Home from './Home';
import Footer from './Footer';
import NavBar from './NavBar';
import Shop from './Shop';

const App = () => {
  return (
    <>
      <NavBar cartCount={1}/>
      <Shop/>
      <Footer/>
    </>
  )
}

export default App;