
//first let's explain how fetch works

/*
fetch is a function that returns an object called "promise". 
A promise has a method called "then" that also returns a promise
*/
fetch("https://pokeapi.co/api/v2/pokemon") 
/* 
"then" takes one parameter that is a callback function that is 
called when the server responds (AKA when the promise is resolved).
This callback function takes in one parameter that is the "resolved value" of the promise
*/
.then(response => response.json()) //fetch returns a promise that resolves to a "response" object that has a json method
//if you return a promise from the callback function, the next "then" will be called with the resolved value of that promise
.then(data => fetch(data.results[0].url))
//because "then" always returns a promise we can chain multiple "then" methods
.then(response => response.json())
.then(data => console.log(data)); 
//if you return a value (that is not a promise) from the callback function, the next "then" callback function will be called with that value (normally you just stop calling .then after that)
//note that "then" still returns a promise it is only the parameter of the callback function that is not a promise

//Now let's explain how async/await works

console.log("this happens first");
const getPokemons = async () => { //using the async keyword before a function declaration allows us to use the await keyword inside the function
  console.log("this happens third");
  const response1 = await fetch("https://pokeapi.co/api/v2/pokemon"); //the await keyword pauses the execution of the function until the promise is resolved
  const allPokemons = await response1.json();//the await keyword abstracts the whole promise away and retuns the resolved value (but not the promise) 
  const response2 = await fetch(allPokemons.results[0].url);
  const firstPokemon = await response2.json();
  /*
  this way all calls to the server will be reduced to only two lines of code 
  and if you make your own promise or use a library like Axios you can reduce it to only one line for each call 
  */
  console.log("this happens last");
  console.log(firstPokemon);
}
console.log("this happens second");
getPokemons();
console.log("this happens fourth");

