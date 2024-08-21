import { Locator, Page } from "@playwright/test";

export class TravelDetailsPage {
  readonly page: Page;
  readonly productDetailHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDetailHeader = page
      .locator(".b-product-detail__header")
      .locator("h2");
  }
}
