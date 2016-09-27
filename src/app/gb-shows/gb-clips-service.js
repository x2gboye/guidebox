module.exports = (app) => {

    class GbClipsService {

        constructor($http, endpoint) {
            this.INDEX = 0;
            this.CHUNK = 15;
            this.$http = $http;
            this.endpoint = endpoint;
            this.resetClips();
        }


        get clips() {
            return this._episodes;
        }

        get total() {
            return this._total;
        }

        get index() {
            return this._index;
        }

        resetClips() {
            this._episodes = [];
            this._index = this.INDEX;
            this._chunk = this.CHUNK;
            this._total = null;
        }

        getClips(id) {
            if(this._total && this._index >= this._total)
                return;
            this.$http.get(`${this.endpoint}show/${id}/clips/all/${this._index}/${this._chunk}/free/web/true`)
                .then((response) => {
                    this._total = response.data.total_results;
                    this._episodes = this._episodes.concat(response.data.results);
                    this._index += this._chunk;
                }, (response) => {
                    console.error(response.data.error);
                });
        }



    }

    let factory = ($http, endpoint) => {
        return new GbClipsService($http, endpoint);
    };
    factory.$inject = ["$http", "endpoint"];

    app.factory("GbClipsService", factory);

};