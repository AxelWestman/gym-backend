  CREATE TABLE gym.clientes (
  idclientes INT NOT NULL IDENTITY(1,1), --Supuestamente esto es un autoincremental
  nombre_completo VARCHAR(45) NOT NULL,
  dni INT NOT NULL,
  mail VARCHAR(45) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  genero VARCHAR(45) NOT NULL,
  contraseña VARCHAR(45) NOT NULL,
  PRIMARY KEY (idclientes));

