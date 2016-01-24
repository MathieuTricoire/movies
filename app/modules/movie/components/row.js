import { resolveNgPath } from 'utils';

export default {
    bindings: {
        movie: '='
    },
    controllerAs: '$ctrl',
    // @ngInject
    templateUrl: ($element) => {
        $element.addClass('MovieRow');

        return resolveNgPath(__dirname, './row.html');
    }
};
