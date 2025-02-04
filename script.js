const lienzo = document.getElementById('gameCanvas');
const ctx = lienzo.getContext('2d');

const cuadricula = 20;
let serpiente = [{ x: 160, y: 160 }];
let direccion = 'DERECHA';
let comida = { x: 80, y: 80 };

function bucleJuego() {
    actualizar();
    dibujar();
    setTimeout(bucleJuego, 100);
}

function actualizar() {
    const cabeza = { x: serpiente[0].x, y: serpiente[0].y };
    
    if (direccion === 'IZQUIERDA') cabeza.x -= cuadricula;
    if (direccion === 'DERECHA') cabeza.x += cuadricula;
    if (direccion === 'ARRIBA') cabeza.y -= cuadricula;
    if (direccion === 'ABAJO') cabeza.y += cuadricula;
    
    serpiente.unshift(cabeza);
    
    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        comida = {
            x: Math.floor(Math.random() * 20) * cuadricula,
            y: Math.floor(Math.random() * 20) * cuadricula
        };
    } else {
        serpiente.pop();
    }
    
    if (cabeza.x < 0 || cabeza.x >= lienzo.width || cabeza.y < 0 || cabeza.y >= lienzo.height || colisionaConSigoMisma(cabeza)) {
        reiniciarJuego();
    }
}

function dibujar() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    
    ctx.fillStyle = 'green';
    serpiente.forEach(segmento => ctx.fillRect(segmento.x, segmento.y, cuadricula, cuadricula));
    
    ctx.fillStyle = 'red';
    ctx.fillRect(comida.x, comida.y, cuadricula, cuadricula);
}

function reiniciarJuego() {
    serpiente = [{ x: 160, y: 160 }];
    direccion = 'DERECHA';
    comida = { x: 80, y: 80 };
}

function colisionaConSigoMisma(cabeza) {
    return serpiente.some((segmento, indice) => indice !== 0 && segmento.x === cabeza.x && segmento.y === cabeza.y);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && direccion !== 'DERECHA') direccion = 'IZQUIERDA';
    if (e.key === 'ArrowRight' && direccion !== 'IZQUIERDA') direccion = 'DERECHA';
    if (e.key === 'ArrowUp' && direccion !== 'ABAJO') direccion = 'ARRIBA';
    if (e.key === 'ArrowDown' && direccion !== 'ARRIBA') direccion = 'ABAJO';
});

bucleJuego();
