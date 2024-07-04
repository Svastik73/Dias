import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const blogref = ref(db, '/user');

get(blogref).then((snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            const id = childSnapshot.key; // Get the key as the id        
            if (id != decodeURI(location.pathname.split("/").pop())) { // When iterating through the child snapshots, 
                //use childSnapshot.key to get the key of each child node. This key is used as the id in the URL.
                createBlog(item, id);
            }
        });
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

const createBlog = (data, id) => {
    blogSection.innerHTML += `
        <div class="blog-card">
            <img src="${data.bannerImage}" class="blog-image" alt="">
            <h1 class="blog-title">${data.title.substring(0, 100)}</h1>
            <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
            <a href="/${id}" class="btn dark">read</a>
        </div> 
    `;
}
