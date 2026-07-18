import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const signupForm = document.getElementById("signupForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// Show / Hide Password
togglePassword.onclick = () => {

if(password.type==="password"){

password.type="text";
togglePassword.classList.replace("fa-eye","fa-eye-slash");

}else{

password.type="password";
togglePassword.classList.replace("fa-eye-slash","fa-eye");

}

};

// Show / Hide Confirm Password
toggleConfirmPassword.onclick = () => {

if(confirmPassword.type==="password"){

confirmPassword.type="text";
toggleConfirmPassword.classList.replace("fa-eye","fa-eye-slash");

}else{

confirmPassword.type="password";
toggleConfirmPassword.classList.replace("fa-eye-slash","fa-eye");

}

};

// Signup
signupForm.addEventListener("submit", async(e)=>{

e.preventDefault();

if(password.value !== confirmPassword.value){

alert("Passwords do not match!");
return;

}

try{

const userCredential = await createUserWithEmailAndPassword(
auth,
email.value.trim(),
password.value
);

const user = userCredential.user;

// Save User Data
await setDoc(doc(db,"users",user.uid),{

uid:user.uid,
name:name.value.trim(),
email:email.value.trim(),

wallet:0,
investment:0,
referralBonus:0,

createdAt:new Date()

});

alert("Account Created Successfully!");

window.location.href="dashboard.html";

}catch(error){

alert(error.message);

}

});