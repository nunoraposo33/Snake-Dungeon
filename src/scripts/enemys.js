const EnemysFactory = [
    {
        lvl: "lvl1",
        data: [
            getEnemy(400, 400, 'up', [{ x: 50, y: 50 }, { x: 400, y: 400 }])
        ]
    }
]

function getEnemysForLevel(level) {
    let lvl = EnemysFactory.find(element => {
        return element.lvl == level
    })

    if (lvl) {
        return lvl.data
    } else {
        console.error("Level Not found")
    }
}