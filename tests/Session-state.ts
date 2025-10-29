import { test, expect } from '@playwright/test';

// Constants
const BASE_URL = 'https://dev3-radius.charterhallweb.com';
const TIMEOUT = 5000;

// Used to obtain logged in session state
test('login', async ({ page }) => {  
  await page.goto('https://dev3-radius.charterhallweb.com/');
  await page.getByLabel('Email').fill('[TEST USER EMAIL]');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Password').fill('[TEST USER PASSWORD]');
  await page.getByRole('button', { name: 'Sign in' }).click();
  //await page.getByRole('button', { name: 'Approve a request on my Microsoft Authenticator app' }).click();
  await new Promise(resolve => setTimeout(resolve, 10000));
  //await expect(page.getByText('Radius')).toBeVisible();
  await page.context().storageState({ path: 'playwright/.auth.json' }); 
});