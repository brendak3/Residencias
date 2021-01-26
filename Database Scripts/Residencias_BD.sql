-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.8-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para residencia
DROP DATABASE IF EXISTS `residencia`;
CREATE DATABASE IF NOT EXISTS `residencia` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `residencia`;

-- Volcando estructura para tabla residencia.rs_catalog_video
DROP TABLE IF EXISTS `rs_catalog_video`;
CREATE TABLE IF NOT EXISTS `rs_catalog_video` (
  `RSC_ARTISTA` varchar(100) DEFAULT NULL,
  `RSC_CANCION` varchar(100) DEFAULT NULL,
  `RSC_ENLACE` varchar(200) NOT NULL,
  `RSC_EMOCION` varchar(100) DEFAULT NULL,
  `RSC_DURACION` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla residencia.rs_datospersona
DROP TABLE IF EXISTS `rs_datospersona`;
CREATE TABLE IF NOT EXISTS `rs_datospersona` (
  `RSD_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RSD_NAME` varchar(20) NOT NULL DEFAULT '0',
  `RSD_LASTNAME` varchar(30) NOT NULL DEFAULT '0',
  `RSD_AGE` int(11) NOT NULL DEFAULT 0,
  `RSD_EMAIL` varchar(50) NOT NULL DEFAULT '0',
  `RSD_OCCUPATION` varchar(50) NOT NULL DEFAULT '0',
  `RSD_GENDER` char(1) NOT NULL DEFAULT '0',
  `RSD_PHOTO` blob NOT NULL DEFAULT '0',
  `RSD_DATE` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`RSD_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COMMENT='Tabla para guardar la informacion de los sujetos de prueba';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla residencia.rs_prueba
DROP TABLE IF EXISTS `rs_prueba`;
CREATE TABLE IF NOT EXISTS `rs_prueba` (
  `RSP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RSP_LECTURA` blob NOT NULL DEFAULT '0',
  `RSP_FECHA` datetime NOT NULL DEFAULT current_timestamp(),
  `RSP_PERSONA_ID` int(11) NOT NULL,
  `nombre_video` varchar(100) DEFAULT NULL,
  `duracion_prueba` int(11) DEFAULT NULL,
  `RSP_EMOCION` varchar(100) DEFAULT NULL,
  `RPS_USER_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`RSP_ID`),
  KEY `FK_PERSONA_ID` (`RSP_PERSONA_ID`),
  KEY `FK_USER_ID` (`RPS_USER_ID`),
  CONSTRAINT `FK_PERSONA_ID` FOREIGN KEY (`RSP_PERSONA_ID`) REFERENCES `rs_datospersona` (`RSD_ID`),
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`RPS_USER_ID`) REFERENCES `rs_user` (`RS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla residencia.rs_user
DROP TABLE IF EXISTS `rs_user`;
CREATE TABLE IF NOT EXISTS `rs_user` (
  `RS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RS_USERNAME` varchar(15) NOT NULL DEFAULT '0',
  `RS_NAME` varchar(15) NOT NULL DEFAULT '0',
  `RS_LASNAME` varchar(30) NOT NULL DEFAULT '0',
  `RS_TYPE` varchar(20) NOT NULL DEFAULT '0',
  `RS_PASSWORD` varchar(20) NOT NULL DEFAULT '0',
  `RS_EMAIL` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`RS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='Table for user credentials';

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
