import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Buttons
const telegramBtn = document.getElementById("telegramSupport");
const whatsappBtn = document.getElementById("whatsappSupport");
// WhatsApp Support
const whatsappBtn = document.getElementById("whatsappSupport");

whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault();

    window.open(
        "https://whatsapp.com/channel/0029Vb8RFaXHVvTRLsczry0h",
        "_blank"
    );
});
const emailBtn = document.getElementById("emailSupport");
const faqBtn = document.getElementById("faq");
const sendBtn = document.getElementById("sendMessage");

// Telegram
telegramBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.open("https://t.me/YourTelegramUsername","_blank");
});

// WhatsApp
whatsappBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.open("https://whatsapp.com/channel/0029Vb8RFaXHVvTRLsczry0h","_blank");
});

// Email
emailBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href="mailto:support@lootic.com";
});

// FAQ
faqBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    alert("FAQ page will be available soon.");
});

// Contact Form
sendBtn.addEventListener("click",async()=>{

    const subject=document.getElementById("subject").value.trim();
    const message=document.getElementById("message").value.trim();

    if(subject===""){
        alert("Please enter a subject.");
        return;
    }

    if(message===""){
        alert("Please write your message.");
        return;
    }

    try{

        await addDoc(collection(db,"support"),{

            subject:subject,
            message:message,
            createdAt:serverTimestamp(),
            status:"Pending"

        });

        alert("Your message has been sent successfully.");

        document.getElementById("subject").value="";
        document.getElementById("message").value="";

    }catch(error){

        alert(error.message);

    }

});