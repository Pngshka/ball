gsap.registerPlugin(MotionPathPlugin);

const _pixiApp = new PIXI.Application({ resizeTo: window, backgroundAlpha: 0 });
document.body.appendChild(_pixiApp.view);

const ele = document.getElementById('ball');
ele.style.width = 100 + 'px';
ele.style.height = 100 + 'px';

ele.appendChild(_pixiApp.view);

const atlasData = {
    frames: {
        animations1: {
            frame: { x: 138, y: 16, w: 174, h: 174 },
            sourceSize: { w: 174, h: 174 },
            spriteSourceSize: { x: 0, y: 0, w: 174, h: 174 }
        },
        animations2: {
            frame: { x: 579, y: 47, w: 174, h: 174 },
            sourceSize: { w: 174, h: 174 },
            spriteSourceSize: { x: 0, y: 0, w: 174, h: 174 }
        },
        animations3: {
            frame: { x: 1016, y: 169, w: 174, h: 174 },
            sourceSize: { w: 174, h: 174 },
            spriteSourceSize: { x: 0, y: 0, w: 174, h: 174 }
        },
        animations4: {
            frame: { x: 1441, y: 278, w: 211, h: 121 },
            sourceSize: { w: 211, h: 121 },
            spriteSourceSize: { x: 0, y: 0, w: 211, h: 121 }
        },
        animations5: {
            frame: { x: 1910, y: 154, w: 158, h: 183 },
            sourceSize: { w: 158, h: 183 },
            spriteSourceSize: { x: 0, y: 0, w: 158, h: 183 }
        },
        animations6: {
            frame: { x: 2339, y: 56, w: 174, h: 174 },
            sourceSize: { w: 174, h: 174 },
            spriteSourceSize: { x: 0, y: 0, w: 174, h: 174 }
        },
    },
    meta: {
        image: '../photo.png',
        format: 'RGBA8888',
        size: { w: 2640, h: 440 },
        scale: 1
    },
    animations: {
        enemy: ['animations1', 'animations2', 'animations3', 'animations4', 'animations3', 'animations2', 'animations1', 'animations2', 'animations3', 'animations4', 'animations3', 'animations2', 'animations1', 'animations2', 'animations3', 'animations4', 'animations3', 'animations2', 'animations1'] //array of frames by name
    }
}

const spritesheet = new PIXI.Spritesheet(
    PIXI.BaseTexture.from(atlasData.meta.image),
    atlasData
);
await spritesheet.parse();

const animBall = new PIXI.AnimatedSprite(spritesheet.animations.enemy);

animBall.scale.set(0.7);
animBall.x = 560;
animBall.y = 180;

animBall.animationSpeed = 0.191; 

_pixiApp.stage.addChild(animBall);
const ball = document.getElementById("ball");
let isForward = false;
var count = 0;

async function animateBall() {
    if (count == 0)
        return;

    function sineEase(repeat = 1, attenuation = 0) {
        return function (x) {
            return Math.sin(x * Math.PI * repeat) *
                (Math.pow(1 - x, 2) * attenuation + (1 - attenuation));
        };
    }

    var anim = gsap.timeline()
        .fromTo(ball, 2.0,
            {
                xPercent: "+=" + 0
            },
            {
                xPercent: "+=" + 100, ease: "linear"
            }, 0.0)
        .fromTo(ball, 0.5,
            {
                yPercent: 0
            },
            {
                yPercent: -100, ease: sineEase(1), repeat: 3
            }, 0.0);

    animBall.play();
    (await anim.play())
        .then(function () {
            animBall.stop();
            count--;
            isForward = !isForward;
            console.log(12312321);
            if (count > 0)
                animateBall();
        });
}

ball.addEventListener('click', function () {
    count++;
    if (count == 1)
        animateBall();
    console.log(count);
})







