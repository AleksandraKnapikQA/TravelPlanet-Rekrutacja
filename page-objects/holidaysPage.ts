import { Locator, Page } from "@playwright/test";
import translations from "../tests/test-helpers/translations.json";

export class HolidaysPage {
  readonly page: Page;

  readonly pagination: Locator;
  readonly checkPriceForFirstOfferOnTheListBtn: Locator;

  constructor(page: Page, projectName: string) {
    this.page = page;

    this.pagination = page.locator("#search-results-pagination");
    this.checkPriceForFirstOfferOnTheListBtn = page
      .locator(".c-product-list__item")
      .nth(0)
      .getByText(translations[projectName].checkPrice);
  }
}
