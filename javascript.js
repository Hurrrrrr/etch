"use strict";

// Variables to store user input and validate it
let myInput = 0;
let isValid = false;
const regex = /^\d{1,3}$/;

// Prompt the user for a valid grid size
do {
    myInput = prompt("Enter grid size");
    isValid = validateInput(myInput);
} while (!isValid)

const grid = parseInt(myInput);
const myScale = 960 / grid;

makeGrid(grid);



function makeGrid(scale) {
    const squaresWrap = document.querySelector('#squaresWrap');

    // Create <scale> columns
    for (let i = 0; i < scale; i++) {
        const colWrap = document.createElement('div');
        colWrap.classList.add('colWrap');
        squaresWrap.appendChild(colWrap);

        // Create <scale> squares in one column on each iteration
        for (let j = 0; j < scale; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            colWrap.appendChild(square);
            square.addEventListener("mouseenter", changeColor);
            square.style.height = myScale + "px";
            square.style.width = myScale + "px";
        }
    }


}

function changeColor(e) {
    e.target.classList.add('etched');
}

function validateInput(uInput) {
    if (!regex.test(uInput)) {
        alert("Please enter an integer between 1 and 100");
        return false;
    }

    if ((uInput < 1) || (uInput > 100)) {
        alert("Please enter an integer between 1 and 100");
        return false;
    }

    return true;
}


/*

The callback function of addEventListener has an event argument
that you could use to receive relative info. You could use that
to receive the node which that event trigged on. IF you don't
remember how, reread Event section of the DOM lesson could be helpful





snaitseb — Today at 5:43 PM
Almost! Check  this out:
*{
  box-sizing: border-box;
}

That will fix that small space issue, it's just your borders tripping. 
Good job, nonetheless. Columns are not necessary per se but you can use them if you want. In a 10x10 grid you can have 10 columns of 10 rows each, for example.
hurrrrrr — Today at 5:44 PM
Thanks, I'd forgotten about that
snaitseb — Today at 5:45 PM
The important part here is the CSS. Since you had columns of height 960px and you had to add two rows, you did 960/2, that is 480px for the size of the squares
meaning that your container size divided by number of squares per row/column will give you your box size, right?
hurrrrrr — Today at 5:46 PM
Yeah
snaitseb — Today at 5:47 PM
now you can create for example 100 divs and size them accordingly in JS, if you want rows inside columns you can do loop inside loop, for example
avoid arrays really for now, they are not necessary
hurrrrrr — Today at 5:49 PM
So that's what I'm trying to do. But what's happening is that my squares are all ending up in the first column. I would like iteration N of my code to add elements to column N, but instead they're all ending up in column 0
snaitseb — Today at 5:49 PM
did you create a nested loop?
hurrrrrr — Today at 5:51 PM
Here is my JS in its entirety, with the grid size arbitrarily set to 5:
"use strict";

const GRID = 5;

makeGrid(GRID);

// Make <scale> columns which will be filled with the individual grid squares
function makeGridCol(scale) {
    const squaresWrap = document.querySelector('#squaresWrap');

    for (let i = 0; i < scale; i++) {
        const colWrap = document.createElement('span');
        colWrap.classList.add('colWrap');
    
        squaresWrap.appendChild(colWrap);
        makeSquare(scale);
    }
}

// Make a square
function makeSquare(quantity) {
    const colWrap = document.querySelector('.colWrap');

    for (let i = 0; i < quantity; i++) {
        const square = document.createElement('span');
        square.classList.add('square');
    
        colWrap.appendChild(square);
    }
}

// Make the grid of <size> squares
function makeGrid(size) {
    makeGridCol(size);
}
hurrrrrr — Today at 5:53 PM
So makeSquare() is nested inside of makeGridCol() which I believe should function as a loop nested inside of a loop
snaitseb — Today at 5:53 PM
hmm I find this to be quite complicated to look at, want me to help you simplify it?
hurrrrrr — Today at 5:53 PM
Please
snaitseb — Today at 5:59 PM
for (let i = 0; i < amount; i++) {
        const col = document.createElement('div');
        col.classList.add('col');
        for (let j = 1; j < amount; j++){
          const square = document.createElement('div');
          square.classList.add('square');
        }
    }
I will let you figure out where/how to append, and where to put this code, but that right there creates amount * amount of divs
to understand it in 3x3:
//loop of x3 i's
i i i
j j j
j j j
// 2 j's each, creates 3x3
hurrrrrr — Today at 6:04 PM
As far I know my code is functionally identical to that, I'm just using a separate function instead of your second loop. But if yours works, I have a bug in mine for sure. I'll look into this, I really appreciate your help @snaitseb ++
odin-bot
BOT
 — Today at 6:04 PM
Woot! @snaitseb now has 180 points
snaitseb — Today at 6:04 PM
thinking about it though, you did it a bit different, didn't you? js inside is columns that simply act as containers? in that case you want your inner loop to start at j = 0 and append those j into i, although that is not necessary, it's also doable in that style
hurrrrrr — Today at 6:05 PM
Wait do I have to use a different iteration variable for both function X and function Y if I pass function Y into function X?
snaitseb — Today at 6:06 PM
you can do it in a single function 💪
it will be simpler, as if you do it in another function, how will you select the current column every time? if you have one loop inside another, for example j inside i, you can always select columns[i]
to know where to append j boxes
for example in the code you shared:
 const colWrap = document.querySelector('.colWrap');

this will select the first column every time 
hurrrrrr — Today at 6:16 PM
Can you elaborate a little more about selecting for column[i]? Because that's what I'd like to be able to do but I have no idea how. All the column divs I create are identical, no? Or is there a way to create them with unique indexes or names that I can iterate over?
snaitseb — Today at 6:21 PM
yes, something like this:
let columns = container.querySelectorAll(".col");
//some code
columns[i].append(square);

can you figure out where I'd put these lines?
I have to admit I did say let's avoid arrays before 😅 I requested the 2x2 exercise before cause I didn't think you'd do it through columns as containers, but we can do it.
hurrrrrr — Today at 6:28 PM
Ah okay that looks very promising. I need to make dinner now but I think I'll be able to make progress with what you've shown me. Thanks again for your time
snaitseb — Today at 6:30 PM
Cool! I liked your take on doing it that way, it's kinda unique, will allow you to add fun stuff like drawing in 1 grid changes the entire column type of function and stuff like that if you wanted to take your project the extra mile :finger_gun:
hurrrrrr — Today at 6:33 PM
Haha that sounds like a very polite way of saying that I'm making this more complicated that it needs to be 😅
*/