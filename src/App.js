import './App.css';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import RedirectUser from './pages/Redirect/RedirectUser';
import Private from './Components/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home'
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import PostDetail from './pages/PostDetail/PostDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<RedirectUser />}/>
        
        <Route path="/admin"  element={<Private role="admin"><HomeAdmin /></Private>} />
        <Route path="/user"   element={<Private role="user"><Home /></Private>} />
        <Route path="/postDetail/:postId" element={<Private role="user"><PostDetail/></Private>} />
        <Route path="/" element={<Login />} />        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
