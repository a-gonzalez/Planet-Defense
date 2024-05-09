export default class Planet
{
    constructor(game)
    {
        console.log(`Planet .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.radius = 80;

        this.image = new Image();
        this.image.src = "img/planet.png";
    }

    draw(context)
    {
        context.drawImage(this.image, this.x - 100, this.y - 100);

        if (this.game.debug === true)
        {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.stroke();
        }
    }
}