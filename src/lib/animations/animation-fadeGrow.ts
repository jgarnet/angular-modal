import {animate, animateChild, query, style, transition, trigger} from '@angular/animations';

export const FadeGrow = {
  container: trigger('containerAnimation', [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate(100, style({
        opacity: 1
      })),
      query('*', animateChild())
    ]),
    transition(':leave', [
      query('*', animateChild()),
      animate(100, style({
        opacity: 0
      }))
    ])
  ]),
  modal: trigger('modalAnimation', [
    transition(':enter', [
      style({
        transform: 'scale(0.4)',
        opacity: 0
      }),
      animate(100, style({
        transform: 'scale(1)',
        opacity: 1
      }))
    ]),
    transition(':leave', [
      animate(100, style({
        transform: 'scale(0)',
        opacity: 0
      }))
    ])
  ])
};
