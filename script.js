const typingText = document.querySelector(".typing-text p"),
inpField =document.querySelector(".wrapper .input-field"),
mistakeTag = document.querySelector(".mistake span"),
atbcontent= document.querySelector('.atb b'),
timeTag=document.querySelector(".time span b"),
wpmTag=document.querySelector(".wpm span"),
accTag=document.querySelector(".acc span "),
tryAgainBtn= document.querySelector("button");

let timer,
maxTime=60,
timeLeft =maxTime,
charIndex =mistakes= isTyping = 0;

function randomParagraph(){
	let randIndex = Math.floor(Math.random() * paragraphs.length);
	typingText.innerHTML="";
	paragraphs[randIndex].split("").forEach(span => {
		let spanTag = `<span>${span}</span>`;
		typingText.innerHTML += spanTag;
	});
	typingText.querySelectorAll("span")[0].classList.add("active");

		document.addEventListener("keydown",() => inpField.focus());
		document.addEventListener("click",() => inpField.focus());

}

function initTyping(){
	const characters = typingText.querySelectorAll("span");
	let typedChar = inpField.value.split("")[charIndex];
	if(charIndex < characters.length -1 && timeLeft>0){
		if(!isTyping){
			timer = setInterval(initTimer,1000);
			isTyping =true;
		}
		
		if(typedChar==null){
			charIndex--;
			if(characters[charIndex].classList.contains("incorrect")){
				mistakes--;
			}
			characters[charIndex].classList.remove("correct", "incorrect");
		}
		else{
			if(characters[charIndex].innerText === typedChar){
				characters[charIndex].classList.add("correct");
			} 
			else{
				mistakes++;
				characters[charIndex].classList.add("incorrect");	
			}
			charIndex++;
		}
		
		characters.forEach(span => span.classList.remove("active"))
		characters[charIndex].classList.add("active");
	
		let wpm = Math.round((((charIndex - mistakes) / 5)/ (maxTime - timeLeft)) * 60)  ;
		wpm= wpm < 0 || !wpm || wpm === Infinity ? 0:wpm ;
		let acc = Math.round((((charIndex ) - mistakes) /(charIndex) ) * 100);
		mistakeTag.innerText =mistakes; 
		wpmTag.innerText =wpm;
		accTag.innerText =acc;
	}else{
		inpField.value="";
		clearInterval(timer);
	}
}

function initTimer(){
	
	 if( timeLeft >= 0) {
		timeLeft--;
		timeTag.innerText =timeLeft;
		
		if(timeLeft > 0){
			atbcontent.textContent ='Type Here...All The Best!!';
		}
		else{
			atbcontent.classList.add("timesup");
			atbcontent.textContent ='Time\u0027s Up!!';
		}
	} 


	
	else  {
		
			
			clearInterval(timer);
		
		
		
		
	}
	
}

function resetGame() {
	randomParagraph();
	inpField.value = "";
	clearInterval(timer);
	timeLeft=maxTime;
	charIndex=mistakes=isTyping=0;
	timeTag.innerText=timeLeft;
	mistakeTag.innerText =mistakes; 
	wpmTag.innerText =0;
	accTag.innerText =100;
	atbcontent.textContent ='Type Here...All The Best!!';
	atbcontent.classList.remove("timesup");
}

randomParagraph();
inpField.addEventListener("input",initTyping);
tryAgainBtn.addEventListener("click",resetGame);
