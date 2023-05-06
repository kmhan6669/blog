import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

function PostDetail (){
    const {postId} = useParams();
    const [post, setPost] = useState([]);

    useEffect(()=>{
        async function getPost(){
            const {data} = await axios.get('http://localhost:8000/posts/');
            setPost(data[postId]);
        }
        getPost();
        console.log(post)
    },[postId])

    if (!post) {
        return <div>Loading...</div>;
    }

    const converter = new QuillDeltaToHtmlConverter(post.ops,{});
    const html = converter.convert();

    return(
        <>
        <Link to={'/'}>블로그 홈</Link>
        <h1>{post.title}</h1>
        <h5>{post.creator}</h5>
        <p>{post.date}</p>
        <button>포스트 수정</button>
        <div dangerouslySetInnerHTML={{__html:html}} />
        </>
    )
}
export default PostDetail;