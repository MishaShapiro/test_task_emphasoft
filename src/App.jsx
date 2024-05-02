import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

import Users from './components/Users';
import Add from './components/Add';
import Edit from './components/Edit';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/users' element={<Users />}/>
        <Route path='/user/:userID' element={<Edit />}/>
        <Route path='/user/add' element={< Add />}/>
      </Routes>
    </Router>
  );
}

export default App;
