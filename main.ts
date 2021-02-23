input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})

let ticks = 0
let bird: game.LedSprite = null
let index = 0
let obstacles: game.LedSprite[] = []
let gameSpeed = 1
bird = game.createSprite(0, 2)
bird.set(LedSpriteProperty.Blink, 300)

let MATRIX_LOAD_PIN: DigitalPin = DigitalPin.P16;
let MATRIX_INPUT_PIN: DigitalPin = DigitalPin.P15;
let MATRIX_UNUSED_PIN: DigitalPin = DigitalPin.P14;
let MATRIX_CLOCK_PIN: DigitalPin = DigitalPin.P13;

let JOYSTICK_X_PIN: AnalogPin = AnalogPin.P0;
let JOYSTICK_Y_PIN: AnalogPin = AnalogPin.P2;

//https://makecode.microbit.org/pkg/alankrantas/pxt-max7219_8x8
//https://kitronik.co.uk/products/4691-thumb-joystick?pr_prod_strat=copurchase&pr_rec_pid=4492245041215&pr_ref_pid=4492245172287&pr_seq=uniform

let NUMBER_OF_LED_MATRICES = 4

function setup() {
    max7219_matrix.setup(NUMBER_OF_LED_MATRICES, MATRIX_LOAD_PIN, MATRIX_INPUT_PIN, MATRIX_UNUSED_PIN, MATRIX_CLOCK_PIN);
    max7219_matrix.for_4_in_1_modules(rotation_direction.counterclockwise, true);
    max7219_matrix.scrollText("Hello World", 50, 50);
}


function removeOldSprites() {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
    }
}

function scroll() {
    for (let obstacle of obstacles) {
        obstacle.change(LedSpriteProperty.X, -1)
    }
}

function createNewObstacleIfRequired() {
    //Create a new obstacle on evert third tick - allowing 2 spaces to manouvre in!
    if (ticks % 3 == 0) {
        let gapInObstacle = randint(0, 4)
        for (let i = 0; i <= 4; i++) {
            if (i != gapInObstacle) {
                obstacles.push(game.createSprite(4, i))
            }
        }
    }
}
function checkForCollisions() {
    for (let obstacle of obstacles) {
        if (obstacle.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            game.gameOver()
        }
    }
}
function nextFrame() {
    ticks += 1
    basic.pause(1000/gameSpeed)
}
function gameLoop() {
    removeOldSprites();
    scroll();
    createNewObstacleIfRequired();
    checkForCollisions();
    nextFrame();
}

//Run the game loop forever(ish)

setup();
basic.forever(gameLoop);
