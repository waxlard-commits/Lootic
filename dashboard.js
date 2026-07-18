// ================= IMPORTS =================

import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ================= ELEMENTS =================

const userName = document.getElementById("userName");
const drawerName = document.getElementById("drawerName");
const walletBalance = document.getElementById("walletBalance");

const menuBtn = document.querySelector(".menu-btn");
const drawer = document.getElementById("drawer");
const logoutBtn = document.getElementById("logoutBtn");

// ================= DRAWER =================

menuBtn.addEventListener("click", () => {
drawer.classList.toggle("active");
});

document.addEventListener("click", (e) => {

if (
!drawer.contains(e.target) &&
!menuBtn.contains(e.target)
){
drawer.classList.remove("active");
}

});

// ================= AUTH =================

onAuthStateChanged(auth, async (user)=>{

if(!user){

window.location.href="login.html";
return;

}

try{

const ref = doc(db,"users",user.uid);

const snap = await getDoc(ref);

if(snap.exists()){

const data=snap.data();

userName.textContent=data.name || "User";
drawerName.textContent=data.name || "User";

walletBalance.textContent=
"₹"+(data.balance || 0);

}else{

userName.textContent="User";
drawerName.textContent="User";

}

}catch(err){

console.log(err);

}

});

// ================= LOGOUT =================

logoutBtn.addEventListener("click",()=>{

signOut(auth)
.then(()=>{

window.location.href="login.html";

})
.catch((err)=>{

alert(err.message);

});

});

// ================= BUY BUTTONS =================

document.querySelectorAll(".product-card button")
.forEach(btn=>{

btn.addEventListener("click",()=>{

window.location.href="payment.html";

});

});

// ================= OFFER BUTTON =================

const offer=document.getElementById("buyOffer");

if(offer){

offer.addEventListener("click",()=>{

window.location.href="payment.html";

});

}
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const joinTelegram = document.getElementById("joinTelegram");

if (popup) {
    popup.style.display = "flex";
}

closePopup?.addEventListener("click", () => {
    popup.style.display = "none";
});

joinTelegram?.addEventListener("click", async () => {

    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {

        const data = snap.data();

        if (!data.telegramReward) {

            await updateDoc(ref, {
                balance: (data.balance || 0) + 100,
                telegramReward: true
            });

            alert("🎉 ₹100 Added Successfully");
        } else {
            alert("Reward already claimed.");
        }
    }

    window.open("https://t.me/ILDkf0GqjCsyZmQ9", "_blank");
    popup.style.display = "none";

});
document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = "payment.html";
    });
});