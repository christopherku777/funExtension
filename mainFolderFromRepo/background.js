// Example script to dynamically update the rules
chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3], // IDs of old rules to remove
        addRules: [
            {
                "id": 1,
                "priority": 1,
                "action": { "type": "block" },
                "condition": { "urlFilter": "*://www.example.com/*" }
            },
            {
                "id": 2,
                "priority": 1,
                "action": { "type": "block" },
                "condition": { "urlFilter": "*://www.blockthissite.com/*" }
            },
            {
                "id": 3,
                "priority": 1,
                "action": { "type": "block" },
                "condition": { "urlFilter": "*://*.annoyingsite.com/*" }
            }
        ]
    }, () => {
        console.log('Rules have been updated');
    });
});
