// @ngInject
export default function() {
    return function(score) {
        return score > 0 ? `${score}%` : 'N/A';
    };
};
