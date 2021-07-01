const myLibrary = [];
const cardGrid = document.querySelector('.card-grid');
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

function createBookCard(currentBook) {
    console.log(currentBook);
    let newBookCard = document.createElement('div');
    newBookCard.classList.add('book-card');
    let bookCardInfo = document.createElement('div');
    bookCardInfo.classList.add('book-info')
    newBookCard.appendChild(bookCardInfo);
    let bookCardInfoArr = createBookCardInfo(currentBook);
    for(let i = 0; i<bookCardInfoArr.length; i++){
        bookCardInfo.appendChild(bookCardInfoArr[i]);
    }
    cardGrid.appendChild(newBookCard);
}

function addBookToLibrary(title, author, numOfPages, read) {
    let newBook = new Book(title, author, numOfPages, read);
    myLibrary.push(newBook);
}

function createBookDisplay() {
    for (let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i]);
    }
}



addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

createBookDisplay();