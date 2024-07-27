const names = [
  "Alice", "Bob", "Charlie", "David", "Eve",
  "Frank", "Grace", "Hank", "Ivy", "Jack"
];

const quotes = [
  "The important thing is not to stop questioning. - Albert Einstein",
  "Science is a way of thinking much more than it is a body of knowledge. - Carl Sagan",
  "The good thing about science is that it's true whether or not you believe in it. - Neil deGrasse Tyson",
  "Research is what I'm doing when I don't know what I'm doing. - Wernher von Braun",
  "Somewhere, something incredible is waiting to be known. - Carl Sagan",
  "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge. - Stephen Hawking",
  "Equipped with his five senses, man explores the universe around him and calls the adventure Science. - Edwin Hubble",
  "Science is the poetry of reality. - Richard Dawkins",
  "The universe is under no obligation to make sense to you. - Neil deGrasse Tyson",
  "Science knows no country, because knowledge belongs to humanity, and is the torch which illuminates the world. - Louis Pasteur"
];

const counters = [0, 1, 2, 3];

function getRandomTime() {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function getRandomObject() {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const randomTime = getRandomTime();
  const randomCounter = counters[Math.floor(Math.random() * counters.length)];

  return {
    name: randomName,
    text: randomQuote,
    time: randomTime,
    counter: randomCounter ? randomCounter : '',
  };
}
