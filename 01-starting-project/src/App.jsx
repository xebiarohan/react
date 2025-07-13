import reactImage from "./assets/react-core-concepts.png";
import componentImage from "./assets/components.png";
import { CORE_CONCEPTS } from "./data.js";

const reactDescription = ["Fundamental", "Crutial", "Core"];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  const description = reactDescription[getRandomInt(2)];

  return (
    <header>
      <img src={reactImage} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function CoreConcecpt(props) {
  return (
    <li>
      <img src={props.image} alt={props.title}></img>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}

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
