import { MovieListComponent } from './movie-list/movie-list';
import { ActorListComponent } from './actor-list/actor-list';

import { MovieItemComponent } from './movie-item/movie-item';

export const ComponentsMapping = {
    // items please keep the naming convention <type>-item
    'movie-item': MovieItemComponent,
    // lists please keep the naming convention <type>-list
    'movie-list': MovieListComponent,
    'actor-list': ActorListComponent,
}

export const COMPONENTS = [
    MovieListComponent,
    MovieItemComponent,
    ActorListComponent,
]