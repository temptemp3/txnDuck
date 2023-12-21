import { test as base, expect } from '@playwright/test';
import { NavBarComponent as NavBar } from './shared/NavBarComponent';
import { LanguageSupport } from './shared/LanguageSupport';
import { ComposeTxnPage } from './pageModels/ComposeTxnPage';
import { HomePage } from './pageModels/HomePage';
import { TxnPresetsPage } from './pageModels/TxnPresetsPage';

// Extend basic test by providing a "composeTxnPage" fixture.
// Code adapted from https://playwright.dev/docs/pom
const test = base.extend<{ composeTxnPage: ComposeTxnPage }>({
  composeTxnPage: async ({ page }, use) => {
    // Set up the fixture.
    const composeTxnPage = new ComposeTxnPage(page);
    await composeTxnPage.goto();
    // Use the fixture value in the test.
    await use(composeTxnPage);
  },
});

test.describe('Compose Transaction Page', () => {

  test('has footer', async ({ composeTxnPage /* Adding this loads the page */, page }) => {
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('has link to presets page', async ({ composeTxnPage, page }) => {
    await page.getByText(/Choose preset/).click();
    await expect(page).toHaveURL(TxnPresetsPage.getFullUrl());
  });

  test('uses the default "Automatically set fee" value set in the settings',
  async ({ page }) => {
    // Change setting when on the home page
    await (new HomePage(page)).goto();
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByLabel('Set fee automatically by default').click(); // Switch to "off"

    // Check the "Compose Transaction" page has the correct default value
    await (new ComposeTxnPage(page)).goto();
    await expect(page.getByLabel('Automatically set the fee')).not.toBeChecked();
    await page.getByRole('button', { name: 'Settings' }).click();
    await expect(page.getByLabel('Set fee automatically by default')).not.toBeChecked();

    // Change setting again, but we are on the "Compose Transaction" page this time
    await page.getByLabel('Set fee automatically by default').click(); // Switch to "on"
    await page.getByTitle('Close').click(); // Close the settings
    // Expect current value in "Compose Transaction" page to remain unchanged
    await expect(page.getByLabel('Automatically set the fee')).not.toBeChecked();

    // Refresh the "Compose Transaction" page to see if the form has the new default value
    await page.reload();
    await expect(page.getByLabel('Automatically set the fee')).toBeChecked();
  });

  test('uses the default "Automatically set valid rounds" value set in the settings',
  async ({ page }) => {
    // Change setting when on the home page
    await (new HomePage(page)).goto();
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByLabel('Set valid rounds automatically by default').click(); // Switch to "off"

    // Check the "Compose Transaction" page has the correct default value
    await (new ComposeTxnPage(page)).goto();
    await expect(page.getByLabel('Automatically set valid rounds')).not.toBeChecked();
    await page.getByRole('button', { name: 'Settings' }).click();
    await expect(page.getByLabel('Set valid rounds automatically by default')).not.toBeChecked();

    // Change setting again, but we are on the "Compose Transaction" page this time
    await page.getByLabel('Set valid rounds automatically by default').click(); // Switch to "on"
    await page.getByTitle('Close').click(); // Close the settings
    // Expect current value in "Compose Transaction" page to remain unchanged
    await expect(page.getByLabel('Automatically set valid rounds')).not.toBeChecked();

    // Refresh the "Compose Transaction" page to see if the form has the new default value
    await page.reload();
    await expect(page.getByLabel('Automatically set valid rounds')).toBeChecked();
  });

  test.describe('Language Support', () => {
    (new LanguageSupport({
      en: { body: /Compose/, title: /Compose/ },
      es: { body: /Componga/, title: /Componga/ },
    })).check(test, ComposeTxnPage.url);
  });

  test.describe('Nav Bar', () => {
    NavBar.check(test, ComposeTxnPage.getFullUrl());
  });

});
