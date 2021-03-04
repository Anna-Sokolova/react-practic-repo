//Components
import HomePage from "./components/HomePage";
import Counter from "./components/Counter/Counter";
import Dropdown from "./components/Dropdown/Dropdown";

//Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <HomePage title={"Learn React"} greating={"Hello, React!"} />
      <Counter initialValue={0} />
      <Dropdown />
    </div>
  );
}

export default App;
