import { renderHook, act } from "@testing-library/react";
import { useIpLookup } from "./useIpLookup";
import { IpInput } from "../types";

jest.mock("@ip-lookup/shared", () => ({
  isValidIp: jest.fn(),
}));

jest.mock("../services/api", () => ({
  ...jest.requireActual("../services/api"),
  ipLookup: jest.fn(),
}));

const { isValidIp } = require("@ip-lookup/shared");
const { ipLookup, ResponseError } = require("../services/api");

describe("useIpLookup", () => {
  const mockUpdateInput = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sampleInput: IpInput = {
    id: 1,
    value: "8.8.8.8",
    isLoading: false,
    error: null,
    result: null,
  };

  it("returns handleBlur function", () => {
    const { result } = renderHook(() => useIpLookup(mockUpdateInput));

    expect(typeof result.current.handleBlur).toBe("function");
  });

  it("clears error and result for empty input", async () => {
    const { result } = renderHook(() => useIpLookup(mockUpdateInput));

    await act(async () => {
      result.current.handleBlur(sampleInput, "   ");
    });

    expect(mockUpdateInput).toHaveBeenCalledWith({
      ...sampleInput,
      value: "",
      error: null,
      result: null,
    });
  });

  it("sets error for invalid IP format", async () => {
    isValidIp.mockReturnValue(false);
    const { result } = renderHook(() => useIpLookup(mockUpdateInput));

    await act(async () => {
      result.current.handleBlur(sampleInput, "invalid-ip");
    });

    expect(isValidIp).toHaveBeenCalledWith("invalid-ip");
    expect(mockUpdateInput).toHaveBeenCalledWith({
      ...sampleInput,
      value: "invalid-ip",
      error: "Invalid IP address format",
      result: null,
    });
  });

  it("sets loading state and makes API call for valid IP", async () => {
    isValidIp.mockReturnValue(true);
    ipLookup.mockResolvedValue({ country: "US", timezone: "America/New_York" });

    const { result } = renderHook(() => useIpLookup(mockUpdateInput));

    const inputWithDifferentValue = { ...sampleInput, value: "" };

    await act(async () => {
      result.current.handleBlur(inputWithDifferentValue, "8.8.8.8");
    });

    expect(mockUpdateInput).toHaveBeenNthCalledWith(1, {
      ...inputWithDifferentValue,
      value: "8.8.8.8",
      isLoading: true,
      error: null,
      result: null,
    });

    expect(ipLookup).toHaveBeenCalledWith("8.8.8.8");

    expect(mockUpdateInput).toHaveBeenNthCalledWith(2, {
      ...inputWithDifferentValue,
      value: "8.8.8.8",
      isLoading: false,
      error: null,
      result: { country: "US", timezone: "America/New_York" },
    });
  });

  it("handles ResponseError from API", async () => {
    isValidIp.mockReturnValue(true);
    ipLookup.mockRejectedValue(new ResponseError("Country not found"));

    const { result } = renderHook(() => useIpLookup(mockUpdateInput));

    await act(async () => {
      result.current.handleBlur(sampleInput, "8.8.8.9");
    });

    expect(mockUpdateInput).toHaveBeenLastCalledWith({
      ...sampleInput,
      value: "8.8.8.9",
      isLoading: false,
      error: "Country not found",
      result: null,
    });
  });

  it("handles unknown errors from API", async () => {
    isValidIp.mockReturnValue(true);
    ipLookup.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useIpLookup(mockUpdateInput));

    await act(async () => {
      result.current.handleBlur(sampleInput, "8.8.8.9");
    });

    expect(mockUpdateInput).toHaveBeenLastCalledWith({
      ...sampleInput,
      value: "8.8.8.9",
      isLoading: false,
      error: "Unknown error, make sure the backend is running",
      result: null,
    });
  });

  it("only triggers lookup if value has changed", async () => {
    isValidIp.mockReturnValue(true);
    ipLookup.mockResolvedValue({ country: "US", timezone: "America/New_York" });

    const { result } = renderHook(() => useIpLookup(mockUpdateInput));

    await act(async () => {
      result.current.handleBlur(sampleInput, "8.8.8.8");
    });

    jest.clearAllMocks();

    await act(async () => {
      result.current.handleBlur(sampleInput, "8.8.8.8");
    });

    expect(ipLookup).not.toHaveBeenCalled();
    expect(mockUpdateInput).not.toHaveBeenCalled();
  });
});
