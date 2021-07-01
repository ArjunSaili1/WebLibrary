let myLibrary = [];
const card = document.querySelector('.book-card');
function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
    this.info = function () {
        let retStr = title + " by " + author + ', ' + numOfPages + " pages" + ', ';
        if (read) {
            return retStr + "not read yet."
        }
        return retStr + "read."
    }
}
function addBookToLibrary(title, author, numOfPages, read){
    let newBook = new Book(title, author, numOfPages, read);
    myLibrary.push(newBook);
}

function createBookCard(Book){
    
}

function createBookDisplay(myLibrary){
    for(let i=0;i<myLibrary.length;i++){

    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(myLibrary);