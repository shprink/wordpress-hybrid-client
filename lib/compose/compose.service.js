import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($injector) {
        'ngInject';

        super($injector);
        this.setType('compose');
    }
    
    submitMedia(uri) {
        if (!uri) {
            return this.$q.resolve();
        }
        let d = this.$q.defer();
        let service = this.$injector.get('$wpApiMedia');
        window.resolveLocalFileSystemURL(uri, (entry) => {
            entry.file((file) => {
                let reader = new FileReader();
                reader.onloadend = (evt) => {
                    let buffer = evt.target.result;
                    let blob = new Blob([buffer], { type: 'image/jpeg' });
                    let fd = new FormData();
                    fd.append('file', blob, entry.name);
                    service.create(fd, {}, {
                        'Content-Type': undefined
                    }).then(d.resolve).catch(d.reject);
                };
                reader.onerror = (err) => {
                    d.reject(err);
                };
                reader.readAsArrayBuffer(file);
            }, (err) => {
                d.reject(err);
            });
        }, (err) => {
            d.reject(err);
        });
        return d.promise;
    }
    
    submitPost(slug, item) {
        if (!slug || !item) {
            return this.$q.reject();
        }
        let data = angular.copy(item);
        let service = this.$injector.get('$wpApiCustom').getInstance(slug);
        return this.submitMedia(data.featured_media).then((res) => {
            if (res) {
                data.featured_media = res.data.id;
            }
            return service.create(data);
        });
    }
}
