import * as PIXI from "pixi.js";
import Victor from "victor";

export default class Controller {
    constructor({ app, player }) {
        this.app = app;
        this.player = player;
        this.isPaused = false;

        // Initialize keysPressed as an empty object
        this.keysPressed = {};

        this.setupInputListeners(); // Call a separate method to set up input listeners
    }

    setupInputListeners() {
        window.addEventListener("keydown", (e) => {
            if (e.code === 'KeyW' || e.code === 'KeyS' || e.code === 'KeyA' || e.code === 'KeyD') {
                this.isPaused = false; // Resume updates on key press
                this.keysPressed[e.code] = true; // Set the corresponding key as pressed
            }
        });

        window.addEventListener("keyup", (e) => {
            this.isPaused = true;
            this.keysPressed[e.code] = false; // Set the corresponding key as released
        });
    }

    update(delta) {
        if (this.isPaused) {
            return; // Do not update if paused
        }

        const up = new Victor(0, -1);
        const down = new Victor(0, 1);
        const left = new Victor(-1, 0);
        const right = new Victor(1, 0);
        const speed = 2;

        // Calculate new position based on keys pressed
        let newPosition = new Victor(this.player.position.x, this.player.position.y);

        if (this.keysPressed['KeyW']) {
            newPosition.add(up.clone().multiplyScalar(speed * delta));
        }
        if (this.keysPressed['KeyS']) {
            newPosition.add(down.clone().multiplyScalar(speed * delta));
        }
        if (this.keysPressed['KeyA']) {
            newPosition.add(left.clone().multiplyScalar(speed * delta));
        }
        if (this.keysPressed['KeyD']) {
            newPosition.add(right.clone().multiplyScalar(speed * delta));
        }

        // Update player position
        this.player.position.set(newPosition.x, newPosition.y);
    }
}