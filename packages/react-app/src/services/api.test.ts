import { IpResult } from "../types";
import { ipLookup } from "./api";

describe("api.test", () => {
  let mockData: IpResult;

  beforeEach(() => {
    mockData = {
      country: "US",
      timezone: "America/Los_Angeles",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    ) as jest.Mock;
  });

  describe("ipLookup", () => {
    it("should return fetched data", async () => {
      const result = await ipLookup("8.8.8.8");
      expect(result).toEqual(mockData);
    });

    it("should throw ResponseError on non-ok response", async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ error: "Some error occurred" }),
        } as Response)
      );

      await expect(ipLookup("invalid-ip")).rejects.toThrow(
        "Some error occurred"
      );
    });
  });
});
