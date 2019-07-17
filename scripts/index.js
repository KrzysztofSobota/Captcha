'use strict'

window.addEventListener('DOMContentLoaded', changeStars, false);
window.addEventListener('DOMContentLoaded', newSymbols, false);

/* Change level of the game depending on user choice */

function changeStars() {
	/* Displaying level text inside blue box */
	const updateAltText = currentLevelIndex => {
		let levelText = document.querySelector('#level-text');
		
		levelText.textContent = document.querySelector(`#star${currentLevelIndex + 1}`).alt;
	}
	
	/* Captcha level number - default is 1 */
	const getNumber = str => Number(str.match(/\d+/)[0]) || 1;
	
	/* Star index is always one number lower than level number (indexing rules) */
	const getStarIndex = event => getNumber(event.target.id) - 1;
			
	const stars = document.querySelectorAll('.star');
	const img1 = "Symbol_Star(color).png";
	const img2 = "Symbol_Star.png";

	/* function imageChange() {
		
		stars[i].src = img1;

	} */

	const handleStarClick = event => {		
		/* FIRST - blocking mouseover and mouseout events
		after clicking any star by user */
		let starIndex = undefined;

		if (event.target.matches('#update')) {
			starIndex = 0;
			gameLevel.addEventListener('mouseover', highlightStars);
			gameLevel.addEventListener('mouseout', highlightStars);
		} 
		else if (event.target.matches('.star')) {
			starIndex = getStarIndex(event);
			gameLevel.removeEventListener('mouseover', highlightStars);
			gameLevel.removeEventListener('mouseout', highlightStars);
		}
		
		console.log(getStarIndex(event));
		/* SECOND - all chosen star are filled with yellow color */		
			for (let i = 1; i <= starIndex; i++) {				
				stars[i].src = img1;
			}

		/* THIRD - trigger newSymbols() function with parameter equal to chosen level */
		const levelNumber = starIndex + 1;		
		
		newSymbols(levelNumber);
	};


	const highlightStars = event => {
		let starIndex = getStarIndex(event);			
		updateAltText(starIndex);
		
			for (let i = 1; i <= starIndex; i++) {
				if (stars[i].src == img2) {
					stars[i].src = img1;
				}
				else {
					stars[i].src = img2;
				}
			}
	};

	/* Text inside blue box return to default ('Easy level') when mouse cursor leave any of star area */
	const behindStarArea = event => {
		let target = event.target.className;
		
		if (target === 'star' || target === 'stars') {
			updateAltText(0);			
		}
	};
		
	
	const gameLevel = document.querySelector('.game-level');
	gameLevel.addEventListener('mouseover', highlightStars);
	gameLevel.addEventListener('mouseout', highlightStars);
	gameLevel.addEventListener('click', handleStarClick, {once:true});
	gameLevel.addEventListener('mouseout', behindStarArea);

	const defaultLevel = () => {
		// let defaultNumber = getNumber('1');
			for (let i = 1; i <= 4; i++) {
				stars[i].src = img2;
			}
		
		updateAltText(0);
		newSymbols(1);
	};

	const resetBtn = document.querySelector('#update');
	resetBtn.addEventListener('click', defaultLevel);
	resetBtn.addEventListener('click', handleStarClick);
}

/*** Main array where symbols after  ***/
	let symbolsArray = [];

	for (let i = 1; i <= 5; i++) {
		symbolsArray.push(document.querySelector(`#symbol${i}`));
	}

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
		let symbolCode = undefined;
			for (let i = 0; i < symbolsArray.length; i++) {
				let digitLetter = Math.random();

				/* 'digitLetter' values are between two Math.random() ranges (0 < symbolTaken < 0.5 or 0.5 > symbolTaken > 1).
				This describes 50% chance for getting digit or letter every time. 'symbolCode' ranges 48-57 and 65-90 are for getting HTML charcode symbols (&#48-&#57 for digits and &#65-&#90 for letters) */
				digitLetter < 0.5 ? symbolCode = Math.ceil(Math.random() * 9 + 48) : symbolCode = Math.ceil(Math.random() * 25 + 65);

				/* Making a symbol from HTML character code and put it into an array */
				symbolsArray[i].innerHTML = `&#${symbolCode}`;
				symbolString.push(String.fromCharCode(symbolCode));
			}
	}

	function symbolColor() {
		let inputColor = ['#ff4d4d', 'red', 'blue', 'green', '#00cccc',
		 'darkblue', '#563412', '#ffff66', '#b3b300', '#34740b', '#660066', '#ffbf80'];
		for (let i = 0; i < symbolsArray.length; i++) {
			let randomColor = Math.floor(Math.random() * inputColor.length);
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
		for (let i = 0; i < symbolsArray.length; i++) {
			symbolsArray[i].style.fontSize = '4rem';
		}
	}

	

/* Creating new combination of captcha symbols on the screen */

function newSymbols(numberClicked) {
	/* New symbols with level 1 */
	resetAll();
	
	
	let level = numberClicked; // level is one number bigger than clicked star (index rules)
	console.log(`level = ${level}`);
	
	/* Normal level */
	if (level >= 2) {
		document.querySelector('.noise').style.backgroundImage = `url(/noise.svg)`;
	}

	for (let i = 0; i < symbolsArray.length; i++) {		

	/* Hard level */
		if (level >= 3) {
			symbolsArray[i].style.filter = `blur(5px)`;
		}

	/* Very hard level */
		if (level >= 4) {
			symbolsArray[i].style.transform = `rotateZ(180deg)`;
		}

	/* Impossible level */
		if (level === 5) {
			let browserWidth = window.innerWidth;

			function FontChange(a, b) {
				let newFontSize = Math.floor(Math.random() * a) + b;
				symbolsArray[i].style.fontSize = `${newFontSize}px`;

				return newFontSize;
			}

		/* New font size depends on recently screen width */
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

	for (let a = 0; a < onesign.length; a++) {
		text += onesign[a].innerText;
	}
	
/* Input area displays blue/red color after good/bad answer respectively */
	if (text == inputText) {
		answerArea.style.border = '1px solid rgb(5, 28, 97)';
		answerArea.style.backgroundColor = 'rgb(110, 144, 247)';
	} else {
		answerArea.style.border = '1px solid rgb(255, 0, 0)';
		answerArea.style.backgroundColor = 'rgb(219, 63, 63)';
	}
}

document.querySelector('#checkcode').addEventListener('click', compareText, false);