const console = require('console');
const csv = require('csv-parser');
const fs = require('fs');
const { Author, Book, Magzine } = require('../models');


const readAuthorsFromCsv = async () => {
    return await new Promise((resolve) => {
        const authors = [];
        fs.createReadStream('src/seedData/authors.csv')
            .pipe(
                csv({ separator: ';', header: ['title', 'isbn', 'authors', 'publishedAt'] }),
            )
            .on('data', (data) => {
                authors.push(data);

            })
            .on('error', (error) => {
                console.warn('an error when reading data from esv', error);
            })
            .on('end', () => {
                console.log('end parsing magazines csv data');
                resolve(authors);
            });
    });
};


readBooksFromCsv = async () => {
    return await new Promise((resolve) => {
        const books = [];
        fs.createReadStream('src/seedData/books.csv')
            .pipe(
                csv({ separator: ';', header: ['title', 'isbn', 'authors', 'description'] }),
            )
            .on('data', (data) => {
                books.push(data);

            })
            .on('error', (error) => {
                console.warn('an error when reading data from esv', error);
            })
            .on('end', () => {
                console.log('end parsing books csv data');
                resolve(books);
            });
    })
};


readMagzinesFromCsv = async () => {
    return await new Promise((resolve) => {
        const magazines = [];
        fs.createReadStream('src/seedData/magazines.csv')
            .pipe(
                csv({ separator: ';', header: ['title', 'isbn', 'authors', 'publishedAt'] }),
            )
            .on('data', (data) => {
                magazines.push(data);
            })
            .on('error', (error) => {
                console.warn('an error when reading data from esv', error);
            })
            .on('end', () => {
                console.log('end parsing magazines csv data');
                resolve(magazines);
            });
    });

};

//   module.exports = {readAuthorsFromCsv,readBooksFromCsv,readMagzinesFromCsv};

module.exports = () => {
    readAuthorsFromCsv().then(async (authors) => {
        await Author.deleteMany().catch(function (error) {
            console.log(error);
        });
        Author.insertMany(authors).then(function (docs) {
            // console.log(docs);
        }).catch(function (err) {
            console.log(err);
        });
    });

    readBooksFromCsv().then(async (books) => {
        await Book.deleteMany().catch(function (error) {
            console.log(error);
        });
        Book.insertMany(books).then(function (docs) {
            // console.log(docs);
        }).catch(function (err) {
            console.log(err);
        });
    });

    readMagzinesFromCsv().then(async (magzines) => {

        await Magzine.deleteMany().catch(function (error) {
            // console.log(error);
        });
        Magzine.insertMany(magzines).then(function (docs) {
            // console.log(docs);
        }).catch(function (err) {
            console.log(err);
        });
    });
}



