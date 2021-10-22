import { Footer, Navbar } from "./components";
import { MainApp } from "./pages";
import "./theme/index.scss";

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
