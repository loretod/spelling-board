let alphabet = document.getElementById('alphabet');
let blend_div = document.getElementById('blends');
let board = document.getElementById('board');
let trash = document.getElementById('trash');

// Speech to text functionality
const synth = window.speechSynthesis;

// Generate the lists of letters and blends, function to add properties to each letter, add the letters to the Source Div
const letters = [
  { text: 'a', class: 'grid-square letter vowel p-2', id: 'a' },
  { text: 'b', class: 'grid-square letter consonant p-2', id: 'b' },
  { text: 'c', class: 'grid-square letter consonant p-2', id:'c' },
  { text: 'd', class: 'grid-square letter consonant p-2', id:'d' },
  { text: 'e', class: 'grid-square letter vowel p-2', id:'e' },
  { text: 'f', class: 'grid-square letter consonant p-2', id:'f' },
  { text: 'g', class: 'grid-square letter consonant p-2', id:'g' },
  { text: 'h', class: 'grid-square letter consonant p-2', id:'h' },
  { text: 'i', class: 'grid-square letter vowel p-2', id:'i' },
  { text: 'j', class: 'grid-square letter consonant p-2', id:'j' },
  { text: 'k', class: 'grid-square letter consonant p-2', id:'k' },
  { text: 'l', class: 'grid-square letter consonant p-2', id:'l' },
  { text: 'm', class: 'grid-square letter consonant p-2', id:'m' },
  { text: 'n', class: 'grid-square letter consonant p-2', id:'n' },
  { text: 'o', class: 'grid-square letter vowel p-2', id:'o' },
  { text: 'p', class: 'grid-square letter consonant p-2', id:'p' },
  { text: 'q', class: 'grid-square letter consonant p-2', id:'q' },
  { text: 'r', class: 'grid-square letter consonant p-2', id:'r' },
  { text: 's', class: 'grid-square letter consonant p-2', id:'s' },
  { text: 't', class: 'grid-square letter consonant p-2', id:'t' },
  { text: 'u', class: 'grid-square letter vowel p-2', id:'u' },
  { text: 'v', class: 'grid-square letter consonant p-2', id:'v' },
  { text: 'w', class: 'grid-square letter consonant p-2', id:'w' },
  { text: 'x', class: 'grid-square letter consonant p-2', id:'x' },
  { text: 'y', class: 'grid-square letter vowel p-2', id:'y' },
  { text: 'z', class: 'grid-square letter consonant p-2', id:'z' },
];

const blends = [
  { text: 'th', class: 'grid-square blend p-2', id: 'th' },
  { text: 'ch', class: 'grid-square blend p-2', id: 'ch' },
  { text: 'sh', class: 'grid-square blend p-2', id:'sh' },
  { text: 'wh', class: 'grid-square blend p-2', id:'wh' },
  { text: 'ck', class: 'grid-square blend p-2', id:'ck' },
];

// Function to create draggable items
function createDraggableItem(item) {
  const draggable = document.createElement('div');
  draggable.textContent = item.text;
  draggable.setAttribute('id', item.id); // Add id property from the items dictionary
  draggable.className = `draggable ${item.class}`;
  draggable.draggable = true;
  draggable.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', item.class);
    event.dataTransfer.setData('text/plain', item.text);
    onDragStart(event);
  });
  return draggable;
}

// Function to clear the board on button click
function clearBoard(){
  board.innerHTML="";
}

// Temporary function to test the tts functionality of the letters on the screen
function readBoard(){
  const targetDivs = document.querySelectorAll('.active'); // Replace with your selector
  let concatenatedText = '';
  for (const div of targetDivs) {
    concatenatedText += div.innerText;
  }
  console.log(concatenatedText);
  const utterThis = new SpeechSynthesisUtterance(concatenatedText);
  synth.speak(utterThis);
}
// Append draggableItem to the div with class 'example-draggable'
letters.forEach((item) => {
  const draggableItem = createDraggableItem(item);
  const exampleDraggable = document.querySelector('#alphabet');
  exampleDraggable.appendChild(draggableItem);
});

blends.forEach((item) => {
  const draggableItem = createDraggableItem(item);
  const exampleDraggable = document.querySelector('#blends');
  exampleDraggable.appendChild(draggableItem);
});

// Defines the functionality of each drag and drop area
let alphabet_list = Sortable.create(alphabet, {
  animation: 150,
  group: {
    name: 'shared',
    pull: 'clone', // To clone: set pull to 'clone'
    put: false,
  },
  ghostClass: 'sortable-ghost',
  sort: false,
});

let blends_list = Sortable.create(blend_div, {
  animation: 150,
  group: {
    name: 'shared',
    pull: 'clone', // To clone: set pull to 'clone'
    put: false,
  },
  ghostClass: 'sortable-ghost',
  sort: false,
});

let board_list = Sortable.create(board, {
  animation: 150,
  group: 'shared',
  ghostClass: 'sortable-ghost',
  sort: true,
  direction: 'horizontal',
  onAdd: function(evt){
    evt.item.classList.add("active");
  },
  onChange: function(){
    readBoard();
  }
});

let trash_list = Sortable.create(trash, {
  animation: 150,
  group: 'shared',
  ghostClass: 'sortable-ghost',
  onAdd: function(evt){
    trash.innerHTML="";
  },
});
