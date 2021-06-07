-- --------------------------------------------------------
-- Fecha de Modificacion		2021-06-06
-- Modifier							Abiel Villegas
-- --------------------------------------------------------

DROP DATABASE IF EXISTS residencia;
CREATE DATABASE IF NOT EXISTS residencia;
USE residencia;


DROP TABLE IF EXISTS rs_catalog_video;
CREATE TABLE IF NOT EXISTS rs_catalog_video (
  RSC_ARTISTA varchar(100),
  RSC_CANCION varchar(100),
  RSC_ENLACE varchar(200),
  RSC_EMOCION varchar(100),
  RSC_DURACION int(11)
);


DROP TABLE IF EXISTS rs_user;
CREATE TABLE IF NOT EXISTS rs_user (
  RS_ID int(11) NOT NULL AUTO_INCREMENT,
  RS_USERNAME varchar(15),
  RS_NAME varchar(15),
  RS_LASNAME varchar(30),
  RS_ISADMIN bit,
  RS_PASSWORD varchar(20),
  RS_EMAIL varchar(100),
  PRIMARY KEY (`RS_ID`)
);

DROP TABLE IF EXISTS rs_datospersona;
CREATE TABLE IF NOT EXISTS rs_datospersona (
  RSD_ID int(11) NOT NULL AUTO_INCREMENT,
  RSD_NAME varchar(20),
  RSD_LASTNAME varchar(30),
  RSD_AGE int(11),
  RSD_EMAIL varchar(50),
  RSD_OCCUPATION varchar(50),
  RSD_GENDER char(1),
  RSD_PHOTO blob,
  RSD_DATE datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (RSD_ID),
  RSD_USERID INT,
  FOREIGN KEY (RSD_USERID) REFERENCES rs_user(RS_ID)
);

DROP TABLE IF EXISTS rs_prueba;
CREATE TABLE IF NOT EXISTS rs_prueba (
  RSP_ID int(11) NOT NULL AUTO_INCREMENT,
  RSP_LECTURA blob,
  RSP_FECHA datetime NOT NULL DEFAULT current_timestamp(),
  RSP_PERSONA_ID int(11),
  nombre_video varchar(100),
  duracion_prueba int(11),
  RSP_EMOCION varchar(100),
  RPS_USER_ID int(11),
  PRIMARY KEY (RSP_ID),
  KEY FK_PERSONA_ID (RSP_PERSONA_ID),
  KEY FK_USER_ID (RPS_USER_ID),
  CONSTRAINT FK_PERSONA_ID FOREIGN KEY (RSP_PERSONA_ID) REFERENCES rs_datospersona (RSD_ID),
  CONSTRAINT FK_USER_ID FOREIGN KEY (RPS_USER_ID) REFERENCES rs_user (RS_ID)
);

