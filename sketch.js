// VARIABLES GLOBALES
let estadoGlobal = 0;   // 0: Inicio, 1: Experiencia, 2: Cierre
let subEstadoGrilla = 1; // 1: Calma, 2: Estrés, 3: Caos

// Variables para los recursos de sonido
let sonidoCalma, sonidoEstres, sonidoCaos;

// Variables de configuración de la grilla matricial
let columnas = 30;
let filas = 30;
let tamanoCanvas = 600;

// FUNCIÓN PRELOAD: Carga de archivos multimedia
function preload() {
  sonidoCalma = loadSound('calma.mp3');
  sonidoEstres = loadSound('estres.mp3');
  sonidoCaos = loadSound('caos.mp3');
}

// FUNCIÓN SETUP: Inicialización del sistema
function setup() {
  createCanvas(tamanoCanvas, tamanoCanvas);
  rectMode(CENTER);
  noStroke();
  
  // Configurar los sonidos para que se reproduzcan en bucle infinito
  sonidoCalma.loop();
  sonidoEstres.loop();
  sonidoCaos.loop();
  
  // Inicialmente pausamos o bajamos el volumen de todos los audios
  sonidoCalma.setVolume(0);
  sonidoEstres.setVolume(0);
  sonidoCaos.setVolume(0);
}

// FUNCIÓN DRAW: Ciclo principal del programa
function draw() {
  background(15, 15, 20, 40); // Fondo con opacidad acumulativa para efecto estela

  // Estados principales
  if (estadoGlobal === 0) {
    pantallaInicio();
  } else if (estadoGlobal === 1) {
    experienciaPrincipal();
    gestionarAudioReactivo(); // Lógica multimedia integrada en tiempo real
  } else if (estadoGlobal === 2) {
    pantallaCierre();
  }
}

// Funciones propias
// Estado 0: Pantalla de Bienvenida e Instrucciones
function pantallaInicio() {
  // Apagar todos los sonidos en el menú
  sonidoCalma.setVolume(0);
  sonidoEstres.setVolume(0);
  sonidoCaos.setVolume(0);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Expresiones Matriciales", width / 2, height / 2 - 60);
  
  textSize(16);
  fill(180);
  text("Exploración geométrica de estados de ánimo", width / 2, height / 2 - 20);
  
  textSize(14);
  fill(120);
  text("Instrucciones:\nPresiona ENTER para iniciar la experiencia.\nDentro, usa las teclas 1, 2 y 3 para mutar el sistema.\nPresiona BACKSPACE en cualquier momento para finalizar.", width / 2, height / 2 + 50);
}

// Estado 1: La grilla interactiva
function experienciaPrincipal() {
  let espaciadoX = width / columnas;
  let espaciadoY = height / filas;

  // Bucles anidados (Estructura Matricial requerida)
  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      // Calcular el centro geométrico de cada celda de la cuadrícula
      let x = i * espaciadoX + espaciadoX / 2;
      let y = j * espaciadoY + espaciadoY / 2;
      
      // Llamar a la función modular con parámetros independientes
      dibujarCelda(x, y, espaciadoX);
    }
  }
}

// Función Modular para renderizar cada celda individual
function dibujarCelda(x, y, espaciado) {
  // Calcular distancia matemática del cursor hacia el centro de la celda
  let distancia = dist(x, y, mouseX, mouseY);
  
  // Uso de map() para escala inversa reactiva al mouse
  let tamano = map(distancia, 0, width, espaciado, 2);
  let angulo = map(mouseX, 0, width, 0, TWO_PI);
  
  // Paleta de color dinámica
  let r = map(mouseX, 0, width, 50, 255);
  let g = 100 + random(-15, 15); // Uso de random() para vibración lumínica
  let b = map(mouseY, 0, height, 255, 50);
  fill(r, g, b);
  
  push();
  translate(x, y);
  
  // Comportamientos morfológicos según el sub-estado activo de la grilla
  if (subEstadoGrilla === 1) {
    // CALMA: Geometría estable y rotación suave de círculos
    rotate(angulo);
    ellipse(0, 0, tamano * 0.6);
  } else if (subEstadoGrilla === 2) {
    // ESTRÉS: Rectángulos tensos orientados a la cercanía del cursor
    rotate(angulo + distancia * 0.01);
    rect(0, 0, tamano * 0.8, tamano * 0.8);
  } else if (subEstadoGrilla === 3) {
    // CAOS: Triángulos con vértices agresivos disparados por tiempo continuo
    rotate(frameCount * 0.05 + angulo);
    triangle(-tamano/2, tamano/2, 0, -tamano/2, tamano/2, tamano/2);
  }
  pop();
}

// Estado 2: Pantalla Final de Cierre y Créditos
function pantallaCierre() {
  // Silenciar audios al cerrar
  sonidoCalma.setVolume(0);
  sonidoEstres.setVolume(0);
  sonidoCaos.setVolume(0);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Experiencia Concluida", width / 2, height / 2 - 40);
  
  textSize(14);
  fill(150);
  text("Gracias por interactuar con el sistema.", width / 2, height / 2);
  text("Autora: Antonia Rojas Iriarte", width / 2, height / 2 + 30);
  
  fill(100);
  textSize(12);
  text("Presiona ENTER si deseas reiniciar el programa.", width / 2, height / 2 + 80);
}

// LÓGICA MULTIMEDIA: Control de Audio Reactivo
function gestionarAudioReactivo() {
  // Calculamos valores reactivos basados en la posición del mouse mediante map()
  // El movimiento horizontal altera el volumen (0 a 1)
  let volumenDinamico = map(mouseX, 0, width, 0.1, 1.0);
  // El movimiento vertical altera la velocidad de reproducción / tono (0.5x a 1.5x)
  let velocidadDinamica = map(mouseY, 0, height, 0.5, 1.5);
  
  // Control cruzado: Se sube el volumen del sonido activo y se silencian los otros
  if (subEstadoGrilla === 1) {
    sonidoCalma.setVolume(volumenDinamico);
    sonidoCalma.rate(velocidadDinamica);
    sonidoEstres.setVolume(0);
    sonidoCaos.setVolume(0);
  } else if (subEstadoGrilla === 2) {
    sonidoCalma.setVolume(0);
    sonidoEstres.setVolume(volumenDinamico);
    sonidoEstres.rate(velocidadDinamica);
    sonidoCaos.setVolume(0);
  } else if (subEstadoGrilla === 3) {
    sonidoCalma.setVolume(0);
    sonidoEstres.setVolume(0);
    sonidoCaos.setVolume(volumenDinamico);
    sonidoCaos.rate(velocidadDinamica);
  }
}

// EVENTOS DISCRETOS: Interrupciones de teclado
function keyPressed() {
  // Activa el audio del navegador al presionar cualquier tecla
  userStartAudio();

  // Transiciones entre las pantallas globales principales
  if (keyCode === ENTER) {
    if (estadoGlobal === 0 || estadoGlobal === 2) {
      estadoGlobal = 1; // Avanzar o reiniciar a la experiencia interactiva
    }
  }
  
  if (keyCode === BACKSPACE) {
    if (estadoGlobal === 1) {
      estadoGlobal = 2; // Forzar salida hacia la pantalla final de créditos
    }
  }

  // Control interno de sub-estados geométricos/sonoros (Solo activos dentro de la experiencia)
  if (estadoGlobal === 1) {
    if (key === '1') subEstadoGrilla = 1; // Cambiar a Calma
    if (key === '2') subEstadoGrilla = 2; // Cambiar a Estrés
    if (key === '3') subEstadoGrilla = 3; // Cambiar a Caos
  }
}
 
