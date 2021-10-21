import { Footer, Navbar } from "./components";
import { MainApp } from "./pages";
import "./index.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainApp />
      <Footer />
    </div>
  );
}

export default App;
