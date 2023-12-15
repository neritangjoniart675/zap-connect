// filename: sophisticated_code.js
// This code generates a maze using depth-first search algorithm

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.walls = { top: true, right: true, bottom: true, left: true };
  }
}

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.initializeGrid();
  }

  initializeGrid() {
    const grid = [];
    for (let row = 0; row < this.rows; row++) {
      const rowCells = [];
      for (let col = 0; col < this.cols; col++) {
        rowCells.push(new Cell(row, col));
      }
      grid.push(rowCells);
    }
    return grid;
  }

  getUnvisitedNeighbors(cell) {
    const { row, col } = cell;
    const neighbors = [];

    if (row > 0 && !this.grid[row - 1][col].visited)
      neighbors.push({ row: row - 1, col });
    if (col < this.cols - 1 && !this.grid[row][col + 1].visited)
      neighbors.push({ row, col: col + 1 });
    if (row < this.rows - 1 && !this.grid[row + 1][col].visited)
      neighbors.push({ row: row + 1, col });
    if (col > 0 && !this.grid[row][col - 1].visited)
      neighbors.push({ row, col: col - 1 });

    return neighbors;
  }

  removeWall(cellA, cellB) {
    const rowDiff = cellA.row - cellB.row;
    const colDiff = cellA.col - cellB.col;

    if (rowDiff === 1) {
      this.grid[cellA.row][cellA.col].walls.top = false;
      this.grid[cellB.row][cellB.col].walls.bottom = false;
    } else if (colDiff === 1) {
      this.grid[cellA.row][cellA.col].walls.left = false;
      this.grid[cellB.row][cellB.col].walls.right = false;
    } else if (rowDiff === -1) {
      this.grid[cellA.row][cellA.col].walls.bottom = false;
      this.grid[cellB.row][cellB.col].walls.top = false;
    } else if (colDiff === -1) {
      this.grid[cellA.row][cellA.col].walls.right = false;
      this.grid[cellB.row][cellB.col].walls.left = false;
    }
  }

  generate() {
    const stack = [];
    let current = this.grid[0][0];
    current.visited = true;

    while (true) {
      const neighbors = this.getUnvisitedNeighbors(current);

      if (neighbors.length === 0) {
        if (stack.length === 0) break;
        current = stack.pop();
        continue;
      }

      const randomNeighborIndex = Math.floor(Math.random() * neighbors.length);
      const randomNeighbor = neighbors[randomNeighborIndex];

      this.removeWall(current, randomNeighbor);

      stack.push(current);
      current = this.grid[randomNeighbor.row][randomNeighbor.col];
      current.visited = true;
    }
  }

  draw() {
    const canvas = document.getElementById('maze-canvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;
    const canvasSize = cellSize * Math.max(this.rows, this.cols);

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    this.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const x = colIndex * cellSize;
        const y = rowIndex * cellSize;

        if (cell.walls.top) this.drawLine(ctx, x, y, x + cellSize, y);
        if (cell.walls.right) this.drawLine(ctx, x + cellSize, y, x + cellSize, y + cellSize);
        if (cell.walls.bottom) this.drawLine(ctx, x, y + cellSize, x + cellSize, y + cellSize);
        if (cell.walls.left) this.drawLine(ctx, x, y, x, y + cellSize);
      });
    });
  }

  drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

const maze = new Maze(20, 20);
maze.generate();
maze.draw();