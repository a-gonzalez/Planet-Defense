export default class Player
{
    constructor(game)
    {
        console.log(`Player .ctor ${new Date().toLocaleString()}`);

        this.game = game;
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.radius = 40;

        this.image = new Image();
        this.image.src = "img/player.png";
    }

    draw(context)
    {
        context.drawImage(this.image, this.x - this.radius, this.y - this.radius);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
    }

    update(delta_time)
    {
        //this.x = this.game.point.x;
        //this.y = this.game.point.y;
    }

    restart()
    {
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
    }
}