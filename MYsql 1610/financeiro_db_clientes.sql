-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: financeiro_db
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `data_aniversario` date DEFAULT NULL,
  `reset_senha_token` varchar(255) DEFAULT NULL,
  `reset_senha_expires` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Laura','lauramachadogmail.com','123321','2023-07-02',NULL,NULL),(2,'Ana','ana.silva@gmail.com','$2b$10$ZJ5uaPsFtRJ7Awt/bys7Z.TFQP/aoY1ILi2jWdXuJfY8FY4oDiY4W','2004-10-09',NULL,NULL),(3,'luana','luana.viana@gmail.com','$2b$10$7C8jjUiSHTgWxoQfYer0FOiRv86ITo45cd7xljafuU.wCPX1XDWQK','2004-10-09',NULL,NULL),(4,'italo','italo.barbosa@gmail.com','$2b$10$H6u7j8K/wa5IjoU.AAqdQOZu9kocFncoe8YOlZgTyVhzBurFRp7ri','2004-09-26',NULL,NULL),(5,'iago','iago.silva@gmail.com','$2b$10$vvdnj/Vr9KMDgRSWoqXMb.vgfCfhT2lqAGBXmSdSbyuiiE82uwJ8e','2007-11-10',NULL,NULL),(6,'flavia','flavia.soares@gmail.com','$2b$10$0tdwOvhh44UDq1pK4s8X5enbyvnU3gwcbieplKy/q3i6BlEYkX3me','1999-08-20',NULL,NULL),(7,'lutiara','lutiara.barbosa@aluno.senai.br','$2b$10$F8i5dD8trqZUoH9yjNA3G.Ld1UrahBFAfA/UI.4ToFEi5UYxTMvCW','2004-09-25',NULL,NULL);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-16 10:45:15
