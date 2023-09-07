const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const horizontalCells = 5;
const verticalCells = 4;
const width = window.innerWidth;
const height = window.innerHeight;
const cellSideX = width / horizontalCells;
const cellSideY = height / verticalCells;

const engine = Engine.create();
engine.world.gravity.y = 0;
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

const grid = Array(verticalCells).fill(null).map(() => Array(horizontalCells).fill(false));

const verticals = Array(verticalCells).fill(null).map(() => Array(horizontalCells - 1).fill(false));

const horizontals = Array(verticalCells - 1).fill(null).map(() => Array(horizontalCells).fill(false));

const startRow = Math.floor(Math.random() * verticalCells);
const startColumn = Math.floor(Math.random() * horizontalCells);

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
        if (nextRow < 0 || nextRow >= verticalCells || nextColumn < 0 || nextColumn >= horizontalCells) {
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
            columnIndex * cellSideX + cellSideX / 2,
            rowIndex * cellSideY + cellSideY,
            cellSideX,
            5,
            {
                label: "wall",
                isStatic: true,
                render: {
                    fillStyle: "orange"
                }
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
            columnIndex * cellSideX + cellSideX,
            rowIndex * cellSideY + cellSideY / 2,
            5,
            cellSideY,
            {
                label: "wall",
                isStatic: true,
                render: {
                    fillStyle: "orange"
                }
            }
        );
        World.add(world, wall);
    });
});

// Goal

const goal = Bodies.rectangle(
    width - cellSideX / 2,
    height - cellSideY / 2,
    cellSideX * .7,
    cellSideY * .7,
    {
        label: "goal",
        isStatic: true,
        render: {
            fillStyle: "green"
        }
    }
);

World.add(world, goal);

// Ball
const ballRadius = Math.min(cellSideX, cellSideY) / 3;
const ball = Bodies.circle(
    cellSideX / 2,
    cellSideY / 2,
    ballRadius,
    {
        label: "ball",
        render: {
            fillStyle: "red"
        }
    }
);

World.add(world, ball);

document.addEventListener("keydown", event => {
    const { x, y } = ball.velocity;

    if (event.code === "KeyW") {
        Body.setVelocity(ball, { x, y: y - 5 });
    }

    if (event.code === "KeyD") {
        Body.setVelocity(ball, { x: x + 5, y });
    }

    if (event.code === "KeyS") {
        Body.setVelocity(ball, { x, y: y + 5 });
    }

    if (event.code === "KeyA") {
        Body.setVelocity(ball, { x: x - 5, y });
    }
});

// Win condition
Events.on(engine, "collisionStart", event => {
    event.pairs.forEach(collision => {
        const labels = ["ball", "goal"];

        if (
            labels.includes(collision.bodyA.label) &&
            labels.includes(collision.bodyB.label)
        ) {
            document.querySelector(".winner").classList.remove("hidden");
            world.gravity.y = 1;
            world.bodies.forEach(body => {
                if (body.label === "wall") {
                    Body.setStatic(body, false);
                }
            });
        }
    });
});
