const words = ["Researcher", "Mentor", "Developer"];
let wordIndex = 0;
let letterIndex = 0;
const typingSpeed = 100; // Speed of typing
const erasingSpeed = 100; // Speed of erasing
const delayBetweenWords = 1000; // Delay before starting to erase
const typedWordsElement = document.getElementById("typed-words");

function type() {
  if (letterIndex < words[wordIndex].length) {
    typedWordsElement.textContent += words[wordIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenWords);
  }
}

function erase() {
  if (letterIndex > 0) {
    typedWordsElement.textContent = words[wordIndex].substring(
      0,
      letterIndex - 1
    );
    letterIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, typingSpeed);
  }
}

// Start the typing effect
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, typingSpeed);
});
