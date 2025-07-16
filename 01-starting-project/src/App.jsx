import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcecpt from "./components/CoreConcecpt.jsx";
import TabButton from "./components/TabButton.jsx";

function App() {
  let tabContent = 'Please click a button';
  function handleSelect(selectedButton) {
    tabContent = selectedButton;
    console.log(selectedButton);
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core concept</h2>
          <ul>
            <CoreConcecpt {...CORE_CONCEPTS[0]} />
            <CoreConcecpt {...CORE_CONCEPTS[1]} />
            <CoreConcecpt {...CORE_CONCEPTS[2]} />
            <CoreConcecpt
              title={CORE_CONCEPTS[3].title}
              description={CORE_CONCEPTS[3].description}
              image={CORE_CONCEPTS[3].image}
            />  
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
            <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
