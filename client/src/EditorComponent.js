import { useRef, useState, useMemo } from "react";
import axios from 'axios';
//이렇게 라이브러리를 불러와서 사용하면 됩니다
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const EditorComponent = () => {
  const QuillRef = useRef();
  const [contents, setContents] = useState("");

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];

      try {
        const res = await axios.post('http://localhost:8000/image',{ img: file }); //이미지 서버에서 url 받기
        const imgUrl = res.data.imgUrl;
        const editor = QuillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', imgUrl);
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
  };

  function submit(e) {
    e.preventDefault();
    console.log(contents);
    axios.post("http://localhost:8000/posts", {
      creator: "leeSuMan", 
      date: new Date(), 
      ...contents,
      title: "test"
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
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );


return (
   <>
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
              />
              <button onClick={submit}>Submit</button>
   </>
)
}
  export default EditorComponent;