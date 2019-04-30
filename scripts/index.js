window.addEventListener('DOMContentLoaded', changeStars, false);
window.addEventListener('DOMContentLoaded', newSymbols, false);

function changeStars() {
  let index = 0; //default level, first star is yellow
  let textBox = document.getElementsByClassName('descr');
  let star = document.getElementsByClassName('levels')[index];
    
  let currentElement = null;
    
  var starSelected = false;
  var starHovered = false;  
  
  /* Get index of element from NodeList */
  function starIndex() {    
    var child = document.getElementById(`${currentElement}`);
    var parent = child.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    
    return index;
  }
  
  star.addEventListener('mouseover', function(e) {
    currentElement = e.target.id;
//    alert(`${currentElement}`);
    starIndex(currentElement);
    if (currentElement != null) {
      for(let i = 0; i < index; i++) {  document.getElementById(`star${i+1}`).src = '/Symbol_Star(color).png';
      }
    }
    starHovered = true;
  });
  

  star.addEventListener('click', function(e) {
    currentElement = e.target.id;
    let getStars = document.querySelectorAll('.levels > input[type=image]');
    
    function classChange() {
      starIndex(currentElement);
      let getClass = getStars[index].className;
      getClass = getStars[index].classList.add('yellow'); 
      alert(index);
      
      return getClass;
    }
        
    let newClasses = classChange(index, getStars);   
    
    
    
  }, {once: true});

  
      
  star.addEventListener('mouseout', function(e) {
    currentElement = e.target.id;
    starIndex(currentElement);
      if (starSelected == false) {
        for(let i = 1; i < index; i++) {
      document.getElementById(`star${i+1}`).src = '/Symbol_Star.png';
        }
      }
   },
//   {once: true}
  );
  
  star.addEventListener('mousemove', function(e) {
    currentElement = e.target.id;
    starIndex(currentElement);
//    alert(`${currentElement} , ${elem}`);
    if (starSelected == true) {
      star.onmousemove = false;
    }
   },
   {once: true}
  );
}

/**/
function newSymbols() {
  let pos1 = document.getElementById('symbol1');
	let pos2 = document.getElementById('symbol2');
	let pos3 = document.getElementById('symbol3');
	let pos4 = document.getElementById('symbol4');
	let pos5 = document.getElementById('symbol5');
	let symbolsArray = [pos1, pos2, pos3, pos4, pos5];
  let symbolString = [];
	
	for (let i = 0; i <= 4; i++) {
		let highLow = Math.random();
    
		// 50/50 chance for getting digit or letter
		if (highLow < 0.5) {
			let mySign = Math.ceil(Math.random() * 9 + 48); // digits only
      symbolsArray[i].innerHTML = `&#${mySign}`; symbolString.push(String.fromCharCode(mySign));
		} 
		else {
			let mySign = Math.ceil(Math.random() * 25 + 65); // Upper-case letters only	
      symbolsArray[i].innerHTML = `&#${mySign}`; symbolString.push(String.fromCharCode(mySign));
		}
		    
		let inputColor = ['pink', 'red', 'blue', 'green', 'cyan', 'darkblue', '#563412', '#d6db54'];
		let randomColor = Math.floor(Math.random() * 8);
		symbolsArray[i].style.color = `${inputColor[randomColor]}`;
		
/* Control presenting every symbol independently */
		let x = Math.floor(Math.random() * 10 + 15);
		let y = Math.floor(Math.random() * 5 + 10);
		let z = Math.floor(Math.random() * 20 - 10);
		symbolsArray[i].style.transform = `translate(${x}px,${y}px) rotate(${z}deg)`;    
	}
  
  return symbolsArray;	
}

/**/
function compareText(){
  let text = "";
  let onesign = document.getElementsByClassName("symbol");
  let inputText = document.getElementById("codearea").value;
  
  for(let a = 0; a <= 4; a++) { 
    text += onesign[a].innerText;
  }
    
  if(text == inputText) {
    alert("Okay");
  }
  else {
    alert("wrong");
  }
}

document.getElementById('update').addEventListener('click', newSymbols, false);
document.getElementById('btn').addEventListener('click', compareText, false);