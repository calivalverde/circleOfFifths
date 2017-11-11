const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const modesList = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];

const chordTypes = [
    { id: 'I', type: 'maj7', mode: 'Ionian' },
    { id: 'II', type: 'm7', mode: 'Dorian' },
    { id: 'III', type: 'm7', mode: 'Phrygian' },
    { id: 'IV', type: 'maj7', mode: 'Lydian' },
    { id: 'V', type: '7', mode: 'Mixolydian' },
    { id: 'VI', type: 'm7', mode: 'Eolian' },
    { id: 'VII', type: 'm7(b5)', mode: 'Locrian' }
];

const orderSharps = ['F', 'C', 'G', 'D', 'A', 'E'];
const orderFlats = ['B', 'E', 'A', 'D', 'G', 'C'];
const allKeys = {
    Gb: -6,
    Db: -5,
    Ab: -4,
    Eb: -3,
    Bb: -2,
    F: -1,
    C: 0,
    G: 1,
    D: 2,
    A: 3,
    E: 4,
    B: 5,
};

class Key {
    constructor(name) {
        this.name = name;
    }

    get sharpsOrFlats() {
        //combierte el valor a entero positivo.
        return allKeys[this.name] < 0 ? Math.abs(allKeys[this.name]) + '♭' :
            allKeys[this.name] === 0 ? 'no flats or sharps.' :
            allKeys[this.name] + '♯';
    }

    //hay que arreglar el resultado con el simbolo correcto
    get accidentals() {
        let listAccidentals;
        if (allKeys[this.name] < 0) {
            listAccidentals = orderFlats.slice(0, Math.abs(allKeys[this.name]));
        } else {
            listAccidentals = orderSharps.slice(0, (allKeys[this.name]));
        };
        return listAccidentals;
    }

    get pitches() {
        //identifica el indice de la tónica en array de notas naturales. 
        let keyIndex = naturalNotes.indexOf(this.name[0]);
        //nuevo array con orden de notas naturales para esta tónica.
        let pitchCollection = naturalNotes.slice(keyIndex).concat(naturalNotes.slice(0, keyIndex));
        // define un array con los accidentes de la tonalidad llamando la propiedad.
        let accidentals  = this.accidentals;
        // define una variable con el simbolo de sostenido o bemol.
        let accidentType;
        if (allKeys[this.name] > 0) {
            accidentType = '♯'
        } else {
            accidentType = '♭'
        }
        // crea nueva familia con notas y sus alteraciones respectivas
        let newFamilly = pitchCollection.map(function(x) {
            for (let i = 0; i < accidentals.length; i++) {
                if (x === accidentals[i]) {
                    return x + accidentType;
                }
            }
            return x;
        });
        return newFamilly;
    }

    get chords() {
        let obj = {};
        let pitchesTemp = this.pitches;
        let builder = pitchesTemp.map((pitch, index) => {
            obj[chordTypes[index].id] = pitch.concat(chordTypes[index].type);
        });
        return obj;
    }

    get modes() {
        let builder = [];
        let pitchesTemp = this.pitches;
        for (let i = 0; i < pitchesTemp.length; i++) {
            for (let j = 0; j < modesList.length; j++) {
                builder.push(pitchesTemp[i] + ' ' + modesList[j]);
                pitchesTemp.shift();
            }
        }
        return builder;
    }

}; //class Key

//Tester
let du = new Key('C');
let sol = new Key('G');
let re = new Key('D');
let la = new Key('A');
let sib = new Key('Bb');
let reb = new Key('Db');

///////////////////////////////////////
//////OUTPUT
///////////////////////////////////////

//Crear los buttons
function listOfKeys() {
    //crea una variable con todas las tonalidades
    let extractAllKeySigantures = Object.keys(allKeys);

    //reorganiza el arraglo para adapartalo al diseño
    let reOrderKeys = extractAllKeySigantures.slice(9).concat(extractAllKeySigantures.slice(0, 9));

    //una variable ul que coniente el UL
    let ul = document.createElement('ul');
    ul.setAttribute('class', 'circle-container');

    reOrderKeys.forEach(function(eachKey) {
        //crea una lista por cada elemento del arreglo  
        let li = document.createElement('li');
        //crea los botones por cada tonica    
        let button = document.createElement('button');
        button.setAttribute('value', eachKey);
        button.setAttribute('class', 'button');
        button.innerText = eachKey;
        //imprime en ul el contenido de li
        li.appendChild(button);
        ul.appendChild(li);
    });

    //imprime el UL
    document.querySelector('#myList').appendChild(ul);

} //listOfKeys

// Se llama a la función para Output de los botones
listOfKeys();


///////////////////////////////////////
//////INPUT
///////////////////////////////////////

const buttons = document.querySelectorAll('ul.circle-container > li > button');

let newKey;

//Set the new Key
buttons.forEach((button) => {
    (function() {
        button.onclick = function() {
            newKey = new Key(button.value);
            print()
        };
    })(button);
});

//Print newKey results
function print() {
    document.querySelector('h2#key').innerHTML = `${newKey.name} Major`;
    document.querySelector('h3#scale').innerHTML = `Scale: ${newKey.pitches}`;

}













