import { Link } from "react-router-dom";
import EditorComponent from "./EditorComponent";
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

function NewPost(){
    return(
        <EditorWrapper>
            <Header>
                <Link className="linkBtn" to={'/'}>블로그 홈</Link>
                <h3>새 포스트 작성</h3>
            </Header>
            <EditorComponent></EditorComponent>
        </EditorWrapper>
    )
}
export default NewPost;