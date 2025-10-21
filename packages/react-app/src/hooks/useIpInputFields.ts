import { useState, useCallback } from "react";
import { IpInput } from "../types";

export const useIpInputFields = () => {
  const [inputs, setInputs] = useState<IpInput[]>([
    { id: 1, value: "", isLoading: false, error: null, result: null },
  ]);
  const [nextId, setNextId] = useState(2);

  const addInput = useCallback(() => {
    setInputs((prev) => [
      ...prev,
      {
        id: nextId,
        value: "",
        isLoading: false,
        error: null,
        result: null,
      },
    ]);
    setNextId((prev) => prev + 1);
  }, [nextId]);

  const removeInput = useCallback((id: number) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  }, []);

  const updateInput = useCallback((input: IpInput) => {
    setInputs((prev) =>
      prev.map((_input) => (_input.id === input.id ? { ...input } : _input))
    );
  }, []);

  return {
    inputs,
    addInput,
    removeInput,
    updateInput,
  };
};
