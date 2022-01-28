import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";

export default function Single() {

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location]);

  return (
        <div className="single">
            <SinglePost/>
            <Sidebar/>
        </div>
    )
}
