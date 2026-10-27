/* Privacy page: fills the contact details from js/config.js and starts the shared UI bits */
UI.applyConfig();
UI.hydrateIcons();
UI.storageNotice();
document.getElementById("year").textContent = new Date().getFullYear();
