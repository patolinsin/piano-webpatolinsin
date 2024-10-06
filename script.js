// Mapeo de teclas del teclado a frecuencias
const keyMap = {
    'a': 261.63, //Do<
    's': 293.66, //  //Re</div //
    'd': 329.63, // //Mi</div //
    'w': 277.18,  //Do#</div //
    'f': 349.23,  //Fa</div //
    'e': 311.13, //  //Re#</div //
    'g': 392.00,  //Sol</div //
    'r': 369.99,  //Fa#</div //
    'h': 440.00,  //La</div //
    'y': 415.30,  //Sol#</div //
    'j': 493.88,  //Si</div //
    'u': 466.16,  //La#</div //
    'k': 523.25,  //Do</div //
    'i': 587.33,  //Re#</div //
    'l': 554.37,  //Re</div //
    'o': 739.99,  //Fa#</div //
    'ñ': 660.25,  //Mi</div //
    'p': 783.99,  //Sol#</div //
    '{': 698.46,  //Fa</div //
    'n': 880.00,  //La#</div //
    '-': 784.00,  //Sol</div //
    '.': 830.61,  //La</div //
    ',': 987.77,  //Si</div //
    'm': 1046.50,  //Do</div //
};

// Función para reproducir sonido
function playSound(frequency) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Tipo de onda
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Frecuencia en Hertz
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Duración del sonido
}

// Evento de clic en teclas
const keys = document.querySelectorAll('.key');
keys.forEach((key, index) => {
    const frequency = Object.values(keyMap)[index]; // Obtener frecuencia correspondiente
    key.setAttribute('data-frequency', frequency); // Asignar frecuencia a cada tecla

    key.addEventListener('click', () => {
        playSound(frequency); // Reproducir sonido al hacer clic
        highlightKey(key); // Resaltar la tecla
    });
});

// Función para resaltar la tecla
function highlightKey(key) {
    key.classList.add('active'); // Agregar clase de resaltado
    setTimeout(() => {
        key.classList.remove('active'); // Quitar clase de resaltado después de 200ms
    }, 200);
}

// Evento de teclado
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase(); // Convertir a minúsculas
    if (keyMap[key]) {
        playSound(keyMap[key]); // Reproducir sonido correspondiente
        const keyElement = Array.from(keys).find(k => k.getAttribute('data-frequency') == keyMap[key]);
        highlightKey(keyElement); // Resaltar la tecla correspondiente
    }
});
