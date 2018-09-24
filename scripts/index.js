window.addEventListener('DOMContentLoaded', newSymbols, false);

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
			let mySign = Math.ceil(Math.random() * 9 + 48); // digits
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