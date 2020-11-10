/**
 * Memory storage for the cakes
 */
const cakeList = new Map();

const get = async (key) => {
    if(cakeList.has(key)) {
        return cakeList.get(key);
    }
    return null
}
const getAll = async () => {
    return Array.from(cakeList.values());
}
const create = async (key, cake) => {
    cakeList.set(key, cake);
    return cake;
}
const remove = async (key) => {
    if(cakeList.has(key)) {
        cakeList.delete(key);
        return true;
    }
    return false;
}
const update = async (key, cake) => {
    if(cakeList.has(key)) {
        cakeList.set(key, cake);
        return true;
    }
    return false;
}
const service = {
    get,
    getAll,
    create,
    remove,
    update
};

module.exports = service;
