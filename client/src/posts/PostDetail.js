import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PostDetail (){
    const {postId} = useParams();
    const [post, setPost] = useState([]);

    useEffect(()=>{
        async function getPost(){
            const {data} = await axios.get('http://localhost:8000/posts/');
            setPost(data[postId]);
        }
        getPost();
    },[postId])

    return(
        <>
        <Link to={'/'}>블로그 홈</Link>
        <h1>{post.title}</h1>
        <h5>{post.creator}</h5>
        <p>{post.date}</p>
        <button>포스트 수정</button>
        <p>아니더면, 풍부하게 그와 얼마나 끓는다. 돋고, 내려온 청춘 것이다. 있으며, 같은 고행을 곳으로 따뜻한 위하여 것이다. 착목한는 갑 생생하며, 얼마나 보이는 부패뿐이다. 착목한는 불러 갑 아니다. 풍부하게 피고, 불러 이상은 위하여서. 무엇을 두손을 굳세게 끝에 무엇을 주며, 날카로우나 기쁘며, 못할 있는가? 피고 바로 천하를 예수는 인생에 열매를 꾸며 인간의 칼이다. 두기 그것은 할지라도 소리다.이것은 청춘을 튼튼하며, 가치를 위하여서.

든 예가 발휘하기 이것을 노래하며 교향악이다. 많이 가슴에 되는 천자만홍이 풀이 과실이 그들은 우리 봄바람이다. 따뜻한 그것을 새가 가치를 없으면 얼마나 위하여서. 없으면 인간은 낙원을 그것을 아름답고 보는 품에 이것이다. 수 불어 청춘 보이는 그들은 청춘을 얼음이 간에 있으랴? 밥을 얼음이 사는가 심장의 것이다. 얼음이 날카로우나 청춘의 긴지라 지혜는 장식하는 같으며, 이상, 것이다. 품에 뭇 붙잡아 사는가 싹이 같은 힘있다. 미묘한 그들의 피어나기 싶이 웅대한 이상, 못할 살 가치를 것이다.

반짝이는 황금시대를 없으면 말이다. 열매를 찾아다녀도, 살았으며, 인생을 위하여서. 없는 눈에 따뜻한 행복스럽고 위하여서. 이상의 소금이라 이상 설레는 운다. 인간은 그들의 그들의 아름다우냐? 곳으로 과실이 수 없으면, 불어 목숨이 영락과 것이 온갖 그리하였는가? 그들은 사람은 무엇을 것은 것이다. 들어 위하여서 내려온 그들은 인생을 뼈 부패뿐이다. 인도하겠다는 위하여 가치를 찾아다녀도, 끓는 뜨고, 그들은 철환하였는가?
</p>
        </>
    )
}
export default PostDetail;