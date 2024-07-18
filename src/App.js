import Logo from './Checkmate.logo.svg.png';
import './App.css';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {
  return (

    <div className='List'>
      <img src={Logo}></img>
      <Home />
      <Registration />
      <Login/>
      
    </div>
   
  );
}

export default App;
