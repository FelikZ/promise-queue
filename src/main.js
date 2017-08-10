import PromiseQueue from './PromiseQueue';

let q = new PromiseQueue(() => { console.log('now its really done'); }, 5000);

let q1 = 'GET /something-heavy';
q.add(q1);
setTimeout(() => {
  console.log(q1); q.resolve(q1);
 
  let q4 = 'GET /something-light-3';
  q.add(q4);
  setTimeout(() => { console.log(q4); q.resolve(q4); }, 300);
}, 1000);

let q2 = 'GET /something-light';
q.add(q2);
setTimeout(() => { console.log(q2); q.resolve(q2); }, 100);

let q3 = 'GET /something-light-2';
q.add(q3);
setTimeout(() => {
  console.log(q3); q.resolve(q3);
  
  let q5 = 'GET /something-heavy-2';
  q.add(q5);
  setTimeout(() => { console.log(q5); q.resolve(q5); }, 5500);
}, 300);

