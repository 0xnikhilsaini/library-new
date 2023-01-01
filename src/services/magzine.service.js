const httpStatus = require('http-status');
const { Magzine } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a magzine
 * @param {Object} magzineBody
 * @returns {Promise<magzine>}
 */
const createmagzine = async (magzineBody) => {
    return Magzine.create(magzineBody);
};

/**
 * Query for magzines
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querymagzines = async (filter, options) => {
    const magzines = await Magzine.paginate(filter, options);
    return magzines;
};

/**
 * Get magzine by id
 * @param {ObjectId} id
 * @returns {Promise<magzine>}
 */
const getmagzineById = async (id) => {
    return Magzine.findById(id);
};



/**
 * Update magzine by id
 * @param {ObjectId} magzineId
 * @param {Object} updateBody
 * @returns {Promise<magzine>}
 */
const updatemagzineById = async (magzineId, updateBody) => {
    const magzine = await getmagzineById(magzineId);
    if (!magzine) {
        throw new ApiError(httpStatus.NOT_FOUND, 'magzine not found');
    }
    Object.assign(magzine, updateBody);
    await magzine.save();
    return magzine;
};

/**
 * Delete magzine by id
 * @param {ObjectId} magzineId
 * @returns {Promise<magzine>}
 */
const deletemagzineById = async (magzineId) => {
    const magzine = await getmagzineById(magzineId);
    if (!magzine) {
        throw new ApiError(httpStatus.NOT_FOUND, 'magzine not found');
    }
    await magzine.remove();
    return magzine;
};

module.exports = {
    createmagzine,
    querymagzines,
    getmagzineById,
    updatemagzineById,
    deletemagzineById,
};
