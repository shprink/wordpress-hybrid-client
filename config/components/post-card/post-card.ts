import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Content } from 'ionic-angular';

import { IAuthorState, AppState } from './../../../src/reducers';
/*
  Generated class for the PostCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'post-card',
  templateUrl: 'post-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  @Input() post: any;
  @Input() type: string;
  @Input() content: Content;
  @Input() onClick: (e, item) => void;
  categories: Array<any>;
  tags: Array<any>;
  author$: Observable<IAuthorState>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    const terms = this.post._embedded['https://api.w.org/term'] || this.post._embedded['wp:term'];
    this.categories = terms && terms[0];
    this.tags = terms && terms[1];
    this.author$ = this.store.select(state => state.items.users && state.items.users[this.post.author])
  }
}

