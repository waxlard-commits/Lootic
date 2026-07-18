import { auth, db } from "./firebase.js";

import {
collection,
query,
where,
getDocs,
doc,
runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const paymentList = document.getElementById("paymentList");

loadPayments();

async function loadPayments(){

paymentList.innerHTML="Loading...";

const q=query(
collection(db,"payments"),
where("status","==","Pending")
);

const snap=await getDocs(q);

if(snap.empty){

paymentList.innerHTML="<h3>No Pending Payments</h3>";
return;

}

paymentList.innerHTML="";

snap.forEach((paymentDoc)=>{

const p=paymentDoc.data();

paymentList.innerHTML+=`

<div class="payment-card">

<h3>${p.name}</h3>

<p>${p.email}</p>

<p><b>Amount:</b> ₹${p.amount}</p>

<p><b>UTR:</b> ${p.utr}</p>

<img src="${p.screenshot}" class="payment-image">

<div class="buttons">

<button class="approve-btn"
onclick="approvePayment('${paymentDoc.id}','${p.uid}',${p.amount})">

Approve

</button>

<button class="reject-btn"
onclick="rejectPayment('${paymentDoc.id}')">

Reject

</button>

</div>

</div>

`;

});

}

window.approvePayment=async(paymentId,userId,amount)=>{

try{

await runTransaction(db,async(transaction)=>{

const paymentRef=doc(db,"payments",paymentId);

const userRef=doc(db,"users",userId);

const paymentSnap=await transaction.get(paymentRef);

const userSnap=await transaction.get(userRef);

if(!paymentSnap.exists()) throw "Payment not found";

if(paymentSnap.data().status==="Approved") throw "Already Approved";

const wallet=userSnap.data().wallet||0;
const investment=userSnap.data().investment||0;

transaction.update(paymentRef,{
status:"Approved"
});

transaction.update(userRef,{
wallet:wallet+amount,
investment:investment+amount
});

});

alert("Payment Approved");

loadPayments();

}catch(err){

alert(err);

}

};

window.rejectPayment=async(paymentId)=>{

await runTransaction(db,async(transaction)=>{

const paymentRef=doc(db,"payments",paymentId);

transaction.update(paymentRef,{
status:"Rejected"
});

});

alert("Payment Rejected");

loadPayments();

};