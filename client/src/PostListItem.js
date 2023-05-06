import { Link } from "react-router-dom";
import styled, { css } from 'styled-components'
import './style.css'

const PLI = styled.div`
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.25);
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
    background-color: #44ccff;
    overflow: hidden;
    position: relative;
    align-content: flex-end;
    flex-wrap: nowrap;
    
`
const CreatorWrapper = styled.div`
    box-sizing: border-box;
    flex-shrink: 0;
    flex: 1 0 0px;
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
    background-color: rgba(255, 255, 255, 0.5);
    gap:4px;
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
    padding: 30px 30px 30px 30px;
    position: relative;
    align-content: flex-start;
    flex-wrap: nowrap;
    gap:10px
`

function PostListItem ({post}){
    return(
        <PLI>
            <ImgWrapper>
                <img/>
                <CreatorWrapper>
                    <p>{post.creator}</p>
                    <p>{post.date}</p>
                </CreatorWrapper>
            </ImgWrapper>
            <TitleWrapper>
                <h3>{post.title}임시타이틀</h3>
                <Link className="linkBtn" to={`posts/${post.id}`}>포스트 보기</Link>
            </TitleWrapper>
        </PLI>
    )
}
export default PostListItem;