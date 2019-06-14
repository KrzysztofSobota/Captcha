'use strict'

window.addEventListener('DOMContentLoaded', changeStars, false);
window.addEventListener('DOMContentLoaded', newSymbols, false);

/* Change level of the game depending on user choice */

function changeStars() {
	/*  */
	const updateAltText = currentLevelIndex => {
		let levelText = document.querySelector('#level-text');
		/* 'currentLevelIndex + 1' replaces event 'currentElement' */
		levelText.textContent = document.querySelector(`#star${currentLevelIndex + 1}`).alt;
	}
	
	/* Level number - default is 1 */
	const getNumber = str => Number(str.match(/\d+/)[0]) || 1;
	
	/* Star index is always one number lower than level number (indexing rules) */
	const getStarIndex = event => getNumber(event.target.id) - 1;
	
	let stars = document.querySelectorAll('.star');
	
	const handleStarClick = event => {
		/* FIRST - blocking possibility to change star behaviour by mouse events */
		gameLevel.removeEventListener('mouseover', highlightStars);
		gameLevel.removeEventListener('mouseout', highlightStars);
		
		/* SECOND - making all needed star with yellow color */
		const stars = document.querySelectorAll('.star');
		for (let i = 0; i <= getStarIndex(event); i++) {
			stars[i].classList.add('yellow');
		}

		/* THIRD - trigger newSymbols() function with chosen level (star) */
		const levelNumber = getNumber(event.target.id);
		
		newSymbols(levelNumber);
	};

	const highlightStars = event => {
		const starIndex = getStarIndex(event);
		updateAltText(starIndex);
		for (let i = 0; i <= starIndex; i++) {
			const star = document.querySelector(`#star${i + 1}`);
			star.classList.toggle('yellow');
		}
	};

	const behindArea = (event) => {
		let target = event.target.className;
		getStarIndex
		if (target === 'star' || target === 'stars') {
			updateAltText(0);
		}
	};
	
	document.addEventListener("mouseout", behindArea);
	
	updateAltText(0); // update current level text
	const gameLevel = document.querySelector('.game-level');
	gameLevel.addEventListener("mouseover", highlightStars);
	gameLevel.addEventListener("mouseout", highlightStars);
	gameLevel.addEventListener('click', handleStarClick, {once: true});
}


/* Creating new combination of captcha symbols on the screen */

function newSymbols(numberClicked) {
	const pos1 = document.querySelector('#symbol1');
	const pos2 = document.querySelector('#symbol2');
	const pos3 = document.querySelector('#symbol3');
	const pos4 = document.querySelector('#symbol4');
	const pos5 = document.querySelector('#symbol5');

	let symbolsArray = [pos1, pos2, pos3, pos4, pos5];
	let symbolString = [];

	for (let i = 0; i < symbolsArray.length; i++) {
		symbolsArray[i].removeAttribute('backgroundImage');
		symbolsArray[i].removeAttribute('filter');
		symbolsArray[i].removeAttribute('transform');
		symbolsArray[i].removeAttribute('fontSize');
	}

	// level is one number bigger than clicked star (index rules)
	let level = numberClicked;
console.log(`lvl - ${level}`);
	// Normal level
	if (level >= 2) {
		document.querySelector('.noise').style.backgroundImage = `url(/noise.svg)`;
	}

	for (let i = 0; i < symbolsArray.length; i++) {
		let highLow = Math.random();

		// 50/50 chance for getting digit or letter
		if (highLow < 0.5) {
			let mySign = Math.ceil(Math.random() * 9 + 48); // digits only
			symbolsArray[i].innerHTML = `&#${mySign}`;
			symbolString.push(String.fromCharCode(mySign));
		} else {
			let mySign = Math.ceil(Math.random() * 25 + 65); // Upper-case letters only	
			symbolsArray[i].innerHTML = `&#${mySign}`;
			symbolString.push(String.fromCharCode(mySign));
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
			} else if (480 < browserWidth <= 720) {
				FontChange(20, 40); // new font size range 40-60 px
			} else {
				FontChange(20, 50); // new font size range 50-70 px
			}
		}
	}

	return symbolsArray;
}

/* Checking if input text is exactly the same as generated captcha code (game is case-sensitive!) */
function compareText() {
	let text = "";
	let onesign = document.querySelectorAll('.symbol');
	let answerArea = document.querySelector('#writecode');
	let inputText = answerArea.value;

	for (let a = 0; a <= 4; a++) {
		text += onesign[a].innerText;
	}

	if (text == inputText) {
		alert('Great job !!!');
	} else {
		answerArea.style.border = 'thin solid #ff0000';
		answerArea.style.backgroundColor = 'rgba(219, 63, 63, 0.92)';
	}
}

function resetAll() {
	document.querySelector('.noise').removeAttribute('backgroundImage');

	for (let i = 1; i <= 5; i++) {
		document.querySelector(`#symbol${i}`).removeAttribute('filter');
		document.querySelector(`#symbol${i}`).removeAttribute('transform');
		document.querySelector(`#symbol${i}`).removeAttribute('fontSize');
	}
}

document.querySelector('#update').addEventListener('click', resetAll, false);

document.querySelector('#checkcode').addEventListener('click', compareText, false);
