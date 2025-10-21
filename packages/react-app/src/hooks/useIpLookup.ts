import { useCallback } from "react";
import { IpInput } from "../types";
import { isValidIp } from "@ip-lookup/shared";
import { ipLookup, ResponseError } from "../services/api";

export const useIpLookup = (updateInput: (_updatedInput: IpInput) => void) => {
  const lookupIp = useCallback(async (input: IpInput) => {
    const ip = input.value.trim();
    if (!ip) {
      updateInput({ ...input, error: null, result: null });
      return;
    }

    if (!isValidIp(ip)) {
      updateInput({
        ...input,
        error: "Invalid IP address format",
        result: null,
      });
      return;
    }

    updateInput({ ...input, isLoading: true, error: null, result: null });

    try {
      const result = await ipLookup(input.value);

      updateInput({ ...input, isLoading: false, error: null, result });
    } catch (error) {
      if (error instanceof ResponseError) {
        updateInput({ ...input, isLoading: false, error: error.message, result: null });
      } else {
        updateInput({
          ...input,
          isLoading: false,
          error: "Unknown error, make sure the backend is running",
          result: null
        });
      }
    }
  }, [updateInput]);

  const handleBlur = useCallback(
    (input: IpInput, value: string) => {
      if (value.trim() !== input.value.trim()) {
        lookupIp({ ...input, value: value.trim() });
      }
    },
    [lookupIp]
  );

  return {
    handleBlur,
  };
};
