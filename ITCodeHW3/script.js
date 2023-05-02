let form = document.getElementById("form");
let textarea = document.getElementById("textarea");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let msgError = document.getElementById("msgError");
let posts = document.getElementById("posts");
let tasks = document.getElementById("tasks");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});
  
let formValidation = () => {
    if (textInput.value === "") {
        msgError.innerHTML = "А заголовок?;)";
      } else if (textarea.value === "") {
        msgError.innerHTML = "А заметка?;)";
      } else if (dateInput.value === "") {
        msgError.innerHTML = "А дата?;)";
      } else {
        msgError.innerHTML = "";
        acceptData();
      }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    description: textarea.value,
    date: dateInput.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  createPost();
};

let createPost = () => { //либо из прям совсем простого и, наверное, в рамках стажировки, не совсем показательного, то это смена значения свойства "contenteditable" на true у текста, дабы была возможность редактивования, но это прям совсем детский сад)
    posts.innerHTML = "";
    data.map((x,  y) => {
        return (posts.innerHTML += `
        <div id="posts">
            <p>Задача: ${x.text}</p>
            <p>Описание: ${x.description}</p>
            <p>Дата: ${x.date}</p>
            <span class="options">
            <i style="color: white" onClick="editPost(this)" class="fas fa-edit"></i>
            <i style="color: white" onClick="deletePost(this)" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });
    resetForm();
};

let resetForm = () => {
    textInput.value = "";
    textarea.value = "";
    dateInput.value = "";
};
    

let deletePost = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
};

let editPost = (e) => {
    // textarea.value = e.parentElement.previousElementSibling.innerHTML;
    // e.parentElement.parentElement.remove();
    let selectedPost = e.parentElement.parentElement;

    textInput.value = selectedPost.children[0].innerHTML;
    textarea.value = selectedPost.children[1].innerHTML;
    dateInput.value = selectedPost.children[2].innerHTML;
  
    deletePost(e);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];

    createPost();
})();


  