// Archivos de sonido
const soundX = new Audio('clickX.mp3'); // Sonido para X
const soundO = new Audio('clickO.mp3'); // Sonido para O
const soundWin = new Audio('win.mp3');  // Sonido de victoria
const backgroundMusic = new Audio('background.mp3'); // Música de fondo

// Configuración de la música de fondo
backgroundMusic.loop = true; // La música se repite
backgroundMusic.volume = 0.2; // Volumen ajustado
backgroundMusic.play(); // Iniciar música automáticamente

// Variables del juego
const board = document.getElementById('board'); // Tablero del juego
const message = document.getElementById('message'); // Mensaje de estado
let currentPlayer = 'X'; // Jugador actual (X o O)
let gameActive = true; // Estado del juego (activo o no)
let gameState = Array(9).fill(''); // Estado del tablero (vacío)

// Crear el tablero
function createBoard() {
    board.innerHTML = ''; // Vaciar tablero
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div'); // Crear celda
        cellElement.classList.add('cell'); // Clase CSS para estilo
        cellElement.dataset.index = index; // Guardar índice de celda
        cellElement.addEventListener('click', handleCellClick); // Añadir evento de clic
        board.appendChild(cellElement); // Agregar celda al tablero
    });
}

// Manejar clic en una celda
function handleCellClick(event) {
    const cell = event.target; // Celda seleccionada
    const index = cell.dataset.index; // Índice de la celda

    if (gameState[index] !== '' || !gameActive) return; // Ignorar clic si la celda ya está ocupada o el juego terminó

    // Actualizar estado del tablero
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer; // Mostrar X o O en la celda
    cell.classList.add('taken'); // Añadir estilo de celda ocupada

    // Reproducir sonido según el jugador
    if (currentPlayer === 'X') {
        soundX.play();
    } else {
        soundO.play();
    }

    // Comprobar si hay un ganador
    if (checkWinner()) {
        message.textContent = `¡El jugador ${currentPlayer} gana!`;
        gameActive = false; // Finalizar el juego
        soundWin.play(); // Reproducir sonido de victoria
    } else if (gameState.every(cell => cell !== '')) {
        // Comprobar si hay empate
        message.textContent = '¡Es un empate!';
        gameActive = false; // Finalizar el juego
    } else {
        // Cambiar al siguiente jugador
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Turno del jugador ${currentPlayer}`;
    }
}

// Comprobar si hay un ganador
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination; // Indices de la combinación
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            // Resaltar celdas ganadoras
            document.querySelectorAll('.cell')[a].classList.add('winner');
            document.querySelectorAll('.cell')[b].classList.add('winner');
            document.querySelectorAll('.cell')[c].classList.add('winner');
            return true; // Hay un ganador
        }
    }
    return false; // No hay ganador
}

// Reiniciar el juego
function resetGame() {
    currentPlayer = 'X'; // Reiniciar al jugador X
    gameActive = true; // Activar el juego
    gameState = Array(9).fill(''); // Vaciar el tablero
    message.textContent = ''; // Limpiar mensaje
    createBoard(); // Recrear el tablero
    // Eliminar clases ganadoras de las celdas
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('winner');
    });
    backgroundMusic.play(); // Asegurar que la música sigue sonando
}

// Inicializar el tablero al cargar la página
createBoard();
