// 创建记分板
// 给一个全局变量，记录人物分数
var score = {count:0};

// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.speed = speed;

    this.x = x;
    this.y = y;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = './images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    this.checkCollisions();
    this.backToBegin();
};


//回到终点
Enemy.prototype.backToBegin = function() {
    if(this.x > 505) {
        // 随机虫子的起始位置
        this.x = Math.floor(Math.random() * (-800));
        if(this.x > -50) {
            this.x = - 101;
        }
    }
}

// 检测碰撞函数
Enemy.prototype.checkCollisions = function () {
    // 获取图片元素，以便使用其宽度判定碰撞范围
    var img = Resources.get(this.sprite);
    if(this.y === player.y){
        if(Math.abs(this.x - player.x) <= img.width - 40) {
            player.reStart();
            score.count -= 1;
            if(score.count < 0) {
                score.count = 0;
            }
            document.getElementById('count').innerHTML = 'Your Score: ' + score.count;
        }
    }
}
// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};



// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = './images/char-boy.png';// 这里因为没有加./踩了坑，以后记住了
}

//归位函数
Player.prototype.reStart = function() {
    this.y = 83 * 4 + 55;
}
// 小人跳过河之后的归位函数
Player.prototype.playAgain = function() {
    var score_count = Math.floor((score.count / 10) + 1) * 10;
    if (this.y <= -28) {
        this.reStart();
        score.count += 2;
        console.log(score.count);
        document.getElementById('count').innerHTML = 'Your Score: ' + score.count;
        if( score.count >= score_count ) {
            bugCount += 1;
            enemyCount();
            console.log(bugCount);
        }
    }
}

Player.prototype.update = function() {
    this.playAgain();
}

Player.prototype.handleInput = function(movement) {
    switch (movement) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
        break;
        case 'right': 
            if (this.x < 404) {
                this.x += 101 // 人物到达最右边一格this.x = 404 这种情况下不应再
                            // 移动， 因此只用小于404即可
            }
        break;
        case 'up': 
            if (this.y > -28) {
                this.y -= 83;
            }
        break;
        case 'down': 
            if (this.y < 387){
                this.y += 83;
            }
        break;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// 利用一个分数数组，来去除重复分数
var count_Arr = [];
// 把每次的分数都push到数组里
// 创建虫子移动速度变量
var bugspeed = function() {
    var speed = Math.floor(Math.random()*1000);
    if(score.count <= 20) {
        speed = 200;
    } else if(score.count <=50 && score.count > 20) {
        speed = 400;
    } else {
        speed = 800;
    }
    return speed;
}
//随机虫子出现的行
var bugRow = function() {
    return Math.floor(Math.random() * 4) * 83 + 55;
}

// 随机虫子起始位置
var bugBegin = function() {
    var bugX = 0 - Math.floor(Math.random() * 1500);
    return bugX;
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(303, 83 * 4 + 55);// 55 是虫子或者人物图片原点距离 y = 0 的长
var allEnemies = [
        new Enemy(0, bugRow(), bugspeed()),
        new Enemy(-200, bugRow(), bugspeed()),
        new Enemy(-400, bugRow(), bugspeed())
    ];

//创建多个enemy实例，根据count.count决定虫子增加的个数
var bugCount = 3;

var enemyCount = function() {
    if(allEnemies.length >= 6) {
        return
    } else {
        allEnemies.length = bugCount;
        allEnemies.push(new Enemy(bugBegin(), bugRow(), bugspeed()));
        console.log(allEnemies);
    }

}

// var speedUp = function() {
//     if(score.count <=50 && score.count > 20) {
//         allEnemies = [];
//         enemyCount();
//     } else if(score.count > 50) {
//         allEnemies = [];
//         enemyCount();
//     }
// }

enemyCount();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var calculate = document.createElement('p');
    calculate.setAttribute('id', 'count');
    document.body.appendChild(calculate);
document.getElementById('count').innerHTML = 'Your Score: ' + score.count;



















