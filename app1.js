const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

app.get('/sum', (req,res) => {
    const {a, b} = req.query;

if(!a){
    return res
      .status(400)
      .send('a required');
}
if(!b){
    return res 
    .status(400)
    .send('b required');
}

const numA = parseFloat(a);
const numB = parseFloat(b);

if(Number.isNaN(numA)){
    return res
    .status(400)
    .send('a must be a number');
}
if(Number.isNaN(numB)){
    return res
    .status(400)
    .send('b must be a number');
}

const c = numA + numB;

const returnedString = `the sum of ${numA} and ${numB} is ${c}`;

res
 .status(200)
 .send(returnedString);
    
});

app.get('/cipher', (req,res) =>{
const {text, shift} = req.query;

if(!text){
    return res
    .status(400)
    .send('text required');
}
if(!send){
    return res
    .send(400)
    .send('shift required');
}
const numShift = parseFloat(shift);

if(Number.isNaN(numShift)){
    return res
    .status(400)
    .send('shift must be a number');
}
const base = 'A'.charCodeAt(0);

const cipher = text
  .toUpperCase()
  .split('')//created array of characters
  .map(char => {
      const code =char.charCodeAt(0);

      if(code < base || code > (base + 26)){
          return char;
      }

  let diff = code - base;
  diff = diff + numShift;
  diff = diff % 26;

  const shiftedChar = String.fromCharCode(base + diff);
  return shiftedChar;
  })
  .join('');
  res // returns the response
  .status(400)
  .send(cipher);
});

app.get('/lotto', (req, res) => {
    const numbers = req.query;

    if(!numbers){
        return res
        .status(400)
        .send('number required'); //numbers arry must exist
    }
    if(!Array.isArray(numbers)){
        return res
        .status(400)
        .send('number must be an array'); //must be an array
    }
    const guess = numbers
    .map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

    if(guess.length != 6){ //must be 6 numbers
        return res
        .status(400)
        .send('number must contain 6 intergers between 1 and 20 ');
      }
    const stocks = Array(20).fill(1).map((_, i) => i +1); // here are 20 numbers to choose from

    //randomly chooses 6
    const winning = [];
    for(let i = 0; i <6; i++){
        const ran = Math.floor(Math.random() * stocks.length);
        winning.push(stocks[ran]);
        stocks.splice(ran , 1);
    } 
    //compares the guesses to the winning numbers
    let diff = winning.filter(n => !guess.includes(n));

    let response;

    switch(diff.length){
        case 0:
           response = 'Wow! you almost one';
           break;
        case 1:
            response = 'You won $100 dollars';
            break;
        case 2:
            response = 'You win a free ticket';
            break;
        default:
            response = 'Sorry, you lose';   

    }
    res.send(response);

});

app.listen(8000, () => {
    console.log('express is working');
});