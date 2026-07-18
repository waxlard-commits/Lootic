import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const forgotPassword = document.getElementById("forgotPassword");

// Show / Hide Password
togglePassword.addEventListener("click", () => {

if(password.type==="password"){

password.type="text";
togglePassword.classList.remove("fa-eye");
togglePassword.classList.add("fa-eye-slash");

}else{

password.type="password";
togglePassword.classList.remove("fa-eye-slash");
togglePassword.classList.add("fa-eye");

}

});

// Login
loginForm.addEventListener("submit", async(e)=>{

e.preventDefault();

try{

await signInWithEmailAndPassword(
auth,
email.value.trim(),
password.value
);

alert("Login Successful!");

window.location.href="dashboard.html";

}catch(error){

alert(error.message);

}

});

// Forgot Password
forgotPassword.addEventListener("click",async(e)=>{

e.preventDefault();

if(email.value.trim()===""){

alert("Enter your email first.");
return;

}

try{

await sendPasswordResetEmail(
auth,
email.value.trim()
);

alert("Password reset email sent.");

}catch(error){

alert(error.message);

}

});