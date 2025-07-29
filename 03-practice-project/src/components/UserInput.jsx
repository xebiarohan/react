
export default function UserInput({userInputs, onInputChange}) {

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial investment</label>
          <input
            type="number"
            value={userInputs.initialInvestment}
            onChange={(event) => onInputChange('initialInvestment', event.target.value)}
          />
        </p>

        <p>
          <label>Annual Investment</label>
          <input
            type="number"
            value={userInputs.annualInvestment}
            onChange={(event) => onInputChange('annualInvestment', event.target.value)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            type="number"
            value={userInputs.expectedReturn}
            onChange={(event) => onInputChange('expectedReturn', event.target.value)}
          />
        </p>

        <p>
          <label>Duration</label>
          <input
            type="number"
            value={userInputs.duration}
            onChange={(event) => onInputChange('duration', event.target.value)}
          />
        </p>
      </div>
    </section>
  );
}
