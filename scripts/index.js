'use strict'

window.addEventListener('DOMContentLoaded', changeStars, false);
window.addEventListener('DOMContentLoaded', newSymbols, false);

/* Change level of the game depending on user choice */

function changeStars() {
  let defaultIndex = 0; //default level, first star is always yellow
  var star = document.querySelectorAll('.game-level')[defaultIndex];
    
  let currentElement = undefined;
	
  /* Get index of element from NodeList */
  function findIndex() {    
    let child = document.getElementById(`${currentElement}`);
    let parent = child.parentNode;
    let starNumber = Array.prototype.indexOf.call(parent.children, child);
    
    return starNumber;
  }
  
  let getStars = document.querySelectorAll('.star');
  let levelText = document.querySelector('#level-text');
  	
	let eventType = function(e) {
		return e.type;
	};
	
  function starEvents(e) {
    currentElement = e.target.id;
		let starIndex = findIndex(currentElement);    
    
    levelText.textContent =  document.querySelector(`#${currentElement}`).alt;
		
		return starIndex;
  }
	
	let starClicked = function(eventType) {
		let starNumber = starEvents(eventType);
			 for (let i = 1; i <= starNumber; i++) {
				 getStars[i].classList.add('yellow');
			 }

		return starNumber;
	};
	
  star.addEventListener('mouseover', function(e) {
		let starNumber = starEvents(e);
			 for (let i = 0; i <= starNumber; i++) {    document.querySelector(`#star${i+1}`).src = '/Symbol_Star(color).png';
			 }			
  });
  
  star.addEventListener('mouseout', function(e) {
    let starNumber = starEvents(e);
       for (let i = 1; i <= starNumber; i++) {
        document.querySelector(`#star${i+1}`).src = '/Symbol_Star.png';
       }
     		
			if (eventType = 'click') {
				
			}
   });
  	
  star.addEventListener('click', starClicked, {once: true});
	
	return starEvents;
}


/* Creating new combination of captcha symbols on the screen */

function newSymbols() {
  let pos1 = document.querySelector('#symbol1');
	let pos2 = document.querySelector('#symbol2');
	let pos3 = document.querySelector('#symbol3');
	let pos4 = document.querySelector('#symbol4');
	let pos5 = document.querySelector('#symbol5');
	let symbolsArray = [pos1, pos2, pos3, pos4, pos5];
  let symbolString = [];
	
	
	let level = undefined;
	
		// Normal level
		if (level >= 2) {
			document.querySelector('.noise').style.backgroundImage = `url(/noise.svg)`;
		}
	
	for (let i = 0; i < symbolsArray.length; i++) {
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
		
		// Hard level
		if (level >= 3) {
			symbolsArray[i].style.filter = `blur(5px)`;
		}
		
		// Very hard level
		if (level >= 4) {
			symbolsArray[i].style.transform = `rotateZ(180deg)`;
		}
		
		// Impossible level - 'p' is a perspective value
		if (level >= 5) {
			let p = Math.floor(Math.random() * 100 + 100);
			document.querySelector('.captcha').style.perspective = `${p}px`;
			document.querySelector('.final-code').style.transformStyle = `preserve-3d`;    document.querySelector('.final-code').style.transform = `rotateX(15deg) rotateY(-10deg)`;
		}
	}
		
  
  return symbolsArray;	
}

/* Checking if input text is exactly the same as generated captcha code (game is case-sensitive!) */
function compareText(){
  let text = "";
  let onesign = document.querySelectorAll('.symbol');
	let answerArea = document.querySelector('#writecode');
  let inputText = answerArea.value;
  
  for(let a = 0; a <= 4; a++) { 
    text += onesign[a].innerText;
  }
    
  if(text == inputText) {
    alert('Great job !!!');
  }
  else {
		answerArea.style.border = '4px solid #ff0000';
		answerArea.style.backgroundColor = 'rgba(219, 63, 63, 0.92)';
  }
}

document.querySelector('#update').addEventListener('click', newSymbols, false);
document.querySelector('#checkcode').addEventListener('click', compareText, false);