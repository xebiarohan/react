export default function UserInput() {
  return (
    <div id="user-input" className="input-group" >
      <div >
        <label>Initial investment</label>
        <input type="number" />

        <label>Annual Investment</label>
        <input type="number" />
      </div>
      <div>
        <label>Expected Return</label>
        <input type="number"></input>

        <label>Duration</label>
        <input type="number" />
      </div>

    </div>
  );
}
