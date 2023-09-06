const { Engine, Render, Runner, World, Bodies, Body } = Matter;

const sideLength = 5;
const width = 600;
const height = 600;
const unitSideLength = width / sideLength;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width /2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// Maze generatiom

const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
};

const grid = Array(sideLength).fill(null).map(() => Array(sideLength).fill(false));

const verticals = Array(sideLength).fill(null).map(() => Array(sideLength - 1).fill(false));

const horizontals = Array(sideLength - 1).fill(null).map(() => Array(sideLength).fill(false));

const startRow = Math.floor(Math.random() * sideLength);
const startColumn = Math.floor(Math.random() * sideLength);

const stepThroughCell = (row, column) => {
    // if I have visited the cell at [row, column], then return
    if (grid[row][column]) {
        return;
    }

    // mark the cell as being visited
    grid[row][column] = true;

    // assemble a randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row - 1, column, "up"],
        [row, column + 1, "right"],
        [row + 1, column, "down"],
        [row, column - 1, "left"]
    ]);
    
    // for each neighbor...
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;

        // see if the neighbor is out of bounds
        if (nextRow < 0 || nextRow >= sideLength || nextColumn < 0 || nextColumn >= sideLength) {
            continue;
        }

        // see if the neighbor is visited
        if (grid[nextRow][nextColumn]) {
            continue;
        }

        // remove a wall from either horizontals or verticals
        if (direction === "left") {
            verticals[row][column - 1] = true;
        } else if (direction === "right") {
            verticals[row][column] = true;
        } else if (direction === "up") {
            horizontals[row - 1][column] = true;
        } else if (direction === "down") {
            horizontals[row][column] = true;
        }
    
        stepThroughCell(nextRow, nextColumn);
    }
    
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitSideLength + unitSideLength / 2,
            rowIndex * unitSideLength + unitSideLength,
            unitSideLength,
            5,
            {
                isStatic: true
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitSideLength + unitSideLength,
            rowIndex * unitSideLength + unitSideLength / 2,
            5,
            unitSideLength,
            {
                isStatic: true
            }
        );
        World.add(world, wall);
    });
});

// Goal

const goal = Bodies.rectangle(
    width - unitSideLength / 2,
    height - unitSideLength / 2,
    unitSideLength * .7,
    unitSideLength * .7
    // {
    //     isStatic: true
    // }
);

World.add(world, goal);

// Ball

const ball = Bodies.circle(
    unitSideLength / 2,
    unitSideLength / 2,
    unitSideLength / 3
    // {
    //     isStatic: true
    // }
);

World.add(world, ball);

document.addEventListener("keydown", event => {
    const { x, y } = ball.velocity;

    if (event.code === "KeyW") {
        
    }

    if (event.code === "KeyD") {

    }

    if (event.code === "KeyS") {

    }

    if (event.code === "KeyA") {

    }
});

