// Items
import { ItemComponent } from './item/item';
import { PostsItemComponent } from './posts-item/posts-item';
import { PagesItemComponent } from './pages-item/pages-item';

// Lists
import { ListComponent } from './list/list';
import { PagesListComponent } from './pages-list/pages-list';
import { PostsListComponent } from './posts-list/posts-list';
import { UsersListComponent } from './users-list/users-list';
import { TagsListComponent } from './tags-list/tags-list';
import { CategoriesListComponent } from './categories-list/categories-list';

// Rest
import { MenuComponent } from './menu/menu';
import { AuthorComponent } from './author/author';
import { SpinnerComponent } from './spinner/spinner';
import { ToolbarComponent } from './toolbar/toolbar';
import { TaxonomyComponent } from './taxonomy/taxonomy';
import { PostCardComponent } from './post-card/post-card';
import { BookmarksComponent } from './bookmarks/bookmarks';
import { MenuItemsComponent } from './menu-items/menu-items';
import { EmptyListComponent } from './empty-list/empty-list';
import { PageNavbarComponent } from './page-navbar/page-navbar';

import {
    ComponentsMapping as CustomComponentsMapping,
    COMPONENTS as CustomCOMPONENTS
} from '../../config/components';

export const ComponentsMapping = Object.assign({
    // items
    'posts-item': PostsItemComponent,
    'pages-item': PagesItemComponent,
    // lists
    'posts-list': PostsListComponent,
    'pages-list': PagesListComponent,
    'users-list': UsersListComponent,
    'tags-list': TagsListComponent,
    'categories-list': CategoriesListComponent,
}, CustomComponentsMapping);

export const COMPONENTS = [
    // Items
    ItemComponent,
    PostsItemComponent,
    PagesItemComponent,
    // Lists
    ListComponent,
    PagesListComponent,
    PostsListComponent,
    UsersListComponent,
    TagsListComponent,
    CategoriesListComponent,
    // Rest
    TaxonomyComponent,
    MenuComponent,
    AuthorComponent,
    SpinnerComponent,
    ToolbarComponent,
    PostCardComponent,
    MenuItemsComponent,
    EmptyListComponent,
    BookmarksComponent,
    PageNavbarComponent,
    ...CustomCOMPONENTS
];