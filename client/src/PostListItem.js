import { Link } from "react-router-dom";

function PostListItem ({post}){
    return(
        <div>
            <div>
                <img/>
                <div>
                    <p>{post.creator}</p>
                    <p>{post.date}</p>
                </div>
            </div>
            <div>
                <h3>{post.title}</h3>
                <Link to={`posts/${post.id}`}>포스트 보기</Link>
            </div>
        </div>
    )
}
export default PostListItem;