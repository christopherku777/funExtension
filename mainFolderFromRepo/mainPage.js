document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            document.getElementById(tab).classList.add('active');
        });
    });

    // Default to showing the Site Blocker tab
    document.getElementById('siteBlocker').classList.add('active');

    // Handle adding and displaying blocked sites (similar to previous example)
    const blockerSiteInput = document.getElementById('blockerSiteInput');
    const addBlockerSiteButton = document.getElementById('addBlockerSiteButton');
    const blockedSitesList = document.getElementById('blockedSitesList');

    chrome.storage.local.get(['blockedSites'], function(result) {
        const blockedSites = result.blockedSites || [];
        blockedSites.forEach(site => addSiteToUI(site, 'block'));
    });

    addBlockerSiteButton.addEventListener('click', () => {
        const site = blockerSiteInput.value.trim();
        if (site) {
            chrome.storage.local.get(['blockedSites'], function(result) {
                const blockedSites = result.blockedSites || [];
                blockedSites.push(site);
                chrome.storage.local.set({ blockedSites: blockedSites }, function() {
                    addSiteToUI(site, 'block');
                    blockerSiteInput.value = '';
                });
            });
        }
    });

    // Handle adding and displaying allowed sites
    const allowerSiteInput = document.getElementById('allowerSiteInput');
    const addAllowerSiteButton = document.getElementById('addAllowerSiteButton');
    const allowedSitesList = document.getElementById('allowedSitesList');

    chrome.storage.local.get(['allowedSites'], function(result) {
        const allowedSites = result.allowedSites || [];
        allowedSites.forEach(site => addSiteToUI(site, 'allow'));
    });

    addAllowerSiteButton.addEventListener('click', () => {
        const site = allowerSiteInput.value.trim();
        if (site) {
            chrome.storage.local.get(['allowedSites'], function(result) {
                const allowedSites = result.allowedSites || [];
                allowedSites.push(site);
                chrome.storage.local.set({ allowedSites: allowedSites }, function() {
                    addSiteToUI(site, 'allow');
                    allowerSiteInput.value = '';
                });
            });
        }
    });

    function addSiteToUI(site, type) {
        const li = document.createElement('li');
        li.textContent = site;
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => {
            if (type === 'block') {
                chrome.storage.local.get(['blockedSites'], function(result) {
                    let blockedSites = result.blockedSites || [];
                    blockedSites = blockedSites.filter(s => s !== site);
                    chrome.storage.local.set({ blockedSites: blockedSites }, function() {
                        li.remove();
                    });
                });
            } else if (type === 'allow') {
                chrome.storage.local.get(['allowedSites'], function(result) {
                    let allowedSites = result.allowedSites || [];
                    allowedSites = allowedSites.filter(s => s !== site);
                    chrome.storage.local.set({ allowedSites: allowedSites }, function() {
                        li.remove();
                    });
                });
            }
        });
        li.appendChild(removeButton);

        if (type === 'block') {
            blockedSitesList.appendChild(li);
        } else if (type === 'allow') {
            allowedSitesList.appendChild(li);
        }
    }
});
