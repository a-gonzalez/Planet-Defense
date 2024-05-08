import Planet from "./planet.js";
import Player from "./player.js";
import Point from "./point.js";

export default class Game
{
    constructor(screen)
    {
        console.log(`Game .ctor @ ${new Date().toLocaleString()}`);

        this.screen = screen;
        this.width = this.screen.width;
        this.height = this.screen.height;
        this.game_over = false;
        this.game_debug = false;
        this.score = 0;
        this.keys = [];

        this.planet = new Planet(this);
        this.player = new Player(this);
        this.point = new Point(0, 0);
        
        this.restart();

        /*addEventListener("keydown", (event) =>
        {
            if (this.keys.indexOf(event.key) === -1 && this.game_over === false)
            {
                this.keys.push(event.key);
            }

            if (event.key === "R" && this.game_over === true)
            {
                this.restart();
            }
        });

        addEventListener("keyup", (event) =>
        {
            if (this.keys.indexOf(event.key) > -1)
            {
                this.keys.splice(index, 1);
            }
        });*/

        addEventListener("mousemove", (event) =>
        {
            this.point.x = event.offsetX;
            this.point.y = event.offsetY;
        });

    }

    draw(context)
    {
        this.planet.draw(context);
        this.player.draw(context);

        context.beginPath();
        context.moveTo(this.planet.x, this.planet.y);
        context.lineTo(this.point.x, this.point.y);
        context.stroke();
        
        this.setGameText(context);
    }

    update(delta_time)
    {
        this.player.update(delta_time);
    }

    setGameText(context)
    {
        context.fillText(`Score  ${this.score}`, 20, 40);

        if (this.game_over === true)
        {
            context.save();
            context.shadowOffsetX = 5;
            context.shadowOffsetY = 5;
            context.shadowColor = "#000000";
            context.textAlign = "center";
            context.font = "80px space shards";
            context.fillStyle = "#ff0000";
            context.fillText("Game Over!", this.width * 0.5, this.height * 0.5);
            context.font = "25px arial";
            context.fillText("Press R To Restart.", this.width * 0.5, this.height * 0.5 + 35);
            context.restore();
        }
    }

    restart()
    {
        this.game_over = false;
        this.score = 0;

        this.player.restart();
    }

    isAHit(enemy, projectile)
    { // collision detection between two rectagles
        return (enemy.x < projectile.x + projectile.width &&
            enemy.x + enemy.width > projectile.x &&
            enemy.y < projectile.y + projectile.height &&
            enemy.y + enemy.height > projectile.y);
    }
}