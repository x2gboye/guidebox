module.exports = (app) => {

    require('./gb-movies-service')(app);
    require('./gb-movies')(app);

};