import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["json", {outputFile: 'test-results/jsonReport.json'}],
    ["junit", {outputFile: 'test-results/junitReport.xml'}]],

  use: {
    baseURL: "https://www.travelplanet.pl",
    trace: "on-first-retry",
  },

  /* Configure projects for various baseURLs */
  projects: [
    {
      name: "travelPlanetPL",
    },

    {
      name: "inviaSK",
      use: {
        baseURL: "https://www.invia.sk/",
      },
    },

    {
      name: "inviaHU",
      use: {
        baseURL: "https://www.invia.hu/",
      },
    },

    {
      name: "inviaCZ",
      use: {
        baseURL: "https://www.invia.cz/",
      },
    },
  ],
});
