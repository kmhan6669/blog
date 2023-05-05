import PostListItem from "./PostListItem";

function PostList({ posts }){
    return(
        <>
        {
            posts?.map((post)=>(
                <PostListItem post={post}/>
            ))
        }
        </>
    )
}

export default PostList;