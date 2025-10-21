import { render, screen, act } from "@testing-library/react";
import { TimezoneClockLive } from "./TimezoneClockLive";

describe("TimezoneClockLive", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders time", () => {
    render(<TimezoneClockLive timezone="America/New_York" />);

    const clockDiv = screen.getByText(/\d{2}:\d{2}:\d{2}/);
    expect(clockDiv).toBeInTheDocument();
    expect(clockDiv).toHaveClass("current-time");
  });

  it("shows invalid timezone message for invalid timezone", () => {
    render(<TimezoneClockLive timezone="Invalid/Timezone" />);

    const clockDiv = screen.getByText("Invalid timezone");
    expect(clockDiv).toBeInTheDocument();
    expect(clockDiv).toHaveClass("current-time");
  });

  it("updates time every second", () => {
    const mockDate = new Date("2023-10-20T12:00:00Z");
    const originalDate = global.Date;
    global.Date = jest.fn(() => mockDate) as any;
    global.Date.now = jest.fn(() => mockDate.getTime());

    render(<TimezoneClockLive timezone="UTC" />);

    expect(screen.getByText("12:00:00")).toBeInTheDocument();

    mockDate.setSeconds(mockDate.getSeconds() + 1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("12:00:01")).toBeInTheDocument();

    global.Date = originalDate;
  });

  it("cleans up interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = render(<TimezoneClockLive timezone="UTC" />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });

  it("updates when timezone prop changes", () => {
    const { rerender } = render(<TimezoneClockLive timezone="UTC" />);

    expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();

    rerender(<TimezoneClockLive timezone="Invalid/Timezone" />);

    expect(screen.getByText("Invalid timezone")).toBeInTheDocument();
  });
});
