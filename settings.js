import { auth } from "./firebase.js";

import {
onAuthStateChanged,
sendPasswordResetEmail,
deleteUser,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Elements
const darkMode = document.getElementById("dark");
const notify = document.getElementById("notify");
const deleteBtn = document.getElementById("deleteAccount");

// Load Saved Settings
if(localStorage.getItem("darkMode")==="true"){
    darkMode.checked=true;
    document.body.classList.add("dark");
}

if(localStorage.getItem("notifications")==="true"){
    notify.checked=true;
}

// Dark Mode
darkMode.addEventListener("change",()=>{

    localStorage.setItem("darkMode",darkMode.checked);

    if(darkMode.checked){
        document.body.classList.add("dark");
    }else{
        document.body.classList.remove("dark");
    }

});

// Notifications
notify.addEventListener("change",()=>{

    localStorage.setItem("notifications",notify.checked);

    alert(
        notify.checked
        ? "Notifications Enabled"
        : "Notifications Disabled"
    );

});

// User Check
onAuthStateChanged(auth,(user)=>{

    if(!user){
        window.location.href="login.html";
    }

});

// Change Password
document.querySelectorAll(".item").forEach(item=>{

    if(item.textContent.includes("Change Password")){

        item.addEventListener("click",(e)=>{

            e.preventDefault();

            const user=auth.currentUser;

            if(!user) return;

            sendPasswordResetEmail(auth,user.email)
            .then(()=>{

                alert("Password reset link sent to your email.");

            })
            .catch(err=>{

                alert(err.message);

            });

        });

    }

});

// Delete Account
deleteBtn.addEventListener("click",()=>{

    const ok=confirm(
        "Are you sure?\nThis action cannot be undone."
    );

    if(!ok) return;

    const user=auth.currentUser;

    deleteUser(user)
    .then(()=>{

        alert("Account deleted successfully.");

        window.location.href="login.html";

    })
    .catch(err=>{

        alert(err.message);

    });

});