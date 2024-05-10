class Enemy
{
    constructor(game)
    {
        this.game = game;
        this.x = 50;
        this.y = 50;
        this.speed_x = 0;
        this.speed_y = 0;
        this.speed_modifier = 1; //Math.random() * 0.5 + 0.1;
        this.radius = 40;
        this.angle = 0;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 4);
        this.frame_max = 0;
        this.free = true;
        this.lives = 1;
        this.lives_max = this.lives;
        this.collided = false;

        this.image = new Image();
    }

    draw(context)
    {
        if (this.free === false)
        {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frame_x * this.width, this.frame_y * this.height, this.width, this.height, -this.radius, -this.radius, this.width, this.height);

            if (this.game.debug === true)
            {
                context.beginPath();
                context.arc(0, 0, this.radius, 0, Math.PI * 2);
                context.stroke();
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillStyle = "#ffd700";
                context.fillText(this.lives, 0, 0)
            }
            context.restore();
        }
    }
    
    update(delta_time)
    {
        if (this.free === false)
        {
            this.x += this.speed_x;
            this.y += this.speed_y;

            if (this.game.isCollision(this, this.game.planet) && this.lives >= 1)
            {// enemy - planet collision
                this.lives = 0;
                this.speed_x = 0;
                this.speed_y = 0;
                this.collided = true;

                --this.game.lives;
            }

            if (this.game.isCollision(this, this.game.player) && this.lives >= 1)
            {// enemy - player collison
                this.lives = 0;
                this.collided = true;

                --this.game.lives;
            }

            this.game.ammo.forEach((ammo) =>
            {// enemy - projectile
                if (ammo.free === false && this.game.isCollision(this, ammo) && this.lives >= 1)
                {
                    ammo.sleep();

                    this.hit(1);
                }
            });

            if (this.lives < 1 && this.game.sprite_update === true)
            {
                ++this.frame_x;
            }

            if (this.frame_x > this.frame_max)
            {
                this.sleep();

                if (this.collided === false && this.game.game_over === false)
                {
                    this.game.score += this.lives_max;
                }
            }
        }
    }

    sleep()
    {
        this.free = true;
    }

    wake()
    {
        this.free = false;
        this.collided = false;
        this.lives = this.lives_max;
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

        this.speed_x = target[0] * this.speed_modifier;
        this.speed_y = target[1] * this.speed_modifier;
        this.angle = Math.atan2(target[3], target[2]) + Math.PI * 0.5;
    }

    hit(damage)
    {
        this.lives -= damage;

        //this.frame_x = this.lives_max - this.lives;
        if (this.lives >= 1)
        {
            ++this.frame_x;
        }
    }
}

export class Asteroid extends Enemy
{
    constructor(game)
    {
        super(game);

        this.frame_max = 7;
        this.lives = 1;
        this.lives_max = this.lives;
        this.speed_modifier = 0.6;

        this.image.src = "img/asteroid.png";
    }
}

export class Beetlemorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.frame_max = 3;
        this.lives = 1;
        this.lives_max = this.lives;
        this.speed_modifier = 0.6;

        this.image.src = "img/beetlemorph.png";
    }
}

export class Rhinomorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.frame_max = 6;
        this.lives = 4;
        this.lives_max = this.lives;
        this.speed_modifier = 0.5;

        this.image.src = "img/rhinomorph.png";
    }
}

export class Lobstamorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.frame_max = 14;
        this.lives = 8;
        this.lives_max = this.lives;
        this.speed_modifier = 0.4;

        this.image.src = "img/Lobstamorph.png";
    }
}