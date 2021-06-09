import './App.scss';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import Navbar from '../components/layout/Navbar';
import MobileNav from '../components/layout/MobileNav';

import Homepage from '../components/pages/Homepage/Homepage';
import Login from './pages/Login/Login';

const history = createBrowserHistory();

function App() {


  return (

    <div className="app container-fluid p-0" id="main-container">
      <Router>
        {/* show nav unless on login or signup pages.
        Eventually this will be based on isAuthenticated */}
        {history.location.pathname !== '/login' && history.location.pathname !== '/signup' && <Navbar />}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        {/* <Homepage /> */}
      </Router>
    </div>
  );
}

export default App;
