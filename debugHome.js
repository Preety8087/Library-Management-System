const mongoose = require('mongoose')
const Book = require('./models/Book')
const BorrowHistory = require('./models/BorrowHistory')

mongoose.connect('mongodb://localhost/library-management-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

async function debugHome() {
  try {
    // for popular books
    const sortBorrowedBooksByCount = await BorrowHistory.aggregate([
      { $sortByCount: "$borrowed_book" }
    ]).limit(10)
    const popularBooks = await Book.populate(sortBorrowedBooksByCount, { path: '_id' })

    // for recently added books
    const recentBooks = await Book.find().sort({ created_at: -1 })

    console.log('Popular books count:', popularBooks.length)
    console.log('Recent books count:', recentBooks.length)
    console.log('Recent books titles:', recentBooks.map(b => b.title))
  } catch(err) {
    console.log(err)
  }
  mongoose.connection.close()
}

debugHome()
