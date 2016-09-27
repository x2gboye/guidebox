module.exports = (app) => {

    class GbShowsService {

        constructor($http, endpoint, CHANNELS) {
            this.INDEX = 0;
            this.CHUNK = 25;
            this.$http = $http;
            this.endpoint = endpoint;
            this.CHANNELS = CHANNELS;
            this._selectedChannel = this.CHANNELS.all;
            this.resetShows();
            this.resetShow();
            this.getChannels();
        }

        get busy() {
            return this._busy;
        }

        get shows() {
            return this._shows;
        }

        get show() {
            return this._show;
        }

        get channels() {
            return this._channels;
        }

        get selectedChannel() {
            return this._selectedChannel;
        }

        get searchText() {
            return this._searchText;
        }

        set selectedChannel(newValue) {
            this._selectedChannel = newValue;
        }

        set searchText(searchText) {
            this._searchText = (searchText) ? searchText.trim() : null;
        }

        resetShows() {
            this._shows = [];
            this._index = this.INDEX;
            this._chunk = this.CHUNK;
            this._busy = false;
        }

        resetShow() {
            this._show = {};
        }

        getShows() {
            this._busy = true;
            this.$http.get(`${this.endpoint}shows/${this._selectedChannel.short_name}/${this._index}/${this._chunk}/all/all`)
                .then((response) => {
                    this._shows = this._shows.concat(response.data.results);
                    this._index += this._chunk;
                    if(this._index < response.data.total_results)
                        this._busy = false;
                }, (response) => {
                    console.error(response.data.error);
                });
        }

        searchShows() {
            this._busy = true;
            this.$http.get(`${this.endpoint}search/title/${this._searchText}/fuzzy`)
                .then((response) => {
                    this._shows = this._shows.concat(response.data.results);
                }, (response) => {
                    console.error(response.data.error);
                });
        }

        getShowDetail(id) {
            this.$http.get(`${this.endpoint}show/${id}`)
                .then((response) => {
                    this._show = response.data;
                }, (response) => {
                    console.error(response.data.error);
                });
        }

        getChannels() {
            this.$http.get(`${this.endpoint}channels/all/0/25`)
                .then((response) => {
                    this._channels = response.data.results.map((channel) => {
                        let rChannel = {};
                        rChannel.name = channel.name;
                        rChannel.short_name = channel.short_name;
                        return rChannel;
                    });
                    this._channels.unshift(this.CHANNELS.all);
                }, (response) => {
                    console.error(response.data.error);
                });
        }


    }

    let factory = ($http, endpoint, CHANNELS) => {
        return new GbShowsService($http, endpoint, CHANNELS);
    };
    factory.$inject = ["$http", "endpoint", "CHANNELS"];

    app.factory("GbShowsService", factory);

};