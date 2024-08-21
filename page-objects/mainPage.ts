import { Locator, Page } from "@playwright/test";
import translations from "../tests/test-helpers/translations.json";

export class MainPage {
  readonly page: Page;
  private projectName: string;

  readonly cookiesAgreeButton: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMsg: Locator;
  readonly mainManuBar: Locator;

  readonly destinationPickerTextbox: Locator;
  readonly destinationPickerPopupConfirmBtn: Locator;
  readonly datePickerTextbox: Locator;
  readonly datePickerPopupConfirmBtn: Locator;

  readonly transportationPickerTextbox: Locator;
  readonly adultsIndicatorBtn: Locator;
  readonly childrenIndicatorBtn: Locator;
  readonly searchOfferBtn: Locator;

  readonly advertisementCarousele: Locator;
  readonly topHotelsOffersCarousel: Locator;
  readonly attractiveDestinationSection: Locator;

  constructor(page: Page, projectName: string) {
    this.page = page;
    this.projectName = projectName;

    //This is Playwright good practice, but I believe it depends on selector purpose anyway... to speed up coding process I used data-cy locators in most cases, because they were easily available. But want to show both approaches.
    this.loginButton = page.getByRole("button", {
      name: translations[this.projectName].login,
    });
    this.loginErrorMsg = page
      .locator('[data-cy="login-form-wrapper"]')
      .locator(".message__content");

    //This is considered as a good practice at Cypress and in my opinion sufficient for this task(to avoid creating time-consuming translations)
    this.mainManuBar = page.locator('[data-cy="menu-main"]');

    this.destinationPickerTextbox = page.locator(
      '[data-cy="sf-destination-picker-textbox"]'
    );
    this.destinationPickerPopupConfirmBtn = page.locator(
      '[data-cy="sf-destination-picker-popup-save-button"]'
    );
    this.datePickerTextbox = page.locator('[data-cy="sf-datepicker-textbox"]');
    this.datePickerPopupConfirmBtn = page.locator(
      '[data-cy="sf-datepicker-popup-save-button"]'
    );
    this.transportationPickerTextbox = page.locator(
      '[data-cy="sf-transportation-picker-textbox"]'
    );
    this.adultsIndicatorBtn = page.locator(
      '[data-cy="person-textbox-control-adults"]'
    );
    this.childrenIndicatorBtn = page.locator(
      '[data-cy="person-textbox-control-children"]'
    );
    this.searchOfferBtn = page.locator('[data-cy="sf-submit-button"]');

    this.advertisementCarousele = page.locator('[data-cy="carousel"]');
    this.topHotelsOffersCarousel = page.locator('[data-cy="hp-top-offers"]');
    this.attractiveDestinationSection = page.locator(".attractive-destination");
    this.cookiesAgreeButton = page.locator(
      "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
    );
  }

  /**
   * This method is used for UI login with credentials of your choice
   */
  async login(userName, password) {
    await this.page
      .getByRole("button", { name: translations[this.projectName].login })
      .click();
    await this.page.locator('[data-cy="login-form-email"]').fill(userName);
    await this.page.locator('[data-cy="login-form-password"]').fill(password);
    await this.page
      .locator(".modal__content")
      .getByRole("button", { name: translations[this.projectName].submitLogin })
      .click();
  }

  /**
   * This method selects the desired destination, using proper checkbox, and confirm it.
   * @param country The name of country in eng, should be available in translations.json file. For now only "Egypt" is translated. I believe that it is enough for task purpose :)
   */
  async setDestinationAndConfirm(country) {
    await this.destinationPickerTextbox.click();
    await this.page
      .getByRole("checkbox", { name: translations[this.projectName][country] })
      .check();
    await this.destinationPickerPopupConfirmBtn.click();
  }

  /**
   * This method selects the desired date range from calendar and confirm it.
   * @param startDaysFromToday Number of days from today, used for counting start date of travel
   * @param endDaysFromToday Number of days from today, used for counting end date of travel
   */
  async setDateRangeOnCalendarAndConfirm(startDaysFromToday, endDaysFromToday) {
    await this.datePickerTextbox.click();

    const resultStartDateSelector =
      this.constructDateSelectorTxt(startDaysFromToday);
    const resultEndDateSelector =
      this.constructDateSelectorTxt(endDaysFromToday);

    await this.page.locator(await resultStartDateSelector).click();
    await this.page.locator(await resultEndDateSelector).click();
    await this.datePickerPopupConfirmBtn.click();
  }

  /**
   * This is just a helper method to avoid the redundancy of code in setDateRangeOnCalendarAndConfirm().
   * @param daysFromToday Number of days from today to desired day
   * @returns The text represents the date in the selectors format in datepicker
   */
  private async constructDateSelectorTxt(daysFromToday) {
    let date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const resultDateSelector = `#datepicker-calendar-day-${day}-${month}-${year}`;

    return resultDateSelector;
  }
}
