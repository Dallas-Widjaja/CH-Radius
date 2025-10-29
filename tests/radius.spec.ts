
import { test, expect } from '@playwright/test';
import { groupEnd } from 'console';

// Constants
const BASE_URL = 'https://dev3-radius.charterhallweb.com';
const ADMIN_URL = `${BASE_URL}/admin`;
const TIMEOUT = 2000;

// Utility function to wait for page load
async function waitForPageLoad() {
  await new Promise(resolve => setTimeout(resolve, TIMEOUT));
}

// Utility function to verify hamburger menu subheadings
async function verifyHamburger(page: Page) {
  const expectedSubheadings = [
    'Charter Hall Assets',
    'Charter Hall Funds',
    'Deal Room - Browser',
    'Deal Room - Summary',
    'Deal Room - Meeting',
    'Admin'
  ];

  // Click on hamburger menu
  // await page.click("#root > div > nav > div > div.flex.flex-\\[2\\].justify-end > div > button:nth-child(3) > span > svg");

  for (const text of expectedSubheadings) {
    const locator = page.locator('.text-primary', { hasText: text });
    await expect(locator).toHaveCount(1);
  }
}

test.describe('Radius Superadmin User Tests', () => {

  test('verify the home page navigation', async ({ page }) => {
    await page.goto(BASE_URL);
    await new Promise(resolve => setTimeout(resolve, 10000));
    await expect(page).toHaveTitle(/Radius/);

    const navigationButtons = ['Assets', 'Funds', 'Deal Room'];
    for (const button of navigationButtons) {
      await page.getByRole('button', { name: button }).click();
      await page.getByRole('img', { name: 'logo' }).click();
    }

    await page.getByRole('img', { name: 'Admin' }).click();
  });

  test('verify admin page subheadings and links', async ({ page }) => {
    await page.goto(ADMIN_URL);
    await waitForPageLoad();
    await expect(page).toHaveTitle(/Admin/);
    await expect(page.locator('.text-primary', { hasText: 'Admin' })).toHaveCount(1);

    const expectedLinks = [
      // Internal Valuation
      `/admin/assets?status=Current&status=New&isActive=true`,
      `/admin/funds`,
      `/admin/funds-of-funds`,
      `/admin/valuation-periods`,
      // Lookups
      `/admin/valuers`,
      `/admin/agencies`,
      `/admin/attribute-fields`,
      `/admin/transaction-types`,
      `/admin/custodians`,
      `/admin/subtrusts`,
      `/admin/trustees`,
      // Access
      `/admin/users`,
      // Advanced
      `/admin/asset-statuses`,
      `/admin/asset-categories`,
      `/admin/asset-tenures`,
      `/admin/asset-grades`,
      `/admin/asset-sectors`,
      `/admin/management-sectors`,
      `/admin/modules`,
      `/admin/hidden-fields`,
      `/admin/workflow-history`,
      // Bulk Operations
      `/admin/import-records`,
      `/admin/export-documents`,
      // Reports
      `/admin/change-tracking`,
      // Calculations
      `/admin/asset-calculations`,
      `/admin/fund-calculations`
    ];

    for (const link of expectedLinks) {
      const locator = page.locator(`a[href="${link}"]`);
      await expect(locator).toHaveCount(1);
    }

    const expectedSubheadings = [
      'VALUATION EXCEPTIONS REPORT',
      'VALUATION DOCUMENTS REPORT',
      'CUSTODIAN RECONCILIATION REPORT'
    ];

    for (const text of expectedSubheadings) {
      const locator = page.locator('.text-primary', { hasText: text });
      await expect(locator).toHaveCount(1);
    }
  });
}

//WIP
//   test('edit an asset valuations', async ({ page }) => {
//     await page.goto(BASE_URL);
//     await page.getByRole('button', { name: 'Assets' }).click();
//     await verifyHamburger(page);

//     // Search and select asset
//     await page.getByRole('textbox', { name: 'Search' }).fill('1 Martin Place Tower');
//     await page.getByRole('button', { name: 'Save' }).click();
//     await page.getByRole('button', { name: '1 Martin Place Tower' }).click();
//     await expect(page).toHaveTitle(/1 Martin Place Tower/);

//     // Update asset values
//     await page.getByRole('spinbutton', { name: 'grossAssetValue' }).fill('741999999');
//     await page.getByRole('spinbutton', { name: 'capitalisationRatePercent' }).fill('5.75');
//     await page.getByRole('spinbutton', { name: 'discountRatePercent' }).fill('7.13');
//   });

// });
