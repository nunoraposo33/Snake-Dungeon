function getEnemy(x, y, direction, waypoints) {
    return Sprite({
        type: "enemy",
        mode: "patrol",
        waypoints: waypoints,
        currentWaypoint: waypoints[0],
        x: x,
        y: y,
        anchor: { x: 0.5, y: 0.5 },
        turning: false,
        rotation: 0,
        image: imageAssets['eup'],
        AI: function () {

            if (this.x != this.currentWaypoint.x) {
                if (this.x < this.currentWaypoint.x) {
                    this.right()
                } else if (this.x > this.currentWaypoint.x) {
                    this.left()
                } else {
                    if (!this.turning) {
                        this.turning = true
                        setTimeout(() => {
                            this.turning = false
                            let wpInd = this.waypoints.findIndex((val) => {
                                return val.x == this.currentWaypoint.x && val.y == this.currentWaypoint.y
                            })
                            this.currentWaypoint = this.waypoints[(wpInd + 1) % this.waypoints.length]
                        }, 2000)

                    }
                }
            } else {
                if (this.y < this.currentWaypoint.y) {
                    this.down()
                } else if (this.y > this.currentWaypoint.y) {
                    this.up()
                } else {


                    if (!this.turning) {
                        this.turning = true
                        setTimeout(() => {
                            this.turning = false
                            let wpInd = this.waypoints.findIndex((val) => {
                                return val.x == this.currentWaypoint.x && val.y == this.currentWaypoint.y
                            })
                            this.currentWaypoint = this.waypoints[(wpInd + 1) % this.waypoints.length]
                        }, 2000)

                    }

                }
            }
        },

        right: function () {
            if (!this.willHitSomething("right")) {
                this.direction = 'right'
                this.x += ENEMY_SPEED
                this.rotation = degrees_to_radians(90)

            }
        },
        left: function () {
            if (!this.willHitSomething("left")) {
                this.direction = 'left'
                this.x -= ENEMY_SPEED
                this.rotation = degrees_to_radians(270)
            }
        },
        up: function () {
            if (!this.willHitSomething("up")) {
                this.direction = 'up'
                this.y -= ENEMY_SPEED
                this.rotation = degrees_to_radians(0)
            }
        },
        down: function () {
            if (!this.willHitSomething("down")) {
                this.direction = 'down'
                this.y += ENEMY_SPEED
                this.rotation = degrees_to_radians(180)

            }
        },
        willHitSomething: function (direction) {

            let r = false
            switch (direction) {
                case 'up':
                    r = tileEngine.layerCollidesWith('lvl1', { x: this.x - TILE_SIZE / 2, y: this.y - ENEMY_SPEED - TILE_SIZE / 2, height: this.height - 1, width: this.width - 1 })
                    break;
                case 'down':
                    r = tileEngine.layerCollidesWith('lvl1', { x: this.x - TILE_SIZE / 2, y: Math.ceil(this.y + ENEMY_SPEED) - TILE_SIZE / 2, height: this.height - 1, width: this.width - 1 })
                    break;
                case 'left':
                    r = tileEngine.layerCollidesWith('lvl1', { x: Math.ceil(this.x - ENEMY_SPEED) - TILE_SIZE / 2, y: this.y - TILE_SIZE / 2, height: this.height - 1, width: this.width - 1 })
                    break;
                case 'right':
                    r = tileEngine.layerCollidesWith('lvl1', { x: Math.ceil(this.x + ENEMY_SPEED) - TILE_SIZE / 2, y: this.y - TILE_SIZE / 2, height: this.height - 1, width: this.width - 1 })
                    break;
            }

            // Check player collisions
            // TODO


            return r

        }
    });
}   