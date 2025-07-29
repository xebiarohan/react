import { use } from "react";
import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Result({ userInputs }) {
  console.log(userInputs);
  const result = calculateInvestmentResults(userInputs);
  console.log(result);

  return (
    <section id="result" className="center">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (year)</th>
            <th>Total interest</th>
            <th>Invested capital</th>
          </tr>
        </thead>
        <tbody>
          {result.map((row) => {
            return (
              <tr key={row.year} className="center">
                <td>{row.year}</td>
                <td>{formatter.format(row.valueEndOfYear)}</td>
                <td>{formatter.format(row.interest)}</td>
                <td>{formatter.format(row.valueEndOfYear - (row.annualInvestment* row.year))}</td>
                <td>{formatter.format(row.annualInvestment)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}



