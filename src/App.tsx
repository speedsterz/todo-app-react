import Todo from "./component/Todo";
function App() {
  const handleTheme = (i: boolean) => {
    // if (i) document.body.style.backgroundColor = "black";
    // else document.body.style.backgroundColor = "white";
  };
  return (
    <>
      <Todo theme={handleTheme} />
    </>
  );
}

export default App;
