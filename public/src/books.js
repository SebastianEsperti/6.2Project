function findAuthorById(authors, id) {
  return authors.find((author)=> author.id === id)
}

function findBookById(books, id) {
  return books.find((book)=> book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
let borrowedBooks = []
let returnedBooks = []

books.forEach((book)=> {
  if (book.borrows[0].returned) {
    returnedBooks.push(book)
  } else {
    borrowedBooks.push(book)
  }
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
return [borrowedBooks, returnedBooks]
}

function getBorrowersForBook(book, accounts) {
  let borrowers = []
  let peopleCount = 0;

  book.borrows.forEach((borrower)=> {
    if (peopleCount < 10) {
    let userInfo = accounts.find((account)=> borrower.id === account.id)
    userInfo['returned'] = borrower.returned
    borrowers.push(userInfo)
    peopleCount++
    } 
  })
  return borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
