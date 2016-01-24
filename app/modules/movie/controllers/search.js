// @ngInject
function SearchController($scope, movieSearchApi) {
    $scope.search = movieSearchApi;

    $scope.updateMovies = function() {
        $scope.app.showLoader();

        movieSearchApi.updateMovies().then(() => {
            $scope.$emit('retainScroll'); // Scroll the list to top
        }).catch(error => {
            $scope.app.showError(`Error ${error.status} from api`);
        }).finally(() => {
            $scope.app.hideLoader();
        });
    };

    $scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
        if (fromState.name.indexOf(toState.name) === -1) {
            movieSearchApi.reset();
        }
    });
}

export default SearchController;
