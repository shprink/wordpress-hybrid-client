// https://github.com/a8m/angular-filter/blob/master/src/_filter/collection/to-array.js

export default function() {
    return function(collection, addKey) {

        if (!_.isObject(collection)) {
            return collection;
        }

        return !addKey ? _.toArray(collection) : Object.keys(collection).map(function(key) {
            return _.extend(collection[key], {
                $key: key
            });
        });
    };
}
