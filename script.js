import gameManager from "./scripts/gameManager.js"

let game = new gameManager();
game.initScene();
await game.initAssets();
game.addBall(); 

/*var request = new XMLHttpRequest();
request.open("GET", "./pixiAssets.json");
request.responseType = "json";
request.send();
request.onload = function () {
    var test = request.response;
    console.log(test["speed"]);
};*/









