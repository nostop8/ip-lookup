import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IpInputField } from "./IpInputField";
import { IpInput } from "../types";

jest.mock("../hooks/useIpLookup", () => ({
  useIpLookup: jest.fn(() => ({
    handleBlur: jest.fn(),
  })),
}));

jest.mock("./IpResult", () => ({
  IpResult: ({ result }: { result: any }) => (
    <div role="status">
      {result.country} {result.timezone}
    </div>
  ),
}));

const { useIpLookup } = require("../hooks/useIpLookup");

describe("IpInputField", () => {
  const mockHandleBlur = jest.fn();
  const mockOnUpdate = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useIpLookup.mockReturnValue({
      handleBlur: mockHandleBlur,
    });
  });

  const defaultInput: IpInput = {
    id: 1,
    value: "",
    isLoading: false,
    error: null,
    result: null,
  };

  it("renders input field with correct attributes", () => {
    render(
      <IpInputField input={defaultInput} index={1} onUpdate={mockOnUpdate} />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "ip-1");
    expect(input).toHaveClass("ip-input");
    expect(input).not.toBeDisabled();
  });

  it("renders label with correct index", () => {
    render(
      <IpInputField input={defaultInput} index={5} onUpdate={mockOnUpdate} />
    );

    const label = screen.getByText("5");
    expect(label).toHaveAttribute("for", "ip-1");
    expect(label).toHaveClass("ip-label");
  });

  it("calls handleBlur when input loses focus", async () => {
    const user = userEvent.setup();

    render(
      <IpInputField input={defaultInput} index={1} onUpdate={mockOnUpdate} />
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "8.8.8.8");
    await user.tab();

    expect(mockHandleBlur).toHaveBeenCalledWith(defaultInput, "8.8.8.8");
  });

  it("shows loading spinner when isLoading is true", () => {
    const loadingInput: IpInput = { ...defaultInput, isLoading: true };

    render(
      <IpInputField input={loadingInput} index={1} onUpdate={mockOnUpdate} />
    );

    const spinner = screen.getByText("Loading...");
    expect(spinner.parentElement).toHaveClass("spinner");
  });

  it("disables input when isLoading is true", () => {
    const loadingInput: IpInput = { ...defaultInput, isLoading: true };

    render(
      <IpInputField input={loadingInput} index={1} onUpdate={mockOnUpdate} />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("shows error message when error exists", () => {
    const errorInput: IpInput = {
      ...defaultInput,
      error: "Invalid IP address format",
    };

    render(
      <IpInputField input={errorInput} index={1} onUpdate={mockOnUpdate} />
    );

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent("Invalid IP address format");
    expect(errorMessage).toHaveAttribute("id", "error-1");
    expect(errorMessage).toHaveClass("error-message");

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "error-1");
    expect(input).toHaveClass("error");
  });

  it("shows result when result exists", () => {
    const resultInput: IpInput = {
      ...defaultInput,
      result: { country: "US", timezone: "America/New_York" },
    };

    render(
      <IpInputField input={resultInput} index={1} onUpdate={mockOnUpdate} />
    );

    const result = screen.getByRole("status");
    expect(result).toHaveTextContent("US America/New_York");

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("success");
  });

  it("shows remove button when onRemove is provided", () => {
    render(
      <IpInputField
        input={defaultInput}
        index={1}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const removeButton = screen.getByRole("button", {
      name: /^x$/i,
    });
    expect(removeButton).toHaveTextContent("X");
    expect(removeButton).toHaveClass("remove-button");
  });

  it("does not show remove button when onRemove is not provided", () => {
    render(
      <IpInputField input={defaultInput} index={1} onUpdate={mockOnUpdate} />
    );

    const removeButton = screen.queryByRole("button", {
      name: /^x$/i,
    });
    expect(removeButton).not.toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <IpInputField
        input={defaultInput}
        index={1}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const removeButton = screen.getByRole("button", {
      name: /^x$/i,
    });
    await user.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });
});
