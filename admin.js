import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function loadDeposits() {

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "deposits"));

  snapshot.forEach((d) => {

    const data = d.data();

    if (data.status !== "Pending") return;

    tbody.innerHTML += `
      <tr>
        <td>${data.name || "User"}</td>
        <td>₹${data.amount}</td>
        <td>
          <button onclick="approve('${d.id}')">Approve</button>
          <button onclick="rejectDeposit('${d.id}')">Reject</button>
        </td>
      </tr>
    `;
  });

}

window.approve = async function(id){

  const depositRef = doc(db,"deposits",id);
  const depositSnap = await getDoc(depositRef);

  if(!depositSnap.exists()) return;

  const deposit = depositSnap.data();

  const userRef = doc(db,"users",deposit.uid);
  const userSnap = await getDoc(userRef);

  if(userSnap.exists()){

    const user = userSnap.data();

    await updateDoc(userRef,{
      balance:(user.balance||0)+Number(deposit.amount)
    });

  }

  await updateDoc(depositRef,{
    status:"Approved"
  });

  alert("Approved Successfully");

  loadDeposits();

}

window.rejectDeposit = async function(id){

  await updateDoc(doc(db,"deposits",id),{
    status:"Rejected"
  });

  alert("Rejected");

  loadDeposits();

}

loadDeposits();