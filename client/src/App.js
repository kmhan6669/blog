import PostList from "./PostList";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Blog</h1>
        <button>새 포스트 작성</button>
      </div>
      <PostList />
    </div>
  );
}

export default App;
