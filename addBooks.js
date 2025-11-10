const mongoose = require('mongoose')
const Book = require('./models/Book')
const fs = require('fs')
const path = require('path')

mongoose.connect('mongodb://localhost/library-management-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const imagesDir = path.join(__dirname, 'public', 'images')

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.log(err)
    return
  }
  const imageFiles = files.filter(file => file.startsWith('cover_image-') && file.endsWith('.jpg'))
  imageFiles.forEach(async (file, index) => {
    const parts = file.split('-')
    const isbn = parts[parts.length - 1].replace('.jpg', '')
    const book = new Book({
      isbn: isbn + '-' + index, // make unique isbn
      title: 'Book ' + isbn,
      author: 'Author ' + index,
      publish_year: '2020',
      page_count: 100,
      genre: 'Fiction',
      description: 'A sample book',
      stock: 1,
      cover_image: file
    })
    try {
      await book.save()
      console.log('Added book ' + isbn)
    } catch (err) {
      console.log('Error adding book ' + isbn, err)
    }
  })
  setTimeout(() => {
    mongoose.connection.close()
  }, 5000) // wait for all saves
})
