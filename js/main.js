import Game from "./game.js";

addEventListener("load", () =>
{
    console.log(`Main @ ${new Date().toLocaleString()}`);

    const screen = document.getElementById("screen");
    screen.width = 750;
    screen.height = 750;

    const context = screen.getContext("2d");
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.font = "25px space shards";

    const game = new Game(screen);
    
    let previous_stamp = 0;

    const animate = (time_stamp) =>
    {// delta-time is the time it takes this computer to serve one animation frame
        const delta_time = time_stamp - previous_stamp;
        previous_stamp = time_stamp; // approximately 60 fps

        context.clearRect(0, 0, screen.width, screen.height);

        //console.log(delta_time); // 1000 / 60.6 ~ 16.5

        game.update(delta_time);
        game.draw(context);

        //if (game.game_over === false)
        //{
            requestAnimationFrame(animate);
        //}
    };

    animate(0);
});