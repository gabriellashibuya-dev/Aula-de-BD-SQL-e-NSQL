const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados MySQL no contêiner Docker
const db = mysql.createConnection({
  host: "localhost", // Use 'mysql-container' se o Node.js também estiver em um contêiner
  user: "user", // Definido no docker-compose.yml
  password: "userpassword", // Definido no docker-compose.yml
  database: "conversoes_db",
  port: 3307,
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL (Docker).");
});

// Endpoint para converter decimal para binário e salvar no banco de dados
app.get("/to-binary/:decimal", (req, res) => {
  const decimal = parseInt(req.params.decimal, 10);
  if (isNaN(decimal)) {
    return res.status(400).json({ error: "Número decimal inválido" });
  }

  const binary = decimal.toString(2);

  // Salvar no banco de dados
  const query = "INSERT INTO conversoes (numero_decimal, numero_binario) VALUES (?, ?)";

  db.query(query, [decimal, binary], (err, result) => {
    if (err) {
      console.error("Erro ao salvar no banco de dados:", err);
      return res.status(500).json({ error: "Erro ao salvar no banco de dados" });
    }
    res.json({ decimal, binary });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
