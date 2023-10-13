const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//API GET

app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
 SELECT
 *
 FROM
 cricket_team;`;
  const playersArray = await database.all(getPlayersQuery);
  response.send(
    playersArray.map((eachPlayer) =>
      convertDbObjectToResponseObject(eachPlayer)
    )
  );
});

// API POST
app.post("/players/", async (request, response) => {
  const { bookId } = request.params;
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = postPlayer;
  const getPlayersQuery = `
    UPDATE 
      cricket_team
    SET
     playerName=${playerName},
     jerseyNumber=${jerseyNumber},
     role=${role}
    WHERE 
      player_id = ${player_id}`;
  const playersArray = await db.run(getPlayersQuery);
  response.send("Player Added to");
});

//API GET
app.get("/players/:playerId/", async (request, response) => {
  const { bookId } = request.params;
  const getPlayersQuery = `
    SELECT 
      *
    FROM 
      cricket_team
    WHERE 
      player_id = ${player_id}
    `;
  const playersArray = await db.get(getPlayersQuery);
  response.send(playersArray);
});

//API PUT

app.put("/players/:playerId/", async (request, response) => {
  const { bookId } = request.params;
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = postPlayer;
  const getPlayersQuery = `
    UPDATE 
      cricket_team
    SET
     playerName = ${playerName},
     jerseyNumber = ${jerseyNumber},
     role = ${role}
     WHERE 
     player_id = ${player_id}
    `;
  const playersArray = await db.run(getPlayersQuery);
  response.send("Player Details Updated");
});
//API

app.delete("/players/:playerId/", async (request, response) => {
  const { bookId } = request.params;
  const deletePlayersQuery = `
     DELETE FROM 
     cricket_team
     WHERE 
     player_id = ${player_id}
     `;
  const player = await db.run(deletePlayersQuery);
  response.send("Player Removed");
});
