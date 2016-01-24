// @ngInject
function retainScroll($location, $timeout) {
    let memory = {};

    return {
        restrict: 'A',
        priority: 1001,
        link: postLink
    };

    function postLink(scope, ngElement) {
        let element = ngElement[0];
        let path = $location.path();

        scope.$on('retainScroll', function(event) {
            event.stopPropagation();
            element.scrollTop = 0;
            savePosition();
        });

        scope.$on('$stateChangeStart', () => {
            savePosition();
        });

        scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
            path = $location.path();

            if (fromState.name.indexOf(toState.name) === 0) {
                restorePosition();
            } else {
                delete memory[path];
            }
        });


        restorePosition();


        function savePosition() {
            memory[path] = element.scrollTop;
        }

        function restorePosition() {
            $timeout(() => {
                element.scrollTop = memory[path] || 0;
            });
        }
    }
}


export default retainScroll;
