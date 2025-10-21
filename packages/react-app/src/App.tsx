import React from "react";
import { IpInputField } from "./components";
import { useIpInputFields } from "./hooks/useIpInputFields";

const App: React.FC = () => {
  const { inputs, addInput, removeInput, updateInput } = useIpInputFields();

  return (
    <div className="app">
      <header className="header">
        <h1>IP Lookup Tool</h1>
        <p>Enter one or more IP addresses to get their country</p>
        <button className="add-button" onClick={addInput} title="Add IP input">
          + Add
        </button>
      </header>

      <main className="ip-lookup">
        {inputs.map((input, index) => (
          <IpInputField
            key={input.id}
            input={input}
            index={index + 1}
            onUpdate={updateInput}
            onRemove={inputs.length > 1 ? removeInput : undefined}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
