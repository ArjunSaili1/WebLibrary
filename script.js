const myLibrary = [];
const cardGrid = document.querySelector('.card-grid');
const addBookButton = document.querySelector('.book-add');
const addBookModal = document.querySelector('.add-book-modal');
const behindModalBackground = document.querySelector('.behind-modal');
const closeModalButton = document.querySelector('#close');
const titleField = document.querySelector('#add-book-title');
const authorField = document.querySelector('#add-book-author');
const pagesField =  document.querySelector('#add-book-pages');
const readSelect = document.querySelector('#add-book-read');
const submitAddBook = document.querySelector('#submit');
const form = document.querySelector('#add-book-form');
const modalFlex = document.querySelector('.modal-flex');
const emptyText = document.querySelector('#empty-text');
const deleteBookFlex = document.querySelector('.delete-book-flex');
const deleteBookAlert = document.querySelector('#delete-book-alert');
const deleteConfirm = document.querySelector('#delete-confirm');
const cancelConfirm = document.querySelector('#cancel-confirm');
const imgField = document.querySelector('#book-image-in');

class Book{
    constructor(title, author, numOfPages, read, img){
        this.img = img;
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.read = read;
    }
}

function createBookCardInfo(currentBook){
    let bookCardInfoArr = [];
    for (key in currentBook){
        if (currentBook.hasOwnProperty(key)){
            let newBookInfo = document.createElement('div');
            newBookInfo.classList.add('book-'+key);
            if(key == 'read'){
                if(currentBook[key]){
                    newBookInfo.textContent = 'Read';
                }
                else{
                    newBookInfo.textContent = 'Not Read Yet';
                }
            }
            else if(key == 'img'){
                const bookCardImage = document.createElement('img');
                bookCardImage.classList.add('book-image');
                newBookInfo.appendChild(bookCardImage);
                if(currentBook[key]==''){
                    bookCardImage.src = 'images/template.png';
                }
                else{
                    bookCardImage.src = currentBook[key];
                }
            }
            else if (key == 'numOfPages'){
                if(currentBook[key] == '1'){
                    newBookInfo.textContent = currentBook[key] + ' page';
                }
                else{
                    newBookInfo.textContent = currentBook[key] + ' pages';
                }
            }
            else{
                newBookInfo.textContent = currentBook[key];
            }
            bookCardInfoArr.push(newBookInfo);
        }
    }
    console.log(bookCardInfoArr);
    return bookCardInfoArr;
}

function createBookCard(currentBook, index) {
    checkIfEmpty();
    let newBookCard = document.createElement('div');
    newBookCard.setAttribute('index', index);
    newBookCard.classList.add('book-card');
    newBookCard.style.position = 'relative';
    let bookCardInfo = document.createElement('div');
    bookCardInfo.classList.add('book-info');
    let bookCardFlex = document.createElement('div');
    bookCardFlex.style.display = 'flex';
    newBookCard.appendChild(bookCardFlex);
    bookCardFlex.appendChild(bookCardInfo);
    let bookCardInfoArr = createBookCardInfo(currentBook);
    for(let i = 0; i<bookCardInfoArr.length; i++){
        bookCardInfo.appendChild(bookCardInfoArr[i]);
    }
    const deleteBook = document.createElement('div');
    deleteBook.textContent = '×';
    deleteBook.style.fontSize = '50px';
    deleteBook.style.height = '100%';
    deleteBook.classList.add('hover-pointer');
    const changeReadButton = document.createElement('button');
    changeReadButton.textContent = 'Change Read Status';
    deleteBook.addEventListener('click', (e) => {
        deleteBookFlex.style.zIndex = '100';
        deleteBookAlert.style.display = 'unset';
        deleteBookAlert.style.animationName = 'fadeIn';
        deleteBookAlert.style.animationDuration = '1s';
        deleteBookAlert.style.opacity = '100%';
        const confirmDeleteClickHandler = () =>{
            deleteBookCard(e);
            deleteConfirm.removeEventListener("click", confirmDeleteClickHandler);
          }
        const confirmCancelClickHandler = () =>{
            deleteBookFlex.style.zIndex = '-1';
            deleteBookAlert.style.animationName = 'fadeOut';
            deleteBookAlert.style.animationDuration = '0.8s';
            deleteBookAlert.style.opacity = '0%';
            setTimeout(()=>{deleteBookAlert.style.display = 'none'},810);
            cancelConfirm.removeEventListener("click", confirmCancelClickHandler);
            deleteConfirm.removeEventListener("click", confirmDeleteClickHandler);
        }
        deleteConfirm.addEventListener("click", confirmDeleteClickHandler);
        cancelConfirm.addEventListener('click', confirmCancelClickHandler);
    });
    changeReadButton.addEventListener('click',(e)=>{changeReadStatus(e)});
    bookCardFlex.appendChild(changeReadButton);
    bookCardFlex.appendChild(deleteBook);
    bookCardFlex.id = 'book-card-flex';
    newBookCard.style.animationName = 'fadeIn';
    newBookCard.style.animationDuration = '0.8s';
    newBookCard.style.backgroundColor = 'white';
    cardGrid.appendChild(newBookCard);
}

