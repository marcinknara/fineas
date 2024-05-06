const YesNoSwitch = ({ label, path, financialState, setFinancialState }) => {
  const handleChange = (value) => {
    setFinancialState(prev => {
      const newState = { ...prev };
      const keys = path.split('.');
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value === "Y";
      console.log(newState);
      return newState;
    });
  };

  const value = (() => {
    const keys = path.split('.');
    let current = financialState;
    for (let key of keys) {
      current = current[key];
    }
    return current ? "Y" : "N";
  })();

  return (
    <div className="mb-4">
      <span className="text-white text-sm font-bold mr-4">{label}</span>
      <label className="text-white mr-2">
        <input
          type="radio"
          name={label}
          value="Y"
          checked={value === "Y"}
          onChange={() => handleChange("Y")}
          className="mr-1"
        />
        Yes
      </label>
      <label className="text-white">
        <input
          type="radio"
          name={label}
          value="N"
          checked={value === "N"}
          onChange={() => handleChange("N")}
          className="mr-1"
        />
        No
      </label>
    </div>
  );
};

export default YesNoSwitch;