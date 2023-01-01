const httpStatus = require('http-status');
const pick = require('../utils/pick');
const downloadCsvRes = require('../utils/downloadCsvRes');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');

const createbook = catchAsync(async (req, res) => {
  const book = await bookService.createbook(req.body);
  res.status(httpStatus.CREATED).send(book);
});


const getbooks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isbn', 'authors']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bookService.querybooks(filter, options);
  res.send(result);
});


const getbook = catchAsync(async (req, res) => {
  const book = await bookService.getbookById(req.params.bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book not found');
  }
  res.send(book);
});

const updatebook = catchAsync(async (req, res) => {
  const book = await bookService.updatebookById(req.params.bookId, req.body);
  res.send(book);
});

const deletebook = catchAsync(async (req, res) => {
  await bookService.deletebookById(req.params.bookId);
  res.status(httpStatus.NO_CONTENT).send();
});

const downloadCsv = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isbn','authors']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bookService.querybooks(filter, options);

  const fields = [
    {
      label: 'title',
      value: 'title'
    },
    {
      label: 'isbn',
      value: 'isbn'
    },
    {
      label: 'authors',
      value: 'authors'
    },
    {
      label: 'description',
      value: 'description'
    }
  ];
  return downloadCsvRes(res, 'magzines.csv', fields, result.results);
});

module.exports = {
  createbook,
  getbooks,
  getbook,
  updatebook,
  deletebook,
  downloadCsv
};
