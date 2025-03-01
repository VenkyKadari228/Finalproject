let currentRotationY = 0; // Start closed
let isDragging = false;
let previousX = 0;

const book = document.getElementById('book');

function turnPage(currentPageId, nextPageId) {
    console.log(`Turning from ${currentPageId} to ${nextPageId}`);
    const currentPage = document.getElementById(currentPageId);
    const nextPage = document.getElementById(nextPageId);

    if (!currentPage || !nextPage) {
        console.error('Page not found:', currentPageId, nextPageId);
        return;
    }

    currentPage.classList.add('flip');
    setTimeout(() => {
        currentPage.style.display = 'none';
        nextPage.style.display = 'block';
        currentPage.classList.remove('flip');
        nextPage.style.zIndex = parseInt(currentPage.style.zIndex || 1) + 1;
    }, 1000);
}

function turnPageBack(currentPageId, prevPageId) {
    console.log(`Turning back from ${currentPageId} to ${prevPageId}`);
    const currentPage = document.getElementById(currentPageId);
    const prevPage = document.getElementById(prevPageId);

    if (!currentPage || !prevPage) {
        console.error('Page not found:', currentPageId, prevPageId);
        return;
    }

    currentPage.classList.add('flip-back');
    setTimeout(() => {
        currentPage.style.display = 'none';
        prevPage.style.display = 'block';
        currentPage.classList.remove('flip-back');
    }, 1000);
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'secret') {
        turnPage('index-page', 'beach-page-1');
    } else {
        alert('Incorrect username or password!');
    }
}

function showInput(inputId) {
    document.getElementById('time-input').style.display = 'none';
    document.getElementById('date-input').style.display = 'none';
    document.getElementById(inputId).style.display = 'block';
}

let pollResults = [];

function submitPoll() {
    const timeInput = document.getElementById('time-input').value;
    const dateInput = document.getElementById('date-input').value;

    if (timeInput) {
        pollResults.push({ option: 'time', value: timeInput });
    } else if (dateInput) {
        pollResults.push({ option: 'date', value: dateInput });
    }

    alert('Poll submitted! Check console for results.');
    console.log('Poll Results:', pollResults);
}

// 360-Degree Rotation
book.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - previousX;
        currentRotationY += deltaX * 0.3;
        book.style.transform = `rotateY(${currentRotationY}deg)`;
        previousX = e.clientX;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentRotationY = Math.round(currentRotationY / 90) * 90; // Snap to 90-degree angles
    book.style.transform = `rotateY(${currentRotationY}deg)`;
});

// Initial setup (closed book)
document.getElementById('cover-page').style.display = 'block';
document.getElementById('index-page').style.display = 'none';
document.getElementById('beach-page-1').style.display = 'none';
document.getElementById('beach-page-2').style.display = 'none';
book.style.transform = 'rotateY(0deg)'; // Fully closed