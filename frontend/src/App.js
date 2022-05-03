import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import "./index.css";
function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Main</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
