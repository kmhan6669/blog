import { Link } from "react-router-dom";
import EditorComponent2 from "./EditorComponent2";
import styled from "styled-components";

const EditorWrapper = styled.div`
    max-width: 900px;
    display: flex; 
    justify-content: center;
    margin: 0 auto;
    flex-direction: column;
    height: 100vh;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1.5rem;
    gap: 20px;
`

function PostEdit(){
    return(
        <EditorWrapper>
            <Header>
                <Link className="linkBtn" to={'/'}>블로그 홈</Link>
                <h3>포스트 수정</h3>
            </Header>
            <EditorComponent2></EditorComponent2>
        </EditorWrapper>
    )
}
export default PostEdit;