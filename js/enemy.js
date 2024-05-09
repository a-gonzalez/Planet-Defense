class Enemy
{
    constructor(game)
    {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.frame_x = 0;
        this.frame_y = Math.random() * 4;

        this.image = new Image();
    }

    draw(context)
    {

    }
    
    update(delta_time)
    {

    }
}

export class Beetlemorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.image.src = "beetlemorph.png";
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

        this.image.src = "beetlemorph.png";
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

        this.image.src = "rhinomorph.png";
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