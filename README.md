# Expresiones Matriciales: Calma, Estrés y Caos

* **Autora:** Antonia Rojas Iriarte
* **Curso:** Pensamiento Computacional
* **Sección:** 03

---

## 1. Información del Proyecto

### Descripción Objetiva
**"Expresiones Matriciales: Calma, Estrés y Caos"** es un sistema visual y sonoro avanzado, dinámico, generativo e interactivo programado en p5.js. El proyecto utiliza una estructura de grilla matricial de $30 \times 30$ celdas para explorar la transformación formal y el comportamiento de elementos geométricos básicos a través de los estímulos del usuario. 

El sistema cuenta con una arquitectura de máquina de estados controlada por eventos discretos de teclado que divide la experiencia en tres momentos globales: una Pantalla de Inicio informativa, la Experiencia Principal Interactiva y una Pantalla de Cierre con créditos. Dentro de la experiencia interactiva, el usuario puede alternar entre tres sub-estados emocionales utilizando los números `1`, `2` y `3`, lo que modifica simultáneamente la morfología geométrica de la grilla (círculos, rectángulos o triángulos) y la textura multimedia activa. El lienzo responde de forma continua al movimiento del cursor (`mouseX` y `mouseY`), mapeando estos vectores de posición para alterar el color, tamaño y rotación de las celdas, así como el volumen y la velocidad de reproducción del espacio sonoro en tiempo real.

### Descripción Conceptual
El proyecto se posiciona como una continuación y expansión técnica de la exploración iniciada en la Solemne II, tomando como referente teórico y estético las corrientes del **Op Art (Arte Óptico)** y el **Arte Generativo de la segunda mitad del siglo XX**. Específicamente, el sistema traduce las lógicas de diseño de tres referentes fundamentales:

1. **Victor Vasarely:** La rigidez y el orden de la estructura modular matricial que se deforma a partir de un punto de atención (el cursor).
2. **Julio Le Parc:** La noción de sistemas ópticos repetitivos e inestables que requieren de la participación activa del espectador para completarse.
3. **Vera Molnár:** La introducción del concepto de "orden roto" o perturbación matemática a través del tiempo mediante la inserción de variables aleatorias y dinámicas que desorganizan la grilla perfecta.

El principio de diseño explorado es la **sinestesia interactiva**, traduciendo variables espaciales de movimiento (coordenadas cartesianas del mouse) en respuestas visuales de escala y rotación, sincronizadas de forma cruzada con parámetros acústicos de intensidad y tono. El objetivo es que las transiciones geométricas de la matriz dejen de ser meramente ópticas y cobren una dimensión atmosférica y psicológica.

---

## 2. Sistema Computacional

La arquitectura del software está diseñada como un sistema cerrado que procesa datos de entrada continuos y discretos, gestiona el comportamiento del programa mediante variables globales de estado y genera salidas simultáneas en los canales visual y de audio:

* **Inputs (Entradas del sistema):**
  * *Entrada Continua:* Posición bidimensional del cursor (`mouseX`, `mouseY`) en un lienzo adaptado de $600 \times 600$ píxeles.
  * *Eventos Discretos por Teclado:* Captura de interrupciones de hardware mediante códigos de tecla específicos: `ENTER` para la inicialización y el reinicio del sistema, `BACKSPACE` para forzar la salida hacia la escena final, y las teclas alfanuméricas `'1'`, `'2'` y `'3'` para la conmutación de sub-estados internos.
* **Procesos (Transformación de datos):**
  * *Carga Asíncrona (`preload`):* Importación previa de archivos de audio comprimidos `.mp3` a la memoria interna del navegador para evitar latencia.
  * *Ciclos Anidados (`for`):* Dos bucles iterativos encargados de calcular las coordenadas equidistantes de los centros geométricos para las 900 celdas de la grilla.
  * *Geometría Analítica (`dist`):* Cálculo perenne de la distancia euclidiana entre el cursor y el centro de cada módulo individual.
  * *Mapeo Matemático Realimentado (`map`):* Normalización y escalamiento inverso de las distancias para modular el tamaño y la rotación visual, así como el volumen y la velocidad de reproducción sonoros.
  * *Perturbación Pseudoaleatoria (`random`):* Variación estocástica controlada aplicada al canal verde (`g`) para generar vibración lumínica orgánica.
* **Estados del Sistema:**
  * `estadoGlobal = 0` (Pantalla de Inicio): Despliega las instrucciones de uso y el título de la obra, manteniendo silenciado el motor multimedia.
  * `estadoGlobal = 1` (Experiencia Principal): Libera el ciclo de renderizado de la matriz y el control interactivo multimedia en tiempo real.
  * `estadoGlobal = 2` (Pantalla de Cierre): Detiene las lógicas gráficas de la grilla, apaga los canales sonoros y presenta los créditos de autoría.
* **Outputs (Respuestas del sistema):**
  * *Output Visual:* Mutación geométrica modular en el lienzo acoplada a una estela por persistencia de color generada por un fondo con opacidad acumulativa (`background(15, 15, 20, 40)`).
  * *Output Sonoro:* Modulación reactiva del espacio auditivo mediante la manipulación en tiempo real de la intensidad y frecuencia de las ondas de audio activas.

---

## 3. Explicación de la Interacción

La interacción opera bajo un modelo de **retroalimentación computacional clara y reactiva**. Cuando el usuario ingresa al sistema e interactúa con el teclado, los eventos discretos modifican los flujos globales del programa. Al interior de la experiencia, el movimiento del cursor gatilla dos tipos de transformaciones paralelas:

