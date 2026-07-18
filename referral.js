import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc,
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const refCode=document.getElementById("refCode");
const refLink=document.getElementById("refLink");
const copyCode=document.getElementById("copyCode");
const copyLink=document.getElementById("copyLink");
const shareBtn=document.getElementById("shareBtn");

const totalReferrals=document.getElementById("totalReferrals");
const totalBonus=document.getElementById("totalBonus");
const historyList=document.getElementById("historyList");

onAuthStateChanged(auth,async(user)=>{

if(!user){
window.location.href="login.html";
return;
}

const snap=await getDoc(doc(db,"users",user.uid));

if(!snap.exists()) return;

const data=snap.data();

const code=data.referralCode||user.uid.substring(0,8).toUpperCase();

refCode.innerText=code;

const link=`https://lootic.com/signup?ref=${code}`;

refLink.innerText=link;

copyCode.onclick=()=>{

navigator.clipboard.writeText(code);

alert("Referral code copied.");

};

copyLink.onclick=()=>{

navigator.clipboard.writeText(link);

alert("Referral link copied.");

};

shareBtn.onclick=async()=>{

if(navigator.share){

await navigator.share({

title:"Join Lootic",

text:"Join Lootic using my referral link.",

url:link

});

}else{

navigator.clipboard.writeText(link);

alert("Referral link copied.");

}

};

const q=query(
collection(db,"users"),
where("referredBy","==",code)
);

const qs=await getDocs(q);

totalReferrals.innerText=qs.size;

let bonus=0;

historyList.innerHTML="";

if(qs.empty){

historyList.innerHTML="<p>No referrals yet.</p>";

}else{

qs.forEach(docu=>{

const u=docu.data();

bonus+=Number(u.referralBonus||0);

historyList.innerHTML+=`

<div class="referral-item">

<h4>${u.name||"User"}</h4>

<p>Bonus : ₹${u.referralBonus||0}</p>

</div>

`;

});

}

totalBonus.innerText="₹"+bonus;

});