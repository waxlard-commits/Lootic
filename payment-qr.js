// Show Amount
const payAmount = document.getElementById("payAmount");
const amount = localStorage.getItem("paymentAmount") || "0";

payAmount.innerText = "₹" + amount;

// Copy UPI ID
const copyBtn = document.getElementById("copyBtn");
const upiId = document.getElementById("upiId");

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(upiId.innerText);

    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
    }, 2000);

});

// Submit Payment
const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", () => {

    const screenshot = document.getElementById("screenshot").files[0];
    const utr = document.getElementById("utr").value.trim();

    if (!screenshot) {
        alert("Please upload your payment screenshot.");
        return;
    }

    if (utr.length < 12) {
        alert("Please enter a valid UTR number.");
        return;
    }

    // Save temporarily
    const paymentData = {
        amount: amount,
        utr: utr,
        screenshot: screenshot.name,
        status: "Pending",
        date: new Date().toLocaleString()
    };

    localStorage.setItem("lastPayment", JSON.stringify(paymentData));

    alert("Payment submitted successfully.\nWaiting for admin approval.");

    // Future: Firebase save here
    // window.location.href = "dashboard.html";

});