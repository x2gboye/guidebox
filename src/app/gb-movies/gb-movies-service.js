module.exports = (app) => {

    class GbMoviesService {

        constructor($http, endpoint) {
            this.INDEX = 0;
            this.CHUNK = 25;
            this.$http = $http;
            this.endpoint = endpoint;
            this.resetMovies();
            this.resetMovie();
        }

        get busy() {
            return this._busy;
        }

        get movies() {
            return this._movies;
        }

        get movie() {
            return this._movie;
        }

        get searchText() {
            return this._searchText;
        }

        set searchText(searchText) {
            this._searchText = (searchText) ? searchText.trim() : null;
        }

        resetMovies() {
            this._movies = [];
            this._index = this.INDEX;
            this._chunk = this.CHUNK;
            this._busy = false;
        }

        resetMovie() {
            this._movie = {};
        }

        getMovies() {
            this._busy = true;
            this.$http.get(`${this.endpoint}movies/all/${this._index}/${this._chunk}/all/all`)
                .then((response) => {
                    this._movies = this._movies.concat(response.data.results);
                    this._index += this._chunk;
                    if(this._index < response.data.total_results)
                        this._busy = false;
                }, (response) => {
                    console.error(response.data.error);
                });
        }

        searchMovies() {
            this._busy = true;
            this.$http.get(`${this.endpoint}search/movie/title/${this._searchText}/fuzzy`)
                .then((response) => {
                    this._movies = this._movies.concat(response.data.results);
                }, (response) => {
                    console.error(response.data.error);
                });
        }

        getMovieDetail(id) {
            this.$http.get(`${this.endpoint}movie/${id}`)
                .then((response) => {
                    this._movie = response.data;
                }, (response) => {
                    console.error(response.data.error);
                });
        }


    }

    let factory = ($http, endpoint) => {
        return new GbMoviesService($http, endpoint);
    };
    factory.$inject = ["$http", "endpoint"];

    app.factory("GbMoviesService", factory);

};