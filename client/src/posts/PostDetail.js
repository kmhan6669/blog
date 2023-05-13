import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import styled from "styled-components";
import {ReactComponent as Edit} from '../icon/edit.svg'


const DetailWrapper = styled.div`
    max-width: 900px;
    display: flex; 
    justify-content: center;
    margin: 0 auto;
    flex-direction: column;
`
const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem;
`
const Contents = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5rem;
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    gap:8px;
    margin-bottom:2rem;
`

function PostDetail (){
    const {postId} = useParams();
    const [post, setPost] = useState();

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
        <DetailWrapper>
            <Header>
                <Link className="linkBtn" to={'/'}>블로그 홈</Link>
                <Link className="btn" to={`./edit`}><Edit stroke='white' width='18' height='18'/>포스트 수정</Link>
            </Header>
            <Contents>
                <Info>
                    <h1>{post.title}</h1>
                    <h3>{post.creator}</h3>
                    <p>{post.date}</p>
                </Info>
                <div dangerouslySetInnerHTML={{__html:html}} />
            </Contents>
        </DetailWrapper>
    )
}
export default PostDetail;