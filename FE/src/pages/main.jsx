// import axios from "axios";
// const apiUrl = "http://localhost:3000/posts";

// const listPosts = document.getElementsByClassName("list-posts")[0];

// //crud = create - read - update - delete

// const response = await axios.get(apiUrl);
// // get data
// fetch(apiUrl)
//   .then((res) => res.json())
//   .then((data) => {
//     const postHTML = data.map(
//       (post) => `
//         <div class="card" style="width: 18rem;">
//           <div class="card-body">
//             <h5 class="card-title">${post.title}</h5>
//             <p class="card-text">${post.author}</p>
//             <a href="#" class="btn btn-primary">Go somewhere</a>
//             <button id="delete-btn" onclick={handleDeleteItem(${post.id})}>Delete</button>
//           </div>
//         </div>
//     `
//     );
//     listPosts.innerHTML = postHTML.join(" ");
//   });

// // post data
// const postBtn = document.getElementsByClassName("post-btn")[0];

// postBtn.addEventListener("click", () => {
//   const titleData = document.getElementsByClassName("title-input")[0].value;
//   const authorData = document.getElementsByClassName("author-input")[0].value;
//   const formDataPost = {
//     title: titleData,
//     author: authorData,
//   };

//   // const optionsPost = {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify(formDataPost),
//   // };
//   // fetch(apiUrl, optionsPost);

//   const response = await axios.post(apiUrl, formDataPost);
// });

// const handleDeleteItem = (id) => {
//   const optionsPost = {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   fetch(apiUrl + `/${id}`, optionsPost);
// };

// axios.delete(apiUrl + `/${id}`);
