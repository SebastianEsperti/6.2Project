//helper function 

function reduceToTopFive(array) {
  while (array.length > 5) array.pop()
}



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
  const genreCounts = books.reduce((accumulator, book) => {
    const genre = book.genre
    if (!accumulator[genre]) {
      accumulator[genre] = 1;
    } else {
      accumulator[genre]++
    }
    return accumulator;
  }, {})
  const sortedGenres = Object.keys(genreCounts)
    .map(name =>({name, count: genreCounts[name]}))
    .sort ((a, b)=> b.count - a.count)
  
  reduceToTopFive(sortedGenres)
  return sortedGenres
}

function getMostPopularBooks(books) {
  let bookNameCount = []
  books.forEach((book)=> bookNameCount.push({name: book.title, count: book.borrows.length}))
  bookNameCount.sort((a, b)=> b.count - a.count)
  reduceToTopFive(bookNameCount)
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

    const result = authIdAndCount.map((pair)=>{
      const author = authors.find((author)=> author.id === pair.id)
      const name = `${author.name.first} ${author.name.last}`
      return {name, count: pair.count}
    })
    result.sort((a, b)=> b.count - a.count)
    reduceToTopFive(result)
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
