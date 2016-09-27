module.exports = (app) => {

    require('./gb-people-service')(app);
    require('./gb-person')(app);

};