const mongoose = require('mongoose')
const Book = require('./models/Book')

mongoose.connect('mongodb://localhost/library-management-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

Book.countDocuments({}, (err, count) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Total books in database:', count)
  }
  mongoose.connection.close()
})
