
import { test, expect } from '@playwright/test';

// test('login', async ({ page }) => {  
//   await page.goto('https://dev2-radius.charterhallweb.com/');
//   await page.getByLabel('Email').fill('EMAIL');
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByLabel('Password').fill('PASSWORD');
//   await page.getByRole('button', { name: 'Sign in' }).click();
//   //await page.getByRole('button', { name: 'Approve a request on my Microsoft Authenticator app' }).click();
//   await new Promise(resolve => setTimeout(resolve, 10000));
//   //await expect(page.getByText('Radius')).toBeVisible();
//   await page.context().storageState({ path: 'playwright/.auth.json' }); 
// });

test('correct title', async ({ page }) => {
  await page.goto('https://dev2-radius.charterhallweb.com/');
  // Wait 10 seconds, as the page load time is inconsistent
  await new Promise(resolve => setTimeout(resolve, 10000));
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Radius/);
});

test('asset navigation', async ({ page }) => {  
  await page.goto('https://dev2-radius.charterhallweb.com/');
  await page.getByRole('button', { name: 'Assets' }).click();
  await page.getByRole('heading', {name: '242 Exhibition' }).click();
  await expect(page).toHaveTitle(/242 Exhibition/);
});

// test('asset page search', async ({ page }) => {  
//   await page.goto('https://dev2-radius.charterhallweb.com/');
//   await page.getByRole('button', { name: 'Assets' }).click();
//   await page.click('div.filters-container button.ant-btn-icon-only');
//   await page.getByRole('textbox', {name: 'Search' }).fill('1 Martin Place Tower');
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.getByRole('button', { name: '1 Martin Place Tower' }).click();
//   await expect(page).toHaveTitle(/1 Martin Place Tower/);
// });