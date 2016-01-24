// @ngInject
function api($q, $http) {
    let api = {};


    api.search = function(query) {
        return callApi('movies.json', { q: query }).then(httpResponse => {
            return httpResponse.data.movies;
        });
    };

    api.getInTheatersList = function() {
        return callApi('lists/movies/in_theaters.json').then(httpResponse => {
            return httpResponse.data.movies;
        });
    };

    api.getUpcomingList = function() {
        return callApi('lists/movies/upcoming.json').then(httpResponse => {
            return httpResponse.data.movies;
        });
    };

    api.getMovie = function(id) {
        return callApi(`movies/${id}.json`).then(httpResponse => {
            return httpResponse.data;
        });
    };


    return api;


    function callApi(path, params) {
        return $http.jsonp(process.env.API_URL + path, {
            params: angular.extend({}, params, {
                callback: 'JSON_CALLBACK',
                apiKey: process.env.API_KEY
            })
        });
    }
}


export default api;
