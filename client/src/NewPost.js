import { Link } from "react-router-dom";
import EditorComponent from "./EditorComponent";


function NewPost(){
    return(
        <>
        <Link to={'/'}>블로그 홈으로</Link>
        <h1>새 포스트 작성</h1>
        <EditorComponent></EditorComponent>
        </>
    )
}
export default NewPost;