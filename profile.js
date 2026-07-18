import { auth, db, storage } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Elements

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const walletBalance = document.getElementById("walletBalance");
const totalInvestment = document.getElementById("totalInvestment");

const profileImage = document.getElementById("profileImage");

const profileInput = document.getElementById("profileInput");
const changePhoto = document.getElementById("changePhoto");

const logoutBtn = document.getElementById("logoutBtn");

// Load User

onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location.href="login.html";

return;

}

userEmail.innerText=user.email;

const docRef=doc(db,"users",user.uid);

const snap=await getDoc(docRef);

if(snap.exists()){

const data=snap.data();

userName.innerText=data.name||"User";

walletBalance.innerText="₹"+(data.wallet||0);

totalInvestment.innerText="₹"+(data.investment||0);

if(data.photo){

profileImage.src=data.photo;

}

}

});

// Change Profile Photo

changePhoto.onclick=()=>{

profileInput.click();

};

profileInput.addEventListener("change",async()=>{

const file=profileInput.files[0];

if(!file) return;

const user=auth.currentUser;

const storageRef=ref(storage,
"profile/"+user.uid);

await uploadBytes(storageRef,file);

const url=await getDownloadURL(storageRef);

profileImage.src=url;

alert("Profile photo uploaded successfully.");

});

// Logout

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

window.location.href="login.html";

});