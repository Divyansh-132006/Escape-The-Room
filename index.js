let hasDoorKey = false;
let clueRevealed = false;
let safeUnlockedRoom1 = false;
let safeUnlockedRoom2 = false;
let clickcount = 0;
let currentRoom = 1;

let room1Code = Math.floor(100 + Math.random() * 900);
let room2Code = Math.floor(100 + Math.random() * 900);

const possibleKeySpots1 = ['locker', 'painting', 'bookself'];
const possibleKeySpots2 = ['pot', 'laptop', 'dror', 'key'];

const correctKeySpotRoom1 = possibleKeySpots1[Math.floor(Math.random() * possibleKeySpots1.length)];
const correctKeySpotRoom2 = possibleKeySpots2[Math.floor(Math.random() * possibleKeySpots2.length)];

console.log("Room 1 key is in:", correctKeySpotRoom1);
console.log("Room 2 key is in:", correctKeySpotRoom2);
console.log("Room 1 Code:", room1Code);
console.log("Room 2 Code:", room2Code);

let totalTime = 990;
const timerElement = document.getElementById('timer');

const countdown = setInterval(() => {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    timerElement.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (totalTime <= 0) {
        clearInterval(countdown);
        alert("Time's up! You failed to escape.");
        document.querySelectorAll('.click-area').forEach(el => el.style.pointerEvents = 'none');
    }

    totalTime--;
}, 1000);


document.querySelectorAll('.click-area').forEach(element => {
    element.addEventListener('click', () => {
        clickcount++;
        if (clickcount >= 12) {
            alert(" You lost! Max 12 clicks reached.");
            document.querySelectorAll('.click-area').forEach(el => el.style.pointerEvents = 'none');
        }
    });
});

document.getElementById('painting').onclick = () => {
    if (correctKeySpotRoom1 === 'painting') {
        alert(" You found the key behind the painting! A note falls on the ground but it is invisible.");
        clueRevealed = true;
        document.getElementById('clue').style.visibility = 'visible';
    } else {
        alert("Nothing behind the painting.");
    }
};

document.getElementById('bookself').onclick = () => {
    if (correctKeySpotRoom1 === 'bookself') {
        alert("✅ You found a key in the bookself!A note falls on the ground but it is invisible.");
        clueRevealed = true;
        document.getElementById('clue').style.visibility = 'visible';
    } else {
        alert("Nothing in the bookself.");
    }
};

document.getElementById('locker').onclick = () => {
    if (correctKeySpotRoom1 === 'locker') {
        alert("✅ You found the key inside theh locker! A note falls on the ground but it is invisible.");
        clueRevealed = true;
        document.getElementById('clue').style.visibility = 'visible';
    } else {
        alert("Locker is empty.");
    }
};

document.getElementById('clue').onclick = () => {
    if (clueRevealed) {
        alert(`📜 The note says: "Safe Code is ${room1Code}"`);
    }
};

document.getElementById('safe').onclick = () => {
    if (safeUnlockedRoom1) {
        alert("🗃️ You've already opened the safe.");
        return;
    }

    const code = prompt("Enter the safe code:");
    if (code === room1Code.toString()) {
        alert("🔓 Correct! You found the key to the door.");
        hasDoorKey = true;
        safeUnlockedRoom1 = true;
    } else {
        alert("❌ Wrong code.");
    }
};


document.getElementById('door').onclick = () => {
    if (currentRoom === 1) {
        if (hasDoorKey) {
            alert("🚪 You opened the door and entered Room 2.");
            document.getElementById('doorImage').src = "./images/room2.png?nocache=" + new Date().getTime();
            currentRoom = 2;
            hasDoorKey = false;
            clueRevealed = false;
            safeUnlockedRoom2 = false;
            document.getElementById('clue').style.visibility = 'hidden';
        } else {
            alert("🔐 The door is locked. Find the key.");
        }
    } else if (currentRoom === 2) {
        if (hasDoorKey) {
            alert("🎉 You escaped Room 2! Game completed.");
            document.getElementById('doorImage').src = "./images/uiimagedoor.png?nocache=" + new Date().getTime();
            document.querySelectorAll('.click-area').forEach(el => el.style.pointerEvents = 'none');
        } else {
            alert("Find the final key to escape.");
        }
    }
};


function checkRoom2Spot(id, name) {
    document.getElementById(id).onclick = () => {
        if (correctKeySpotRoom2 === id) {
            alert(`✅ You found the final key in the ${name}!` + room2Code);
            hasDoorKey = true;
        } else {
            alert(`Nothing in the ${name}. Keep searching.`);
        }
    };
}

checkRoom2Spot('pot', 'pot');
checkRoom2Spot('laptop', 'laptop');
checkRoom2Spot('dror', 'drawer');
checkRoom2Spot('key', 'key');


document.getElementById('saffe').onclick = () => {
    if (safeUnlockedRoom2) {
        alert("🗃️ Already unlocked.");
        return;
    }

    const code = prompt("Enter Room 2 safe code:");
    if (code === room2Code.toString()) {
        alert("🔓 Correct! You got the final key.");
        hasDoorKey = true;
        safeUnlockedRoom2 = true;
    } else {
        alert("❌ Wrong code.");
    }
};










// const clickAreas = [
//   { id: "door", top: 6.3, left: 8.96, width: 24.06, height: 52.13 },
//   { id: "bookself", top: 9.63, left: 69.95, width: 24.06, height: 48.15 },
//   { id: "safe", top: 33.7, left: 25.31, width: 4.43, height: 7.22 },
//   { id: "saffe", top: 60.56, left: 83.8, width: 4.38, height: 7.41 },
//   { id: "locker", top: 31.85, left: 50.0, width: 10.62, height: 11.11 },
//   { id: "laptop", top: 33.7, left: 35.16, width: 10.47, height: 9.26 },
//   { id: "dror", top: 45.56, left: 31.72, width: 11.41, height: 17.13 },
//   { id: "key", top: 39.72, left: 47.08, width: 7.14, height: 4.81 },
//   { id: "pot", top: 50.74, left: 64.53, width: 6.51, height: 9.17 },
//   { id: "painting", top: 9.81, left: 42.66, width: 19.01, height: 17.69 },
//   { id: "clue", top: 65.37, left: 70.05, width: 13.18, height: 7.04 }
// ];
// function positionClickAreas() {
//   const img = document.getElementById("doorImage");
//   const imgRect = img.getBoundingClientRect();

//   clickAreas.forEach(area => {
//     const el = document.getElementById(area.id);
//     el.style.position = "absolute";
//     el.style.top = `${imgRect.top + (area.top / 100) * imgRect.height}px`;
//     el.style.left = `${imgRect.left + (area.left / 100) * imgRect.width}px`;
//     el.style.width = `${(area.width / 100) * imgRect.width}px`;
//     el.style.height = `${(area.height / 100) * imgRect.height}px`;
//   });
// }

// window.addEventListener("load", positionClickAreas);
// window.addEventListener("resize", positionClickAreas);
