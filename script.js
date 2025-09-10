// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's';
    heart.style.opacity = Math.random();
    document.getElementById('hearts').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Generate hearts periodically
setInterval(createHeart, 300);

// Create stars
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    document.getElementById('stars').appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 6000);
}

// Generate stars periodically
setInterval(createStar, 500);

// Create floating images
function createFloatingImage() {
    const img = document.createElement('img');
    img.classList.add('floating-img');
    img.src = ['assets/foto/1.jpg',
        'assets/foto/2.jpg',
        'assets/foto/3.jpg',
        'assets/foto/4.jpg',
        'assets/foto/5.jpg',
        'assets/foto/6.jpg']
        [Math.floor(Math.random() * 6)];
    img.style.left = Math.random() * 100 + '%';
    img.style.animationDuration = Math.random() * 10 + 15 + 's';
    img.style.animationDelay = Math.random() * 5 + 's';
    document.getElementById('floatingImages').appendChild(img);

    setTimeout(() => {
        img.remove();
    }, 25000);
}

// Generate floating images periodically
setInterval(createFloatingImage, 3000);

// Show next message
function showNextMessage(nextLayer) {
    document.getElementById(`messageLayer${nextLayer - 1}`).classList.remove('active');
    document.getElementById(`messageLayer${nextLayer}`).classList.add('active');
    createConfetti(window.innerWidth / 2, window.innerHeight / 2, 30);
}

// Show main content
function showMainContent() {
    document.getElementById('messageLayer4').classList.remove('active');
    document.getElementById('mainContent').style.display = 'flex';
    createConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
    
    // Start automatic confetti
    startAutoConfetti();
}

// Cute character interaction
const cuteCharacter = document.getElementById('cuteCharacter');
const characters = ['🐰', '🐻', '🐶', '🐱', '🦊', '🐼'];
let currentChar = 0;

cuteCharacter.addEventListener('click', function() {
    currentChar = (currentChar + 1) % characters.length;
    this.textContent = characters[currentChar];
    createConfetti(this.offsetLeft + 25, this.offsetTop + 25, 20);
});

// Balloon pop effect
const balloons = document.querySelectorAll('.balloon');
balloons.forEach(balloon => {
    balloon.addEventListener('click', function() {
        this.classList.add('balloon-pop');
        setTimeout(() => {
            this.style.visibility = 'hidden';
        }, 500);
        
        // Create mini confetti
        createConfetti(this.offsetLeft + 40, this.offsetTop + 50, 10);
    });
});

// Cake blow out and explode effect
const cake = document.getElementById('cake');
const cakeContainer = document.getElementById('cakeContainer');
const specialImage = document.getElementById('specialImage');
const memoryPhotos = document.getElementById('memoryPhotos');
const specialMessageModal = document.getElementById('specialMessageModal');
let candlesLit = true;
let cakeExploded = false;
let autoConfettiInterval;

cake.addEventListener('click', function() {
    if (!candlesLit && !cakeExploded) {
        // Explode cake
        cake.classList.add('exploded');
        cakeExploded = true;
        
        // Create flying cake pieces
        for (let i = 0; i < 8; i++) {
            const piece = document.createElement('div');
            piece.classList.add('cake-piece');
            piece.style.left = Math.random() * 200 + 25 + 'px';
            piece.style.top = Math.random() * 150 + 25 + 'px';
            piece.style.setProperty('--x', (Math.random() - 0.5) * 400 + 'px');
            piece.style.setProperty('--y', (Math.random() - 0.5) * 400 + 'px');
            piece.style.backgroundColor = ['#f8c8dc', '#ff9eb5', '#ff6b81'][Math.floor(Math.random() * 3)];
            cakeContainer.appendChild(piece);
            
            setTimeout(() => {
                piece.classList.add('flying');
            }, 100);
            
            setTimeout(() => {
                piece.remove();
            }, 1100);
        }
        
        // Show special image, memory photos, and special message
        setTimeout(() => {
            specialImage.classList.add('show');
            showMemoryPhotos();
            showSpecialMessage();
            createConfetti(window.innerWidth / 2, window.innerHeight / 2, 150);
        }, 500);
    } else if (candlesLit) {
        // Blow out candles
        const flames = document.querySelectorAll('.flame');
        flames.forEach(flame => {
            flame.classList.add('out');
        });
        candlesLit = false;
        
        // Create confetti when candles are blown out
        createConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
    }
});

