// Tamanho da grade de células
const width =100;
const height = 60;

// Cria uma matriz bidimensional para representar a grade de células
let cells = new Array(height);
for (let i = 0; i < height; i++) {
  cells[i] = new Array(width);
}

// Inicializa a grade de células com valores aleatórios
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    cells[i][j] = Math.random() < 0.5 ? 0 : 1;
  }
}

// Função que atualiza a grade de células de acordo com as regras do autômato celular
function updateCells() {
  let newCells = new Array(height);
  for (let i = 0; i < height; i++) {
    newCells[i] = new Array(width);
    for (let j = 0; j < width; j++) {
      // Conta o número de células vizinhas que estão no estado 1
      let count = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (i + x >= 0 && i + x < height && j + y >= 0 && j + y < width) {
            count += cells[i + x][j + y];
          }
        }
      }
      count -= cells[i][j];
      
      // Aplica as regras do autômato celular
      if (cells[i][j] == 1 && (count < 2 || count > 3)) {
        newCells[i][j] = 0;
      } else if (cells[i][j] == 0 && count == 3) {
        newCells[i][j] = 1;
      } else {
        newCells[i][j] = cells[i][j];
      }
    }
  }
  cells = newCells;
}

// Função que desenha a grade de células no canvas
function drawCells() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (cells[i][j] == 1) {
        context.fillRect(j * 10, i * 10, 10, 10);
      }
    }
  }
}

// Função que executa o autômato celular continuamente
function run() {
  updateCells();
  drawCells();
  setTimeout(run, 100);
}

// Inicia a execução do autômato celular
run();
