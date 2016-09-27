module.exports = (app) => {

    require('./gb-shows-service')(app);
    require('./gb-shows')(app);
    require('./gb-shows-filter')(app);

    require('./gb-show-details')(app);

    require('./gb-episodes-service')(app);
    require('./gb-episodes')(app);

    require('./gb-clips-service')(app);
    require('./gb-clips')(app);

};