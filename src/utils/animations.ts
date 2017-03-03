import {
    trigger, state,
    style, transition, animate
} from '@angular/core';

export const AppearIn = trigger('appear', [
    state('in', style({ opacity: 1, transform: 'scale(1)' })),
    transition('void => in', [
        style({
            opacity: 0,
            transform: 'scale(0.8)'
        }),
        animate('0.2s ease-in')
    ]),
    transition('in => void', [
        animate('0.2s 10 ease-out', style({
            opacity: 0,
            transform: 'scale(0.8)'
        }))
    ])
]);
