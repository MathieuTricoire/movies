import { resolveNgPath } from 'utils';

import rowComponent from './components/row';
import scoreFilter from './filters/score';
import apiFactory from './services/api.factory.js';
import searchApiFactory from './services/searchApi.factory.js';
import SearchController from './controllers/search';


let module = angular.module('movie', [])
    .component('movieRow', rowComponent)
    .filter('movieScore', scoreFilter)
    .factory('movieApi', apiFactory)
    .factory('movieSearchApi', searchApiFactory);


// States
let genericListState = {
    templateUrl: resolveNgPath(__dirname, 'templates/list.html'),
    // @ngInject
    controller: function(movies) {
        this.movies = movies;
    },
    controllerAs: 'list'
};

let detailState = {
    url: '/movie/{id:int}',
    templateUrl: resolveNgPath(__dirname, 'templates/detail.html'),
    // @ngInject
    controller: function($scope, movie) {
        this.movie = movie;
        $scope.app.setToolbarTitle(movie.title);
    },
    controllerAs: 'detail',
    data: {
        title: true
    },
    resolve: {
        // @ngInject
        movie: function($stateParams, $q, movieApi) {
            return movieApi.getMovie($stateParams.id).catch(error => {
                return $q.reject(`Error ${error.status} from api`);
            });
        }
    }
};


module.states = {
    '': {
        abstract: true,
        url: '/movies'
    },
    'search': {
        url: '/search',
        templateUrl: resolveNgPath(__dirname, 'templates/search.html'),
        controller: SearchController,
        data: {
            title: 'Search'
        }
    },
    'search.detail': angular.copy(detailState),
    'inTheaters': angular.extend({}, genericListState, {
        url: '/in-theaters',
        data: {
            title: 'In Theaters'
        },
        resolve: {
            // @ngInject
            movies: function($q, movieApi) {
                return movieApi.getInTheatersList().catch(error => {
                    return $q.reject(`Error ${error.status} from api`);
                });
            }
        }
    }),
    'inTheaters.detail': angular.copy(detailState),
    'upcoming': angular.extend({}, genericListState, {
        url: '/upcoming',
        data: {
            title: 'Upcoming'
        },
        resolve: {
            // @ngInject
            movies: function($q, movieApi) {
                return movieApi.getUpcomingList().catch(error => {
                    return $q.reject(`Error ${error.status} from api`);
                });
            }
        }
    }),
    'upcoming.detail': angular.copy(detailState)
};


export default module;
