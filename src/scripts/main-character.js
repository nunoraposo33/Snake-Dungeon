function getMainCharacter() {
    return Sprite({
        type: "player",
        x: 50,
        y: 50,
        rotation: 0,
        anchor: { x: 0.5, y: 0.5 },
        image: imageAssets['cup'],
        right: function () {
            if (!this.willHitSomething("right")) {
                this.x += PLAYER_SPEED
                this.rotation = degrees_to_radians(90)
            }
        },
        left: function () {
            if (!this.willHitSomething("left")) {
                this.x -= PLAYER_SPEED
                this.rotation = degrees_to_radians(270)
            }
        },
        up: function () {
            if (!this.willHitSomething("up")) {
                this.y -= PLAYER_SPEED
                this.rotation = degrees_to_radians(0)
            }
        },
        down: function () {
            if (!this.willHitSomething("down")) {
                this.y += PLAYER_SPEED
                this.rotation = degrees_to_radians(180)
            }
        },
        willHitSomething: function (direction) {

            let r = false
            switch (direction) {
                case 'up':
                    r = tileEngine.layerCollidesWith('lvl1', { x: this.x - TILE_SIZE / 2, y: this.y - PLAYER_SPEED - TILE_SIZE / 2, height: this.height, width: this.width })
                    break;
                case 'down':
                    r = tileEngine.layerCollidesWith('lvl1', { x: this.x - TILE_SIZE / 2, y: this.y + PLAYER_SPEED - TILE_SIZE / 2, height: this.height, width: this.width })
                    break;
                case 'left':
                    r = tileEngine.layerCollidesWith('lvl1', { x: this.x - PLAYER_SPEED - TILE_SIZE / 2, y: this.y - TILE_SIZE / 2, height: this.height, width: this.width })
                    break;
                case 'right':
                    r = tileEngine.layerCollidesWith('lvl1', { x: this.x + PLAYER_SPEED - TILE_SIZE / 2, y: this.y - TILE_SIZE / 2, height: this.height, width: this.width })
                    break;
            }

            // Check enemy collisions
            // TODO


            return r

        }
    });
}   