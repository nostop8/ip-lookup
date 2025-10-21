import React from "react";
import { IpInput } from "../types";
import { IpResult } from "./IpResult";
import { useIpLookup } from "../hooks/useIpLookup";

interface IpInputFieldProps {
  input: IpInput;
  index: number;
  onUpdate: (input: IpInput) => void;
  onRemove?: (id: number) => void;
}

export const IpInputField: React.FC<IpInputFieldProps> = React.memo(
  ({ input, index, onUpdate, onRemove }) => {
    const { handleBlur } = useIpLookup(onUpdate);

    return (
      <div className="ip-input-container">
        <div className="ip-input-row">
          <label className="ip-label" htmlFor={`ip-${input.id}`}>
            {index}
          </label>
          <input
            id={`ip-${input.id}`}
            type="text"
            onBlur={(e) => handleBlur(input, e.target.value)}
            disabled={input.isLoading}
            className={`ip-input ${input.error ? "error" : ""} ${
              input.result ? "success" : ""
            }`}
            aria-describedby={input.error ? `error-${input.id}` : undefined}
          />
          {onRemove && (
            <button
              className="remove-button"
              onClick={() => onRemove(input.id)}
              title="Remove IP input"
            >
              X
            </button>
          )}
          {input.isLoading && (
            <div className="spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {input.result && <IpResult result={input.result} />}
        </div>

        {input.error && (
          <div id={`error-${input.id}`} className="error-message" role="alert">
            {input.error}
          </div>
        )}
      </div>
    );
  }
);
