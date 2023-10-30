export default class Ball {
    #pixiApp;
    #spritesheet;
    ball;
    isForward;
    count;
    animBall;

    constructor(pixiApp, spritesheet) {
        this.isForward = false;
        this.count = 0;
        this.#pixiApp = pixiApp;
        this.#spritesheet = spritesheet;

        this.#settingBall();
    }

    #settingBall() {
        this.ball = document.getElementById('ball');

        this.ball.style.width = 100 + 'px';
        this.ball.style.height = 100 + 'px';

        this.ball.addEventListener('click', function () {
            this.count++;
            if (this.count === 1)
                this.animateBall();
            console.log(this.count);
        }.bind(this));
        this.ball.appendChild(this.#pixiApp.view);
    }

    animationInit() {
        this.animBall = new PIXI.AnimatedSprite(this.#spritesheet.animations.enemy);

        this.animBall.scale.set(0.7);
        this.animBall.x = 560;
        this.animBall.y = 180;

        this.animBall.animationSpeed = 0.191;
        this.#pixiApp.stage.addChild(this.animBall);
    }

    async animateBall() {

        if (this.count === 0)
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

        this.animBall.play();
        (await anim.play())
            .then(function () {
                this.animBall.stop();
                this.count--;
                this.isForward = !this.isForward;
                console.log(12312321);
                if (this.count > 0)
                    this.animateBall();
            }.bind(this));
    }

}