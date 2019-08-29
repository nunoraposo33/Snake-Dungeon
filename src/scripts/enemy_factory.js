function getEnemysForLevel(level) {
    if (level == 'lvl1') {
        return [
            getEnemy(1,400, 400, [
                { x: 290, y: 400 },
                { x: 290, y: 470 },
                { x: 400, y: 470 },
                { x: 400, y: 400 }
            ]),
            getEnemy(2,430, 60, [
                { x: 350, y: 50 },
                { x: 350, y: 240 },
                { x: 480, y: 240 },
                { x: 480, y: 50 },
                { x: 450, y: 50 }
            ])
            ,
            getEnemy(3,100, 330, [
                { x: 320, y: 330 }
            ])

        ]
    }
}