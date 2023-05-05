import { Link } from "react-router-dom";
import PostList from "./PostList";
import { useState,useEffect } from "react";
import axios from "axios";


function App() {
  const [posts,setPosts] = useState([]);

  useEffect(() => {

    async function getPosts(){
      const {data} = await axios.get('http://localhost:8000/posts')
      setPosts(data)
    }

    getPosts()
    
  }, [])


  return (
    <div className="App">
      <div>
        <h1>Blog</h1>
        <Link to={'newpost'} >새 포스트 작성</Link>
      </div>
      <PostList posts={posts}/>
    </div>
  );
}

export default App;
