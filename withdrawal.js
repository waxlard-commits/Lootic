import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc,
updateDoc,
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const balanceEl = document.getElementById("balance");
const form = document.getElementById("withdrawForm");
const upi = document.getElementById("upi");
const amount = document.getElementById("amount");

let currentUser = null;
let balance = 0;

onAuthStateChanged(auth, async (user) => {

if (!user) {
window.location.href = "login.html";
return;
}

currentUser = user;

const ref = doc(db, "users", user.uid);
const snap = await getDoc(ref);

if (snap.exists()) {

const data = snap.data();

balance = data.balance || 0;

balanceEl.textContent = "₹" + balance;

}

});

form.addEventListener("submit", async (e) => {

e.preventDefault();

const withdrawAmount = Number(amount.value);

if (withdrawAmount < 180) {
alert("Minimum withdrawal is ₹180");
return;
}

if (withdrawAmount > balance) {
alert("Insufficient Balance");
return;
}

const userRef = doc(db, "users", currentUser.uid);

await addDoc(collection(db, "withdrawals"), {

uid: currentUser.uid,
upi: upi.value,
amount: withdrawAmount,
status: "Pending",
createdAt: serverTimestamp()

});

await updateDoc(userRef, {

balance: balance - withdrawAmount

});

alert("Withdrawal Request Submitted Successfully");

window.location.reload();

});