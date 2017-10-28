const naturalNotes = ['C','D','E','F','G','A','B'];
const orderSharps = ['F','C','G','D','A','E'];
const orderFlats = ['B','E','A','D','G','C'];
const allKeys = {
  Gb : -6,
  Db : -5,
  Ab : -4,
  Eb : -3,
  Bb : -2,
  F : -1,
  C : 0,
  G : 1,
  D : 2,
  A : 3,
  E : 4,
  B : 5,
};

class Key {
  constructor (name,scale) {
    this.name = name;
    this.scale = scale;
  }
  get sharpsOrFlats () {
    let accidentals = allKeys[this.name];
    return accidentals < 0 ? Math.abs(allKeys[this.name]) + '♭'
    : accidentals === 0 ? 'no flats or sharps.'
    : allKeys[this.name] + '♯';  
  }
  get pitches () {
    //quita el último caracter para evitar bemoles.
    let keyCutter = this.name[0];
    //identifica el indice en array de notas naturales.
    let keyIndex = naturalNotes.indexOf(keyCutter);
    //nuevo array con orden de notas naturales para esta tónica.
    let a = naturalNotes.slice(keyIndex);
    let b = naturalNotes.slice(0,keyIndex);
    return a.concat(b);
  }
  get accidentals() {
    let accidentals = allKeys[this.name]; 
    let listAccidentals;
    if (accidentals < 0) {
      listAccidentals = orderFlats.slice(0,Math.abs(accidentals));
      } else {
      listAccidentals = orderSharps.slice(0,(accidentals));
    };    
    return listAccidentals; 
  }
};

//Tester
let sol = new Key('G');
let re = new Key('D');
let la = new Key('A');
let sib = new Key('Bb');
let reb = new Key('Db');


//Create Buttons

function makeUL() {

  let extractAllKeySigantures = Object.keys(allKeys);
  
  let ul = document.createElement('ul');
  ul.setAttribute("class", "circle-container");
  
  document.querySelector('#myList').appendChild(ul);
  
  extractAllKeySigantures.forEach(function(eachKey){
    var li = document.createElement('li');
    li.setAttribute("value", eachKey);
    ul.appendChild(li);
    li.innerHTML += eachKey;
  });
}

makeUL();
 
// let extractAllKeySigantures = Object.keys(allKeys);
// extractAllKeySigantures.forEach(function(key) {
//   document.write(`<button value='${key}' onclick='setKey(this.value)'>${key}</button>`);
// });

//Input
setKey = (inputKey) => {
   let newKey = new Key(inputKey);
   console.log(newKey.sharpsOrFlats);
   document.querySelector('#result').innerHTML = `${newKey.name} major has ${newKey.sharpsOrFlats} ${newKey.accidentals}`;
};