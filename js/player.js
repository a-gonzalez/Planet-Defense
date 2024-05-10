export default class Player
{
    constructor(game)
    {
        console.log(`Player .ctor ${new Date().toLocaleString()}`);

        this.game = game;
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.lives = 3;
        this.lives_max = 5;
        this.angle = 0;
        this.radius = 40;
        this.target = [];

        this.image = new Image();
        this.image.src = "img/player.png";
    }

    draw(context)
    {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.radius, -this.radius);
        
        if (this.game.debug === true)
        {
            context.beginPath();
            context.arc(0, 0, this.radius, 0, Math.PI * 2);
            context.stroke();
        }
        context.restore();
    }

    update(delta_time)
    {
        //this.x = this.game.point.x;
        //this.y = this.game.point.y;
        this.target = this.game.trajectory(this.game.planet, this.game.point);
        this.x = this.game.planet.x + (this.game.planet.radius + this.radius) * this.target[0];
        this.y = this.game.planet.y + (this.game.planet.radius + this.radius) * this.target[1];
        this.angle = Math.atan2(this.target[3], this.target[2]);
    }

    restart()
    {
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.angle = 0;
        this.target = [];
    }

    shoot()
    {
        const ammo = this.game.getAmmoFromPool();

        if (ammo)
        {
            ammo.wake(this.x + this.radius * this.target[0], this.y + this.radius * this.target[1], this.target[0], this.target[1]);
        }
    }
}