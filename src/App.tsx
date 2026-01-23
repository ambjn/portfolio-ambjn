import Bio from "./components/Bio";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <main>
        <Bio />
        <Projects />
        <Work />
      </main>
      <Footer />
    </div>
  );
}

export default App;
