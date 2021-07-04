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
    const deleteBook = document.createElement('button');
    deleteBook.textContent = '×';
    deleteBook.style.fontSize = '30px'
    deleteBook.style.position = 'absolute';
    deleteBook.style.left = '87%';
    deleteBook.style.top = '77%';
    newBookCard.appendChild(deleteBook);
    cardGrid.appendChild(newBookCard);
    deleteBook.addEventListener('click', (e)=>{deleteBookCard(e)});
}

function addBookToLibrary(title, author, numOfPages, read) {
    let newBook = new Book(title, author, numOfPages, read);
    myLibrary.push(newBook);
    createBookCard(newBook, myLibrary.length-1);
}

function displayAddBookModal(){
    addBookModal.style.transition = 'opacity 0.5s';
    addBookModal.style.opacity = '100%';
    document.body.style.backgroundColor = 'rgb(211, 211, 211)';
    addBookModal.style.backgroundColor = 'white';
    behindModalBackground.style.filter = 'blur(5px)';
}

function closeAddBookModal(){
    addBookModal.style.opacity = '0%';
    document.body.style.backgroundColor = 'white';
    behindModalBackground.style.filter = 'blur(0px)';
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
    myLibrary.splice(e.path[1].index, 1);
    e.path[1].remove();
}
addBookToLibrary('The Hobbit', 'Lebron', '521', true);
addBookButton.addEventListener('click', displayAddBookModal.bind(null,addBookButton));
form.addEventListener('submit',addBookCard.bind(null, form));
closeModalButton.addEventListener('click', closeAddBookModal.bind(null,closeModalButton));


