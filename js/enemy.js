class Enemy
{
    constructor(game)
    {
        this.game = game;
        this.x = 50;
        this.y = 50;
        this.speed_x = 0;
        this.speed_y = 0;
        this.radius = 40;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 4);
        this.frame_max = 0;
        this.free = true;

        this.image = new Image();
    }

    draw(context)
    {
        if (this.free === false)
        {
            context.drawImage(this.image, this.frame_x * this.width, this.frame_y * this.height, this.width, this.height, this.x - this.radius, this.y - this.radius, this.width, this.height);

            if (this.game.debug === true)
            {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
            }
        }
    }
    
    update(delta_time)
    {
        if (this.free === false)
        {
            this.x += this.speed_x;
            this.y += this.speed_y;

            if (this.game.isCollision(this, this.game.planet))
            {// enemy - planet collision
                this.sleep();
            }

            if (this.game.isCollision(this, this.game.player))
            {// enemy - player collison
                this.sleep();
            }

            this.game.ammo.forEach((ammo) =>
            {// enemy - projectile
                if (ammo.free === false && this.game.isCollision(this, ammo))
                {
                    ammo.sleep();

                    this.sleep();
                }
            });
        }
    }

    sleep()
    {
        this.free = true;
    }

    wake()
    {
        this.free = false;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 4);
        
        if (Math.random() < 0.5)
        {
            this.x = Math.random() < 0.5 ? -this.radius : this.game.width + this.radius;
            this.y = Math.random() * this.game.height;
        }
        else
        {
            this.x = Math.random() * this.game.width;
            this.y = Math.random() < 0.5 ? -this.radius : this.game.height + this.radius;
        }
        const target = this.game.trajectory(this, this.game.planet);

        this.speed_x = target[0];
        this.speed_y = target[1];
    }
}

export class Asteroid extends Enemy
{
    constructor(game)
    {
        super(game);

        this.frame_max = 7;
        this.image.src = "img/asteroid.png";
    }
}

export class Beetlemorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.image.src = "img/beetlemorph.png";
    }

    draw(context)
    {
        super.draw(context);
    }

    update(delta_time)
    {
        super.update(delta_time);
    }
}

export class Lobstamorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.image.src = "img/Lobstamorph.png";
    }

    draw(context)
    {
        super.draw(context);
    }

    update(delta_time)
    {
        super.update(delta_time);
    }
}

export class Rhinomorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.image.src = "img/rhinomorph.png";
    }

    draw(context)
    {
        super.draw(context);
    }

    update(delta_time)
    {
        super.update(delta_time);
    }
}