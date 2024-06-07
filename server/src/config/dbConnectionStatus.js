let isDatabaseConnected = false;

const setDatabaseStatus = (status) => {
    isDatabaseConnected = status;
};

const getDatabaseStatus = () => {
    return isDatabaseConnected;
};

module.exports = {
    setDatabaseStatus,
    getDatabaseStatus,
};
