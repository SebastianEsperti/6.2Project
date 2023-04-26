function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let count = 0
   books.forEach((book)=>{
    const latestBorrow = book.borrows[0]
    if (latestBorrow && !latestBorrow.returned) {
      count++
    } else if (!book.borrows.length) {
      count++
    }
    
  })
  return count
}

function getMostCommonGenres(books) {
  let genreMasterList = []
  let sortedGenres = []
 
  books.forEach((book)=> genreMasterList.push(book.genre))

  genreMasterList.forEach((index)=> {
   let genreObj = sortedGenres.find((object)=> object.name === index)
    if (genreObj) {
      genreObj.count++
    } else {
      sortedGenres.push({name: index, count: 1})
    }
   })

  sortedGenres.sort((a, b)=> b.count - a.count)
  while (sortedGenres.length > 5) sortedGenres.pop() 
  return sortedGenres
}

function getMostPopularBooks(books) {
  let bookNameCount = []
  books.forEach((book)=> bookNameCount.push({name: book.title, count: book.borrows.length}))
  bookNameCount.sort((a, b)=> b.count - a.count)
  while (bookNameCount.length > 5) bookNameCount.pop()
  return bookNameCount
}

function getMostPopularAuthors(books, authors) {
  const authIdAndCount = []
    books.forEach((book)=> {
      let found = false
      authIdAndCount.find((pair)=> {
        if (pair.id === book.authorId) {
          pair.count += book.borrows.length
          found = true
        } 
        })
        if (!found) {
          authIdAndCount.push({id: book.authorId, count: book.borrows.length})
        }
    })
    //console.log(authIdAndCount)

    const result = authIdAndCount.map((pair)=>{
      const author = authors.find((author)=> author.id === pair.id)
      const name = `${author.name.first} ${author.name.last}`
      return {name, count: pair.count}
    })
    console.log(result)
    result.sort((a, b)=> b.count - a.count)
    while (result.length > 5) result.pop()
    return result
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
