import { test, expect } from '@playwright/test';
import { createUser } from '../../factories/user.factory.ts';


test('User Registration using dynamic data', async ({ page }) => {

  const user = createUser();

  await page.goto('https://automationexercise.com'); 

  await page.click('a[href="/login"]');

  await page.fill('input[data-qa="signup-name"]',  user.name);
  await page.fill('input[data-qa="signup-email"]', user.email);

  await page.click('button[data-qa="signup-button"]');

  await page.check('#id_gender1');

  await page.fill('input[data-qa="password"]', user.password);

  await page.selectOption('select[data-qa="days"]', user.day );
  await page.selectOption('select[data-qa="months"]', user.month);
  await page.selectOption('select[data-qa="years"]', user.year);


  await page.fill('input[data-qa="first_name"]', user.fullName);
  await page.fill('input[data-qa="last_name"]', user.lastName );
  await page.fill('input[data-qa="company"]', user.company);
  await page.fill('input[data-qa="address"]', user.address1);
  await page.fill('input[data-qa="address2"]',user.address2 );


  await page.fill('input[data-qa="state"]', user.state);
  await page.fill('input[data-qa="city"]', user.city);
  await page.fill('input[data-qa="zipcode"]', user.zipcode );
  await page.fill('input[data-qa="mobile_number"]', user.mobileNumber );

  await page.waitForTimeout(5000);
  await page.click('button[data-qa="create-account"]');

});