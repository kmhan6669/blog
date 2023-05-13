import { Link } from "react-router-dom";
import styled, { css } from 'styled-components'
import './style.css'
import {ReactComponent as Arrow} from './icon/arrow.svg'

const PLI = styled.div`
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
`

const ImgWrapper = styled.div`
    flex-shrink: 0;
    width: 100%;
    flex: 1 0 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    align-content: flex-end;
    flex-wrap: nowrap;
    background: url(${({thumbnail})=>thumbnail}) no-repeat center / cover, #333333;
`
const CreatorWrapper = styled.div`
    box-sizing: border-box;
    flex-shrink: 0;
    flex: 1 0 0px;
    width:100%;
    height: min-content; /* 109px */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px 30px 20px 30px;
    position: relative;
    align-content: flex-start;
    flex-wrap: nowrap;
    backdrop-filter: blur(10px);
    background-color: rgba(200, 200, 200, 0.5);
    gap:8px;
    position:absolute;
    color:white;
`
const TitleWrapper = styled.div`
    box-sizing: border-box;
    flex-shrink: 0;
    width: 100%;
    height: min-content; /* 114px */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 20px 30px 20px 30px;
    position: relative;
    align-content: flex-start;
    flex-wrap: nowrap;
    gap:6px;
`
const Img = styled.img`
    width:100%;
    height:100%;
`

function PostListItem ({post}){

    const thumbnail = post.ops.find((op)=>op.insert?.image)?.insert.image;
    console.log(post,'post')

    return(
        <PLI>
            <ImgWrapper thumbnail={thumbnail}>
                <CreatorWrapper>
                    <p>{post.creator}</p>
                    <p>{post.date}</p>
                </CreatorWrapper>
            </ImgWrapper>
            <TitleWrapper>
                <h3>{post.title || '제목없음'}</h3>
                <Link className="linkBtn" to={`posts/${post.id}`}>포스트 보기 <Arrow width='20' height='20'/> </Link>
            </TitleWrapper>
        </PLI>
    )
}
export default PostListItem;