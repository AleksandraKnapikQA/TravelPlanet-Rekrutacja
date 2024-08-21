import { test, expect } from "./test-helpers/fixures";
import translations from "./test-helpers/translations.json";
import { MainPage } from "../page-objects/mainPage";
import { HolidaysPage } from "../page-objects/holidaysPage";
import { TravelDetailsPage } from "../page-objects/travelDetailsPage";

let onMainPage: MainPage;
let onHolidaysPage: HolidaysPage;
let onTravelDetailsPage: TravelDetailsPage;

test.beforeEach(async ({ page }, testInfo) => {
  onMainPage = new MainPage(page, testInfo.project.name);
  onHolidaysPage = new HolidaysPage(page, testInfo.project.name);
  onTravelDetailsPage = new TravelDetailsPage(page);

  await page.goto("/");
  //await onMainPage.cookiesAgreeButton.click();
});

test("1 - check presense of key elements on Homepage", async ({ page }) => {
  // 1 - check destination, date, transport, passanger selectors
  await expect(onMainPage.destinationPickerTextbox).toBeVisible();
  await expect(onMainPage.datePickerTextbox).toBeVisible();
  await expect(onMainPage.transportationPickerTextbox).toBeVisible();
  await expect(onMainPage.adultsIndicatorBtn).toBeVisible();
  await expect(onMainPage.childrenIndicatorBtn).toBeVisible();

  // 2 - check login button
  await expect(onMainPage.loginButton).toBeVisible();

  // 3 - check some other elements
  await expect(onMainPage.mainManuBar).toBeVisible();
  await expect(onMainPage.searchOfferBtn).toBeVisible();
  await expect(onMainPage.advertisementCarousele).toBeVisible();
  await expect(onMainPage.advertisementCarousele).toBeVisible();
  await expect(onMainPage.topHotelsOffersCarousel).toBeVisible();
  await expect(onMainPage.attractiveDestinationSection).toBeVisible();
});

test("2 - login with incorrect credentials", async ({ page, projectName }) => {
  await onMainPage.login("ola@qa.com", "wrongPassword");
  expect(await onMainPage.loginErrorMsg.textContent()).toContain(
    translations[projectName].loginErrorMsg
  );
});

test("3-4 - search with destination and date and select the offer on second page", async ({
  page,
  projectName,
}) => {
  test.slow();
  await onMainPage.setDestinationAndConfirm("Egypt");
  await onMainPage.setDateRangeOnCalendarAndConfirm(3, 20);
  await onMainPage.searchOfferBtn.click();
  await page.waitForURL(`/${translations[projectName].holidays}/*`);

  await onHolidaysPage.pagination.getByRole("button", { name: "2" }).click();
  await onHolidaysPage.checkPriceForFirstOfferOnTheListBtn.click();

  let header = await onTravelDetailsPage.productDetailHeader.textContent();
  expect(header).toContain(translations[projectName].Egypt);
});
