// Items
import { ItemComponent } from '../../src/components/item/item';
import { PostsItemComponent } from '../../src/components/posts-item/posts-item';
import { PagesItemComponent } from '../../src/components/pages-item/pages-item';

// Lists
import { ListComponent } from '../../src/components/list/list';
import { PagesListComponent } from '../../src/components/pages-list/pages-list';
import { PostsListComponent } from '../../src/components/posts-list/posts-list';
import { UsersListComponent } from '../../src/components/users-list/users-list';
import { TagsListComponent } from '../../src/components/tags-list/tags-list';
import { CategoriesListComponent } from '../../src/components/categories-list/categories-list';

// Rest
import { MenuComponent } from '../../src/components/menu/menu';
import { AuthorComponent } from '../../src/components/author/author';
import { SpinnerComponent } from '../../src/components/spinner/spinner';
import { ToolbarComponent } from '../../src/components/toolbar/toolbar';
import { TaxonomyComponent } from '../../src/components/taxonomy/taxonomy';
//import { PostCardComponent } from '../../src/components/post-card/post-card';
import { BookmarksComponent } from '../../src/components/bookmarks/bookmarks';
import { MenuItemsComponent } from '../../src/components/menu-items/menu-items';
import { EmptyListComponent } from '../../src/components/empty-list/empty-list';
import { PageNavbarComponent } from '../../src/components/page-navbar/page-navbar';

// Custom
import { MovieListComponent } from './movie-list/movie-list';
import { ActorListComponent } from './actor-list/actor-list';
import { MovieItemComponent } from './movie-item/movie-item';
import { PostCardComponent } from './post-card/post-card';


export const ComponentsMapping = {
    // items
    'posts-item': PostsItemComponent,
    'pages-item': PagesItemComponent,
    // lists
    'posts-list': PostsListComponent,
    'pages-list': PagesListComponent,
    'users-list': UsersListComponent,
    'tags-list': TagsListComponent,
    'categories-list': CategoriesListComponent,
    // Custom (this is just an example on how to add custom post types and can be removed)
    // it is important to keep the naming convention <type>-item because we use this pattern
    // to load those components dynamically
    'movie-item': MovieItemComponent,
    // it is important to keep the naming convention <type>-list because we use this pattern
    // to load those components dynamically
    'movie-list': MovieListComponent,
    'actor-list': ActorListComponent,
};

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
    // Custom (this is just an example on how to add custom post types and can be removed)
    MovieListComponent,
    MovieItemComponent,
    ActorListComponent,
];