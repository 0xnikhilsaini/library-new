const httpStatus = require('http-status');
const pick = require('../utils/pick');
const downloadCsvRes = require('../utils/downloadCsvRes');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { magzineService } = require('../services');

const createmagzine = catchAsync(async (req, res) => {
  const magzine = await magzineService.createmagzine(req.body);
  res.status(httpStatus.CREATED).send(magzine);
});


const getmagzines = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isbn', 'authors']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await magzineService.querymagzines(filter, options);
  res.send(result);
});


const getmagzine = catchAsync(async (req, res) => {
  const magzine = await magzineService.getmagzineById(req.params.magzineId);
  if (!magzine) {
    throw new ApiError(httpStatus.NOT_FOUND, 'magzine not found');
  }
  res.send(magzine);
});

const updatemagzine = catchAsync(async (req, res) => {
  const magzine = await magzineService.updatemagzineById(req.params.magzineId, req.body);
  res.send(magzine);
});

const deletemagzine = catchAsync(async (req, res) => {
  await magzineService.deletemagzineById(req.params.magzineId);
  res.status(httpStatus.NO_CONTENT).send();
});


const downloadCsv = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isbn','authors']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await magzineService.querymagzines(filter, options);

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
      label: 'publishedAt',
      value: 'publishedAt'
    }
  ];
  return downloadCsvRes(res, 'magzines.csv', fields, result.results);
});

module.exports = {
  createmagzine,
  getmagzines,
  getmagzine,
  updatemagzine,
  deletemagzine,
  downloadCsv
};
