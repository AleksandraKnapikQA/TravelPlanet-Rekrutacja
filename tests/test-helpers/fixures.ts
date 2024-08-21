import { test as base, expect } from "@playwright/test";
import { MainPage } from "../../page-objects/mainPage";

type Fixtures = {
  projectName: string;
  mainPage: MainPage;
};

export const test = base.extend<Fixtures>({
  projectName: async ({}, use, testInfo) => {
    const projectName = testInfo.project.name;
    await use(projectName);
  },
  mainPage: async ({ page, projectName }, use) => {
    const mainPage = new MainPage(page, projectName);
    await use(mainPage);
  },
});

export { expect };
