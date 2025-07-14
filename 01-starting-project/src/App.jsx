
import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcecpt from "./components/CoreConcecpt.jsx";


function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core concept</h2>
          <ul>
            <CoreConcecpt {... CORE_CONCEPTS[0]} />
            <CoreConcecpt {... CORE_CONCEPTS[1]} />
            <CoreConcecpt {... CORE_CONCEPTS[2]} />
            <CoreConcecpt
              title={CORE_CONCEPTS[3].title}
              description={CORE_CONCEPTS[3].description}
              image={CORE_CONCEPTS[3].image}
            />
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
