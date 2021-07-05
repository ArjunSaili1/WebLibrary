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
const allFieldElements = document.querySelectorAll('.input-field')
const form = document.querySelector('#add-book-form');
const modalFlex = document.querySelector('.modal-flex');
const emptyText = document.querySelector('#empty-text');
function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
}

Book.prototype.info = function () {
    let retStr = title + " by " + author + ', ' + numOfPages + " pages" + ', ';
    if (read) {
        return retStr + "not read yet."
    }
    return retStr + "read."
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
            else if (key == 'numOfPages'){
                newBookInfo.textContent = currentBook[key] + ' pages';

            }
            else{
                newBookInfo.textContent = currentBook[key];
            }
            bookCardInfoArr.push(newBookInfo);
        }
    }
    return bookCardInfoArr;
}

function createBookCard(currentBook, index) {
    checkIfEmpty();
    let newBookCard = document.createElement('div');
    newBookCard.setAttribute('index', index);
    newBookCard.classList.add('book-card');
    newBookCard.style.position = 'relative'
    let bookCardInfo = document.createElement('div');
    bookCardInfo.classList.add('book-info')
    newBookCard.appendChild(bookCardInfo);
    let bookCardInfoArr = createBookCardInfo(currentBook);
    for(let i = 0; i<bookCardInfoArr.length; i++){
        bookCardInfo.appendChild(bookCardInfoArr[i]);
    }
    const deleteBook = document.createElement('div');
    deleteBook.textContent = '×';
    deleteBook.style.fontSize = '80px';
    deleteBook.style.position = 'absolute';
    deleteBook.style.left = '86%';
    deleteBook.style.top = '66%';
    deleteBook.classList.add('hover-pointer');
    const changeReadButton = document.createElement('button');
    changeReadButton.textContent = 'Change Read Status';
    changeReadButton.style.position = 'absolute';
    changeReadButton.style.top = '76.5%';
    changeReadButton.style.left = '38%';
    changeReadButton.style.height = '35px';
    deleteBook.addEventListener('click', (e)=>{deleteBookCard(e)});
    changeReadButton.addEventListener('click',(e)=>{changeReadStatus(e)});
    newBookCard.appendChild(changeReadButton);
    newBookCard.appendChild(deleteBook);
    newBookCard.style.animationName = 'fadeIn';
    newBookCard.style.animationDuration = '0.8s';
    newBookCard.style.backgroundColor = 'white';
    cardGrid.appendChild(newBookCard);
}

function changeReadStatus(e){
    if(myLibrary[e.path[1].getAttribute('index')].read){
        myLibrary[e.path[1].getAttribute('index')].read = false;
        e.path[1].children[0].children[3].textContent = 'Not Read Yet';
    }
    else{
        myLibrary[e.path[1].getAttribute('index')].read = true;
        e.path[1].children[0].children[3].textContent = 'Read';
    }
}

function addBookToLibrary(title, author, numOfPages, read) {
    let newBook = new Book(title, author, numOfPages, read);
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
        addBookToLibrary(titleField.value, authorField.value, pagesField.value, true);
    }
    else{
        addBookToLibrary(titleField.value, authorField.value, pagesField.value, false);
    }
    closeAddBookModal();
}

function deleteBookCard(e){
    e.path[1].style.animationName = 'fadeOut';
    e.path[1].style.animationDuration = '1s';
    myLibrary.splice(e.path[1].getAttribute('index'), 1);
    e.path[1].remove();
    checkIfEmpty();
}

function checkIfEmpty(){
    console.log(myLibrary);
    if(myLibrary.length == 0){
        emptyText.style.display = 'unset';
    }
    else{
        emptyText.style.display = 'none';
    }
}

checkIfEmpty();
addBookButton.addEventListener('click', displayAddBookModal.bind(null,addBookButton));
form.addEventListener('submit',addBookCard.bind(null, form));
closeModalButton.addEventListener('click', closeAddBookModal.bind(null,closeModalButton));


