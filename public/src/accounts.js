function findAccountById(accounts, id) {
  return accounts.find((element) => element.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2)=> {
    return acc1.name.last.toLowerCase() > acc2.name.last.toLowerCase() ? 1 : -1
  })
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => {
    const borrows = book.borrows
    borrows.forEach((borrow)=> {
      if (borrow.id === account.id) {
        total++
      }
    })
  })
  return total
}
function getBooksPossessedByAccount(account, books, authors) {
  let userBooks = []
  
  let filteredBooks = books.filter((book)=> {
    const borrows = book.borrows
    return borrows.some((idPair)=> {
      return idPair.id === account.id && !idPair.returned
    })
  })

  filteredBooks.forEach((book) => {
    let authID = book.authorId
    let author = authors.find((author)=> author.id === authID)
    let bookObj = {...book, author}
    userBooks.push(bookObj)
  })
    return userBooks
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
