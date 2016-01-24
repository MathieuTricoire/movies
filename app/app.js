import { resolveNgPath } from 'utils';

import movie from './modules/movie';

import retainScrollDirective from './directives/retainScroll';
import AppController from './controllers/app';

let module = angular.module('app', [
    // vendors
    'ngMaterial',
    'ui.router',

    // html templates
    'templates',

    // modules
    movie.name
]);


module.directive('retainScroll', retainScrollDirective)
    .controller('AppController', AppController);


module.config(function($mdThemingProvider, $mdGestureProvider) {
    $mdThemingProvider.theme('light')
        .primaryPalette('red')
        .accentPalette('yellow');

    $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('yellow')
        .dark();

    $mdGestureProvider.skipClickHijack();
});


module.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.decorator('views', function(state, parent) {
        // Set default view to
        // - '@app' for all states "app.*"
        let statesViewFixed = [
            'app'
        ];

        let views = parent(state);
        let viewsKeys = Object.keys(views);
        let i = 0;
        let found = false;
        let stateNamePattern;
        let viewName;
        while (i < statesViewFixed.length && !found) {
            stateNamePattern = statesViewFixed[i] + '.';
            viewName = '@' + statesViewFixed[i];

            if (state.name.indexOf(stateNamePattern) === 0 && viewsKeys.length === 1) {
                let viewConfig = views[viewsKeys[0]];
                if (state === viewConfig) {
                    found = true;
                    views = {};
                    views[viewName] = viewConfig;
                }
            }
            i++;
        }

        return views;
    });


    function importStates(moduleName, states) {
        angular.forEach(states, function(state, name) {
            let stateName = 'app.' + moduleName + (name ? '.' + name : '');
            $stateProvider.state(stateName, state);
        });
    }


    $stateProvider.state('app', {
        abstract: true,
        templateUrl: resolveNgPath(__dirname, 'app.html'),
        controller: 'AppController as app'
    });


    $stateProvider.state('app.home', {
        url: '/',
        templateUrl: resolveNgPath(__dirname, 'templates/home.html'),
        data: {
            title: 'Movies !'
        }
    });


    $stateProvider.state('app.about', {
        url: '/about',
        templateUrl: resolveNgPath(__dirname, 'templates/about.html'),
        data: {
            title: 'About'
        }
    });


    // Import module states
    importStates('movie', movie.states);

    // Default route to home
    $urlRouterProvider.otherwise('/');
});


export default module;
