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
		/* FIRST - blocking possibility to change any star behaviour from mouseover and mouseout events */
		gameLevel.removeEventListener('mouseover', highlightStars);
		gameLevel.removeEventListener('mouseout', highlightStars);
		
		/* SECOND - making all needed star with yellow color */
		const stars = document.querySelectorAll('.star');
		for (let i = 0; i <= getStarIndex(event); i++) {
			stars[i].classList.add('yellow');
		}

		/* THIRD - trigger newSymbols() function with parameter equal to chosen level (star) */
		const levelNumber = getNumber(event.target.id);
		
		newSymbols(levelNumber);
	};

	const highlightStars = event => {
		const starIndex = getStarIndex(event);
		updateAltText(starIndex);
		for (let i = 1; i <= starIndex; i++) {
			const star = document.querySelector(`#star${i + 1}`);
			star.classList.toggle('yellow');
		}
	};

	const behindArea = event => {
		let target = event.target.className;
		
		if (target === 'star' || target === 'stars') {
//			updateAltText(0);
		}
	};
	
//	document.addEventListener("mouseover", behindArea);
	
	
	 // update current level text updateAltText(0);
	const gameLevel = document.querySelector('.game-level');
	gameLevel.addEventListener("mouseover", highlightStars);
	gameLevel.addEventListener("mouseout", highlightStars);
	gameLevel.addEventListener('click', handleStarClick, {once: true});
	gameLevel.addEventListener("mouseout", behindArea);
}

	const pos1 = document.querySelector('#symbol1');
	const pos2 = document.querySelector('#symbol2');
	const pos3 = document.querySelector('#symbol3');
	const pos4 = document.querySelector('#symbol4');
	const pos5 = document.querySelector('#symbol5');
			
	let symbolsArray = [pos1, pos2, pos3, pos4, pos5];
	let symbolString = [];

	function resetAll() {
		symbolGet();
		
		/* Return all symbols to default level 1 (after using reset button) */
		document.querySelector('.noise').style.backgroundImage = '';
		symbolColor();
		symbolTransform();
		filterRemove();
		symbolFontsize();
	};
  
/* Randomizing symbols and display them on the captcha screen */
	function symbolGet() {
		for (let i = 0; i < symbolsArray.length; i++) {
			let highLow = Math.random();
			let symbolCode = undefined;

			/* 'highLow' values (< 0.5 or > 0.5) in Math.random() ranges describes 50% chance for getting digit or letter every time. 'symbolCode' ranges 48-57 and 65-90 are for getting HTML charcode symbols (&#48-&#57 for digits and &#65-&#90 for letters) */
			highLow < 0.5 ? symbolCode = Math.ceil(Math.random() * 9 + 48) : symbolCode = Math.ceil(Math.random() * 25 + 65);

			/* 'innerHTML' instead 'textContent', because only 'innerHTML' generates proper string form on output */
			symbolsArray[i].innerHTML = `&#${symbolCode}`;
			symbolString.push(String.fromCharCode(symbolCode));
		}		
	}

	function symbolColor() {
		for (let i = 0; i < symbolsArray.length; i++) {
				let inputColor = ['pink', 'red', 'blue', 'green', 'cyan', 'darkblue', '#563412', '#d6db54'];
				let randomColor = Math.floor(Math.random() * 8);
				symbolsArray[i].style.color = `${inputColor[randomColor]}`;
		}	
	}

	function symbolTransform() {
		for (let i = 0; i < symbolsArray.length; i++) {
				/* Transforming every symbol independently */
				let x = Math.floor(Math.random() * 10 + 15);
				let y = Math.floor(Math.random() * 5 + 10);
				let z = Math.floor(Math.random() * 20 - 10);
				symbolsArray[i].style.transform = `translate(${x}px,${y}px) rotate(${z}deg)`;
		}	
	}

	function filterRemove() {
		for (let i = 0; i < symbolsArray.length; i++) {
			symbolsArray[i].style.filter = 'blur(0px)';
		}	
	}

	function symbolFontsize() {
		for (let i = 1; i <= symbolsArray.length; i++) {
			symbolsArray[i].style.fontSize = '60px';
		}
	}

	const resetBtn = document.querySelector('#update');
	resetBtn.addEventListener('click', resetAll, false);

/* Creating new combination of captcha symbols on the screen */

function newSymbols(numberClicked) {
	/* New symbols with level 1 (after using any star) */
	symbolGet();
	symbolColor();
	symbolTransform();
	
	// level is one number bigger than clicked star (index rules)
	let level = numberClicked;
	console.log(`lvl - ${level}`);
	
	// Normal level
	if (level >= 2) {
		document.querySelector('.noise').style.backgroundImage = `url(/noise.svg)`;
	}

	for (let i = 0; i < symbolsArray.length; i++) {		

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

document.querySelector('#checkcode').addEventListener('click', compareText, false);