document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Tab Swapper Engine
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetTabId = this.getAttribute("data-target");
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) targetContent.classList.add("active");
        });
    });

    // 2. Main Crypto Address Quick-Copy Button
    const copyUsdtBtn = document.getElementById("copyUsdtBtn");
    const usdtAddressBox = document.getElementById("usdtAddress");

    if (copyUsdtBtn && usdtAddressBox) {
        copyUsdtBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(usdtAddressBox.innerText.trim()).then(() => {
                copyUsdtBtn.innerText = "Copied!";
                copyUsdtBtn.style.backgroundColor = "#22c55e"; // Success Green
                setTimeout(() => {
                    copyUsdtBtn.innerText = "Copy";
                    copyUsdtBtn.style.backgroundColor = "#3b82f6"; // Primary Blue
                }, 2000);
            });
        });
    }
});
