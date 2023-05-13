import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import styled from "styled-components";
import {ReactComponent as Edit} from '../icon/edit.svg'
import {ReactComponent as Delete} from '../icon/delete.svg'
import '../style.css'
import { API_BASE_URL } from "../apis";


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
const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`

function PostDetail (){
    const {postId} = useParams();
    const [post, setPost] = useState();
    const navigate = useNavigate();
    
    useEffect(()=>{
        async function getPost(){
            const {data} = await axios.get(`${API_BASE_URL}/apis/posts/${postId}`);
            setPost(data);
        }
        getPost();
    },[postId])
    
    if (!post) {
        return <div>Loading...</div>;
    }
    
    function deletePost(){
        axios.delete(`${API_BASE_URL}/apis/posts/${post.id}`)
        .then(()=>navigate('/'))
    }
    const converter = new QuillDeltaToHtmlConverter(post.ops,{});
    const html = converter.convert();

    const images = document.querySelectorAll('img');
    images.forEach((img)=>{
        img.style.width = '100%'
    })

    return(
        <DetailWrapper>
            <Header>
                <Link className="linkBtn" to={'/'}>블로그 홈</Link>
                <ButtonGroup>
                    <Link className="btn" to={`./edit`}><Edit stroke='white' width='18' height='18'/>포스트 수정</Link>
                    <Link className="btn" onClick={deletePost}><Delete stroke='white' width='18' height='18'/>삭제</Link>
                </ButtonGroup>
            </Header>
            <Contents>
                <Info>
                    <h1>{post.title}</h1>
                    <h3>{post.creator}</h3>
                    <p>{post.date}</p>
                </Info>
                <div className="deltaCustomStyle" dangerouslySetInnerHTML={{__html:html}} />
            </Contents>
        </DetailWrapper>
    )
}
export default PostDetail;