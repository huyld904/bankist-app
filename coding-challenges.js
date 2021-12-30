'use strict';

/*
///////////////// Coding Challenges #1 //////////////////////////////

const checkDogs = function (dogJulia, dogKate) {
   const dogJuliaCopy = dogJulia.slice(1, -2);
   const dogBoth = dogJuliaCopy.concat(dogKate);
   dogBoth.forEach(function (dog, i) {
      if (dog > 3) {
         console.log(
            `Dog number ${i + 1}  is an adult, and is ${dog} years old`
         );
      } else {
         console.log(`Dog number ${i + 1} is still a puppy  🐶  `);
      }
   });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
///////////////// Coding Challenges #2 //////////////////////////////

const calcAverageHumanAge = function (age) {
   const humanAge = age.map((dogAge) => {
      if (dogAge <= 2) {
         return 2 * dogAge;
      } else {
         return 16 + dogAge * 4;
      }
   });
   console.log(humanAge);

   const over18Year = humanAge.filter((over) => over > 18);
   console.log(over18Year);

   const avgAge = over18Year.reduce(
      (acc, cur) => acc + cur / over18Year.length,
      0
   );
   console.log(avgAge);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

/*
///////////////// Coding Challenges #3 //////////////////////////////
const calcAverageHumanAge = function (age) {
   const humanAge = age
      .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
      .filter((age) => age > 18)
      .reduce((acc, init, i, arr) => acc + init / arr.length, 0);
   console.log(humanAge);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
*/

/*
const obj = { code1: 2, code2: 1, code3: 3 };

const name = [
   { name: 'Name1', productCode: 'code1' },
   { name: 'Name2', productCode: 'code2' },
   { name: 'Name3', productCode: 'code3' },
];

// Name1: 2;
// Name2: 1;
// Name3: 3;


name.forEach((item) => {
   for (const [key, value] of Object.entries(obj)) {
      if (item.productCode === key) {
         console.log(item.name, value);
      }
   }
});
*/

// const strArray = [
//    { name: 'A', age: 20, gender: 'male' },
//    { name: 'A', age: 20, gender: 'male' },
//    { name: 'B', age: 20, gender: 'male' },
//    { name: 'A', age: 20, gender: 'male' },
//    { name: 'C', age: 20, gender: 'male' },
// ];

// for (let i = 0; i < strArray.length - 1; i++) {
//    const name = strArray[i].name;
//    const age = strArray[i].age;
//    for (let y = i + 1; i < strArray.length; y++) {
//       if (name === strArray[y].name && age === strArray[y].age) {
//          console.log('duplicate');
//       }
//    }
// }

// let findDup = [];
// strArray.forEach(function (item) {
//    const findKey = `${item.name} ${item.age}`;
//    if (!findDup.includes(findKey)) {
//       return findDup.push(findKey);
//    }
//    console.log('duplicate');
// });
// console.log(findDup);

///////////////// Coding Challenges #4 //////////////////////////////

const dogs = [
   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
   { weight: 8, curFood: 200, owners: ['Matilda'] },
   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
   { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach((dog) => (dog.recommendedFood = dog.weight ** 0.75 * 28));
console.log(dogs);

const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
   `Sarah's dog is eating too ${
      dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
   }`
);

const ownerEatTooMuch = dogs
   .filter((dog) => dog.curFood > dog.recommendedFood)
   .flatMap((dog) => dog.owners);
console.log(ownerEatTooMuch);

const ownerEatTooLittle = dogs
   .filter((dog) => dog.curFood < dog.recommendedFood)
   .flatMap((dog) => dog.owners);
console.log(ownerEatTooLittle);

console.log(`${ownerEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownerEatTooLittle.join(' and ')}'s dogs eat  too little!`);

console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

console.log(
   dogs.some(
      (dog) =>
         dog.curFood > dog.recommendedFood * 0.9 &&
         dog.curFood < dog.recommendedFood * 1.1
   )
);

console.log(
   dogs.filter(
      (dog) =>
         dog.curFood > dog.recommendedFood * 0.9 &&
         dog.curFood < dog.recommendedFood * 1.1
   )
);

const dogCopy = dogs
   .slice()
   .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogCopy);
