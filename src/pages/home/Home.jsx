import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {

  const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location]);

  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  // fetch and set posts when component mounts
  useEffect(()=> {
    const fetchPosts = async () => {
      const res = await axios.get("/posts"+search);
      res.data.reverse();
      setPosts(res.data);
    }
    fetchPosts()
  }, [search])

  return( 
    <>
      <Header/>
      <div className="home">
          <Posts posts = {posts} />
          <Sidebar/>
      </div>
    </>
  )
}
