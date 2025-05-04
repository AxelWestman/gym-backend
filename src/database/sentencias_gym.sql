  --Creación de la tabla de clientes:
  CREATE TABLE gym.clientes (
  idclientes INT NOT NULL IDENTITY(1,1), --Supuestamente esto es un autoincremental
  nombre_completo VARCHAR(45) NOT NULL,
  dni INT NOT NULL,
  mail VARCHAR(45) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  genero VARCHAR(45) NOT NULL,
  contraseña VARCHAR(45) NOT NULL,
  PRIMARY KEY (idclientes));

--Creación de la tabla rutinas:
CREATE TABLE gym.rutinas (
  idrutina INT NOT NULL AUTO_INCREMENT,
  nombre_rutina VARCHAR(45) NOT NULL,
  descripcion TEXT,
  duracion_semanas INT,
  nivel_dificultad VARCHAR(20),
  PRIMARY KEY (idrutina)
);

--Creación de la tabla de ejercicios:
CREATE TABLE gym.ejercicios (
  idejercicio INT NOT NULL AUTO_INCREMENT,
  nombre_ejercicio VARCHAR(45) NOT NULL,
  descripcion TEXT,
  grupo_muscular VARCHAR(45),
  equipamiento_necesario VARCHAR(45),
  PRIMARY KEY (idejercicio)
);

--Creación de la tabla de relación rutina-ejercicio (detalle de rutinas):
CREATE TABLE gym.rutina_ejercicios (
  idrutina_ejercicio INT NOT NULL AUTO_INCREMENT,
  idrutina INT NOT NULL,
  idejercicio INT NOT NULL,
  dia_semana VARCHAR(15) NOT NULL, -- Ej: "Lunes", "Martes", etc.
  series INT NOT NULL,
  repeticiones VARCHAR(20) NOT NULL, -- Puede ser "8-12" o "15"
  descanso_segundos INT,
  orden_ejercicio INT, -- Para ordenar los ejercicios dentro del día
  PRIMARY KEY (idrutina_ejercicio),
  FOREIGN KEY (idrutina) REFERENCES rutinas(idrutina),
  FOREIGN KEY (idejercicio) REFERENCES ejercicios(idejercicio)
);


--Creación de la tabla de asignación de rutinas a clientes
CREATE TABLE gym.cliente_rutinas (
  idcliente_rutina INT NOT NULL AUTO_INCREMENT,
  idcliente INT NOT NULL,
  idrutina INT NOT NULL,
  fecha_asignacion DATE NOT NULL,
  fecha_finalizacion DATE,
  activa TINYINT(1) DEFAULT 1,
  notas TEXT,
  PRIMARY KEY (idcliente_rutina),
  FOREIGN KEY (idcliente) REFERENCES clientes(idclientes),
  FOREIGN KEY (idrutina) REFERENCES rutinas(idrutina)
);
