const express = require('express')
const app = express()
const port = 3000

let scoreBoard = [];

function findPlayer(playerName){
    for(let player of scoreBoard){
        if(player.name == playerName){
            return player;
        }
    }
    return null;
}

app.use(express.urlencoded({extended: false}));

app.get('/score', (req, res) => {
    let index = req.params.index;
    if(index == undefined) return res.status(400).send("Index is required");
    return res.json(scoreBoard[req.params.index])
});

app.get('/scores', (req, res) => res.json(scoreBoard));

app.post('/score', (req, res) => {
    let score = +req.body.score;
    let name = req.body.name;

    if(score == undefined || name == undefined) return res.status(400).send("Score and name are required");
    if(isNaN(score)) return res.status(400).send("Score is invalid");

    name = name.trim();

    let player = findPlayer(name);
    if(player != null){
        if(player.score < score)
            player.score = score;
    }
    else{
        player = {score: score, name: name}
        scoreBoard.push(player);
    }

    scoreBoard.sort( (a, b) => b.score - a.score );
    res.send('Score saved!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))