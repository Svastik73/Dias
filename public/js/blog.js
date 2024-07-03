 //imports must me done inside "module" type
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
 // Initialize Firebase
 
 let blogId = decodeURI(location.pathname.split("/").pop());
 let blogRef = ref(db, 'user/' + blogId); // Adjusted path

 // Retrieve the blog post data
 get(blogRef).then((snapshot) => {     // this method is used to fetch from realtime database
     if (snapshot.exists()) {
         setupBlog(snapshot.val());
     } else {
         location.replace("/");
     }
 }).catch((error) => {
     console.error(error);
 });

 // Function to setup the blog page with data
 const setupBlog = (data) => {
     const banner = document.querySelector('.banner');
     const blogTitle = document.querySelector('.title');
     const titleTag = document.querySelector('title');
     const publish = document.querySelector('.published');
     
     banner.style.backgroundImage = `url(${data.bannerImage})`;

     titleTag.innerHTML += blogTitle.innerHTML = data.title;
     publish.innerHTML += data.publishedAt;

     const article = document.querySelector('.article');
     addArticle(article, data.article);
 }

 // Function to parse and display the article content
 const addArticle = (ele, data) => {
     data = data.split("\n").filter(item => item.length);

     data.forEach(item => {  // this functionality ensures that if you enter ## it will be equal to h1!
         // Check for heading
         if (item[0] == '#') {
             let hash_count = 0;
             let i = 0;
             while (item[i] == '#') {
                 hash_count++;
                 i++;
             }
             let tag = `h${hash_count}`;
             ele.innerHTML += `<${tag}>${item.slice(hash_count, item.length)}</${tag}>`;
         }
         // Checking for image format or image detection!
         else if (item[0] == "!" && item[1] == "[") {
             let separator;

             for (let i = 0; i <= item.length; i++) {
                 if (item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")") {
                     separator = i;
                 }
             }

             let alt = item.slice(2, separator);
             let src = item.slice(separator + 2, item.length - 1);
             ele.innerHTML += `
             <img src="${src}" alt="${alt}" class="article-image"> 
            
             `;
         } else {  // this adds image to the article!
             ele.innerHTML += `<p>${item}</p>`;
         }
     });
 }