async function initLegalNoticeAndPrivacyPolicy() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
  }