import { CORE_CONCEPTS } from "../data";
import CoreConcept from "./CoreConcept";
import Section from "./Section";

export default function CoreConcepts() {
  return (
    <Section title="Core concept" id="core-concepts">
      <ul>
        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept key={conceptItem.title} {...conceptItem}></CoreConcept>
        ))}
      </ul>
    </Section>
  );
}
