
import './App.css';
import {Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
// import Login from './components/Authentication/login';


function App() {
  return (

     <div className="App">
      <Route path='/' component={HomePage} exact/>
     <Route path='/chats' component={ChatPage} />
     </div>
  );
}

export default App;