// Show memory photos after cake explosion
function showMemoryPhotos() {
    const photoData = [
        { src: 'assets/foto/1.jpg', caption: 'Best Times!' },
        { src: 'assets/foto/2.jpg', caption: 'Adventures!' },
        { src: 'assets/foto/3.jpg', caption: 'Laughter!' },
        { src: 'assets/foto/4.jpg', caption: 'Love!' },
        { src: 'assets/foto/5.jpg', caption: 'Joy!' },
        { src: 'assets/foto/6.jpg', caption: 'Happiness!' }
    ];
    
    // Calculate positions for photos in a circle around the cake
    const centerX = cakeContainer.offsetWidth / 2;
    const centerY = cakeContainer.offsetHeight / 2;
    const radius = 200;
    
    photoData.forEach((photo, index) => {
        const angle = (index / photoData.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const photoElement = document.createElement('div');
        photoElement.classList.add('memory-photo');
        photoElement.style.left = x + 'px';
        photoElement.style.top = y + 'px';
        
        photoElement.innerHTML = `
            <img src="${photo.src}" alt="Memory ${index + 1}">
            <div class="caption">${photo.caption}</div>
        `;
        
        // Add click event to show larger photo
        photoElement.addEventListener('click', function() {
            showPhotoModal(photo.src, photo.caption);
        });
        
        memoryPhotos.appendChild(photoElement);
        
        // Show photo with delay
        setTimeout(() => {
            photoElement.classList.add('show');
        }, 500 + index * 200);
    });
}

// Show special message modal
function showSpecialMessage() {
    specialMessageModal.classList.add('show');
}

// Close special message modal
function closeSpecialMessage() {
    specialMessageModal.classList.remove('show');
}

// Show photo modal
function showPhotoModal(src, caption) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImage.src = src;
    modalCaption.textContent = caption;
    modal.classList.add('show');
}

// Close photo modal
function closePhotoModal() {
    document.getElementById('photoModal').classList.remove('show');
}

// Relight candles button
document.getElementById('relightBtn').addEventListener('click', function() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.classList.remove('out');
    });
    candlesLit = true;
    
    // Reset cake if exploded
    if (cakeExploded) {
        cake.classList.remove('exploded');
        specialImage.classList.remove('show');
        
        // Hide memory photos
        const photos = document.querySelectorAll('.memory-photo');
        photos.forEach(photo => {
            photo.classList.remove('show');
            setTimeout(() => {
                photo.remove();
            }, 500);
        });
        
        cakeExploded = false;
    }
});

// Confetti button
document.getElementById('confettiBtn').addEventListener('click', function() {
    createConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
});

// Create confetti
function createConfetti(x, y, count) {
    const colors = ['#ff6b6b', '#ff9eb5', '#5a189a', '#ffeb3b', '#4caf50', '#2196f3'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Start automatic confetti
function startAutoConfetti() {
    // Throw confetti every 5 seconds
    autoConfettiInterval = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight / 2;
        createConfetti(x, y, 50);
    }, 5000);
}

// Audio controls
const backgroundMusic = document.getElementById('backgroundMusic');
const audioToggle = document.getElementById('audioToggle');
const audioIcon = document.getElementById('audioIcon');
let isPlaying = true;

// Try to autoplay the music
window.addEventListener('load', function() {
    backgroundMusic.play().catch(error => {
        console.log('Autoplay prevented:', error);
        isPlaying = false;
        audioIcon.classList.remove('fa-volume-up');
        audioIcon.classList.add('fa-volume-mute');
    });
});

audioToggle.addEventListener('click', function() {
    if (isPlaying) {
        backgroundMusic.pause();
        audioIcon.classList.remove('fa-volume-up');
        audioIcon.classList.add('fa-volume-mute');
    } else {
        backgroundMusic.play();
        audioIcon.classList.remove('fa-volume-mute');
        audioIcon.classList.add('fa-volume-up');
    }
    isPlaying = !isPlaying;
});

// Initial confetti burst
setTimeout(() => {
    createConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
}, 1000);