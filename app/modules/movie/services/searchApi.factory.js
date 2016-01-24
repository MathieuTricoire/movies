// @ngInject
function searchApi(movieApi, $q) {
    let api = {};

    api.reset = function() {
        api.query = '';
        api.movies = [];
    };
    api.reset();

    api.updateMovies = function() {
        return movieApi.search(api.query).then(movies => {
            api.movies = movies;
        }).catch(error => {
            api.movies = [];

            return $q.reject(error);
        });
    };


    return api;
}


export default searchApi;
