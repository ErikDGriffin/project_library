// PROJECT Section

const books = [
    {
        id: 1,
        title: "Name of the Wind",
        author: "Patrick Rothfuss",
        read: true,
    }
];

class Book {
    constructor(id, title, author, read) { 
        this.id = id;
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

class Library {
    constructor(books) {
        this.nextId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
        this.books = books;
    }

    addBook() {
        const title = document.getElementById("title");
        const author = document.getElementById("author");
        const read = document.getElementById("read");
        const newBook = new Book(
            this.nextId, 
            title.value,
            author.value,
            read.checked
        );

        this.nextId++;
        this.books.push(newBook);

        const tbody = document.getElementById("tableBody");
        const newTr = document.createElement("tr");
        newTr.id = newBook.id;
        newTr.addEventListener("dblclick", () => {
            this.removeBook(newBook.id);
        });

        const newTitle = document.createElement("td");
        const newAuthor = document.createElement("td");
        const newRead = document.createElement("td");
        
        newTitle.textContent = title.value;
        newAuthor.textContent = author.value;
        const newCheckbox = document.createElement("input");
        newCheckbox.classList.add(newBook.id);
        newCheckbox.type = "checkbox";
        newCheckbox.checked = read.checked;
        newCheckbox.disabled = read.checked;
        newCheckbox.addEventListener("click", (event) => {
            this.markRead(event.target, newBook.id);
        });
        newRead.appendChild(newCheckbox);
        newTr.appendChild(newTitle);
        newTr.appendChild(newAuthor);
        newTr.appendChild(newRead);
        tbody.appendChild(newTr);

       
        title.value = "";
        author.value = "";
        read.checked = false;
    }

    markRead(checkbox, id) {
        this.books.forEach((book) => {
            if (id === book.id) {
                book.read = true;
                checkbox.disabled = true; 
            }
        });
    }

    removeBook(bookId) {
        this.books = this.books.filter(({ id }) => bookId !== id);
        const tbody = document.getElementById("tableBody");
        const bookRow = document.getElementById(bookId);
        tbody.removeChild(bookRow);
    }
}

const library = new Library(books);

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    library.addBook();
});

