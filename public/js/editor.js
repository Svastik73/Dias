 // Import the functions you need from the SDKs 
        //imports must me done inside "module" type
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDvmxZr2sdLx3jmL4aMb7O62LCEhbWsRl0",
            authDomain: "blog-6c442.firebaseapp.com",
            projectId: "blog-6c442",
            storageBucket: "blog-6c442.appspot.com",
            messagingSenderId: "508313059400",
            appId: "1:508313059400:web:fcedaa94a920309891987d"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

    
        const blogTitleField = document.querySelector('.title');
        const articleFeild = document.querySelector('.article');

        // banner
        const bannerImage = document.querySelector('#banner-upload');
        const banner = document.querySelector(".banner");
        let bannerPath;

        const publishBtn = document.querySelector('.publish-btn');
        const uploadInput = document.querySelector('#image-upload');

        bannerImage.addEventListener('change', () => {
            uploadImage(bannerImage, "banner");
        });

        uploadInput.addEventListener('change', () => {
            uploadImage(uploadInput, "image");
        });

        const uploadImage = (uploadFile, uploadType) => {
            const [file] = uploadFile.files;
            if(file && file.type.includes("image")){
                const formdata = new FormData();
                formdata.append('image', file);

                fetch('/upload', {
                    method: 'post',
                    body: formdata
                }).then(res => res.json())
                .then(data => {
                    if(uploadType == "image"){
                        addImage(data, file.name);
                    } else{
                        bannerPath = `${location.origin}/${data}`;
                        banner.style.backgroundImage = `url("${bannerPath}")`;
                    }
                });
            } else{
                alert("upload Image only");
            }
        };

        const addImage = (imagepath, alt) => {
            let curPos = articleFeild.selectionStart;
            let textToInsert = `\r![${alt}](${imagepath})\r`;
            articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
        };

        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        publishBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if(articleFeild.value.length && blogTitleField.value.length){
                // generating id
                let letters = 'abcdefghijklmnopqrstuvwxyz';
                let blogTitle = blogTitleField.value.split(" ").join("-");
                let id = '';
                for(let i = 0; i < 4; i++){
                    id += letters[Math.floor(Math.random() * letters.length)];
                }

                // setting up docName
                let docName = `${blogTitle}-${id}`;
                let date = new Date();
                set(ref(db,'user/'+docName),{   // this method is for real time database not firestore
                   //above line sets doc with name docName under user folder in firebase
                    title: blogTitleField.value,
                    article: articleFeild.value,
                    bannerImage: bannerPath,
                    publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                }).then(()=>{
                    location.href=`/${docName}`;  // redirect to blog page // for whiich we will add route in server.js
                })
                alert("done sucess");
                // the below code is another way out..  when using FIRESTORE!
              /*  setDoc(doc(db, "blogs", docName), {
                    title: blogTitleField.value,
                    article: articleFeild.value,
                    bannerImage: bannerPath,
                    publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                })
                .then(() => {
                    location.href = `/${docName}`;
                })
                .catch((err) => {
                    console.error(err);
                });  */
            }
        });