function changeReadStatus(e){
    if(myLibrary[e.path[2].getAttribute('index')].read){
        myLibrary[e.path[2].getAttribute('index')].read = false;
        console.log(e)
        e.path[2].children[0].children[0].children[4].textContent = 'Not Read Yet';
    }
    else{
        myLibrary[e.path[2].getAttribute('index')].read = true;
        e.path[2].children[0].children[0].children[4].textContent = 'Read';
    }
}

function addBookToLibrary(title, author, numOfPages, read, img) {
    let newBook = new Book(title, author, numOfPages, read, img);
    myLibrary.push(newBook);
    createBookCard(newBook, myLibrary.length-1);
}

function displayAddBookModal(){
    modalFlex.style.zIndex = '100';
    addBookModal.style.zIndex = '100';
    addBookModal.style.transition = 'opacity 0.5s';
    addBookModal.style.opacity = '100%';
    addBookModal.style.backgroundColor = 'white';
    behindModalBackground.style.filter = 'blur(5px)';
}

function closeAddBookModal(){
    addBookModal.style.opacity = '0%';
    behindModalBackground.style.filter = 'blur(0px)';
    modalFlex.style.zIndex = '-1';
    addBookModal.style.zIndex = '-1';
}

function addBookCard(){
    if (readSelect.checked){
        addBookToLibrary(titleField.value, authorField.value, pagesField.value, true, imgField.value);
    }
    else{
        addBookToLibrary(titleField.value, authorField.value, pagesField.value, false, imgField.value);
    }
    closeAddBookModal();
}


function deleteBookCard(e){
    deleteBookFlex.style.zIndex = '-1';
    deleteBookAlert.style.animationName = 'fadeOut';
    deleteBookAlert.style.animationDuration = '0.8s';
    deleteBookAlert.style.opacity = '0%';
    setTimeout(function(){deleteBookAlert.style.display = 'none'}, 800);
    e.path[2].style.animationName = 'fadeOut';
    e.path[2].style.animationDuration = '0.8s';
    myLibrary.splice(e.path[2].getAttribute('index'), 1);
    setTimeout(()=>{e.path[2].remove()},800);
    checkIfEmpty();
}

function checkIfEmpty(){
    if(myLibrary.length == 0){
        setTimeout(()=>{emptyText.style.display = 'unset'}, 600);
    }
    else{
        emptyText.style.display = 'none';
    }
}

checkIfEmpty();
addBookButton.addEventListener('click', displayAddBookModal.bind(null,addBookButton));
form.addEventListener('submit',addBookCard.bind(null, form));
closeModalButton.addEventListener('click', closeAddBookModal.bind(null,closeModalButton));


