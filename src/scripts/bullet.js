
function getBullet(origin, destiny) {

    let diff_x = (destiny.x - origin.x) / 360
    let diff_y = (destiny.y - origin.y) / 360

   
    return Sprite({
        type: "bullet",
        x: origin.x,
        y: origin.y,
        height: 2,
        width: 2,
        ttl: 500,
        // move the bullet slightly faster than the ship
        dx: diff_x * 10,
        dy: diff_y * 10,

        color: 'white',
    })
}