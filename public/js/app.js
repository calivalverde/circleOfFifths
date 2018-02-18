'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

var modesList = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];

var chordTypes = [{ id: 'I', type: 'maj7', mode: 'Ionian' }, { id: 'II', type: 'm7', mode: 'Dorian' }, { id: 'III', type: 'm7', mode: 'Phrygian' }, { id: 'IV', type: 'maj7', mode: 'Lydian' }, { id: 'V', type: '7', mode: 'Mixolydian' }, { id: 'VI', type: 'm7', mode: 'Eolian' }, { id: 'VII', type: 'm7(b5)', mode: 'Locrian' }];

var orderSharps = ['F', 'C', 'G', 'D', 'A', 'E'];
var orderFlats = ['B', 'E', 'A', 'D', 'G', 'C'];
var allKeys = {
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
    B: 5
};

var Key = function () {
    function Key(name) {
        _classCallCheck(this, Key);

        this.name = name;
    }

    _createClass(Key, [{
        key: 'sharpsOrFlats',
        get: function get() {
            //combierte el valor a entero positivo.
            return allKeys[this.name] < 0 ? Math.abs(allKeys[this.name]) + '♭' : allKeys[this.name] === 0 ? 'no flats or sharps.' : allKeys[this.name] + '♯';
        }
    }, {
        key: 'accidentals',
        get: function get() {
            var listAccidentals = void 0;
            if (allKeys[this.name] < 0) {
                // Crea un array con las alteraciones
                var accidentals = orderFlats.slice(0, Math.abs(allKeys[this.name]));
                // Combina el nombre de la alteración con el símbolo
                listAccidentals = accidentals.map(function (accidental) {
                    return accidental + '♭';
                });
            } else {
                var _accidentals = orderSharps.slice(0, allKeys[this.name]);
                listAccidentals = _accidentals.map(function (accidental) {
                    return accidental + '#';
                });
            };
            return listAccidentals;
        }
    }, {
        key: 'pitches',
        get: function get() {
            //identifica el indice de la tónica en array de notas naturales [0] pasa el primer caracter. 
            var keyIndex = naturalNotes.indexOf(this.name[0]);
            //nuevo array con orden de notas naturales para esta tónica.
            var pitchCollection = naturalNotes.slice(keyIndex).concat(naturalNotes.slice(0, keyIndex));
            // define un array con los accidentes de la tonalidad llamando la propiedad.
            var accidentals = this.accidentals;

            // crea nueva familia con notas y sus alteraciones respectivas
            var newFamilly = pitchCollection.map(function (pitch) {
                for (var i = 0; i < accidentals.length; i++) {
                    if (pitch === accidentals[i][0]) {
                        return accidentals[i];
                    }
                }
                return pitch;
            });
            return newFamilly;
        }
    }, {
        key: 'chords',
        get: function get() {
            var obj = {};
            var pitchesTemp = this.pitches;
            var builder = pitchesTemp.map(function (pitch, index) {
                obj[chordTypes[index].id] = pitch.concat(chordTypes[index].type);
            });
            return obj;
        }
    }, {
        key: 'modes',
        get: function get() {
            var builder = [];
            var pitchesTemp = this.pitches;
            for (var i = 0; i < pitchesTemp.length; i++) {
                for (var j = 0; j < modesList.length; j++) {
                    builder.push(pitchesTemp[i] + ' ' + modesList[j]);
                    pitchesTemp.shift();
                }
            }
            return builder;
        }
    }]);

    return Key;
}();

; //class Key

//Tester
var du = new Key('C');
var sol = new Key('G');
var re = new Key('D');
var la = new Key('A');
var sib = new Key('Bb');
var reb = new Key('Db');

///////////////////////////////////////
//////CIRCLE OUTPUT
///////////////////////////////////////

//Crear los buttons
function listOfKeys() {
    //crea una variable con todas las tonalidades
    var extractAllKeySigantures = Object.keys(allKeys);

    //reorganiza el arraglo para adapartalo al diseño
    var reOrderKeys = extractAllKeySigantures.slice(9).concat(extractAllKeySigantures.slice(0, 9));

    //una variable ul que coniente el UL
    var ul = document.createElement('ul');
    ul.setAttribute('class', 'circle-container z-depth-4');

    reOrderKeys.forEach(function (eachKey) {
        //crea una lista por cada elemento del arreglo  
        var li = document.createElement('li');
        //crea los botones por cada tonica    
        var button = document.createElement('button');
        button.setAttribute('value', eachKey);
        button.setAttribute('class', 'z-depth-1 waves-effect waves-light blue-grey-text text-darken-4');
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

var buttons = document.querySelectorAll('ul.circle-container > li > button');
var svgPaths = document.querySelectorAll('.staff svg > path');
var newKey = void 0;

//Set the new Key
buttons.forEach(function (button) {
    (function () {
        button.onclick = function () {
            newKey = new Key(button.value);
            print();
            staff();
        };
    })(button);
});

//Print newKey results
function print() {
    document.querySelector('#results').classList.add('active');
    document.querySelector('.card-title b').innerHTML = newKey.name + ' Major';
    document.querySelector('#scale').innerHTML = '' + newKey.pitches;
    document.querySelector('#modes').innerHTML = '<h4>Modes</h4> ' + newKey.modes;
    //document.querySelector('#chords').innerHTML = `<h4>Chords</h4> ${newKey.chords};
}

//Print Staff
function staff() {
    document.querySelector('.staff').classList.add('active');
    //reset de clase
    svgPaths.forEach(function (eachPath) {
        eachPath.setAttribute("class", "inactive");
    });
    //si el segundo caracter de la propiedad "accidentals" es "♭"
    if (newKey.accidentals != 0 && newKey.accidentals[0][1] === "♭") {
        for (var i = 0; i < svgPaths.length; i++) {
            //i+7 para brincarse lo 7 sostenidos del SVG
            svgPaths[i + 7].setAttribute("class", "active");
            if (i === newKey.accidentals.length - 1) {
                break;
            }
        }
    } else if (newKey.accidentals != 0 && newKey.accidentals[0][1] === "#") {
        for (var _i = 0; _i < svgPaths.length; _i++) {
            svgPaths[_i].setAttribute("class", "active");
            if (_i === newKey.accidentals.length - 1) {
                break;
            }
        }
    }
}
"use strict";

window.onload = init;

function init() {

  var list = document.querySelectorAll("ul.circle-container > li");

  for (var i = 0; i < list.length; i++) {
    (function (index) {
      list[index].onclick = function () {
        //llama a la funcion y le manda el indice
        action(index);
      };
    })(i);
  }

  function action(keySelected) {
    //reset
    list.forEach(function (elm) {
      elm.className = "inactive";
    });
    //clase 'key' a seleccion
    list[keySelected].className = "key";
    //reoganiza la lista para hacerla un ciclo
    if (keySelected == 0) {
      list[keySelected + 1].className = "dominant";
      list[list.length - 1].className = "subdominant";
    } else if (keySelected == list.length - 1) {
      list[keySelected - 1].className = "subdominant";
      list[0].className = "dominant";
    } else {
      list[keySelected - 1].className = "subdominant";
      list[keySelected + 1].className = "dominant";
    }
  }
}; //init()
//# sourceMappingURL=app.js.map
