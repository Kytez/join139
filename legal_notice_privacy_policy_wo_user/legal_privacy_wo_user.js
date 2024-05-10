/**
 * Initializes the legal and privacy policy without user information.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initLegalPrivacyWOUser() {
    await includeHTML();
    hideUserInHeader();
}

/**
 * Hides the user icon, user icon desktop, and help button desktop in the header.
 *
 * @return {void} This function does not return a value.
 */
function hideUserInHeader() {
    document.getElementById('userIcon').classList.add('d-none');
    document.getElementById('userIconDesktop').classList.add('d-none');
    document.getElementById('helpBtnDesktop').classList.add('d-none');
}