//Components
import Counter from "./components/Counter/Counter";
import HomePage from "./components/HomePage";

//Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <HomePage title={"Learn React"} greating={"Hello, React!"} />
      <Counter initialValue={0} />
    </div>
  );
}

export default App;