1. **Transformación Espacio-Temporal:** El mouse actúa como un campo de fuerza virtual. Las celdas más cercanas al cursor incrementan su escala y modifican su ángulo basándose en la distancia calculada con `dist()`. En el sub-estado de "Caos", se incorpora además la variable del sistema `frameCount`, lo que rompe la dependencia lineal del mouse y provoca que la rotación se acelere de forma autónoma con el paso del tiempo.
2. **Transformación Atmosférica Sonora:** Al mover el cursor hacia el extremo derecho del lienzo (`mouseX` máximo), la intensidad del volumen se incrementa uniformemente hasta alcanzar su límite seguro (`1.0`), mientras que moverlo a la izquierda atenúa el sonido. Simultáneamente, el eje vertical (`mouseY`) reasigna las frecuencias de muestreo: mover el mouse hacia el extremo inferior ralentiza y vuelve grave el tono, e ir hacia el extremo superior agudiza y acelera el ritmo, ofreciendo una experiencia inmersiva coherente de principio a fin.

---

## 4. Recursos Multimedia Utilizados

Para dar cumplimiento estricto a las bases de evaluación, el proyecto integra recursos de audio digital que desempeñan un rol estructural y lógico dentro del algoritmo, descartando cualquier uso meramente decorativo:

* **Archivos multimedia:** `calma.mp3` (textura ambiental zen), `estres.mp3` (pulso rítmico de metrónomo) y `caos.mp3` (estática digital y distorsión).
* **Función en el sistema:** Los recursos están vinculados directamente a la lógica de sub-estados y variables de control mediante métodos nativos de la librería de sonido (`p5.sound`). La función `gestionarAudioReactivo()` implementa un sistema de control cruzado: cuando un sub-estado está activo, el programa calcula el volumen dinámico (`.setVolume()`) y la velocidad (`.rate()`) de ese archivo en específico y fuerza el volumen de las otras dos pistas a `0`. Esto garantiza que la composición visual y el paisaje sonoro muten en perfecta sincronía.

---

## 5. Registro Visual del Proceso

El desarrollo del proyecto avanzó mediante un diseño iterativo estructurado en etapas lógicas de complejidad ascendente, sustentado en un análisis profundo de la abstracción geométrica y el Arte Óptico:

### Referentes de Diseño e Influencias Visuales

#### 1. Victor Vasarely
Inspiró la estructura rígida de la grilla matricial de 30x30 y la deformación de los módulos a partir de un punto de atracción focal (las coordenadas del mouse). El proyecto emula la alteración bidimensional del espacio plano característica de sus composiciones modulares.
<br>
<img src="REFERENTES VISUALES/vasarely.jpg" width="300" alt="Referente Victor Vasarely">

#### 2. Julio Le Parc
Influyó de manera directa en la concepción de una experiencia óptica inestable y cinética. El sistema no se presenta como una obra estática y terminada, sino que requiere la participación continua y el movimiento del espectador para activar las variaciones formales y cromáticas en tiempo real.
<br>
<img src="REFERENTES VISUALES/leparc.jpg" width="300" alt="Referente Julio Le Parc">

#### 3. Vera Molnár
Inspiró la noción fundamental de introducir una perturbación matemática controlada al interior de un orden preestablecido. Esto se ve reflejado en el uso de la función `random()` para generar vibraciones lumínicas cromáticas y el uso de `frameCount` para acelerar la rotación y romper la simetría perfecta en el estado de "Caos".
<br>
<img src="REFERENTES VISUALES/molnar.jpeg" width="300" alt="Referente Vera Molnár">

---

### Diagrama de Flujo del Sistema Avanzado
A continuación se presenta el flujo interactivo digitalizado que modela la arquitectura lógica completa del examen, detallando los nodos de decisión por teclado, bucles anidados, variables de control y modulación multimedia:

<img src="DIAGRAMA DE FLUJO/Diagrama de flujo.png" width="600">


---

## 6. Links del Proyecto

* [Ver Examen en Pantalla Completa (p5.js)](https://editor.p5js.org/antonia.rojas4/full/qV8dELDR_)
* [Ver y Editar Código Fuente (p5.js)](https://editor.p5js.org/antonia.rojas4/sketches/qV8dELDR_)

---

## 7. Reflexión Final

* **Principales decisiones tomadas:** La decisión técnica más relevante fue centralizar el procesamiento visual y sonoro bajo un mismo set de variables normalizadas con la función `map()`. Esto permitió que el movimiento del mouse controlara simétricamente dos canales expresivos distintos, creando una verdadera cohesión audiovisual. Asimismo, estructurar el programa en funciones modulares independientes (`pantallaInicio`, `pantallaCierre`, `dibujarCelda`) fue una decisión de arquitectura clave para mantener un ciclo `draw()` limpio, legible y fácil de mantener.
* **Dificultades encontradas:** El obstáculo más complejo consistió en resolver el bloqueo de reproducción automática que los navegadores web modernos aplican sobre las librerías de audio para evitar contenidos molestos al usuario. Esta problemática se solucionó investigando la API de p5.js e implementando estratégicamente la función `userStartAudio()` al interior del evento discreto `keyPressed()`. Así, el motor de sonido se desbloquea de forma transparente en el momento exacto en que el usuario realiza su primera acción voluntaria (presionar `ENTER`).
* **Aprendizajes obtenidos:** Este proyecto consolidó el aprendizaje de que la programación creativa trasciende la mera generación de gráficos bonitos. Desarrollar una máquina de estados interactiva avanzada permitió entender el software como un sistema vivo que evoluciona en el tiempo, transformando la entrada de datos abstractos en una experiencia multisensorial con significado conceptual y rigor metodológico.
