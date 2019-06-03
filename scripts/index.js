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
  	
	let n = 0;
	let numberClicked = 0;
  function starEvents(e) {
    currentElement = e.target.id;
		let starIndex = findIndex(currentElement);    
    
    levelText.textContent =  document.querySelector(`#${currentElement}`).alt;
		
		return starIndex;
  }
	
	function starClicked(eventType) {
		let numberClicked = starEvents(eventType); 
			for (let i = 1; i <= numberClicked; i++) {
				getStars[i].classList.remove('star');
				getStars[i].classList.add('yellow'); 
			}
		n > 0 ? 0 : n;
		n++;
		
		newSymbols(numberClicked);return numberClicked;
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
				
			if (n > 0) {
				
				}		
   });
  	
  star.addEventListener('click', starClicked, {once: true});
	
	return starEvents;
}


/* Creating new combination of captcha symbols on the screen */

function newSymbols(numberClicked) {
  let pos1 = document.querySelector('#symbol1');
	let pos2 = document.querySelector('#symbol2');
	let pos3 = document.querySelector('#symbol3');
	let pos4 = document.querySelector('#symbol4');
	let pos5 = document.querySelector('#symbol5');
	
	let symbolsArray = [pos1, pos2, pos3, pos4, pos5];
  let symbolString = [];
	
	// level is one number bigger than clicked star (index rules)
	let level = numberClicked + 1;
	
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
		
		// Impossible level
		if (level === 5) {
			let browserWidth = window.innerWidth;
			
			function FontChange(a, b) {
				let newFontSize = Math.floor(Math.random() * a) + b;
				symbolsArray[i].style.fontSize = `${newFontSize}px`;
				
				return newFontSize;
			}		
			
			if (browserWidth <= 480) {
				FontChange(20, 30); // new font size range 30-50 px
			}
			else if (480 < browserWidth <= 720) {
				FontChange(20, 40); // new font size range 40-60 px
			}
			else {
				FontChange(20, 50); // new font size range 50-70 px
			}
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