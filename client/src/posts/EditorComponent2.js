import axios from "axios";
import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import ReactQuill, { Quill,delta } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const EditorWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 1.5rem 1.5rem 1.5rem;
    gap: 1rem;
    overflow: hidden;
`
const TitleWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  input {
    font-size: 1.25rem;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #f7f7f7;
  }
  #title{
    width: 100%;
  }
  #creator{
    width: 8rem;
  }
`

function EditorComponent2(){
    const {postId} = useParams();
    const [post, setPost] = useState();

    useEffect(()=>{
        async function getPost(){
            const {data} = await axios.get('http://localhost:8000/posts/');
            setPost(data[postId]);
        }
        getPost();
        console.log(post)
    },[postId])
    
    //var delta = post.ops

    const QuillRef = useRef();
    const [contents, setContents] = useState('');
    const [title, setTitle] = useState("기존에있던 타이틀");
    const [creator, setCreator] = useState("기존네임");

    async function submit(e) {
        e.preventDefault();
        
        const formData = new FormData();
    
        formData.append('title', title);
        formData.append('creator', creator);
        formData.append('contents', JSON.stringify(contents));
    }

    function handleChange(content, delta, source, editor) {
        setContents(editor.getContents());
    }

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

    return(
        <EditorWrapper>
        <TitleWrapper>
          <input 
            id="creator"
            onChange={(e) => { setCreator(e.target.value) }} 
            defaultValue={creator}
            placeholder="작성자"
          ></input>
          <input 
            id="title"
            onChange={(e) => { setTitle(e.target.value)}} 
            value={title}
            placeholder="제목을 입력해주세요."
          ></input>
        </TitleWrapper>
          <ReactQuill
            ref={(element) => {
              if (element !== null) {
                QuillRef.current = element;
              }
            }}
            //value={contents}
            onChange={handleChange}
            modules={modules}
            theme="snow"
            placeholder="내용을 입력해주세요."
            formats={formats}
            style={{flex:'1',display:'flex',flexDirection:'column',overflow:'hidden'}}
            delta={contents}
          />
          <button className="btn" onClick={submit}>작성 완료</button>
      </EditorWrapper>
    )



}
export default EditorComponent2;