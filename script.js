// Mapeo de teclas del teclado a frecuencias
const keyMap = {
    'a': 261.63, // Do
    's': 294.66, // Re
    'd': 329.63, // Mi
    'w': 277.18, // Do#
    'f': 349.23, // Fa
    'e': 311.13, // Re#
    'g': 392.00, // Sol
    'r': 369.99, // Fa#
    'h': 440.00, // La
    'y': 415.30, // Sol#
    'j': 493.88, // Si
    'u': 466.16, // La#
    'k': 523.25, // Do
    'i': 587.33, // Re#
    'l': 554.37, // Re
    'o': 739.99, // Fa#
    'ñ': 660.25, // Mi
    'p': 783.99, // Sol#
    '{': 698.46, // Fa
    'n': 880.00, // La#
    '-': 784.00, // Sol
    '.': 830.61, // La
    ',': 987.77, // Si
    'm': 1046.50 // Do
};

// Crear contexto de audio global
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Mantener un objeto para los osciladores activos
const activeOscillators = {};

// Función para reproducir sonido
function playSound(frequency, key) {
    // Si ya hay un oscilador activo para esta tecla, lo detiene
    if (activeOscillators[key]) {
        activeOscillators[key].stop();
    }

    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Tipo de onda
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Frecuencia en Hertz
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Duración del sonido

    // Guardar el oscilador activo
    activeOscillators[key] = oscillator;

    // Limpiar el oscilador después de que se detiene
    oscillator.onended = () => {
        delete activeOscillators[key];
    };
}

// Evento de clic en teclas
const keys = document.querySelectorAll('.key');
keys.forEach((key, index) => {
    const frequency = Object.values(keyMap)[index]; // Obtener frecuencia correspondiente
    key.setAttribute('data-frequency', frequency); // Asignar frecuencia a cada tecla

    key.addEventListener('click', () => {
        playSound(frequency, key.dataset.frequency); // Reproducir sonido al hacer clic
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
        playSound(keyMap[key], key); // Reproducir sonido correspondiente
        const keyElement = Array.from(keys).find(k => k.getAttribute('data-frequency') == keyMap[key]);
        highlightKey(keyElement); // Resaltar la tecla correspondiente
    }
});
