import './App.scss';


import Navbar from '../components/layout/Navbar';
import MobileNav from '../components/layout/MobileNav';

import Homepage from '../components/pages/Homepage';

function App() {
  return (
    <div className="container-fluid p-0" id="main-container">
        <Navbar/>
        <Homepage/>
    </div>
  );
}

export default App;
