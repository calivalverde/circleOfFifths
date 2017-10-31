const naturalNotes = ['C','D','E','F','G','A','B'];
const modesList = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
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
  constructor (name) {
    this.name = name;
  }

 get sharpsOrFlats () {
    //combierte el valor a entero positivo.
    return allKeys[this.name] < 0 ? Math.abs(allKeys[this.name]) + '♭'
    : allKeys[this.name] === 0 ? 'no flats or sharps.'
    : allKeys[this.name] + '♯';
  }

  //hay que arreglar el resultado con el simbolo correcto
  get accidentals() {
    let listAccidentals;
    if (allKeys[this.name] < 0) {
      listAccidentals = orderFlats.slice(0,Math.abs(allKeys[this.name]));
      } else {
      listAccidentals = orderSharps.slice(0,(allKeys[this.name]));
    };
    return listAccidentals; 
  }

  get pitches () {
    //identifica el indice de la tónica en array de notas naturales. Utiliza solo el primer caracter para evitar bemoles.
    let keyIndex = naturalNotes.indexOf(this.name[0]);
    //nuevo array con orden de notas naturales para esta tónica.
    let pitchCollection = naturalNotes.slice(keyIndex).concat(naturalNotes.slice(0,keyIndex));
    // define un array con los accidentes de la tonalidad llamando la propiedad.
    let accidentals  = this.accidentals;
    // define una variable con el simbolo de sostenido o bemol.
    let accidentType;
    if (allKeys[this.name] > 0) {
      accidentType = '♯'
    } else {
      accidentType = '♭'
    }
    // crea nueva familia con notas sus alteraciones respectivas
    let newFamilly = pitchCollection.map(function(x) {
      for (let i = 0; i < accidentals.length; i++) {
          if (x === accidentals[i]) { 
            return x + accidentType;
          }
      } return x;
    });
    return newFamilly;
  }

  get modes() {
    let builder = [];
    let pitchesTemp = this.pitches;
    for (let i = 0; i < pitchesTemp.length; i++) {
      for (let j = 0; j < modesList.length; j++) {
       builder.push(pitchesTemp[i] + ' ' + modesList[j]); 
       pitchesTemp.shift();
      }  
    } return builder;
  }

};//class

//Tester
let du = new Key('C');
let sol = new Key('G');
let re = new Key('D');
let la = new Key('A');
let sib = new Key('Bb');
let reb = new Key('Db');


//Create Buttons
listOfKeys = () => {

  let extractAllKeySigantures = Object.keys(allKeys);
  //reorganiza el arraglo para adapartalo al diseño
  let reOrderKeys = extractAllKeySigantures.slice(9).concat(extractAllKeySigantures.slice(0,9));

  let ul = document.createElement('ul');
  ul.setAttribute("class", "circle-container");
  
  document.querySelector('#myList').appendChild(ul);
  
  reOrderKeys.forEach(function(eachKey){
    var li = document.createElement('li');
    li.setAttribute("id", eachKey);
    ul.appendChild(li);
    li.innerHTML += `<button value='${eachKey}' onclick='setKey(this.value)'>${eachKey}</button>`;
  });
}
listOfKeys();
 

//Input
setKey = (inputKey) => {
   let newKey = new Key(inputKey);
   document.querySelector('#result').innerHTML = `
    <ul>
      <li><h2>${newKey.name} Major</h2></li>
      <li>Alterations: ${newKey.sharpsOrFlats}</li>
      <li>Scale: ${newKey.pitches}</li>
      <li>Accidentals: ${newKey.accidentals}</li>
      <li>Modes: ${newKey.modes}</li>
    </ul>
   `;
};