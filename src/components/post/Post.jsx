import "./post.css";
import { Link } from "react-router-dom";

export default function Post({post}) {

    const PF = "https://fast-earth-67440.herokuapp.com/images/"        // public folder

  return ( 
        <div className="post">
            <div className="postCard">
                {post.photo && <img className="postImg" src={PF + post.photo} alt="friends"/>}               
                <div className="postInfo">
                    <span className="postTitle">
                        <Link className="link" to={`/post/${post._id}`}>{post.title}</Link>
                    </span>
                    <hr/>
                    <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className="postDesc">
                    {post.desc}
                </p>
            </div>
        </div>
    )
}
