import request from "supertest";
import app from "./index";

describe("API Endpoints", () => {
  describe("GET /health", () => {
    it("should return 200 and health status", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body).toEqual({
        status: "OK",
        timestamp: expect.any(String),
      });
    });
  });

  describe("GET /api/lookup/:ip", () => {
    describe("Valid IP addresses", () => {
      it("should return country and timezone for valid IPv4", async () => {
        const response = await request(app).get("/api/lookup/8.8.8.8");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          country: "US",
          timezone: "America/Chicago",
        });
      });
    });

    describe("Invalid IP addresses", () => {
      it.each(["256.256.256.256", "not.an.ip.address", "192.168.1.@"])(
        "should return 400 for invalid IPv4 format",
        async (ip) => {
          const response = await request(app)
            .get(`/api/lookup/${ip}`)
            .expect(400);

          expect(response.body).toEqual({
            error: "Invalid IP address format",
          });
        }
      );

      it("should return 404 for empty IP", async () => {
        await request(app).get("/api/lookup/").expect(404);
      });
    });

    describe("Private/Local IP addresses", () => {
      it.each(["192.168.1.1", "127.0.0.1", "10.0.0.1"])(
        "should return 404 for private IP",
        async (ip) => {
          const response = await request(app)
            .get(`/api/lookup/${ip}`)
            .expect(404);

          expect(response.body).toEqual({
            error:
              "Country or timezone information not found for this IP address",
          });
        }
      );
    });

    describe("IPv6 addresses", () => {
      it("should handle valid IPv6 format", async () => {
        const response = await request(app).get(
          "/api/lookup/2001:4860:4860:0000:0000:0000:0000:8888"
        );

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
          country: "US",
          timezone: "America/Chicago",
        });
      });

      it("should return 400 for invalid IPv6 format", async () => {
        const response = await request(app)
          .get("/api/lookup/2001:4860:4860::invalid::8888")
          .expect(400);

        expect(response.body).toEqual({
          error: "Invalid IP address format",
        });
      });
    });
  });
});
