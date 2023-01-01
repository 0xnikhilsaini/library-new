const httpStatus = require('http-status');
const { Author } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a author
 * @param {Object} authorBody
 * @returns {Promise<author>}
 */
const createauthor = async (authorBody) => {
    return Author.create(authorBody);
};

/**
 * Query for authors
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryauthors = async (filter, options) => {
    const authors = await Author.paginate(filter, options);
    return authors;
};

/**
 * Get author by id
 * @param {ObjectId} id
 * @returns {Promise<author>}
 */
const getauthorById = async (id) => {
    return Author.findById(id);
};



/**
 * Update author by id
 * @param {ObjectId} authorId
 * @param {Object} updateBody
 * @returns {Promise<author>}
 */
const updateauthorById = async (authorId, updateBody) => {
    const author = await getauthorById(authorId);
    if (!author) {
        throw new ApiError(httpStatus.NOT_FOUND, 'author not found');
    }
    Object.assign(author, updateBody);
    await author.save();
    return author;
};

/**
 * Delete author by id
 * @param {ObjectId} authorId
 * @returns {Promise<author>}
 */
const deleteauthorById = async (authorId) => {
    const author = await getauthorById(authorId);
    if (!author) {
        throw new ApiError(httpStatus.NOT_FOUND, 'author not found');
    }
    await author.remove();
    return author;
};

module.exports = {
    createauthor,
    queryauthors,
    getauthorById,
    updateauthorById,
    deleteauthorById,
};
