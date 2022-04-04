import './style.css';

import {
  of,
  map,
  Observable,
  bufferCount,
  fromEvent,
  delay,
  timer,
  interval,
} from 'rxjs';

// Initial example
const button = document.querySelector('button');
fromEvent(button, 'click')
  .pipe(bufferCount(3), delay(1500))
  .subscribe(() => {
    console.log('Random num: ', Math.random());
  });

// ------- COLD OBSERVABLE -----------

// ------- HOT OBSERVABLE -----------

//  --------------   ReplaySubject --------------

// const sub = new ReplaySubject(3);

// sub.next(1);
// sub.next(2);
// sub.subscribe((v) => console.log('I AM FIRST: ', v)); // OUTPUT => 1,2

// sub.next(3); // OUTPUT => 3
// sub.next(4); // OUTPUT => 4
// sub.subscribe(console.log); // OUTPUT => 2,3,4 (log of last 3 new subscriber)

// sub.next(5); // OUTPUT => 5,5 (log from both subscribers)

//  --------------   AsyncSubject --------------

// const sub = new AsyncSubject();

// sub.subscribe((d) => console.log('I am first: ',  d));

// sub.next(123); //nothing logged

// sub.subscribe((d) => console.log('I am second: ',  d));

// sub.next(456); //nothing logged
// sub.complete(); //456, 456 logged by both subscribers

//  --------------   timer --------------

const source = timer(1000 /*, 2000*/);
const subscribe = source.subscribe((val) => console.log(val));
subscribe.unsubscribe();

//  --------------   OF / FROM --------------

// const source$ = of([1, 2, 3, 4, 5]);
// //output: [1,2,3,4,5]
// const subscribe = source$.subscribe(val => console.log(val));

// const source$ = from([1, 2, 3, 4, 5]);
// //output: 1,2,3,4,5 => prints the elements 1 by 1.
// const subscribe = source$.subscribe(val => console.log(val));

//  --------------   FILTER --------------

// const source = from([
//   { name: '500', price: 5000 },
//   { name: 'Porsche', price: 80000 },
//   { name: 'Volvo', price: 6000 },
//   { name: 'Ferrari', price: 120000 },
// ]);

// const expensiveCars = source.pipe(
//   filter((car) => car.price >= 10000)
//   );
// expensiveCars.subscribe((val) => console.log(`Expensive cars: ${val.name}`));
