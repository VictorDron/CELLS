
const width = 100;
const height = 60;

let cells = new Array(height);
for (let i = 0; i < height; i++) {
  cells[i] = new Array(width);
}


for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    cells[i][j] = Math.random() < 0.6 ? 0 : 1;
  }
}

function updateCells() {
  let newCells = new Array(height);
  for (let i = 0; i < height; i++) {
    newCells[i] = new Array(width);
    for (let j = 0; j < width; j++) {
      let count = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (i + x >= 0 && i + x < height && j + y >= 0 && j + y < width) {
            count += cells[i + x][j + y];
          }
        }
      }
      count -= cells[i][j];
      
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


function run() {
  updateCells();
  drawCells();
  setTimeout(run, 100);
}

run();
