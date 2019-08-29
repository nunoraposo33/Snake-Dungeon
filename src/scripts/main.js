const MAP_WIDTH = 500
const MAP_HEIGHT = 500
const TILE_SIZE = 20
const PLAYER_SIZE = 10
const PLAYER_SPEED = 4

const ENEMY_SPEED = 0;
const ENEMY_TURN_DELAY = 1000
const ENEMY_VISION_RANGE = 70
const ENEMY_ANGLE_VISION = 90
const BULLET_SPEED_MULTIPLIER = 1
const ENEMY_FIRE_DELAY = 100 // 100 = pewpewpewpewpew | 300 = pew pew pew pew pew | 1000 = pew

let { init, Sprite, GameLoop, initKeys, keyPressed, load, setImagePath, imageAssets } = kontra
let { canvas } = init();
let level = "lvl1";
let loop = null;
let aim = {}
let bullets = []

setImagePath('./assets/');
load('cup.png', 'eup.png', 'gametiles.png').then(function () {
  initKeys();

  let mainCharacter = getMainCharacter()
  loadLevel(mainCharacter)
})

function setLevel(lvl) {
  if (loop) {
    loop.stop();
    level = lvl;
    loop.start();
  }
}

function loadLevel(mainCharacter) {
  let enemys = getEnemysForLevel(level)

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
        enemy.coneView.update();


      });

      for (let k in aim) {
        aim[k].forEach(t => {
          t.update();
        })
      }

      bullets.forEach(b => {
        b.update()
        if (tileEngine.layerCollidesWith(level, b)) {
          b.ttl = 0
        }
      })


      bullets = bullets.filter(bullet => bullet.isAlive())

    },

    render: function () {
      if (typeof tileEngine !== 'undefined') {
        tileEngine.renderLayer(level);
      }
      if (typeof mainCharacter !== 'undefined') {
        mainCharacter.render();
      }



      enemys.forEach(enemy => {
        enemy.setMainChar(mainCharacter)
        enemy.render();
        enemy.coneView.render();
      });

      for (let k in aim) {
        aim[k].forEach(t => {
          t.render();
        })
      }

      bullets.forEach(b => {
        b.render()
      })
    }
  });

  loop.start();
}
