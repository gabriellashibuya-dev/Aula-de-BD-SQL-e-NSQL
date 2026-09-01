USE conversoes_db;

CREATE TABLE conversoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_decimal INT NOT NULL,
  numero_binario VARCHAR(50) NOT NULL
);
