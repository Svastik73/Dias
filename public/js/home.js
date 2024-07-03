
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getDatabase, ref, set,get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

 const firebaseConfig = {
     apiKey: "AIzaSyDvmxZr2sdLx3jmL4aMb7O62LCEhbWsRl0",
     authDomain: "blog-6c442.firebaseapp.com",
     projectId: "blog-6c442",
     storageBucket: "blog-6c442.appspot.com",
     messagingSenderId: "508313059400",
     appId: "1:508313059400:web:fcedaa94a920309891987d"
 };
 const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);



 const blogSection = document.querySelector('.blogs-section');

 