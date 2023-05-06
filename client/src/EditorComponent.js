import { useRef, useState, useMemo } from "react";
import axios from 'axios';
//이렇게 라이브러리를 불러와서 사용하면 됩니다
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const EditorComponent = () => {
  const QuillRef = useRef();
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {
      console.log('온체인지');
      const file = input.files[0];
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append('img', file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        const result = await axios.post('http://localhost:8000/image', formData);
        const IMG_URL = result.data.url;
        // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
        // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
        // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

        // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
        const editor = QuillRef.current.getEditor(); // 에디터 객체 가져오기
        // 1. 에디터 root의 innerHTML을 수정해주기
        // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
        // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
        // editor.root.innerHTML =
        //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.

        // 2. 현재 에디터 커서 위치값을 가져온다
        const range = editor.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  function submit(e) {
    e.preventDefault();
    console.log(contents);
    axios.post("http://localhost:8000/posts", {
      creator: creator, 
      date: new Date(), 
      ...contents,
      title: title
    })
  }
  function handleChange(content, delta, source, editor) {
    setContents(editor.getContents());
  }
// quill에서 사용할 모듈을 설정하는 코드 입니다.
// 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
// useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image"],
          [{ header: [1, 2, 3, false] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
  ];
return (
  <>
    <div>
      title : 
    <input onChange={(e) => { setTitle(e.target.value)}} value={title}></input>
      creator : 
      <input onChange={(e) => { setCreator(e.target.value) }} value={creator}></input>
    </div>
      <ReactQuill
               ref={(element) => {
                  if (element !== null) {
                    QuillRef.current = element;
                  }
                }}
                value={contents}
                onChange={handleChange}
                modules={modules}
                theme="snow"
      placeholder="내용을 입력해주세요."
      formats={formats}
              />
              <button onClick={submit}>Submit</button>
   </>
)
}
  export default EditorComponent;