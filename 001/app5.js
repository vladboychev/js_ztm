const names = ['sasho', 'pepi', 'miko', "moni", "stefi"];
const numbers = [20,21,22,23,24,25,26,27]

function arrayToUpperCase(arr) {
    return arr.map(a => a.toUpperCase());
}

function isEvenOrOdd(arr) {
    return arr.map(function(n) {
        return {
            "value": n,
            "isEven": n % 2 === 0
        };
    })
}

function abbreviate(arr) {
    return arr.map(abb => abb.toUpperCase().split('').join('.'))
}

let movies = ["Mr. and Mrs. Smith", "Mrs. Doubtfire", "The Fantastic Mr. Fox", "Mr. Deeds"];

const movie = movies.find(movie => movie.includes("Mrs"));
const movie2 = movies.find(movie => movie.indexOf("Mrs") === 0);

const evenNumbers = numbers.filter(number => number % 2 === 0);

const descSort = numbers.toSorted((a,b) => b - a);

const books = [{
    title: 'Good Omens',
    authors: ['Terry Pratchett', 'Neil Gaiman'],
    rating: 4.25,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Changing My Mind',
    authors: ['Zadie Smith'],
    rating: 3.83,
    genres: ['nonfiction', 'essays']
  },
  {
    title: 'Bone: The Complete Edition',
    authors: ['Jeff Smith'],
    rating: 4.42,
    genres: ['fiction', 'graphic novel', 'fantasy']
  },
  {
    title: 'American Gods',
    authors: ['Neil Gaiman'],
    rating: 4.11,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'A Gentleman in Moscow',
    authors: ['Amor Towles'],
    rating: 4.36,
    genres: ['fiction', 'historical fiction']
  },
  {
    title: 'The Name of the Wind',
    authors: ['Patrick Rothfuss'],
    rating: 4.54,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'The Overstory',
    authors: ['Richard Powers'],
    rating: 4.19,
    genres: ['fiction', 'short stories']
  },
  {
    title: 'The Way of Kings',
    authors: ['Brandon Sanderson'],
    rating: 4.65,
    genres: ['fantasy', 'epic']
  },
  {
    title: 'Lord of the flies',
    authors: ['William Golding'],
    rating: 3.67,
    genres: ['fiction']
  }
]

books.sort((a,b) => a.rating - b.rating);

const sumOfAll = numbers.reduce((a,b) => a + b);

const maxNum = numbers.reduce((a,b) => Math.max(a, b));

const maxN = Math.max(...numbers);

const multiply = (...nums) => (nums.reduce((a,b) => a*b));