import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import{showJoke} from './chuck.js';
import{showPics} from './pics.js';


// tehtävä 1
// import{showJoke} from './chuck.js';
// tehtävä 2
// import {showPics} from './pics.js';
// tehtävä 4
// import {showDiary} from './diary.js';


document.querySelector('#app').innerHTML = 'MAKKA PAKKA AKKA WAKKA IKKA AKKA OO!'

// haetaan nappula ja tarjotaan showJoke funktiolle
let element = document.querySelector('.chuck');
console.log(element);
showJoke(element);
showJoke(document.querySelector('.toinen'));

showPics(document.querySelector('.pics'));


// tehtävä 1
// showJoke(document.querySelector('.chuck'));
// tehtävä 2
// showPics(document.querySelector('.pics'));
// tehtvä 4
// showDiary(document.querySelector('.diary-area'));












// `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite! Täällä ollaan!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `