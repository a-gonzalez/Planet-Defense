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
        this.score_win = 30;
        this.ammo = [];
        this.ammo_count = 20;
        this.enemies = [];
        this.enemy_count = 10;
        this.enemy_timer = 0;
        this.enemy_interval = 1000;
        this.sprite_update = false;
        this.sprite_timer = 0;
        this.sprite_interval = 150;
        this.lives = 3;
        this.lives_max = 5;

        this.planet = new Planet(this);
        this.player = new Player(this);
        this.point = new Point(0, 0);
        
        this.createEnemyPool();
        this.createAmmoPool();
        //this.restart();

        addEventListener("keyup", (event) =>
        {
            if (event.key === "d")
            {
                this.debug = !this.debug;
            }
            else if (event.key === " " && this.game_over === false)
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

            if (this.game_over === false)
            {
                this.player.shoot();
            }
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

        this.setGameText(context);
        /*context.beginPath();
        context.moveTo(this.planet.x, this.planet.y);
        context.lineTo(this.point.x, this.point.y);
        context.stroke();*/
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

        if (this.game_over === false)
        {
            if (this.enemy_timer < this.enemy_interval)
            {// enemy spawn timer
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

        if (this.sprite_timer < this.sprite_interval)
        {
            this.sprite_timer += delta_time;
            this.sprite_update = false;
        }
        else
        {
            this.sprite_timer = 0;
            this.sprite_update = true;
        }

        if (this.lives < 1)
        {
            this.game_over = true;
        }
    }

    setGameText(context)
    {
        context.fillText(`Score  ${this.score}`, 10, 30);
        context.fillText("Lives", 10, 65);

        for (let index = 0; index < this.lives_max; index++)
        {
            context.strokeRect(90 + 15 * index, 50, 10, 15);
        }

        for (let index = 0; index < this.lives; index++)
        {
            context.fillRect(90 + 15 * index, 50, 10, 15);
        }

        if (this.game_over === true)
        {
            context.save();
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowColor = "#000000";
            context.textAlign = "center";
            context.font = "80px space shards";
            context.fillStyle = "#ff0000";
            context.fillText("Game Over!", this.width * 0.5, 250);
            
            if (this.score >= this.score_win)
            {
                context.fillStyle = "#ffd700";
                context.font = "35px space shards";
                context.fillText("You Win!", 160, this.height * 0.5);
                context.fillText(`Score ${this.score}`, 600, this.height * 0.5);
            }
            else
            {
                context.font = "35px space shards";
                context.fillText("You Lose!", 160, this.height * 0.5);
                context.fillText("Try Again.", 600, this.height * 0.5);
            }
            //context.fillText("Press R To Restart.", this.width * 0.5, 500);
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
            let roll = Math.random();

            if (roll < 0.25)
            {
                this.enemies.push(new Asteroid(this));
            }
            else if (roll < 0.5)
            {
                this.enemies.push(new Beetlemorph(this));
            }
            else if (roll < 0.75)
            {
                this.enemies.push(new Rhinomorph(this));
            }
            else
            {
                this.enemies.push(new Lobstamorph(this));
            }
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