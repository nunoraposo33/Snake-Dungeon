function getEnemy(id, x, y, waypoints) {
    waypoints.unshift({ x, y });
    let common = commonPlayerEnenmy(ENEMY_SPEED, 'eup');
    return Sprite({
        ...common,
        type: "enemy",
        id: id,
        mode: "patrol",
        waypoints: waypoints,
        currentWaypoint: waypoints[0],
        x: x,
        y: y,
        turning: false,
        mainCharacter: null,
        canFire: true,
        coneView: getConeView(this),
        setMainChar: function (c) {
            this.mainCharacter = c
        },
        AI: function () {
            if (this.mode == 'patrol') {
                this.patrol()
            } else if ('attack') {
                this.attack()
            } else if ('pursuit') {

            }
        },

        lookArround: function () {
            this.coneView.x = this.x
            this.coneView.direction = radians_to_degrees(this.rotation)
            this.coneView.y = this.y
            this.coneView.update();

            const dist = Math.sqrt((this.mainCharacter.x - this.x) ** 2 + (this.mainCharacter.y - this.y) ** 2);
            aim[this.id] = []


            if (dist <= ENEMY_VISION_RANGE + PLAYER_SIZE) {
                let a = (angle(this.mainCharacter.x, this.mainCharacter.y, this.x, this.y))

                if (Math.abs(a - radians_to_degrees(this.rotation)) <= ENEMY_ANGLE_VISION / 2) {

                    let pointNum = ENEMY_VISION_RANGE / PLAYER_SIZE


                    let diff_x = this.mainCharacter.x - this.x
                    let diff_y = this.mainCharacter.y - this.y

                    let interval_X = diff_x / (pointNum + 1);
                    let interval_Y = diff_y / (pointNum + 1);

                    let points = []

                    for (let i = 0; i <= pointNum; i++) {
                        points.push({ x: this.x + interval_X * i, y: this.y + interval_Y * i, width: 1, height: 1 })
                    }

                    let canSee = true
                    points.some(point => {
                        let p = Sprite({
                            x: point.x,
                            y: point.y,
                            width: point.width,
                            height: point.height,
                            ttl: 50,
                            color: 'green'
                        });

                        aim[this.id].push(p)
                        if (tileEngine.layerCollidesWith(level, point)) {
                            canSee = false;
                            return true
                        }
                    })

                    if (canSee) {
                        this.mode = 'attack'
                        console.log("Found yoou")
                    }
                }
            }
        },
        patrol: function () {
            if (Math.abs(this.x - this.currentWaypoint.x) > PLAYER_SIZE) {
                // move in x axis
                if (this.x - PLAYER_SIZE < this.currentWaypoint.x) {
                    this.right()
                } else {
                    this.left()
                }
            } else if (Math.abs(this.y - this.currentWaypoint.y) > PLAYER_SIZE) {
                // move in y axis
                if (this.y - PLAYER_SIZE < this.currentWaypoint.y) {
                    this.down()
                } else {
                    this.up()
                }
            } else {
                this.turn()
            }

            this.lookArround()
        },

        attack: function () {
            if (this.canFire) {
                this.canFire = false
                bullets.push(getBullet(this, this.mainCharacter))

                setTimeout(() => {
                    this.canFire = true
                }, ENEMY_FIRE_DELAY)
            }

            this.mode = "patrol"
        },

        turn: function () {
            if (!this.turning) {
                this.turning = true
                setTimeout(() => {
                    this.turning = false
                    let wpInd = this.waypoints.findIndex((val) => {
                        return val.x == this.currentWaypoint.x && val.y == this.currentWaypoint.y
                    })

                    if (wpInd == this.waypoints.length - 1) {
                        this.waypoints.reverse();
                    }

                    this.currentWaypoint = this.waypoints[(wpInd + 1) % this.waypoints.length]
                }, ENEMY_TURN_DELAY)
            }
        },
    });
}   