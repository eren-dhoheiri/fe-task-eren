import { Footer, Navbar } from "./components";
import { Main } from "./pages";
import "./index.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
