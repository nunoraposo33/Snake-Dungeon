const MAP_WIDTH = 500;
const MAP_HEIGHT = 500;
const TILE_SIZE = 25;
const PLAYER_SPEED = 1.2;
const ENEMY_SPEED = 2

let { init, Sprite, GameLoop, initKeys, keyPressed, load, setImagePath, imageAssets } = kontra
let { canvas } = init();
let level = "lvl1";
let loop = null;

setImagePath('./assets/');
load('cup.gif', 'eup.gif', 'gametiles.png').then(function () {
  initKeys();
  let mainCharacter = getMainCharacter()
  loadLevel(mainCharacter)

})


function loadLevel(mainCharacter) {
  let enemys = [
    getEnemy(400, 400, 'up', [{ x: 50, y: 50 }, { x: 400, y: 400 }])
  ]


  loop = GameLoop({
    update: function () {

      if (keyPressed('d') || keyPressed('right')) {
        mainCharacter.right()
      }
      if (keyPressed('a') || keyPressed('left')) {
        mainCharacter.left()
      }

      if (keyPressed('w') || keyPressed('up')) {
        mainCharacter.up()
      }

      if (keyPressed('s') || keyPressed('down')) {
        mainCharacter.down()
      }

      if (mainCharacter) {
        mainCharacter.update();
      }

      enemys.forEach(enemy => {
        enemy.AI();
        enemy.update();
      });

    },
    render: function () {
      if (typeof tileEngine !== 'undefined') {
        tileEngine.render();
      }
      if (typeof mainCharacter !== 'undefined') {
        mainCharacter.render();
      }

      enemys.forEach(enemy => {
        enemy.render();
      });
    }
  });

  loop.start();
}
