var express = require('express');
var router = express.Router();

var fs = require('fs');
const crypto = require('crypto');
const secret = 'taek';

const dataBook = require('../mock/dataBooks.json');

function createHash(content, algo = 'md5') {
  const hash = crypto.createHash(algo)
  .update('How are you?')
  .digest('hex');
  return hash;
}

router.get('/', function (req, res, next) {
  res.status(200).send({
    status: 'success',
    data: dataBook
  });
});

router.post('/', function (req, res, next) {
  const respond = dataBook;

  const add = {
    id: createHash(8),
    name: "Buku Asu mataaaneeeee",
    publisher: "Dicoding Indonesia"
  }

  console.log(add)

  let asalData = respond.data.books;
  asalData.push(add)

  const dataStore = {
    data: {
      books: asalData
    }
  }

  let data = JSON.stringify(dataStore, null, 2);

  fs.writeFile('./mock/dataBooks.json', data, (err) => {
    if (err) throw res.send(err);
    res.send('INSERTED')
  });
});

router.delete('/', (req, res, next) => {
  const respond = dataBook;
  let books = respond.data.books;
  
  const result = books.filter((item) => item.id !== 7);
  const dataStore = {
    data: {
      books: result
    }
  }
  let data = JSON.stringify(dataStore, null, 2);

  fs.writeFile('./mock/dataBooks.json', data, (err) => {
    if (err) throw res.send(err);
    res.send('Deleted')
  });
})

router.put('/', (req, res, next) => {
  const respond = dataBook;
  let books = respond.data.books;
  
  const result = books.filter((item) => {
    if (item.id === 2 ) {
      item.publisher = 'Anjing';
      item.name = 'Buku Anjing';
      return item
    }
    return item
  });
  const dataStore = {
    data: {
      books: result
    }
  }
  let data = JSON.stringify(dataStore, null, 2);
  
  fs.writeFile('./mock/dataBooks.json', data, (err) => {
    if (err) throw res.send(err);
    res.send('updated')
  });
})

module.exports = router;
