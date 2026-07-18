// Elements
const historyList = document.querySelector(".history-list");
const totalAmount = document.querySelector(".summary-card .box:first-child h3");
const totalPayments = document.querySelector(".summary-card .box:last-child h3");

// Load Payment History
let payments = [];

const lastPayment = localStorage.getItem("lastPayment");

if (lastPayment) {
    payments.push(JSON.parse(lastPayment));
}

historyList.innerHTML = "";

let amountSum = 0;

if (payments.length === 0) {

    historyList.innerHTML = `
        <div class="history-card">
            <div class="left">
                <h3>No Payment Found</h3>
                <p>Your payment history will appear here.</p>
            </div>
        </div>
    `;

} else {

    payments.reverse().forEach(payment => {

        amountSum += Number(payment.amount);

        let statusClass = "";

        if (payment.status === "Approved") {
            statusClass = "approved approved-text";
        } else if (payment.status === "Rejected") {
            statusClass = "rejected rejected-text";
        } else {
            statusClass = "pending pending-text";
        }

        historyList.innerHTML += `
            <div class="history-card ${payment.status.toLowerCase()}">

                <div class="left">
                    <h3>₹${payment.amount}</h3>
                    <p>UTR : ${payment.utr}</p>
                    <span>${payment.date}</span>
                </div>

                <div class="status ${statusClass}">
                    ${payment.status}
                </div>

            </div>
        `;

    });

}

// Summary
totalAmount.innerText = "₹" + amountSum;
totalPayments.innerText = payments.length;