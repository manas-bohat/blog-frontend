import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single"
import Write from "./pages/write/Write";
import Footer from "./components/footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import { useLocation } from "react-router-dom";


function App() {
  const {user} = useContext(Context)  // tells if a user is logged in or not
  return (
    <Router>
      <TopBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element=
        {user ? <Home/> : <Register/>} />
        <Route path="/login" element=
        {user ? <Home/> : <Login/>}/>
        <Route path="/write" element=
        {user ? <Write/> : <Register/>}/>
        <Route path="/settings" element=
        {user ? <Settings/> : <Register/>}/>
        <Route path="/post/:postID" element={<Single/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
