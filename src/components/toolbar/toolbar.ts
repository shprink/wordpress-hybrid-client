import { TranslateService } from 'ng2-translate/ng2-translate';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { addBookmark, removeBookmark } from '../../actions';
import { TaxonomiesModal } from './../../pages/taxonomies-modal/taxonomies-modal';
import { AppState } from '../../reducers';
import { Toast } from '../../providers';

/*
  Generated class for the Toolbar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input() categories: Array<Object>;
  @Input() tags: Array<Object>;
  @Input() bookmarkId: string;

  isBookmarked$: Observable<Boolean>;

  constructor(
    private modalCtrl: ModalController,
    private store: Store<AppState>,
    private toast: Toast,
    private translate: TranslateService
  ) {
    this.isBookmarked$ = this.store.select((state: AppState) => {
      return Object.keys(state.bookmarks).indexOf(this.bookmarkId) > -1;
    });
  }

  private openTaxonomy(title: string, term: string, list: Array<Object>, postType: string) {
    let profileModal = this.modalCtrl.create(TaxonomiesModal, {
      title,
      postType,
      term,
      list
    });
    profileModal.present();
  }

  openCategories(e) {
    e.stopPropagation();
    this.openTaxonomy('categories.title', 'categories', this.categories, 'post');
  }

  openTags(e) {
    e.stopPropagation();
    this.openTaxonomy('tags.title', 'tags', this.tags, 'post');
  }

  doBookmark(e) {
    e.stopPropagation();
    let isBookmarked;
    this.isBookmarked$.take(1).subscribe(response => isBookmarked = response);

    if (isBookmarked) {
      this.store.dispatch(removeBookmark(this.bookmarkId));
      this.toast.show(this.translate.instant('BOOKMARK_REMOVED'));
    } else {
      this.store.dispatch(addBookmark(this.bookmarkId));
      this.toast.show(this.translate.instant('BOOKMARK_ADDED'));
    }
  }

}
