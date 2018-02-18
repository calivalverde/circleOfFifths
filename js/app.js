const keysData = {
  allKeys: {
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
  },
  naturalNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  orderSharps: ['F', 'C', 'G', 'D', 'A', 'E'],
  orderFlats: ['B', 'E', 'A', 'D', 'G', 'C'],
  modesList: ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian']
}
//////////////////////////////////////////////////////
const handleClick = (e) => {
  let newKey = new Key(e.target.name, e.target.value)
  console.log(newKey.accidentals)
  console.log(newKey.scale)
}
//////////////////////////////////////////////////////

const ul = document.createElement('ul')

ul.setAttribute('class', 'circle-container z-depth-4');

Object.entries(keysData.allKeys).forEach(key => {
  const li = document.createElement('li')
  const button = document.createElement('button')
  button.setAttribute('name', key[0])
  button.setAttribute('value', key[1])
  button.innerText = key[0]
  button.addEventListener("click", handleClick)
  li.appendChild(button);
  ul.appendChild(li);
})

document.querySelector('#circle').appendChild(ul)

//////////////////////////////////////////////////////
class Key {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  get accidentals() {
    const keyValue = Number(this.value)
    if (keyValue === 0) {
      return []
    } 
    else if (keyValue > 0) {
      const accidentals = keysData.orderSharps
                            .slice(0, keyValue)
                            .map(acc => acc + '#')
      return accidentals
    } 
    else if (keyValue < 0) {
      const accidentals = keysData.orderFlats
                            .slice(0, Math.abs(keyValue))
                            .map(acc => acc + 'b')
      return accidentals
    }
  }
  get scale() {
    const key = this.name[0]
    const keyIndex = keysData.naturalNotes.indexOf(key)
    const pitchCollection = keysData.naturalNotes
                              .slice(keyIndex)
                              .concat(keysData.naturalNotes.slice(0, keyIndex))
    // crea nueva familia con notas y sus alteraciones respectivas
    const newFamily = pitchCollection.map(pitch => {
        for (let i = 0; i < this.accidentals.length; i++) {
            if (pitch === this.accidentals[i][0]) {
                return this.accidentals[i]
            }
        }
        return pitch
    })
    return newFamily
  }
}





