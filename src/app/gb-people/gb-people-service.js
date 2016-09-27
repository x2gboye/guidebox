module.exports = (app) => {

    class GbPeopleService {

        constructor($http, endpoint) {
            this.$http = $http;
            this.endpoint = endpoint;
            this.resetPerson();
        }


        get person() {
            return this._person;
        }

        resetPerson() {
            this._person = {};
        }

        getPerson(id) {
            this.$http.get(`${this.endpoint}person/${id}`)
                .then((response) => {
                    this._person = response.data;
                }, (response) => {
                    console.error(response.data.error);
                });
        }



    }

    let factory = ($http, endpoint) => {
        return new GbPeopleService($http, endpoint);
    };
    factory.$inject = ["$http", "endpoint"];

    app.factory("GbPeopleService", factory);

};