import AbstractList from '../abstract/AbstractList.js';

export default class extends AbstractList {

    constructor($WPHCPosts, $WPHCTaxonomiesCustomPosts, $injector, $scope, $filter, $stateParams, $wpApiTerms) {
        'ngInject';

        super($injector, $scope);
        this.showToolbar = true;
        this.titleLoaded = false;
        this.setType('taxonomiesPosts');
        if ($stateParams.postType == 'post') {
            this.setService($WPHCPosts);
        } else {
            this.setService($WPHCTaxonomiesCustomPosts);
        }

        this.term = $stateParams.term;
        this.postType = $stateParams.postType;
        this.$filter = $filter;
        const taxoName = _.get($stateParams, 'taxonomy.name');
        if (taxoName) {
            this.titleLoaded = true;
        }
        this.setTitle(this.getTitle($stateParams.term, taxoName || $stateParams.slug));
    }

    onDataLoaded(response) {
        // all we have is the term slug. We cannot get the term object with the slug unfortunetly
        // only the ID would work but we do not have it.
        // To display the translated category/tag name as a title we need to go through
        // the list of posts and get it from them
        const { slug } = this.$stateParams;
        const taxoName = _.get(this.$stateParams, 'taxonomy.name');
        if (!this.titleLoaded && response.data.length) {
            const taxonomies = _.get(response, "data[0]['_embedded']['https://api.w.org/term']")
                || _.get(response, "data[0]['_embedded']['wp:term']");
            if (!taxonomies) {
                return;
            }
            for (let i = 0, len = taxonomies.length; i < len; i++) {
                const terms = taxonomies[i];
                for (let j = 0, len2 = terms.length; j < len2; j++) {
                    const term = terms[j];
                    if (term.slug === slug) {
                        this.setTitle(this.getTitle(this.$stateParams.term, term.name));
                        this.titleLoaded = true;
                        break;
                    }
                }
            }
        }
        return response;
    }

    getQuery() {
        var query = super.getQuery();
        if (this.$stateParams.term === 'categories') {
            query["categories"] = this.$stateParams.id
        } else if (this.$stateParams.term === 'tags') {
            query["tags"] = this.$stateParams.id
        } else {
            query[this.$stateParams.term] = this.$stateParams.id
        }
        return query;
    }

    getTitle(term, slug) {
        let trans = '';
        if (term === "categories") {
            trans = slug ? 'category.title' : 'categories.title';
        } else if (term === "tags") {
            trans = slug ? 'tag.title' : 'tags.title';
        } else {
            trans = slug ? 'customTaxonomy.title' : 'menu.customTaxonomy';
        }
        if (slug) {
            return this.$filter('translate')(trans, {
                name: decodeURIComponent(slug),
                term: this.$stateParams.term
            });
        }
        return this.$filter('translate')(trans);
    }
}
