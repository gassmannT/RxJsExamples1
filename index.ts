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
  from,
  Subject,
  zip,
  combineLatest,
  partition,
  merge,
  OperatorFunction,
} from 'rxjs';
import {
  filter,
  mergeMap,
  reduce,
  scan,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

// Initial example
const button = document.querySelector('button');
fromEvent(button, 'click')
  .pipe(bufferCount(3), delay(1500))
  .subscribe(() => {
    console.log('Random num: ', Math.random());
  });

//  --------------   OF / FROM --------------
// const source$ = of([1, 2, 3, 4, 5]);
// //output: [1,2,3,4,5]
// const subscribe = source$.subscribe((val) => console.log(val));

// const source$ = from([1, 2, 3, 4, 5]);
// //output: 1,2,3,4,5 => prints the elements 1 by 1.
// const subscribe = source$.subscribe(val => console.log(val));

// ------- RxJS Operators -----------
// of('World')
//   .pipe(
//     tap((name) => console.log(name)),
//     map((name) => `Hello, ${name}!`),
//     tap((name) => console.log(name))
//   )
//   .subscribe((result) => {
//     console.log(result);
//   });

// ------- COLD OBSERVABLE -----------
// const observable = Observable.create((observer) => {
//   observer.next(Math.random());
// });
//   // .pipe(shareReplay());

// // subscription 1
// observable.subscribe((data) => {
// console.log(data); // 0.24957144215097515 (random number)
// });

// // subscription 2
// observable.subscribe((data) => {
//  console.log(data); // 0.004617340049055896 (random number)
// });

// ------- HOT OBSERVABLE -----------
// const random = Math.random()
// const observable = Observable.create((observer) => {
//     observer.next(random);
// });

// // subscription 1
// observable.subscribe((data) => {
//   console.log(data); // 0.11208711666917925 (random number)
// });

// // subscription 2
// observable.subscribe((data) => {
//    console.log(data); // 0.11208711666917925 (random number)
// });

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
// const source = timer(1000 /*, 2000*/);
// const subscribe = source.subscribe((val) => console.log(val));
// subscribe.unsubscribe();

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

//  --------------   SCAN --------------
// const source = of(1, 2, 3);
// // log accumulated values
// const example = source.pipe(scan((acc, curr) => acc + curr, 0));
// example.subscribe((val) => console.log(val));

//  --------------   Reduce --------------
// const numbers$ = new Subject<number>();
// const foo = numbers$.pipe(reduce((total, n) => total + n));
// foo.subscribe(console.log);
// foo.subscribe((x) => console.log('foo', x));
// numbers$.next(2);
// numbers$.next(2);
// numbers$.complete();  // <-- Needed by the reduce!

// -------------- switchMap  --------------
// Unsubscribes from prior inner Observable and switches to the new one
// fromEvent(document, 'click')
//   .pipe(
//     // restart counter on every click
//     switchMap(() => interval(1500))
//   )
//   .subscribe((val) => console.log('switchMap: ', val));

// -------------- mergeMap  --------------
// execute inner Observables in parallel
// const click$ = fromEvent(document, 'click');
// click$
//   .pipe(
//     mergeMap((e: MouseEvent) => {
//       return of({
//         x: e.clientX,
//         y: e.clientY,
//         timestamp: Date.now(),
//       });
//     })
//   )
//   .subscribe((r) => console.log('Mouse position: ', r));

// --------------  zipwith  --------------

// const sourceOne = of('Hello');
// const sourceTwo = of('Students!');
// const sourceThree = of('RxJS');
// const sourceFour = of('is cool!');

// //wait until all observables have emitted a value then emit all as an array
// const exampleZip = zip(
//   sourceOne,
//   sourceTwo.pipe(delay(1000)),
//   sourceThree.pipe(delay(2000)),
//   sourceFour.pipe(delay(1000))
// );
// const subscribe = exampleZip.subscribe((val) => console.log(val));

// --------------  combineLatest  --------------
// // timerOne emits first value at 1s, then once every 8s
// const timerOne$ = timer(1000, 8000);
// // timerTwo emits first value at 2s, then once every 8s
// const timerTwo$ = timer(2000, 8000);
// // timerThree emits first value at 3s, then once every 8s
// const timerThree$ = timer(3000, 8000);

// // when one timer emits, emit the latest values from each timer as an array
// const subscription = combineLatest([
//   timerOne$,
//   timerTwo$,
//   timerThree$,
// ]).subscribe(([timerValOne, timerValTwo, timerValThree]) => {
//   console.log(
//     `Timer One Latest: ${timerValOne},
//      Timer Two Latest: ${timerValTwo},
//      Timer Three Latest: ${timerValThree}`
//   );
// });
// // subscription.unsubscribe();

// --------------  partition  --------------
const observableValues = of(1, 2, 3, 4, 5, 6);
const [evens, odds] = partition(
  observableValues,
  (value, index) => value % 2 === 0
);
// /*
//   Output:
//   "Even: 2"
//   "Even: 4"
//   "Even: 6"
//   "Odd: 1"
//   "Odd: 3"
//   "Odd: 5"
// */
// const subscribe = merge(
//   evens.pipe(map((val) => `Even: ${val}`)),
//   odds.pipe(map((val) => `Odd: ${val}`))
// ).subscribe((val) => console.log(val));

// --------------  Custom Operators  --------------
// export function log<T>(message?: string): OperatorFunction<T, T> {
//   return tap((e) => console.log(message, e));
// }

// export function filterNil() {
//   return function <T>(source: Observable<T>) {
//     return source.pipe(
//       filter((value) => value !== undefined && value !== null)
//       // map((value) => value !== undefined && value !== null ? value : 'Nothing')
//     );
//   };
// }

// from([1, 2, undefined, 4])
//   .pipe(log('Hello World'), filterNil())
//   .subscribe((val) => console.log('subscribe', val));
