import "./header.css"
// import beauty from "../assets/beauty.jpg"
import image from "../assets/hero2.jpg"

export default function Header() {
  return ( 
    <div className='header'>
        <div className="headerTitles">
            <span className="headerTitle">Word on the Street</span>
        </div>
        <img className="headerImg" src={image}/>
    </div>
    );
}
