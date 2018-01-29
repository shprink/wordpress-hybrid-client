import {
    trigger, state,
    style, transition, animate
} from '@angular/animations';

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
        animate('0.2s 0.1s ease-out', style({
            opacity: 0,
            transform: 'scale(0.8)'
        }))
    ])
]);
