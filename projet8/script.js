let bookList = []; 
fetch('./data.json').then(response=>{
    if(!response.ok){
        console.log("There is an error")
        return;
    }
    return response.json();
})
.then(data=>{
        const books = data.Books;
        class Book {
            constructor(title, description, cover, pdf, author, releaseDate,language,genre,publicationPlace,authorPic) {
                this.title = title;
                this.description = description;
                this.cover = cover;
                this.pdf = pdf;
                this.author = author;
                this.releaseDate = releaseDate;
                this.language = language;
                this.genre = genre;
                this.publicationPlace = publicationPlace;
                this.authorPic = authorPic;
            }
        }
                for (let i = 0; i < books.length; i++) {
                    const title = books[i].title;
                    const description = books[i].description;
                    const cover = books[i].cover;
                    const pdf = books[i].pdf;
                    const author = books[i].author;
                    const releaseDate = books[i].releaseDate;
                    const language = books[i].language;
                    const genre = books[i].genre;
                    const publicationPlace = books[i].publicationPlace;
                    const authorPic = books[i].authorPic;
                     books[i] = new Book (title,description,cover,pdf,author,releaseDate,language,genre,publicationPlace,authorPic)
                     bookList.push(books[i]);
                }
                     books2=books
                    affichage(books2)
})
function affichage(books){
    const section = document.querySelector('section');
      for (let i = 0; i < books.length; i++) {
          const title = books[i].title;
          const cover = books[i].cover;
          const pdf = books[i].pdf;
          const author = books[i].author;
          const releaseDate = books[i].releaseDate;
   bookElement=document.createElement('div');
   bookElement.className = `book${[i]}`;
   bookElement.innerHTML = `
       <h2>${title}</h2>
       <img src="${cover}"><br>
       <button value="add" onclick="Add(this)" class="add">Add to Wishlist</button>
       <button value="detail" onclick="detail(this)">Book Details</button>
       <button class="remove" onclick="remove(this)" style="display:none">Remove Book</button>
       <input type="hidden" value="${i}">
       <h3> ${author}</h3>
   `;
   section.appendChild(bookElement);
      }
  }
function Add(button){
    let id=button.parentElement.querySelector('input').value;
    let localbooks=JSON.parse(localStorage.getItem("key")) || [];
    for(book of localbooks){
        if(book.title===bookList[id].title)return
    }
    localbooks.push(bookList[id])
    localStorage.setItem("key",JSON.stringify(localbooks))
    button.parentElement.querySelector('.add').style.display= "none" ;
    button.parentElement.querySelector('.remove').style.display= "block" ;
}
function search() {
    let inputSearch = document.getElementById('inputSearch').value.toLowerCase();
    let section = document.querySelector('.sectionCherche');
    section.innerHTML = ''; 
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].title.toLowerCase().includes(inputSearch)) {
            const bookDiv=document.createElement('div');
            bookDiv.className = "booksdiv";
            bookDiv.innerHTML = `
                 <h2>${bookList[i].title}</h2>
          <img src="${bookList[i].cover}">
            <p>${bookList[i].description}</p>
                <button value="add" onclick="Add(this)">Add to Wishlist</button>
                <button value="detail" onclick="detail(this)">Book Details</button>
                <input type="hidden" value="${i}">
                <h3> ${bookList[i].author}</h3>
            `;
            section.appendChild(bookDiv);
        }
    }
}
function detail(button){
    let position=button.parentElement.querySelector("input").value;
    localStorage.setItem("detail",JSON.stringify(bookList[position]))
    window.location.href="Details.html"
}
function remove(button){
    let divBtn=button.parentElement.parentElement
    let position = divBtn.querySelector('input').value
    let books=JSON.parse(localStorage.getItem("key"))
    books.splice(position,1)
    localStorage.setItem("key",JSON.stringify(books))
    divBtn.remove()
    button.parentElement.querySelector('.add').style.display= "block" ;
    button.parentElement.querySelector('.remove').style.display= "none" ;
}