'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
   owner: 'Jonas Schmedtmann',
   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
   interestRate: 1.2, // %
   pin: 1111,
};

const account2 = {
   owner: 'Jessica Davis',
   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
   interestRate: 1.5,
   pin: 2222,
};

const account3 = {
   owner: 'Steven Thomas Williams',
   movements: [200, -200, 340, -300, -20, 50, 400, -460],
   interestRate: 0.7,
   pin: 3333,
};

const account4 = {
   owner: 'Sarah Smith',
   movements: [430, 1000, 700, 50, 90],
   interestRate: 1,
   pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////// Creating DOM Elements ///////////////////
const displayMovements = function (movements, sort = false) {
   containerMovements.innerHTML = '';

   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

   movs.forEach(function (mov, i) {
      const type = mov > 0 ? `deposit` : `withdrawal`;
      const html = ` <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
         i + 1
      } ${type}</div>
      <div class="movements__value">${mov}€</div>`;

      containerMovements.insertAdjacentHTML('afterbegin', html);
   });
};

const calcDisplayBalance = function (acc) {
   acc.balance = acc.movements.reduce((arr, cur) => arr + cur, 0);
   labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
   const incomes = acc.movements
      .filter((mov) => mov > 0)
      .reduce((arr, mov) => arr + mov, 0);
   labelSumIn.textContent = `${incomes}€`;

   const outcome = acc.movements
      .filter((mov) => mov < 0)
      .reduce((arr, mov) => arr + mov, 0);
   labelSumOut.textContent = `${Math.abs(outcome)}€`;

   const interrest = acc.movements
      .filter((mov) => mov > 0)
      .map((mov) => (mov * acc.interestRate) / 100)
      .filter((init) => init >= 1)
      .reduce((arr, init) => arr + init, 0);
   labelSumInterest.textContent = `${interrest}€`;
};

///////////////// Computing Usernames /////////////////
const createUsernames = function (accs) {
   accs.forEach(function (acc) {
      acc.username = acc.owner
         .toLowerCase()
         .split(' ')
         .map((work) => work[0])
         .join('');
   });
};
createUsernames(accounts);

const updateUI = function (acc) {
   // Display movements
   displayMovements(acc.movements);
   // Dispalay balane
   calcDisplayBalance(acc);
   // Display summary
   calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
   // prevent form from submitting
   e.preventDefault();

   currentAccount = accounts.find(
      (acc) => acc.username === inputLoginUsername.value
   );
   if (currentAccount?.pin === Number(inputLoginPin.value)) {
      // Display UI & massage
      labelWelcome.textContent = `Welcome back, ${
         currentAccount.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = 100;
      // Clear input fields
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      // UpdateUI
      updateUI(currentAccount);
   }
});

btnTransfer.addEventListener('click', function (e) {
   e.preventDefault();
   const amount = Number(inputTransferAmount.value);
   const receiverAcc = accounts.find(
      (acc) => acc.username === inputTransferTo.value
   );
   inputTransferTo.value = inputTransferAmount.value = '';
   inputTransferAmount.blur();

   if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
   ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // UpdateUI
      updateUI(currentAccount);
   }
});

btnLoan.addEventListener('click', function (e) {
   e.preventDefault();

   const amount = Number(inputLoanAmount.value);
   if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
   ) {
      // Add movements
      currentAccount.movements.push(amount);
      // UpdateUI
      updateUI(currentAccount);
   }
   inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
   e.preventDefault();

   if (
      inputCloseUsername.value === currentAccount.username &&
      currentAccount.pin === Number(inputClosePin.value)
   ) {
      // Display UI & massage
      const index = accounts.findIndex(
         (acc) => acc.username === currentAccount.username
      );
      accounts.splice(index, 1);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
   }
   inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
   e.preventDefault();
   displayMovements(currentAccount.movements, !sorted);
   sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
////////////////// Simple Array Methods ///////////////////
let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(3, 5));
console.log(arr.slice(-2));
console.log(arr.slice(1, -1));
console.log(arr.slice());
console.log([...arr]);

// SPLICE
// console.log(arr.splice(-1));
arr.splice(-1);
console.log(arr);
arr.splice(1, 3);
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e', 'f'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));
*/

/*
/////////////////////// Looping Arrays: forEach /////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
   if (movement > 0) {
      console.log(`Movement ${i + 1}: You deposited ${movement}`);
   } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
   }
}

console.log('----------- FOREACH -------------');
movements.forEach(function (mov, i, arr) {
   if (mov > 0) {
      console.log(`Movement ${i + 1}: You deposited ${mov}`);
   } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
   }
});
// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ........
*/

/*
/////////////////////// forEach With Maps and Sets /////////////////////
const currencies = new Map([
   ['USD', 'United States dollar'],
   ['EUR', 'Euro'],
   ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
   console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USA', 'EUR', 'GBP', 'USA', 'USA', 'GBP']);
currenciesUnique.forEach(function (value, key, set) {
   // console.log(`${key}: ${value}`);
   console.log(`${value}: ${value}`);
});
*/

/*
/////////////////////// The map Method /////////////////////
const eurToUsa = 1.1;

const movementsUSD = movements.map(function (mov) {
   return eurToUsa * mov;
});
// const movementsUSD = movements.map(mov => eurToUsa * mov); //  Arrow function
console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) {
//    movementsUSDfor.push(mov * eurToUsa);
// }
// console.log(movementsUSDfor);

const movementsDecs = movements.map(
   (mov, i) =>
      `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
         mov
      )}`
);
console.log(movementsDecs);
*/

/*
///////////////////////// The filter Method /////////////////////////////
const deposits = movements.filter(function (mov) {
   return mov > 0;
});
console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
   if (mov > 0) {
      depositsFor.push(mov > 0);
   }
}
console.log(depositsFor);

const withdrawalas = movements.filter((mov) => mov < 0);
console.log(withdrawalas);
*/

/*
//////////////////////// The reduce Method /////////////////////
console.log(movements);

// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//    console.log(`${i}: ${acc} ${cur}`);
//    return acc + cur;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let sum = 0;
for (const mov of movements) sum += mov;
console.log(sum);

// maximum value
const max = movements.reduce((acc, mov) => {
   if (acc > mov) return acc;
   else return mov;
}, movements[0]);
console.log(max);
*/

/*
///////////// The Magic of Chaining Methods ///////////////
const eurToUsa = 1.1;
const totalUSA = movements
   .filter((mov) => mov > 0)
   .map((mov) => mov * eurToUsa)
   .reduce((arr, mov) => arr + mov, 0);
console.log(totalUSA);
*/

/*
//////////////////// The find Method /////////////////////
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find((acc) => acc.owner === 'Jonas Schmedtmann');
console.log(account);
*/

/*
///////////////////// Some and every ///////////////////////

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some((mov) => mov === -130));

const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

// EVERY
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

// Separete callback
const deposit = (mov) => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
*/

/*
//////////////// flat and flatMap ////////////////
const arr = [[1, 2, 3], 4, [5, 6, 7], 8];
console.log(arr.flat());

const arrDeep = [[1, [2], 3], 4, [5, [6], 7], 8];
console.log(arrDeep.flat(2));

// flat
const allMovement = accounts
   .map((acc) => acc.movements)
   .flat()
   .reduce((acc, mov) => acc + mov, 0);
console.log(allMovement);

// flatMap
const allMovement2 = accounts
   .flatMap((acc) => acc.movements)
   .reduce((acc, mov) => acc + mov, 0);
console.log(allMovement2);
*/

/*
//////////////// Sorting Arrays ////////////////
// Strings
const owners = ['huy', 'ti', 'lam', 'bao', 'luan'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// Return < 0, A, B ( keep order)
// Rrturn > 0, B, A (swtich order)

// Ascending
// movements.sort((a, b) => {
//    if (a > b) return 1;
//    if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//    if (a > b) return -1;
//    if (b > a) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
*/

/*
////////// More Ways of Creating and Filling Arrays ////////////////////
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Emprty arrays + fill method
const x = new Array(7);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(22, 2, 6);
console.log(arr);

// Array from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
   const movementsUI = Array.from(
      document.querySelectorAll('.movements__value'),
      (el) => Number(el.textContent.replace('€', ''))
   );
   console.log(movementsUI);
   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
*/

/*
///////////////// Array Methods Practice /////////////////////
// 1.
const bankDepositSum = accounts
   .flatMap((acc) => acc.movements)
   .filter((mov) => mov > 0)
   .reduce((sum, cur) => sum + cur);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//    .flatMap((acc) => acc.movements)
//    .filter((mov) => mov >= 1000).length;
// console.log(numDeposits1000);

const numDeposits1000 = accounts
   .flatMap((acc) => acc.movements)
   //    .reduce((acount, cur) => (cur >= 1000 ? acount + 1 : acount), 0);
   // console.log(numDeposits1000);
   .reduce((acount, cur) => (cur >= 1000 ? ++acount : acount), 0);
console.log(numDeposits1000);

// Prefixed ++ operator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
   .flatMap((acc) => acc.movements)
   .reduce(
      (sums, cur) => {
         //    cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
         //    return sums;
         sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
         return sums;
      },

      { deposits: 0, withdrawals: 0 }
   );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
   const capitzalize = (str) => str[0].toUpperCase() + str.slice(1);

   const exceptions = [
      'a',
      'an',
      'and',
      'the',
      'but',
      'or',
      'on',
      'in',
      'with',
   ];

   const titleCase = title
      .toLowerCase()
      .split(' ')
      .map((word) => (exceptions.includes(word) ? word : capitzalize(word)))
      .join(' ');
   return capitzalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
*/
