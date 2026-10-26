// Ensure elements exist before binding actions
document.addEventListener("DOMContentLoaded", () => {
    
    // Tab switching functionality
    const actionTabs = document.querySelectorAll('.tab-btn');
    const displayPanels = document.querySelectorAll('.tab-content');

    actionTabs.forEach(activeTabSelection => {
        activeTabSelection.addEventListener('click', () => {
            // Remove active style engine states
            actionTabs.forEach(tab => tab.classList.remove('active'));
            displayPanels.forEach(panel => panel.classList.remove('active'));

            // Toggle active interface components
            activeTabSelection.classList.add('active');
            const targetId = activeTabSelection.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
});

// Clipboard functionality (Kept global so inline HTML onclick commands can access it)
function copyText(targetTextSourceId, activeInteractionButton) {
    const extractStringContent = document.getElementById(targetTextSourceId).innerText;
    navigator.clipboard.writeText(extractStringContent).then(() => {
        const preserveLabelState = activeInteractionButton.innerText;
        activeInteractionButton.innerText = 'Copied!';
        activeInteractionButton.style.backgroundColor = '#10b981'; // Success Green
        
        setTimeout(() => {
            activeInteractionButton.innerText = preserveLabelState;
            activeInteractionButton.style.backgroundColor = '#3b82f6'; // Primary Blue
        }, 2000);
    }).catch(runtimeErrorLog => {
        console.error('Action failed:', runtimeErrorLog);
    });
}
