var bookID = -1;
function Book(name, price, author) {
  bookID++;
  this.id = bookID;
  this.name = name;
  this.price = price;
  this.author = author;
}

var authorID = -1;
function Author(name, email) {
  authorID++;
  this.id = authorID;
  this.name = name;
  this.email = email;
}

var booksInput = document.querySelector("input");
var booksNumForm = document.querySelector(".num-form");
var booksInfoForm = document.querySelector(".book-form");
var tableBody = document.querySelector("tbody");
var booksNum;
var books = [];
var authors = [];
var changedBook = {};
var emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

function getBooksNum(e) {
  e.preventDefault();
  booksNum = booksInput.value;
  booksInfoForm.classList.remove("d-none");
  booksNumForm.classList.add("d-none");
  booksInfoForm.addEventListener("submit", getBooksInfo);
}
booksNumForm.addEventListener("submit", getBooksNum);

function validateBookInfo() {
  var bookInputValArr = booksInfoForm.querySelectorAll(".form-control");
  for (let i = 0; i < bookInputValArr.length; i++) {
    bookInputValArr[i].addEventListener("change", function () {
      var textWarn = document.querySelectorAll(".warning");
      if (
        bookInputValArr[i].type == "text" &&
        isFinite(bookInputValArr[i].value)
      ) {
        textWarn[i].textContent = "only text allowed";
      } else if (
        bookInputValArr[i].type == "email" &&
        !emailRegex.test(bookInputValArr[i].value)
      ) {
        textWarn[i].textContent = "email is not valid";
      } else {
        textWarn[i].textContent = "";
      }
    });
  }
}
validateBookInfo();

function getBooksInfo(e) {
  e.preventDefault();
  var bookInputValArr = booksInfoForm.querySelectorAll(".form-control");

  if (books.length != booksNum) {
    books.push(
      new Book(
        bookInputValArr[0].value,
        bookInputValArr[1].value,
        bookInputValArr[2].value
      )
    );
    authors.push(
      new Author(bookInputValArr[2].value, bookInputValArr[3].value)
    );

    for (var i = 0; i < bookInputValArr.length; i++) {
      bookInputValArr[i].value = "";
    }
    if (books.length == booksNum) {
      generateTablesInfo();
    }
  }
  // console.log(books, authors);
}

function deleteObjItem(arr, key, value) {
  var i = arr.length;
  while (i--) {
    if (arr[i][key] === value) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

function deleteRow(e) {
  var bookRow = e.target.parentElement.parentElement;
  bookRow.parentElement.removeChild(bookRow);
  var rowId = bookRow.getAttribute("id");
  deleteObjItem(books, "id", Number(rowId));
  deleteObjItem(authors, "id", Number(rowId));
}

function editRow(e) {
  var rowCells = e.target.parentElement.parentElement.querySelectorAll("td");
  var rowId = Number(e.target.parentElement.parentElement.getAttribute("id"));
  var book = books.find((item) => item.id === rowId);
  var author = authors.find((item) => item.id === rowId);

  rowCells[0].innerHTML = `<input value=${book.name}>`;
  rowCells[1].innerHTML = `<input value=${book.price}>`;
  rowCells[2].innerHTML = `<input value=${book.author}>`;
  rowCells[3].innerHTML = `<input value=${author.email}>`;
  rowCells[4].innerHTML = `<button class='btn btn-secondary save-btn'>save</button>`;
  rowCells[5].innerHTML = `<button class='btn btn-danger cancel-btn'>cancel</button>`;

  // getting input values in a temporary arr
  for (var i = 0; i < rowCells.length - 2; i++) {
    rowCells[i].querySelector("input").addEventListener("input", function () {
      changedBook.id = rowId;
      changedBook.name = rowCells[0].querySelector("input").value;
      changedBook.price = rowCells[1].querySelector("input").value;
      changedBook.author = rowCells[2].querySelector("input").value;
      changedBook.email = rowCells[3].querySelector("input").value;
    });
  }
  // console.log(books, changedBook);
  saveBtn = document.querySelector(".save-btn");
  cancelBtn = document.querySelector(".cancel-btn");
  saveBtn.addEventListener("click", saveData);
  cancelBtn.addEventListener("click", cancel);
}

function saveData(e) {
  var rowCells = e.target.parentElement.parentElement.querySelectorAll("td");
  var rowId = Number(e.target.parentElement.parentElement.getAttribute("id"));
  for (var i = 0; i < rowCells.length - 2; i++) {
    rowCells[i].innerHTML = `<td>${
      rowCells[i].querySelector("input").value
    }</td>`;
  }
  rowCells[4].innerHTML = `<button class='btn btn-secondary edit-btn'>edit</button>`;
  rowCells[5].innerHTML = `<button class='btn btn-danger delete-btn'>delete</button>`;

  var book = books.find((item) => item.id === rowId);
  var author = authors.find((item) => item.id === rowId);
  book.id = Number(changedBook.id);
  book.name = changedBook.name;
  book.price = changedBook.price;
  book.author = changedBook.author;
  author.email = changedBook.email;

  var deleteBtns = document.querySelectorAll(".delete-btn");
  var editBtns = document.querySelectorAll(".edit-btn");
  for (var j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener("click", deleteRow);
  }
  for (var k = 0; k < editBtns.length; k++) {
    editBtns[k].addEventListener("click", editRow);
  }
}

function cancel(e) {
  var rowCells = e.target.parentElement.parentElement.querySelectorAll("td");
  var rowId = Number(e.target.parentElement.parentElement.getAttribute("id"));
  var book = books.find((item) => item.id === rowId);
  var author = authors.find((item) => item.id === rowId);
  rowCells[0].innerHTML = `<td>${book.name}</td>`;
  rowCells[1].innerHTML = `<td>${book.price}</td>`;
  rowCells[2].innerHTML = `<td>${book.author}</td>`;
  rowCells[3].innerHTML = `<td>${author.email}</td>`;
  rowCells[4].innerHTML = `<button class='btn btn-secondary edit-btn'>edit</button>`;
  rowCells[5].innerHTML = `<button class='btn btn-danger delete-btn'>delete</button>`;

  var deleteBtns = document.querySelectorAll(".delete-btn");
  var editBtns = document.querySelectorAll(".edit-btn");
  for (var j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener("click", deleteRow);
  }
  for (var k = 0; k < editBtns.length; k++) {
    editBtns[k].addEventListener("click", editRow);
  }
}

function generateTablesInfo() {
  booksInfoForm.classList.add("d-none");
  for (var i = 0; i < books.length; i++) {
    tableBody.innerHTML += `<tr id=${i}>
    <td>${books[i].name}</td>
    <td>${books[i].price}</td>
    <td>${books[i].author}</td>
    <td>${authors[i].email}</td>
    <td><button class="btn btn-secondary edit-btn">edit</button></td>
    <td><button class="btn btn-danger delete-btn">delete</button></td>
</tr>`;
  }
  document.querySelector("table").classList.remove("d-none");
  var deleteBtns = document.querySelectorAll(".delete-btn");
  var editBtns = document.querySelectorAll(".edit-btn");
  for (var j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener("click", deleteRow);
  }
  for (var k = 0; k < editBtns.length; k++) {
    editBtns[k].addEventListener("click", editRow);
  }
}
