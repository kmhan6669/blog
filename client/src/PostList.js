import PostListItem from "./PostListItem";
import styled, {css} from "styled-components";

const PostListWrapper = styled.div`
    --auto-grid-min-size: 20rem;
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`

function PostList({ posts }){
    return(
        <PostListWrapper>
        {
            posts?.map((post)=>(
                <PostListItem post={post}/>
            ))
        }
        </PostListWrapper>
    )
}

export default PostList;