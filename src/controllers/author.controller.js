const httpStatus = require('http-status');
const pick = require('../utils/pick');
const downloadCsvRes = require('../utils/downloadCsvRes');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { authorService } = require('../services');

const createauthor = catchAsync(async (req, res) => {
  const author = await authorService.createauthor(req.body);
  res.status(httpStatus.CREATED).send(author);
});


const getauthors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isbn', 'authors']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await authorService.queryauthors(filter, options);
  res.send(result);
});


const getauthor = catchAsync(async (req, res) => {
  const author = await authorService.getauthorById(req.params.authorId);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, 'author not found');
  }
  res.send(author);
});

const updateauthor = catchAsync(async (req, res) => {
  const author = await authorService.updateauthorById(req.params.authorId, req.body);
  res.send(author);
});

const deleteauthor = catchAsync(async (req, res) => {
  await authorService.deleteauthorById(req.params.authorId);
  res.status(httpStatus.NO_CONTENT).send();
});


const downloadCsv = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['email', 'firstname','lastname']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await authorService.queryauthors(filter, options);

  const fields = [
    {
      label: 'email',
      value: 'email'
    },
    {
      label: 'firstname',
      value: 'firstname'
    },
    {
      label: 'lastname',
      value: 'lastname'
    },
  ];
  return downloadCsvRes(res, 'authors.csv', fields, result.results);
});

module.exports = {
  createauthor,
  getauthors,
  getauthor,
  updateauthor,
  deleteauthor,
  downloadCsv
};
