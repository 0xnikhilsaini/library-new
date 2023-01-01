const httpStatus = require('http-status');
const { Book } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a book
 * @param {Object} bookBody
 * @returns {Promise<book>}
 */
const createbook = async (bookBody) => {
    return Book.create(bookBody);
};

/**
 * Query for books
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querybooks = async (filter, options) => {
    const books = await Book.paginate(filter, options);
    return books;
};

/**
 * Get book by id
 * @param {ObjectId} id
 * @returns {Promise<book>}
 */
const getbookById = async (id) => {
    return Book.findById(id);
};



/**
 * Update book by id
 * @param {ObjectId} bookId
 * @param {Object} updateBody
 * @returns {Promise<book>}
 */
const updatebookById = async (bookId, updateBody) => {
    const book = await getbookById(bookId);
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'book not found');
    }
    Object.assign(book, updateBody);
    await book.save();
    return book;
};

/**
 * Delete book by id
 * @param {ObjectId} bookId
 * @returns {Promise<book>}
 */
const deletebookById = async (bookId) => {
    const book = await getbookById(bookId);
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'book not found');
    }
    await book.remove();
    return book;
};

module.exports = {
    createbook,
    querybooks,
    getbookById,
    updatebookById,
    deletebookById,
};
