let { init, Sprite, GameLoop, initKeys, keyPressed, load, setImagePath, imageAssets } = kontra
let { canvas } = init();
setImagePath('./assets/');
load('char.gif', 'gametiles.png').then(function () {

  initKeys();

  let mainCharacter = getMainCharacter()

  let loop = GameLoop({
    update: function () {

      if (keyPressed('d') || keyPressed('right')) {
        mainCharacter.x += 1
      }
      if (keyPressed('a') || keyPressed('left')) {
        mainCharacter.x -= 1
      }

      if (keyPressed('w') || keyPressed('up')) {
        mainCharacter.y -= 1
      }

      if (keyPressed('s') || keyPressed('down')) {
        mainCharacter.y += 1
      }

      if (mainCharacter) {
        mainCharacter.update();
      }

    },
    render: function () {
      if (typeof tileEngine !== 'undefined') {
        tileEngine.render();
      }
      if (typeof mainCharacter !== 'undefined') {
        mainCharacter.render();
      }
    }
  });

  loop.start();
})
