import { renderHook, act } from "@testing-library/react";
import { useIpInputFields } from "./useIpInputFields";

describe("useIpInputFields", () => {
  it("initializes with one empty input", () => {
    const { result } = renderHook(() => useIpInputFields());

    expect(result.current.inputs).toHaveLength(1);
    expect(result.current.inputs[0]).toEqual({
      id: 1,
      value: "",
      isLoading: false,
      error: null,
      result: null,
    });
  });

  it("adds a new input when addInput is called", () => {
    const { result } = renderHook(() => useIpInputFields());

    act(() => {
      result.current.addInput();
    });

    expect(result.current.inputs).toHaveLength(2);
    expect(result.current.inputs[1]).toEqual({
      id: 2,
      value: "",
      isLoading: false,
      error: null,
      result: null,
    });
  });

  it("adds multiple inputs with unique IDs", () => {
    const { result } = renderHook(() => useIpInputFields());

    act(() => {
      result.current.addInput();
    });
    act(() => {
      result.current.addInput();
    });
    act(() => {
      result.current.addInput();
    });

    expect(result.current.inputs).toHaveLength(4);

    const ids = result.current.inputs.map((input) => input.id);
    expect(ids).toEqual([1, 2, 3, 4]);
  });

  it("removes input by ID", () => {
    const { result } = renderHook(() => useIpInputFields());

    act(() => {
      result.current.addInput();
    });
    act(() => {
      result.current.addInput();
    });

    expect(result.current.inputs).toHaveLength(3);

    act(() => {
      result.current.removeInput(2);
    });

    expect(result.current.inputs).toHaveLength(2);
    expect(result.current.inputs.map((input) => input.id)).toEqual([1, 3]);
  });

  it("updates input by ID", () => {
    const { result } = renderHook(() => useIpInputFields());

    const updatedInput = {
      id: 1,
      value: "8.8.8.8",
      isLoading: true,
      error: "Some error",
      result: { country: "US", timezone: "America/New_York" },
    };

    act(() => {
      result.current.updateInput(updatedInput);
    });

    expect(result.current.inputs[0]).toEqual(updatedInput);
  });

  it("updates only the matching input when multiple inputs exist", () => {
    const { result } = renderHook(() => useIpInputFields());

    act(() => {
      result.current.addInput();
    });
    act(() => {
      result.current.addInput();
    });

    const updatedInput = {
      id: 2,
      value: "1.1.1.1",
      isLoading: false,
      error: null,
      result: { country: "AU", timezone: "Australia/Sydney" },
    };

    act(() => {
      result.current.updateInput(updatedInput);
    });

    expect(result.current.inputs).toHaveLength(3);
    expect(result.current.inputs[1]).toEqual(updatedInput);

    expect(result.current.inputs[0].id).toBe(1);
    expect(result.current.inputs[0].value).toBe("");
    expect(result.current.inputs[2].id).toBe(3);
    expect(result.current.inputs[2].value).toBe("");
  });
});
