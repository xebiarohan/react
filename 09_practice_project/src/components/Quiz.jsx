import { useState } from "react";


const [activeQuestion, setActiveQuestion] = useState(0);
const [userAnswers, setUserAnswers] = useState([]);

export default function Quiz() {
  return <p>Currently Active Questions</p>;
}
