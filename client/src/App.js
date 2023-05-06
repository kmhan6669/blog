import { Link } from "react-router-dom";
import PostList from "./PostList";
import { useState,useEffect } from "react";
import axios from "axios";
import './style.css'
import styled from "styled-components";


function App() {
  const [posts,setPosts] = useState([]);

  useEffect(() => {

    async function getPosts(){
      const {data} = await axios.get('http://localhost:8000/posts')
      setPosts(data)
    }

    getPosts()
    
  }, [])

  const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem;
  `

  return (
    <div className="App">
      <Header>
        <h1>Blog</h1>
        <Link className="btn" to={'newpost'} >새 포스트 작성</Link>
      </Header>
      <PostList posts={posts}/>
    </div>
  );
}

export default App;
