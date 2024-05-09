import Planet from "./planet.js";
import Player from "./player.js";
import Point from "./point.js";
import { Asteroid, Beetlemorph, Rhinomorph, Lobstamorph } from "./enemy.js";
import Ammo from "./ammo.js";

export default class Game
{
    constructor(screen)
    {
        console.log(`Game .ctor @ ${new Date().toLocaleString()}`);

        this.screen = screen;
        this.width = this.screen.width;
        this.height = this.screen.height;
        this.game_over = false;
        this.debug = false;
        this.score = 0;
        this.keys = [];
        this.ammo = [];
        this.ammo_count = 10;
        this.enemies = [];
        this.enemy_count = 20;
        this.enemy_timer = 0;
        this.enemy_interval = 1700;

        this.planet = new Planet(this);
        this.player = new Player(this);
        this.point = new Point(0, 0);
        
        this.createEnemyPool();
        
        //for (let index = 0; index < 5; index++)
        //{
            this.enemies[0].wake();
        //}

        this.createAmmoPool();
        //this.restart();

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
        });*/

        addEventListener("keyup", (event) =>
        {
            /*if (this.keys.indexOf(event.key) > -1)
            {
                this.keys.splice(index, 1);
            }*/
            if (event.key === "d")
            {
                this.debug = !this.debug;
            }
            else if (event.key === " ")
            {
                this.player.shoot();
            }
        });

        addEventListener("mousemove", (event) =>
        {
            this.point.x = event.offsetX;
            this.point.y = event.offsetY;
        });

        addEventListener("mousedown", (event) =>
        {
            this.point.x = event.offsetX;
            this.point.y = event.offsetY;
            this.player.shoot();
        });
    }

    draw(context)
    {
        this.planet.draw(context);
        this.player.draw(context);

        this.ammo.forEach((ammo) =>
        {
            ammo.draw(context);
        });

        this.enemies.forEach((enemy) =>
        {
            enemy.draw(context);
        });
        /*context.beginPath();
        context.moveTo(this.planet.x, this.planet.y);
        context.lineTo(this.point.x, this.point.y);
        context.stroke();*/
        
        this.setGameText(context);
    }

    update(delta_time)
    {
        this.player.update(delta_time);

        this.ammo.forEach((ammo) =>
        {
            ammo.update(delta_time);
        });

        this.enemies.forEach((enemy) =>
        {
            enemy.update(delta_time);
        });

        if (this.enemy_timer < this.enemy_interval)
        {
            this.enemy_timer += delta_time;
        }
        else
        {
            this.enemy_timer = 0;

            const enemy = this.getEnemyFromPool();

            if (enemy)
            {
                enemy.wake();
            }
        }
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

    createEnemyPool()
    {
        for (let index = 0; index < this.enemy_count; index++)
        {
            this.enemies.push(new Asteroid(this));
        }
    }

    getEnemyFromPool()
    {
        for (let index = 0; index < this.enemies.length; index++)
        {
            if (this.enemies[index].free === true)
            {
                return this.enemies[index];
            }
        }
    }

    createAmmoPool()
    {
        for (let index = 0; index < this.ammo_count; index++)
        {
            this.ammo.push(new Ammo(this));
        }
    }

    getAmmoFromPool()
    {
        for (let index = 0; index < this.ammo.length; index++)
        {
            if (this.ammo[index].free === true)
            {
                return this.ammo[index];
            }
        }
    }

    trajectory(a, b)
    {
        const dx = a.x - b.x; // horizontal distance between a and b
        const dy = a.y - b.y; // vertical distance between a and b
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance * -1; // horizontal direction between a and b
        const aimY = dy / distance * -1; // vertical direction between a and b

        return [aimX, aimY, dx, dy];
    }

    isCollision(a, b)
    {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const sum = a.radius + b.radius;

        return distance < sum;
    }
}