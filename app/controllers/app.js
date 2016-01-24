// @ngInject
function AppController($scope, $state, $mdSidenav, $mdToast) {
    this.menuItems = [{
        state: 'app.movie.search',
        href:  $state.href('app.movie.search'),
        label: 'Search',
        icon:  'search'
    }, {
        state: 'app.movie.inTheaters',
        href:  $state.href('app.movie.inTheaters'),
        label: 'In theaters',
        icon:  'ticket'
    }, {
        state: 'app.movie.upcoming',
        href:  $state.href('app.movie.upcoming'),
        label: 'Upcoming',
        icon:  'calendar'
    }];

    this.bottomItems = [{
        state: 'app.about',
        href:  $state.href('app.about'),
        label: 'About',
        icon:  'question'
    }];


    let stateChanging = false;
    let isLoading = false;

    this.isLoading = () => {
        return stateChanging || isLoading;
    };

    this.showLoader = () => {
        isLoading = true;
    };

    this.hideLoader = () => {
        isLoading = false;
    };


    this.goBack = () => {
        if (this.back) {
            $state.go(this.back);
        }
    };


    this.setToolbarTitle = title => {
        this.toolbarTitle = title;
    };


    this.showError = message => {
        $mdToast.show($mdToast.simple(message).position('bottom right'));
    };


    this.toggleMenu = () => {
        $mdSidenav('menu').toggle();
    };

    this.closeMenu = () => {
        $mdSidenav('menu').close();
    };


    $scope.$on('$stateChangeStart', () => {
        stateChanging = true;
    });


    $scope.$on('$stateChangeSuccess', (event, toState) => {
        stateChanging = false;

        this.closeMenu();

        if (toState.data && toState.data.title) {
            if (toState.data.title !== true) {
                this.setToolbarTitle(toState.data.title);
            }
        }

        this.back = false;
        if (toState.data && toState.data.back && toState.data.back !== true) {
            this.back = toState.data.back;
        } else if (toState.data && toState.data.back !== false && !$state.get('^', toState).abstract) {
            this.back = '^';
        }
    });


    $scope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
        stateChanging = false;

        if (angular.isString(error)) {
            this.showError(error);
        }
    });
}


export default AppController;
