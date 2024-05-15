/**
 * Initializes the legal notice and privacy policy.
 *
 * This function is an asynchronous function that performs the following steps:
 * 1. Calls the `includeHTML()` function to include HTML content.
 * 2. Calls the `loadActiveUser()` function to load the active user.
 * 3. Calls the `renderUserInitials()` function to render the user initials.
 *
 * @return {Promise<void>} A promise that resolves when all the steps are completed.
 */
async function initLegalNoticeAndPrivacyPolicy() {
  await includeHTML();
  await loadActiveUser();
  renderUserInitials();
}
