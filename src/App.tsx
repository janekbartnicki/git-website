import './index.css';
import NavBar from './NavBar';
import Card from './Card';
import ShortAbout from './ShortAbout';
import Footer from './Footer';

const App = () => {
  return (
    <>
      <NavBar cartCount={1}/>
      <ShortAbout/>
      <h1 className='text-center font-bold text-2xl'>Nasze produkty</h1>
      <div className='lg:m-20 flex flex-wrap'>
        <Card
          header='Rękawice GiT 1'
          img='images/icon_logo.png'
          price='150'
          desc='Najpopularniejszy model cieszący się ogromną popularnością'
          isNew
        />
        <Card
          header='Rękawice GiT 2'
          img='images/icon_logo.png'
          price='150'
          desc='Najpopularniejszy model cieszący się ogromną popularnością'
        />
        <Card
          header='Rękawice GiT 3'
          img='images/icon_logo.png'
          price='150'
          desc='Najpopularniejszy model cieszący się ogromną popularnością'

        />
        <Card
          header='Rękawice GiT 3'
          img='images/icon_logo.png'
          price='150'
          desc='Najpopularniejszy model cieszący się ogromną popularnością'

        />
      </div>
      <Footer/>
    </>
  )
}

export default App;