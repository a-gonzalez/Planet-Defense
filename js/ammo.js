export default class Ammo
{
    constructor(game)
    {
        this.game = game;
        this.x = 40;
        this.y = 40;
        this.speed_x = 0.5;
        this.speed_y = 0.5;
        this.speed_modifier = 4;
        this.radius = 3;
        this.free = true;
    }

    draw(context)
    {
        if (this.free === false)
        {
            context.save();
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = "#2dff1e"; // laser rbg"
            context.fill();
            context.restore();
        }
    }

    update(delta_time)
    {
        if (this.free === false)
        {
            this.x += this.speed_x;
            this.y += this.speed_y;
        }

        if (this.x < 0 || this.x > this.game.width || this.y < 0 || this.y > this.game.height)
        {
            this.sleep();
        }
    }

    wake(x, y, speed_x, speed_y)
    {
        this.x = x;
        this.y = y;
        this.speed_x = speed_x * this.speed_modifier;
        this.speed_y = speed_y * this.speed_modifier;
        this.free = false;
    }

    sleep()
    {
        this.free = true;
    }
}