// Amount Input
const amountInput = document.getElementById("amount");

// Amount Buttons
const amountButtons = document.querySelectorAll(".amount-grid button");

amountButtons.forEach(button => {

button.addEventListener("click", () => {

const value = button.innerText.replace("₹","");

amountInput.value = value;

// Active Effect
amountButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

});

});

// Recharge Button

const payBtn=document.querySelector(".pay-btn");

payBtn.addEventListener("click",()=>{

const amount=amountInput.value.trim();

if(amount===""){

alert("Please enter investment amount.");

return;

}

// Save Amount

localStorage.setItem("paymentAmount",amount);

// Open Payment QR Page

window.location.href="payment-qr.html";

});
document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        window.location.href = "payment.html";
    });
});