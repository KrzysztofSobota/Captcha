'use strict'

window.addEventListener('DOMContentLoaded', changeStars, false);
window.addEventListener('DOMContentLoaded', newSymbols, false);

/* Change level of the game depending on user choice */

function changeStars() {
  let defaultIndex = 0; //default level, first star is always yellow
  let captchaLvl = document.querySelector('#optionsbox');
  let star = document.querySelectorAll('.stars_level')[defaultIndex];
    
  let currentElement = undefined;
  let starSelected = false;
  let starHovered = false;  
  
  /* Get index of element from NodeList */
  function findIndex() {    
    let child = document.getElementById(`${currentElement}`);
    let parent = child.parentNode;
    let starNumber = Array.prototype.indexOf.call(parent.children, child);
    
    return starNumber;
  }
  
  
  star.addEventListener('mouseover', function(e) {
    currentElement = e.target.id;
    let starIndex = findIndex(currentElement);
    
    if (currentElement != null) {
      for (let i = 1; i < starIndex; i++) {  document.querySelector(`#star${i+1}`).src = '/Symbol_Star(color).png';
      }
    }
    starHovered = true;
  });
  

  star.addEventListener('click', function(e) {
    currentElement = e.target.id;
    let starIndex = findIndex(currentElement);
    let getStars = document.querySelectorAll('.stars_level > input[type=image]');
    
    function classChange() {
      starIndex(currentElement);
      let getClass = getStars[starIndex].className;
      getClass = getStars[starIndex].classList.add('yellow'); 
            
      return getClass;
    }
        
    let newClasses = classChange(index, getStars);
  }, {once: true});
  
    
  star.addEventListener('mouseout', function(e) {
    currentElement = e.target.id;
    let starIndex = findIndex(currentElement);
      if (starSelected == false) {
        for(let i = 1; i < starIndex; i++) {
      document.querySelector(`#star${i+1}`).src = '/Symbol_Star.png';
        }
      }
   },
//   {once: true}
  );
  
  star.addEventListener('mousemove', function(e) {
    currentElement = e.target.id;
    let starIndex = findIndex(currentElement);
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
  let pos1 = document.querySelector('#symbol1');
	let pos2 = document.querySelector('#symbol2');
	let pos3 = document.querySelector('#symbol3');
	let pos4 = document.querySelector('#symbol4');
	let pos5 = document.querySelector('#symbol5');
	let symbolsArray = [pos1, pos2, pos3, pos4, pos5];
  let symbolString = [];
	
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

    // Normal level
  document.querySelector('.noise').style.backgroundImage = `url(/noise.svg)`;
    
    // Hard level
    symbolsArray[i].style.filter = `blur(5px)`;
    
    // Very hard level
    symbolsArray[i].style.transform = `rotateZ(180deg)`;
    
    /* Impossible level - 'p' is a perspective value */
    let p = Math.floor(Math.random() * 100 + 100);
    document.querySelector('.captcha').style.perspective = `${p}px`;    document.querySelector('.final_code').style.transformStyle = `preserve-3d`;    document.querySelector('.final_code').style.transform = `rotateX(15deg) rotateY(-10deg)`;
	}
  
  return symbolsArray;	
}

/**/
function compareText(){
  let text = "";
  let onesign = document.querySelectorAll('.symbol');
  let inputText = document.querySelector('#codearea').value;
  
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

document.querySelector('#update').addEventListener('click', newSymbols, false);
document.querySelector('#btn').addEventListener('click', compareText, false);