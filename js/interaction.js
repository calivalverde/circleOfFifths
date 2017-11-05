window.onload = init;

function init() {
  
  let list = document.querySelectorAll("ul.circle-container > li");

  for (let i = 0; i < list.length; i++) {
    (function(index) {
      list[index].onclick = function() {
        //llama a la funcion y le manda el indice
        action(index);
      };
    })(i);
  }

  function action(keySelected) {
    //reset
    list.forEach(function(elm) {
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

};//init()


