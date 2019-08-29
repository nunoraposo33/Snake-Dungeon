function getMainCharacter() {

    let common = commonPlayerEnenmy(PLAYER_SPEED, 'cup');
    return Sprite({
        type: "player",
        x: 50,
        y: 50,
        ...common
    });
}   