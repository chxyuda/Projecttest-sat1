-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventory_management
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `audit_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_requests`
--

DROP TABLE IF EXISTS `borrow_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `borrower_name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `equipment` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `quantity_requested` int DEFAULT NULL,
  `note` text,
  `status` enum('Pending','Approved','Rejected','Received','Returned','WaitingReceive') DEFAULT NULL,
  `note_approver` text,
  `approved_by` varchar(255) DEFAULT NULL,
  `date_approved` date DEFAULT NULL,
  `received_by` varchar(255) DEFAULT NULL,
  `date_received` date DEFAULT NULL,
  `notification_status` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `request_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `equipment_number` varchar(255) DEFAULT '-',
  `serial_number` varchar(255) DEFAULT '-',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_requests`
--

LOCK TABLES `borrow_requests` WRITE;
/*!40000 ALTER TABLE `borrow_requests` DISABLE KEYS */;
INSERT INTO `borrow_requests` VALUES (1,3,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','235731325','test17@sat.or.th','P1440FA','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','ASUS',1,'','Returned',NULL,'à¸Šà¸·à¹ˆà¸­à¸œà¸¹à¹‰à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´','2025-02-17','à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','2025-02-20',0,'2025-02-17 02:33:35','2025-02-25 04:35:54','2025-02-17','2025-02-25','-','-'),(2,22,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸šà¸µ','à¸à¹ˆà¸²à¸¢à¸à¸²à¸£à¸„à¸¥à¸±à¸‡','023456789','test22@sat.or.th','P1440FA',NULL,'à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','ASUS',1,NULL,'Rejected',NULL,'Admin','2025-02-27',NULL,NULL,0,'2025-02-19 07:29:14','2025-02-27 03:17:40','2025-02-19','2025-03-08','-','-'),(3,22,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸šà¸µ','à¸à¹ˆà¸²à¸¢à¸à¸²à¸£à¸„à¸¥à¸±à¸‡','023456789','test22@sat.or.th','20X2S75N00',NULL,'à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','LENOVO',1,'à¹„à¸¡à¹ˆà¸ªà¸²à¸¡à¸²à¸£à¸–à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´à¹„à¸”à¹‰','Rejected',NULL,'à¸Šà¸·à¹ˆà¸­à¸œà¸¹à¹‰à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´','2025-02-19',NULL,NULL,0,'2025-02-19 07:52:23','2025-02-19 08:20:01','2025-02-19','2025-03-28','-','-'),(4,22,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸šà¸µ','à¸à¹ˆà¸²à¸¢à¸à¸²à¸£à¸„à¸¥à¸±à¸‡','023456789','test22@sat.or.th','20X2S75N22',NULL,'à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','LENOVO',1,'---','Rejected',NULL,'à¸Šà¸·à¹ˆà¸­à¸œà¸¹à¹‰à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´','2025-02-19',NULL,NULL,0,'2025-02-19 07:55:32','2025-02-19 08:19:33','2025-02-19','2025-04-05','-','-'),(5,22,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸šà¸µ','à¸à¹ˆà¸²à¸¢à¸à¸²à¸£à¸„à¸¥à¸±à¸‡','023456789','test22@sat.or.th','20X2S75N00',NULL,'à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','LENOVO',1,NULL,'Rejected',NULL,'Admin','2025-02-27',NULL,NULL,0,'2025-02-19 08:34:35','2025-02-27 03:10:57','2025-02-19','2025-04-10','-','-'),(6,3,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','à¸à¹ˆà¸²à¸¢à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸ à¸²à¸¢à¹ƒà¸™','235731325','test17@sat.or.th','TN-3448','à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother HL-L6200DW',1,NULL,'Rejected',NULL,'Admin','2025-02-27',NULL,NULL,0,'2025-02-25 07:09:53','2025-02-27 03:08:28','2025-02-25','2025-03-01',NULL,NULL),(7,3,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','à¸à¹ˆà¸²à¸¢à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸ à¸²à¸¢à¹ƒà¸™','235731325','test17@sat.or.th','P1440FA','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','ASUS',1,'-','Pending',NULL,NULL,NULL,NULL,NULL,0,'2025-02-26 03:18:48','2025-02-26 03:18:48','2025-02-26','2025-03-26','9D-02-03-031/63','KBNXCV09T56147D'),(8,28,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸­à¸¸à¹Šà¸šà¸­à¸´à¹Šà¸š','à¸à¹ˆà¸²à¸¢à¸™à¹‚à¸¢à¸šà¸²à¸¢à¹à¸¥à¸°à¹à¸œà¸™','213459999','test5@sat.or.th','TN-3448','à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother HL-L6200DW',1,'à¸¢à¸·à¸¡à¹„à¸¡à¹ˆà¹„à¸”à¹‰','Rejected',NULL,'Admin','2025-02-27',NULL,NULL,0,'2025-02-26 04:45:21','2025-02-27 02:55:46','2025-02-26','2025-03-14','-','-');
/*!40000 ALTER TABLE `borrow_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Imation','à¸§à¸±à¸ªà¸”à¸¸'),(2,'Compex','à¸§à¸±à¸ªà¸”à¸¸'),(3,'Asus','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œ'),(4,'HP LASERJET','à¸§à¸±à¸ªà¸”à¸¸'),(5,'Panasonic','à¸§à¸±à¸ªà¸”à¸¸'),(6,'NEC','à¸§à¸±à¸ªà¸”à¸¸'),(7,'Xerox','à¸§à¸±à¸ªà¸”à¸¸'),(8,'Genius','à¸§à¸±à¸ªà¸”à¸¸'),(9,'Seagate','à¸§à¸±à¸ªà¸”à¸¸'),(10,'P&A','à¸§à¸±à¸ªà¸”à¸¸'),(11,'AMP','à¸§à¸±à¸ªà¸”à¸¸'),(12,'Lexmark','à¸§à¸±à¸ªà¸”à¸¸'),(13,'Kyocera','à¸§à¸±à¸ªà¸”à¸¸'),(14,'SAMSUNG','à¸§à¸±à¸ªà¸”à¸¸'),(15,'EPSON','à¸§à¸±à¸ªà¸”à¸¸'),(16,'Soccomec','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œ'),(17,'Syndome','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œ'),(18,'E power','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œ'),(19,'Stony','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œ'),(21,'LENOVO','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œ'),(22,'Brother','à¸§à¸±à¸ªà¸”à¸¸'),(23,'CANON','à¸§à¸±à¸ªà¸”à¸¸'),(41,'Acer','à¸—à¸±à¹ˆà¸§à¹„à¸›');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸›à¸£à¸°à¹€à¸ à¸—à¸—à¸±à¹ˆà¸§à¹„à¸›'),(2,'à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œ');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboard_summary`
--

DROP TABLE IF EXISTS `dashboard_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboard_summary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `request_summary` json DEFAULT NULL,
  `product_summary` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboard_summary`
--

LOCK TABLES `dashboard_summary` WRITE;
/*!40000 ALTER TABLE `dashboard_summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `dashboard_summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` enum('à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸','à¹€à¸¥à¸‚à¸²') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,' à¸£à¸­à¸‡à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£à¸à¹ˆà¸²à¸¢à¸à¸µà¸¬à¸²à¸­à¸²à¸Šà¸µà¸žà¹à¸¥à¸°à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢','à¹€à¸¥à¸‚à¸²'),(2,'à¸£à¸­à¸‡à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£à¸à¹ˆà¸²à¸¢à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¸à¸µà¸¬à¸²','à¹€à¸¥à¸‚à¸²'),(3,'à¸£à¸­à¸‡à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£à¸à¹ˆà¸²à¸¢à¸à¸µà¸¬à¸²à¹€à¸›à¹‡à¸™à¹€à¸¥à¸´à¸¨à¹à¸¥à¸°à¸§à¸´à¸—à¸¢à¸²à¸¨à¸²à¸ªà¸•à¸£à¹Œà¸à¸²à¸£à¸à¸µà¸¬à¸²','à¹€à¸¥à¸‚à¸²'),(4,'à¸£à¸­à¸‡à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£à¸à¹ˆà¸²à¸¢à¸¢à¸¸à¸—à¸˜à¸¨à¸²à¸ªà¸•à¸£à¹Œà¹à¸¥à¸°à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨','à¹€à¸¥à¸‚à¸²'),(5,'à¸£à¸­à¸‡à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£à¸à¹ˆà¸²à¸¢à¸šà¸£à¸´à¸«à¸²à¸£','à¹€à¸¥à¸‚à¸²'),(6,'à¸à¹ˆà¸²à¸¢à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸ à¸²à¸¢à¹ƒà¸™','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(7,'à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(8,'à¸ªà¸³à¸™à¸±à¸à¸‡à¸²à¸™à¸„à¸§à¸šà¸„à¸¸à¸¡à¸à¸²à¸£à¹ƒà¸Šà¹‰à¸ªà¸²à¸£à¸•à¹‰à¸­à¸‡à¸«à¹‰à¸²à¸¡à¸—à¸²à¸‡à¸à¸²à¸£à¸à¸µà¸¬à¸²','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(9,'à¸à¹ˆà¸²à¸¢à¸à¸²à¸£à¸„à¸¥à¸±à¸‡à¸à¸­à¸‡à¸—à¸¸à¸™','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(10,'à¸ªà¸³à¸™à¸±à¸à¸à¸Žà¸«à¸¡à¸²à¸¢','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(11,'à¸à¹ˆà¸²à¸¢à¸à¸²à¸£à¸„à¸¥à¸±à¸‡','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(12,'à¸à¹ˆà¸²à¸¢à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(13,'à¸à¹ˆà¸²à¸¢à¸™à¹‚à¸¢à¸šà¸²à¸¢à¹à¸¥à¸°à¹à¸œà¸™','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(14,'à¸à¹ˆà¸²à¸¢à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(15,'à¸à¹ˆà¸²à¸¢à¸žà¸±à¸’à¸™à¸²à¸à¸µà¸¬à¸²à¹€à¸›à¹‡à¸™à¹€à¸¥à¸´à¸¨','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(16,'à¸à¹ˆà¸²à¸¢à¸§à¸´à¸—à¸¢à¸²à¸¨à¸²à¸ªà¸•à¸£à¹Œà¸à¸²à¸£à¸à¸µà¸¬à¸²','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(17,'à¸ªà¸³à¸™à¸±à¸à¸‡à¸²à¸™à¸„à¸“à¸°à¸à¸£à¸£à¸¡à¸à¸²à¸£à¸à¸µà¸¬à¸²à¸­à¸²à¸Šà¸µà¸ž','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(18,'à¸ªà¸³à¸™à¸±à¸à¸‡à¸²à¸™à¸„à¸“à¸°à¸à¸£à¸£à¸¡à¸à¸²à¸£à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(19,'à¸à¹ˆà¸²à¸¢à¸˜à¸¸à¸£à¸à¸´à¸ˆà¸à¸µà¸¬à¸²','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(20,'à¸à¹ˆà¸²à¸¢à¸à¸µà¸¬à¸²à¸ à¸¹à¸¡à¸´à¸ à¸²à¸„','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸'),(21,'à¸à¹ˆà¸²à¸¢à¸§à¸´à¸¨à¸§à¸à¸£à¸£à¸¡à¸à¸µà¸¬à¸²','à¸à¹ˆà¸²à¸¢/à¸ªà¸³à¸™à¸±à¸');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_notifications`
--

DROP TABLE IF EXISTS `email_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `email_sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `email_notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_notifications`
--

LOCK TABLES `email_notifications` WRITE;
/*!40000 ALTER TABLE `email_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_names`
--

DROP TABLE IF EXISTS `equipment_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_names` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_names`
--

LOCK TABLES `equipment_names` WRITE;
/*!40000 ALTER TABLE `equipment_names` DISABLE KEYS */;
INSERT INTO `equipment_names` VALUES (1,'à¹€à¸¡à¸²à¸ªà¹Œ');
/*!40000 ALTER TABLE `equipment_names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_log`
--

DROP TABLE IF EXISTS `inventory_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `quantity_changed` int DEFAULT NULL,
  `action` enum('borrow','return') NOT NULL,
  `log_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `inventory_log_ibfk_1` (`product_id`),
  CONSTRAINT `inventory_log_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_log`
--

LOCK TABLES `inventory_log` WRITE;
/*!40000 ALTER TABLE `inventory_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_return_requests`
--

DROP TABLE IF EXISTS `loan_return_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_return_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `request_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `return_date` timestamp NULL DEFAULT NULL,
  `approval_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `remarks` text,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `loan_return_requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_return_requests`
--

LOCK TABLES `loan_return_requests` WRITE;
/*!40000 ALTER TABLE `loan_return_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_return_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `brand_name` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `inventory_number` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `borrowed_number` int DEFAULT '0',
  `equipment_number` varchar(255) DEFAULT NULL,
  `remaining` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CE278AC','-',8,'In Stock',NULL,3,'-',5),(2,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CE505AC','-',2,'In Stock','',0,'-',3),(3,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF226A','-',3,'In Stock','',0,'-',3),(4,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CE255A','-',25,'In Stock',NULL,0,'-',20),(5,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','Q7553A','-',10,'In Stock',NULL,0,'-',10),(6,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF210A','-',15,'In Stock',NULL,0,'-',14),(7,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF211A','-',20,'In Stock',NULL,1,'-',15),(8,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF212A','-',10,'In Stock',NULL,0,'-',10),(9,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF213A','-',5,'In Stock',NULL,0,'-',5),(10,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF350A','-',10,'In Stock',NULL,0,'-',9),(11,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF351A','-',15,'In Stock',NULL,0,'-',15),(12,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF352A','-',20,'In Stock',NULL,0,'-',20),(13,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET','CF353A','-',25,'In Stock',NULL,0,'-',20),(14,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','CANON','FX10','-',15,'In Stock',NULL,0,'-',10),(15,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother HL-L6200DW','TN-3448','-',40,'In Stock','',0,'-',12),(16,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother HL-L8260CDN','TN-451 BK','-',20,'In Stock',NULL,0,'-',20),(17,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother HL-L8260CDN','TN-451 C','-',5,'In Stock',NULL,0,'-',5),(18,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother HL-L8260CDN','TN-451 Y','-',10,'In Stock',NULL,0,'-',10),(19,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother HL-L8260CDN','TN-451 M','-',20,'In Stock',NULL,0,'-',20),(20,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother MFC-L2715DW','TN-2480','-',10,'In Stock',NULL,0,'-',10),(21,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother MFC-MFC-L3750CDW','TN-263 BK','-',10,'In Stock',NULL,0,'-',10),(22,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother MFC-MFC-L3750CDW','TN-263 C','-',15,'In Stock',NULL,0,'-',15),(23,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother MFC-MFC-L3750CDW','TN-263 Y','-',20,'In Stock',NULL,0,'-',20),(24,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother MFC-MFC-L3750CDW','TN-263 M','-',10,'In Stock',NULL,0,'-',10),(25,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother','TN351 BK','-',25,'In Stock',NULL,0,'-',25),(26,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother','TN351C','-',20,'In Stock',NULL,0,'-',20),(27,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother','TN351Y','-',15,'In Stock',NULL,0,'-',15),(28,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Brother','TN351M','-',10,'In Stock',NULL,0,'-',10),(29,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','EPSON','LQ-310','-',22,'In Stock',NULL,0,'-',22),(30,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','EPSON','LQ-590','-',15,'In Stock',NULL,0,'-',15),(31,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Ribbon Cartridge7753/ S015141','LQ-300+300+ll','-',10,'In Stock',NULL,0,'-',10),(32,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','SAMSUNG','MLT-309S','-',5,'In Stock',NULL,0,'-',5),(33,'à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','ASUS','P1440FA','KBNXCV09T56147D',1,'In Stock','',0,'9D-02-03-031/63',1),(34,'à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','LENOVO','20X2S75N00','PF3MQE0S',1,'In Stock','',0,'9D-02-03-461/65',1),(35,'à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','LENOVO','20X2S75N22','PF3MSKMA',1,'In Stock','',1,'9D-02-03-474/65',1),(36,'à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','LENOVO','20X2S75N00','PF3MSK93',1,'In Stock','',0,'-',1),(37,'à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','ASUS','P1440FA','KBNXCV09T620478',1,'In Stock','',0,'9D-02-03-039/63',1),(56,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','Acer','ce2555','-',4,'In Stock','-',0,'-',2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `borrower_name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `equipment` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `quantity_requested` int DEFAULT NULL,
  `note` text,
  `status` varchar(50) DEFAULT 'Pending',
  `approved_by` varchar(255) DEFAULT NULL,
  `date_approved` date DEFAULT NULL,
  `received_by` varchar(255) DEFAULT NULL,
  `date_received` date DEFAULT NULL,
  `notification_status` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_requested` date DEFAULT NULL,
  `note_approver` text,
  `equipment_number` varchar(255) DEFAULT '-',
  `serial_number` varchar(255) DEFAULT '-',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,3,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','235731325','test17@sat.or.th','CF350A','à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET',1,'','Pending',NULL,NULL,NULL,NULL,0,'2025-02-14 05:10:00','2025-02-14 05:10:00','2025-02-14',NULL,'-','-'),(2,3,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','235731325','test17@sat.or.th','CE278AC','à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET',1,'-','Received','à¸œà¸¹à¹‰à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´','2025-02-17','à¹€à¸­','2025-02-26',1,'2025-02-14 08:55:08','2025-02-26 11:09:36','2025-02-14',NULL,'-','-'),(3,3,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','235731325','test17@sat.or.th','20X2S75N22','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','LENOVO',1,NULL,'Rejected','à¸à¹ˆà¸²à¸¢à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥','2025-02-17',NULL,NULL,1,'2025-02-14 08:58:19','2025-02-17 06:01:54','2025-02-14',NULL,'-','-'),(4,3,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','à¸à¹ˆà¸²à¸¢à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸ à¸²à¸¢à¹ƒà¸™','235731325','test17@sat.or.th','CE278AC',NULL,'à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET',1,'-','Pending',NULL,NULL,NULL,NULL,0,'2025-02-25 07:48:22','2025-02-25 07:48:22',NULL,NULL,NULL,NULL),(5,28,'à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸­à¸¸à¹Šà¸šà¸­à¸´à¹Šà¸š','à¸à¹ˆà¸²à¸¢à¸™à¹‚à¸¢à¸šà¸²à¸¢à¹à¸¥à¸°à¹à¸œà¸™','213459999','test5@sat.or.th','CE278AC','à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET',1,'-','Approved','à¸œà¸¹à¹‰à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´','2025-02-26',NULL,NULL,1,'2025-02-26 04:44:34','2025-02-26 11:35:26',NULL,'-',NULL,NULL),(6,29,'à¸™à¸²à¸¢à¹€à¸­à¸­','à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','8712','orada.s@sat.or.th','20X2S75N22','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','LENOVO',1,'','Rejected','à¸œà¸¹à¹‰à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´','2025-02-26',NULL,NULL,1,'2025-02-26 11:01:18','2025-02-26 11:30:52',NULL,'à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œà¹„à¸¡à¹ˆà¸ªà¸²à¸¡à¸²à¸£à¸–à¹€à¸šà¸´à¸à¹„à¸”à¹‰',NULL,NULL),(7,29,'à¸™à¸²à¸¢à¹€à¸­à¸­','à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','8712','orada.s@sat.or.th','CE278AC','à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET',1,'','Approved','à¸œà¸¹à¹‰à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´','2025-02-26',NULL,NULL,1,'2025-02-26 11:02:50','2025-02-26 11:29:42',NULL,'-',NULL,NULL),(8,29,'à¸™à¸²à¸¢à¹€à¸­à¸­','à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','8712','orada.s@sat.or.th','CF211A','à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸«à¸¡à¸¶à¸à¸žà¸´à¸¡à¸žà¹Œ','HP LASERJET',1,'','Approved','à¸œà¸¹à¹‰à¸­à¸™à¸¸à¸¡à¸±à¸•à¸´','2025-02-26',NULL,NULL,1,'2025-02-26 11:03:12','2025-02-26 11:29:27',NULL,'-',NULL,NULL);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_history`
--

DROP TABLE IF EXISTS `search_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_history`
--

LOCK TABLES `search_history` WRITE;
/*!40000 ALTER TABLE `search_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `search_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `department_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'à¸à¸­à¸‡à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸à¸²à¸£à¸”à¸³à¹€à¸™à¸´à¸™à¸‡à¸²à¸™ à¸à¸à¸—.',6,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(2,'à¸à¸­à¸‡à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸à¸²à¸£à¸”à¸³à¹€à¸™à¸´à¸™à¸‡à¸²à¸™à¸à¸­à¸‡à¸—à¸¸à¸™',6,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(3,'à¸à¸­à¸‡à¸à¸¥à¸²à¸‡',7,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(4,'à¸à¸­à¸‡à¸›à¸£à¸°à¸Šà¸²à¸ªà¸±à¸¡à¸žà¸±à¸™à¸˜à¹Œ',7,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(5,'à¸à¸­à¸‡à¸›à¸£à¸°à¸ªà¸²à¸™à¸„à¸§à¸²à¸¡à¸£à¹ˆà¸§à¸¡à¸¡à¸·à¸­à¸£à¸°à¸«à¸§à¹ˆà¸²à¸‡à¸›à¸£à¸°à¹€à¸—à¸¨',7,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(6,'à¸à¸­à¸‡à¸„à¸§à¸šà¸„à¸¸à¸¡à¸à¸²à¸£à¹ƒà¸Šà¹‰à¸ªà¸²à¸£à¸•à¹‰à¸­à¸‡à¸«à¹‰à¸²à¸¡à¸—à¸²à¸‡à¸à¸²à¸£à¸à¸µà¸¬à¸²',8,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(7,'à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸‡à¸²à¸™à¸ªà¸£à¹‰à¸²à¸‡à¸™à¹‰à¸³à¸¢à¸²à¸—à¸²à¸‡à¸à¸²à¸£à¸à¸µà¸¬à¸²',8,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(8,'à¸à¸­à¸‡à¸šà¸±à¸à¸Šà¸µà¸à¸­à¸‡à¸—à¸¸à¸™',9,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(9,'à¸à¸­à¸‡à¸à¸²à¸£à¹€à¸‡à¸´à¸™à¸à¸­à¸‡à¸—à¸¸à¸™',9,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(10,'à¸à¸­à¸‡à¸žà¸±à¸ªà¸”à¸¸à¸à¸­à¸‡à¸—à¸¸à¸™',9,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(11,'à¸à¸­à¸‡à¸„à¸”à¸µ',10,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(12,'à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸à¸Žà¸«à¸¡à¸²à¸¢',10,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(13,'à¸à¸­à¸‡à¸—à¸°à¹€à¸šà¸µà¸¢à¸™à¸ªà¸¡à¸²à¸„à¸¡à¸à¸µà¸¬à¸²',10,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(14,'à¸à¸­à¸‡à¸šà¸±à¸à¸Šà¸µ',11,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(15,'à¸à¸­à¸‡à¸à¸²à¸£à¹€à¸‡à¸´à¸™',11,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(16,'à¸à¸­à¸‡à¸žà¸±à¸ªà¸”à¸¸',11,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(17,'à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥ à¸à¸à¸—.',12,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(18,'à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥ à¸à¸à¸—.',12,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(19,'à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸­à¸‡à¸„à¹Œà¸à¸£à¹à¸¥à¸°à¸™à¸§à¸±à¸•à¸à¸£à¸£à¸¡',12,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(20,'à¸à¸­à¸‡à¸™à¹‚à¸¢à¸šà¸²à¸¢à¹à¸¥à¸°à¸šà¸£à¸´à¸«à¸²à¸£à¸„à¸§à¸²à¸¡à¹€à¸ªà¸µà¹ˆà¸¢à¸‡',13,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(21,'à¸à¸­à¸‡à¹à¸œà¸™à¸‡à¸²à¸™à¹à¸¥à¸°à¸‡à¸šà¸›à¸£à¸°à¸¡à¸²à¸“',13,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(22,'à¸à¸­à¸‡à¸•à¸´à¸”à¸•à¸²à¸¡à¹à¸¥à¸°à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥',13,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(23,'à¸à¸­à¸‡à¸šà¸£à¸´à¸à¸²à¸£à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',14,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(24,'à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸£à¸°à¸šà¸šà¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',14,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(25,'à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸à¸µà¸¬à¸²à¹€à¸›à¹‡à¸™à¹€à¸¥à¸´à¸¨',15,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(26,'à¸à¸­à¸‡à¹à¸‚à¹ˆà¸‡à¸‚à¸±à¸™à¸à¸µà¸¬à¸²à¹€à¸›à¹‡à¸™à¹€à¸¥à¸´à¸¨',15,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(27,'à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸šà¸¸à¸„à¸¥à¸²à¸à¸£à¸à¸µà¸¬à¸²',15,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(28,'à¸à¸­à¸‡à¸§à¸´à¸—à¸¢à¸²à¸¨à¸²à¸ªà¸•à¸£à¹Œà¸à¸²à¸£à¸à¸µà¸¬à¸²',16,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(29,'à¸à¸­à¸‡à¹€à¸§à¸Šà¸¨à¸²à¸ªà¸•à¸£à¹Œà¸à¸²à¸£à¸à¸µà¸¬à¸²',16,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(30,'à¸à¸­à¸‡à¸§à¸´à¸ˆà¸±à¸¢à¹à¸¥à¸°à¸žà¸±à¸’à¸™à¸²à¸§à¸´à¸—à¸¢à¸²à¸¨à¸²à¸ªà¸•à¸£à¹Œà¸à¸²à¸£à¸à¸µà¸¬à¸²',16,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(31,'à¸à¸­à¸‡à¸¨à¸¹à¸™à¸¢à¹Œà¸à¸¶à¸à¸à¸µà¸¬à¸²à¹à¸«à¹ˆà¸‡à¸Šà¸²à¸•à¸´',16,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(32,'à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸‡à¸²à¸™à¹à¸¥à¸°à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥à¸à¸µà¸¬à¸²à¸­à¸²à¸Šà¸µà¸ž',17,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(33,'à¸à¸­à¸‡à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¸žà¸±à¸’à¸™à¸²à¸à¸µà¸¬à¸²à¸­à¸²à¸Šà¸µà¸ž',17,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(34,'à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸‡à¸²à¸™à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢',18,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(35,'à¸à¸­à¸‡à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¸žà¸±à¸’à¸™à¸²à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢',18,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(36,'à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸à¸²à¸£à¸•à¸¥à¸²à¸”à¹à¸¥à¸°à¸ªà¸´à¸—à¸˜à¸´à¸›à¸£à¸°à¹‚à¸¢à¸Šà¸™à¹Œ',19,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(37,'à¸à¸­à¸‡à¸šà¸£à¸´à¸à¸²à¸£à¸­à¸²à¸„à¸²à¸£à¹à¸¥à¸°à¸à¸´à¸ˆà¸à¸£à¸£à¸¡à¸à¸µà¸¬à¸²',19,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(38,'à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸ªà¸´à¸™à¸—à¸£à¸±à¸žà¸¢à¹Œà¹à¸¥à¸°à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¸­à¸¸à¸•à¸ªà¸²à¸«à¸à¸£à¸£à¸¡à¸à¸²à¸£à¸à¸µà¸¬à¸²',19,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(39,'à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸‡à¸²à¸™à¸à¸µà¸¬à¸²à¸ à¸¹à¸¡à¸´à¸ à¸²à¸„',20,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(40,'à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸à¸µà¸¬à¸²à¸ à¸¹à¸¡à¸´à¸ à¸²à¸„',20,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(41,'à¸à¸­à¸‡à¸§à¸´à¸¨à¸§à¸à¸£à¸£à¸¡',21,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(42,'à¸à¸­à¸‡à¸‹à¹ˆà¸­à¸¡à¸šà¸³à¸£à¸¸à¸‡',21,'2025-01-24 02:08:53','2025-01-24 02:08:53');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `section_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'à¸‡à¸²à¸™à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸š 1',1,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(2,'à¸‡à¸²à¸™à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸š 2',1,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(3,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸à¸²à¸£à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸ à¸²à¸¢à¹ƒà¸™',1,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(4,'à¸‡à¸²à¸™à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸à¸­à¸‡à¸—à¸¸à¸™ 1',2,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(5,'à¸‡à¸²à¸™à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸à¸­à¸‡à¸—à¸¸à¸™ 2',2,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(6,'à¸‡à¸²à¸™à¸˜à¸¸à¸£à¸à¸²à¸£à¹à¸¥à¸°à¸ªà¸²à¸£à¸šà¸£à¸£à¸“',3,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(7,'à¸‡à¸²à¸™à¹€à¸¥à¸‚à¸²à¸™à¸¸à¸à¸²à¸£à¹à¸¥à¸°à¸à¸²à¸£à¸›à¸£à¸°à¸Šà¸¸à¸¡',3,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(8,'à¸‡à¸²à¸™à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¸à¸²à¸£à¸à¸³à¸à¸±à¸šà¸”à¸¹à¹à¸¥à¸—à¸µà¹ˆà¸”à¸µ',3,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(9,'à¸‡à¸²à¸™à¸›à¸£à¸°à¸Šà¸²à¸ªà¸±à¸¡à¸žà¸±à¸™à¸˜à¹Œ',4,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(10,'à¸‡à¸²à¸™à¸œà¸¥à¸´à¸•à¸ªà¸·à¹ˆà¸­',4,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(11,'à¸‡à¸²à¸™à¸›à¸£à¸°à¸ªà¸²à¸™à¸­à¸‡à¸„à¹Œà¸à¸£à¸à¸µà¸¬à¸²à¸£à¸°à¸«à¸§à¹ˆà¸²à¸‡à¸›à¸£à¸°à¹€à¸—à¸¨',5,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(12,'à¸‡à¸²à¸™à¸§à¸´à¹€à¸—à¸¨à¸ªà¸±à¸¡à¸žà¸±à¸™à¸˜à¹Œ',5,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(13,'à¸‡à¸²à¸™à¸§à¸´à¸Šà¸²à¸à¸²à¸£à¸ªà¸²à¸£à¸•à¹‰à¸­à¸‡à¸«à¹‰à¸²à¸¡à¸—à¸²à¸‡à¸à¸²à¸£à¸à¸µà¸¬à¸²',6,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(14,'à¸‡à¸²à¸™à¸•à¸£à¸§à¸ˆà¸ªà¸²à¸£à¸•à¹‰à¸­à¸‡à¸«à¹‰à¸²à¸¡',6,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(15,'à¸‡à¸²à¸™à¸™à¸´à¸•à¸´à¸à¸²à¸£à¸ªà¸²à¸£à¸•à¹‰à¸­à¸‡à¸«à¹‰à¸²à¸¡à¸—à¸²à¸‡à¸à¸²à¸£à¸à¸µà¸¬à¸²',7,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(16,'à¸‡à¸²à¸™à¹€à¸¥à¸‚à¸²à¸™à¸¸à¸à¸²à¸£à¸ªà¸²à¸£à¸•à¹‰à¸­à¸‡à¸«à¹‰à¸²à¸¡à¸—à¸²à¸‡à¸à¸²à¸£à¸à¸µà¸¬à¸²',7,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(17,'à¸‡à¸²à¸™à¸£à¸°à¸šà¸šà¸šà¸±à¸à¸Šà¸µà¸à¸­à¸‡à¸—à¸¸à¸™',8,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(18,'à¸‡à¸²à¸™à¸›à¸£à¸°à¸¡à¸§à¸¥à¸œà¸¥à¸šà¸±à¸à¸Šà¸µà¸à¸­à¸‡à¸—à¸¸à¸™',8,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(19,'à¸‡à¸²à¸™à¸šà¸±à¸à¸Šà¸µà¸¥à¸¹à¸à¸«à¸™à¸µà¹‰à¸à¸­à¸‡à¸—à¸¸à¸™',8,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(20,'à¸‡à¸²à¸™à¸à¸²à¸£à¹€à¸‡à¸´à¸™à¸à¸­à¸‡à¸—à¸¸à¸™ 1',9,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(21,'à¸‡à¸²à¸™à¸à¸²à¸£à¹€à¸‡à¸´à¸™à¸à¸­à¸‡à¸—à¸¸à¸™ 2',9,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(22,'à¸‡à¸²à¸™à¹€à¸šà¸´à¸à¸ˆà¹ˆà¸²à¸¢à¹€à¸‡à¸´à¸™à¸à¸­à¸‡à¸—à¸¸à¸™',9,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(23,'à¸‡à¸²à¸™à¸ˆà¸±à¸”à¸‹à¸·à¹‰à¸­à¸ˆà¸±à¸”à¸ˆà¹‰à¸²à¸‡à¸à¸­à¸‡à¸—à¸¸à¸™',10,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(24,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸ªà¸±à¸à¸à¸²à¸à¸­à¸‡à¸—à¸¸à¸™',10,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(25,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸žà¸±à¸ªà¸”à¸¸à¸à¸­à¸‡à¸—à¸¸à¸™',10,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(26,'à¸‡à¸²à¸™à¸„à¸”à¸µ',11,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(27,'à¸‡à¸²à¸™à¸™à¸´à¸•à¸´à¸à¸²à¸£',11,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(28,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸à¸Žà¸«à¸¡à¸²à¸¢',12,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(29,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¹à¸¥à¸°à¸à¸³à¸à¸±à¸šà¸•à¸´à¸”à¸•à¸²à¸¡à¸à¸Žà¸«à¸¡à¸²à¸¢',12,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(30,'à¸‡à¸²à¸™à¸—à¸°à¹€à¸šà¸µà¸¢à¸™à¸ªà¸¡à¸²à¸„à¸¡à¸à¸µà¸¬à¸²',13,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(31,'à¸‡à¸²à¸™à¸—à¸°à¹€à¸šà¸µà¸¢à¸™à¸ªà¸¡à¸²à¸„à¸¡à¸à¸µà¸¬à¸²à¸›à¸£à¸°à¸ˆà¸³à¸à¸£à¸¸à¸‡à¹€à¸—à¸žà¸¡à¸«à¸²à¸™à¸„à¸£',13,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(32,'à¸‡à¸²à¸™à¸£à¸°à¸šà¸šà¸šà¸±à¸à¸Šà¸µ',14,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(33,'à¸‡à¸²à¸™à¸›à¸£à¸°à¸¡à¸§à¸¥à¸œà¸¥à¸šà¸±à¸à¸Šà¸µ',14,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(34,'à¸‡à¸²à¸™à¸šà¸±à¸à¸Šà¸µà¸¥à¸¹à¸à¸«à¸™à¸µà¹‰',14,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(35,'à¸‡à¸²à¸™à¸à¸²à¸£à¹€à¸‡à¸´à¸™ à¸à¸à¸—.',15,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(36,'à¸‡à¸²à¸™à¸à¸²à¸£à¹€à¸‡à¸´à¸™à¸­à¸‡à¸„à¹Œà¸à¸£à¸à¸µà¸¬à¸²',15,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(37,'à¸‡à¸²à¸™à¸ˆà¸±à¸”à¸‹à¸·à¹‰à¸­à¸ˆà¸±à¸”à¸ˆà¹‰à¸²à¸‡',16,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(38,'à¸‡à¸²à¸™à¸„à¸¥à¸±à¸‡à¸žà¸±à¸ªà¸”à¸¸à¹à¸¥à¸°à¸¢à¸²à¸™à¸žà¸²à¸«à¸™à¸°',16,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(39,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸ªà¸±à¸à¸à¸²',16,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(40,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥',17,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(41,'à¸‡à¸²à¸™à¸ªà¸§à¸±à¸ªà¸”à¸´à¸à¸²à¸£à¹à¸¥à¸°à¹à¸£à¸‡à¸‡à¸²à¸™à¸ªà¸±à¸¡à¸žà¸±à¸™à¸˜à¹Œ',17,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(42,'à¸‡à¸²à¸™à¸ˆà¸£à¸´à¸¢à¸˜à¸£à¸£à¸¡à¹à¸¥à¸°à¸§à¸´à¸™à¸±à¸¢',17,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(43,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥',18,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(44,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸„à¹ˆà¸²à¸™à¸´à¸¢à¸¡à¹à¸¥à¸°à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¸„à¸§à¸²à¸¡à¸œà¸¹à¸à¸žà¸±à¸™à¸­à¸‡à¸„à¹Œà¸à¸£',18,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(45,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸­à¸‡à¸„à¹Œà¸à¸£',19,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(46,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸­à¸‡à¸„à¹Œà¸„à¸§à¸²à¸¡à¸£à¸¹à¹‰à¹à¸¥à¸°à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¸™à¸§à¸±à¸•à¸à¸£à¸£à¸¡',19,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(47,'à¸‡à¸²à¸™à¸™à¹‚à¸¢à¸šà¸²à¸¢à¹à¸¥à¸°à¹à¸œà¸™',20,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(48,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸„à¸§à¸²à¸¡à¹€à¸ªà¸µà¹ˆà¸¢à¸‡',20,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(49,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¹à¸¥à¸°à¸šà¸£à¸´à¸«à¸²à¸£à¸œà¸¹à¹‰à¸¡à¸µà¸ªà¹ˆà¸§à¸™à¹„à¸”à¹‰à¹€à¸ªà¸µà¸¢à¹à¸¥à¸°à¸¥à¸¹à¸à¸„à¹‰à¸²',20,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(50,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¹à¸¥à¸°à¸›à¸£à¸°à¸ªà¸²à¸™à¹à¸œà¸™',21,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(51,'à¸‡à¸²à¸™à¸‡à¸šà¸›à¸£à¸°à¸¡à¸²à¸“',21,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(52,'à¸‡à¸²à¸™à¸§à¸´à¹€à¸„à¸£à¸²à¸°à¸«à¹Œà¹à¸¥à¸°à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥',22,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(53,'à¸‡à¸²à¸™à¸•à¸´à¸”à¸•à¸²à¸¡à¸‡à¸šà¸›à¸£à¸°à¸¡à¸²à¸“',22,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(54,'à¸‡à¸²à¸™à¸›à¸à¸´à¸šà¸±à¸•à¸´à¸à¸²à¸£à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',23,'2024-12-06 07:44:08','2025-01-24 03:15:49'),(55,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸à¸²à¸£à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',23,'2024-12-06 07:44:08','2025-01-24 03:15:49'),(56,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸£à¸°à¸šà¸šà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',24,'2024-12-06 07:44:08','2025-01-24 03:15:49'),(57,'à¸‡à¸²à¸™à¸ªà¸™à¸±à¸šà¸ªà¸™à¸¸à¸™à¸à¸²à¸£à¹ƒà¸Šà¹‰à¸£à¸°à¸šà¸šà¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',24,'2024-12-06 07:44:08','2025-01-24 03:15:49'),(58,'à¸‡à¸²à¸™à¸§à¸´à¹€à¸„à¸£à¸²à¸°à¸«à¹Œà¹à¸¥à¸°à¸žà¸±à¸’à¸™à¸²à¸à¸µà¸¬à¸²à¹€à¸›à¹‡à¸™à¹€à¸¥à¸´à¸¨',25,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(59,'à¸‡à¸²à¸™à¸à¸³à¸à¸±à¸šà¸”à¸¹à¹à¸¥à¹à¸¥à¸°à¸•à¸´à¸”à¸•à¸²à¸¡à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥à¸à¸µà¸¬à¸²à¹€à¸›à¹‡à¸™à¹€à¸¥à¸´à¸¨',25,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(60,'à¸‡à¸²à¸™à¹à¸‚à¹ˆà¸‡à¸‚à¸±à¸™à¸à¸µà¸¬à¸²à¸£à¸°à¸”à¸±à¸šà¸Šà¸²à¸•à¸´',26,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(61,'à¸‡à¸²à¸™à¹à¸‚à¹ˆà¸‡à¸‚à¸±à¸™à¸à¸µà¸¬à¸²à¸£à¸°à¸”à¸±à¸šà¸™à¸²à¸™à¸²à¸Šà¸²à¸•à¸´',26,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(62,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸šà¸¸à¸„à¸¥à¸²à¸à¸£à¸à¸µà¸¬à¸²à¸£à¸°à¸”à¸±à¸šà¸Šà¸²à¸•à¸´',27,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(63,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸šà¸¸à¸„à¸¥à¸²à¸à¸£à¸à¸µà¸¬à¸²à¸£à¸°à¸”à¸±à¸šà¸™à¸²à¸™à¸²à¸Šà¸²à¸•à¸´',27,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(64,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸¨à¸±à¸à¸¢à¸ à¸²à¸žà¸à¸µà¸¬à¸²',28,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(65,'à¸‡à¸²à¸™à¸—à¸”à¸ªà¸­à¸šà¸ªà¸¡à¸£à¸£à¸–à¸ à¸²à¸žà¸à¸µà¸¬à¸²',28,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(66,'à¸‡à¸²à¸™à¸¨à¸¹à¸™à¸¢à¹Œà¸šà¸£à¸´à¸à¸²à¸£à¸—à¸²à¸‡à¸à¸²à¸£à¹à¸žà¸—à¸¢à¹Œà¸à¸µà¸¬à¸²',31,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(67,'à¸‡à¸²à¸™à¸•à¸£à¸§à¸ˆà¸£à¸±à¸à¸©à¸²',31,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(68,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸¨à¸¹à¸™à¸¢à¹Œà¸à¸¶à¸à¸à¸µà¸¬à¸²à¹à¸«à¹ˆà¸‡à¸Šà¸²à¸•à¸´',31,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(69,'à¸‡à¸²à¸™à¸§à¸´à¸ˆà¸±à¸¢à¸§à¸´à¸—à¸¢à¸²à¸¨à¸²à¸ªà¸•à¸£à¹Œà¸à¸²à¸£à¸à¸µà¸¬à¸²',31,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(70,'à¸‡à¸²à¸™à¸à¸³à¸à¸±à¸šà¸„à¸§à¸šà¸„à¸¸à¸¡à¹à¸¥à¸°à¸•à¸´à¸”à¸•à¸²à¸¡à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥à¸à¸µà¸¬à¸²à¸­à¸²à¸Šà¸µà¸ž',32,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(71,'à¸‡à¸²à¸™à¹€à¸¥à¸‚à¸²à¸™à¸¸à¸à¸²à¸£à¸à¸²à¸£à¸›à¸£à¸°à¸Šà¸¸à¸¡à¸à¸µà¸¬à¸²à¸­à¸²à¸Šà¸µà¸ž',32,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(72,'à¸‡à¸²à¸™à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¹à¸¥à¸°à¸¡à¸²à¸•à¸£à¸à¸²à¸™à¸à¸µà¸¬à¸²à¸­à¸²à¸Šà¸µà¸ž',33,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(73,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸à¸µà¸¬à¸²à¸­à¸²à¸Šà¸µà¸ž',33,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(74,'à¸‡à¸²à¸™à¸à¸³à¸à¸±à¸šà¸„à¸§à¸šà¸„à¸¸à¸¡à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢',34,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(75,'à¸‡à¸²à¸™à¹€à¸¥à¸‚à¸²à¸™à¸¸à¸à¸²à¸£à¸à¸²à¸£à¸›à¸£à¸°à¸Šà¸¸à¸¡à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢',34,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(76,'à¸‡à¸²à¸™à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡ à¸žà¸±à¸’à¸™à¸² à¹à¸¥à¸°à¸ªà¸§à¸±à¸ªà¸”à¸´à¸à¸²à¸£à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(77,'à¸‡à¸²à¸™à¸¡à¸²à¸•à¸£à¸à¸²à¸™à¹à¸¥à¸°à¸•à¸´à¸”à¸•à¸²à¸¡à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(78,'à¸ªà¸–à¸²à¸šà¸±à¸™à¸¡à¸§à¸¢à¹„à¸—à¸¢à¹à¸«à¹ˆà¸‡à¸Šà¸²à¸•à¸´',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(79,'à¸‡à¸²à¸™à¸¡à¸²à¸•à¸£à¸à¸²à¸™ à¸§à¸´à¸ˆà¸±à¸¢ à¸žà¸±à¸’à¸™à¸² à¹à¸¥à¸°à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¸™à¸§à¸±à¸•à¸à¸£à¸£à¸¡à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢à¹„à¸—à¸¢',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(80,'à¸‡à¸²à¸™à¸£à¸±à¸šà¸£à¸­à¸‡à¸¡à¸²à¸•à¸£à¸à¸²à¸™à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢à¹„à¸—à¸¢',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(81,'à¸‡à¸²à¸™à¹à¸œà¸™à¹à¸¥à¸°à¸žà¸±à¸’à¸™à¸²à¸à¸²à¸£à¸•à¸¥à¸²à¸”',36,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(82,'à¸‡à¸²à¸™à¸¥à¸¹à¸à¸„à¹‰à¸²à¸ªà¸±à¸¡à¸žà¸±à¸™à¸˜à¹Œà¹à¸¥à¸°à¸„à¸¸à¹‰à¸¡à¸„à¸£à¸­à¸‡à¸ªà¸´à¸—à¸˜à¸´à¹Œ',36,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(83,'à¸‡à¸²à¸™à¹à¸œà¸™à¹à¸¥à¸°à¸šà¸£à¸´à¸à¸²à¸£à¸­à¸²à¸„à¸²à¸£à¸ªà¸–à¸²à¸™à¸—à¸µà¹ˆ',37,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(84,'à¸‡à¸²à¸™à¹à¸œà¸™à¹à¸¥à¸°à¸šà¸£à¸´à¸à¸²à¸£à¸à¸´à¸ˆà¸à¸£à¸£à¸¡à¸à¸µà¸¬à¸²',37,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(85,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸ªà¸´à¸™à¸—à¸£à¸±à¸žà¸¢à¹Œ',38,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(86,'à¸‡à¸²à¸™à¸ªà¹ˆà¸‡à¹€à¸ªà¸£à¸´à¸¡à¹à¸¥à¸°à¸ªà¸™à¸±à¸šà¸ªà¸™à¸¸à¸™à¸­à¸¸à¸•à¸ªà¸²à¸«à¸à¸£à¸£à¸¡à¸à¸²à¸£à¸à¸µà¸¬à¸²',38,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(87,'à¸‡à¸²à¸™à¸šà¸£à¸´à¸«à¸²à¸£à¸à¸µà¸¬à¸²à¸ à¸¹à¸¡à¸´à¸ à¸²à¸„',39,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(88,'à¸‡à¸²à¸™à¹à¸‚à¹ˆà¸‡à¸‚à¸±à¸™à¸à¸µà¸¬à¸²à¸ à¸¹à¸¡à¸´à¸ à¸²à¸„',39,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(89,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸™à¸±à¸à¸à¸µà¸¬à¸²à¸ à¸¹à¸¡à¸´à¸ à¸²à¸„',40,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(90,'à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸šà¸¸à¸„à¸¥à¸²à¸à¸£à¸à¸µà¸¬à¸²à¸ à¸¹à¸¡à¸´à¸ à¸²à¸„',40,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(91,'à¸‡à¸²à¸™à¸§à¸´à¹€à¸„à¸£à¸²à¸°à¸«à¹Œà¹à¸¥à¸°à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¹‚à¸„à¸£à¸‡à¸à¸²à¸£à¸¥à¸‡à¸—à¸¸à¸™',41,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(92,'à¸‡à¸²à¸™à¸ªà¸³à¸£à¸§à¸ˆ à¸­à¸­à¸à¹à¸šà¸š à¹à¸¥à¸°à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸£à¸²à¸„à¸²',41,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(93,'à¸‡à¸²à¸™à¸„à¸§à¸šà¸„à¸¸à¸¡à¸à¸²à¸£à¸à¹ˆà¸­à¸ªà¸£à¹‰à¸²à¸‡',41,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(94,'à¸‡à¸²à¸™à¸‹à¹ˆà¸­à¸¡à¸šà¸³à¸£à¸¸à¸‡à¸­à¸²à¸„à¸²à¸£',42,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(95,'à¸‡à¸²à¸™à¸‹à¹ˆà¸­à¸¡à¸šà¸³à¸£à¸¸à¸‡à¸žà¸±à¸ªà¸”à¸¸ à¸„à¸£à¸¸à¸ à¸±à¸“à¸‘à¹Œ à¹à¸¥à¸°à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸à¸µà¸¬à¸²',42,'2024-12-06 07:44:08','2025-01-24 03:11:53');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp_categories`
--

DROP TABLE IF EXISTS `temp_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_categories` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_categories`
--

LOCK TABLES `temp_categories` WRITE;
/*!40000 ALTER TABLE `temp_categories` DISABLE KEYS */;
INSERT INTO `temp_categories` VALUES (1,'à¸§à¸±à¸ªà¸”à¸¸à¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸§à¸±à¸ªà¸”à¸¸'),(2,'à¸­à¸¸à¸›à¸à¸£à¸“à¹Œà¸„à¸­à¸¡à¸žà¸´à¸§à¹€à¸•à¸­à¸£à¹Œ','à¸­à¸¸à¸›à¸à¸£à¸“à¹Œ'),(10,'à¸ªà¸²à¸¢à¹à¸¥à¸™','3');
/*!40000 ALTER TABLE `temp_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'User',
  `status` varchar(50) DEFAULT 'Pending',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `department_name` varchar(255) DEFAULT NULL,
  `section_name` varchar(255) DEFAULT NULL,
  `task_name` varchar(255) DEFAULT NULL,
  `image` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Itstaff','it1234','à¸™à¸²à¸‡à¸ªà¸²à¸§à¸Šà¸¢à¸¸à¸”à¸² à¹€à¸£à¸·à¸­à¸‡à¸‚à¸³','8712','test1@sat.or.th','IT','Approved','2024-12-12 07:14:40','2025-02-26 11:27:28','à¸à¹ˆà¸²à¸¢à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨','à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸£à¸°à¸šà¸šà¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨','à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸£à¸°à¸šà¸šà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',NULL),(2,'test_6','teat611','à¸™à¸²à¸¢à¹€à¸­à¸','021345678','test@sat.or.th','Approver','Approved','2024-12-25 02:15:58','2025-02-21 08:53:12','à¸à¹ˆà¸²à¸¢à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨','à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸£à¸°à¸šà¸šà¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨','à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸£à¸°à¸šà¸šà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',NULL),(3,'testAB11','Ac123','à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸ªà¸¡à¸¤à¸—à¸±à¸¢','235731325','test17@sat.or.th','User','Approved','2025-02-04 03:18:12','2025-02-25 04:08:49','à¸à¹ˆà¸²à¸¢à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸ à¸²à¸¢à¹ƒà¸™','à¸à¸­à¸‡à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸à¸²à¸£à¸”à¸³à¹€à¸™à¸´à¸™à¸‡à¸²à¸™ à¸à¸à¸—.','à¸‡à¸²à¸™à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸š 2',NULL),(4,'testUser1','ch123','à¸™à¸²à¸¢ à¸šà¸µ','021345678','test@sat.or.th','User','Pending','2025-02-04 04:40:32','2025-02-06 02:47:44','à¸ªà¸³à¸™à¸±à¸à¸‡à¸²à¸™à¸„à¸“à¸°à¸à¸£à¸£à¸¡à¸à¸²à¸£à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢','à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸‡à¸²à¸™à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢','à¸‡à¸²à¸™à¸à¸³à¸à¸±à¸šà¸„à¸§à¸šà¸„à¸¸à¸¡à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢',NULL),(21,'test11','aa1234','à¸™à¸²à¸¢ à¸‹à¸µ','021234467','test@sat.or.th','User','Pending','2025-02-07 03:23:54','2025-02-07 03:23:54','à¸à¹ˆà¸²à¸¢à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥','à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥ à¸à¸à¸—.','à¸‡à¸²à¸™à¸ªà¸§à¸±à¸ªà¸”à¸´à¸à¸²à¸£à¹à¸¥à¸°à¹à¸£à¸‡à¸‡à¸²à¸™à¸ªà¸±à¸¡à¸žà¸±à¸™à¸˜à¹Œ',NULL),(22,'ch2345','td789','à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸šà¸µ','023456789','test22@sat.or.th','User','Approved','2025-02-18 09:43:57','2025-02-26 02:59:08','à¸à¹ˆà¸²à¸¢à¸à¸²à¸£à¸„à¸¥à¸±à¸‡','à¸à¸­à¸‡à¸šà¸±à¸à¸Šà¸µ','à¸‡à¸²à¸™à¸›à¸£à¸°à¸¡à¸§à¸¥à¸œà¸¥à¸šà¸±à¸à¸Šà¸µ',NULL),(23,'testAB112','dd5678','à¸™à¸²à¸‡à¸ªà¸²à¸§à¸”à¸µ','021345678','test20@sat.or.th','User','Pending','2025-02-21 04:43:33','2025-02-21 04:43:33','à¸ªà¸³à¸™à¸±à¸à¸‡à¸²à¸™à¸„à¸“à¸°à¸à¸£à¸£à¸¡à¸à¸²à¸£à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢','à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸‡à¸²à¸™à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢','à¸‡à¸²à¸™à¹€à¸¥à¸‚à¸²à¸™à¸¸à¸à¸²à¸£à¸à¸²à¸£à¸›à¸£à¸°à¸Šà¸¸à¸¡à¸à¸µà¸¬à¸²à¸¡à¸§à¸¢',NULL),(24,'testV12','ccc789','à¸™à¸²à¸¢ à¸ªà¸¡','213459999','test151@sat.or.th','User','Pending','2025-02-21 06:18:59','2025-02-21 06:18:59','à¸à¹ˆà¸²à¸¢à¸žà¸±à¸’à¸™à¸²à¸à¸µà¸¬à¸²à¹€à¸›à¹‡à¸™à¹€à¸¥à¸´à¸¨','à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸šà¸¸à¸„à¸¥à¸²à¸à¸£à¸à¸µà¸¬à¸²','à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸šà¸¸à¸„à¸¥à¸²à¸à¸£à¸à¸µà¸¬à¸²à¸£à¸°à¸”à¸±à¸šà¸Šà¸²à¸•à¸´',_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\â\ØICC_PROFILE\0\0\0\È\0\0\0\00\0\0mntrRGB XYZ \à\0\0\0\0\0\0\0\0acsp\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0ö\Ö\0\0\0\0\0\Ó-\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0	desc\0\0\0ð\0\0\0$rXYZ\0\0\0\0\0gXYZ\0\0(\0\0\0bXYZ\0\0<\0\0\0wtpt\0\0P\0\0\0rTRC\0\0d\0\0\0(gTRC\0\0d\0\0\0(bTRC\0\0d\0\0\0(cprt\0\0Œ\0\0\0<mluc\0\0\0\0\0\0\0\0\0\0enUS\0\0\0\0\0\0\0s\0R\0G\0BXYZ \0\0\0\0\0\0o¢\0\08õ\0\0XYZ \0\0\0\0\0\0b™\0\0·…\0\0\ÚXYZ \0\0\0\0\0\0$ \0\0„\0\0¶\ÏXYZ \0\0\0\0\0\0ö\Ö\0\0\0\0\0\Ó-para\0\0\0\0\0\0\0\0ff\0\0ò§\0\0\rY\0\0\Ð\0\0\n[\0\0\0\0\0\0\0\0mluc\0\0\0\0\0\0\0\0\0\0enUS\0\0\0 \0\0\0\0G\0o\0o\0g\0l\0e\0 \0I\0n\0c\0.\0 \02\00\01\06ÿ\Û\0C\0\n\n\n\n\r\r#%$\"\"!&+7/&)4)!\"0A149;>>>%.DIC<H7=>;ÿ\Û\0C\n\r;(\"(;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ÿÀ\0ô \"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0;\0\0\0!1AQ\"aq2‘¡ð±Á#B\Ñ\áñR3b$rC‚’\Âÿ\Ä\0\Z\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0(\0\0\0\0\0\0!1AQaq\"2B¡ð#ÿ\Ú\0\0\0?\0\Ä6\×%”‹„ÊŽ¡›kr\×%ƒl>´\éptK’\ã°ø}f—*«­%µNE}~OR2z¥Ø¢€¤ò(B\Ú]P\ÆC­>¦Â²¬¸™;ûR6¬€\Å`7=©•3®3þ¢·m*\Ãc<\n¡i0iÇ´50|¢r@¥\Þ\ß+qx\Ê\ÖE±z‰*A«þ\ÕHùT¨±f\0\ÃcP6®¶AX©Œ\ÐjÀMZ\Ð	vG\Â\Û\ÐÔ`\ìh¢\"–…º:õ‘$\Ö}\Ë-f\æµ§qZ\Éý[pw£°m8SRœ,¤&Ð•\Û\â\Ì`\Ö}\Û&\Ñ\ÎÕ®\ÖM“©I(xª\Þ\é\Å\Ô$	\É\Ë\Ã\Ù~N˜rÑŽ0jF3W½e¬´Š®štÎ¤\ï(\ê\ê°5\Ô¢¦+«¨£*b¢¤S 2Àl*À5f®©-\'4\é\Ù]<U\Ñ ÀÉ£,m†\Õ\å\ng§\è|a\åb óU\\dœÐ¢ #\'ˆf¬¶\È8\Z§7¦¯tMc —ói,\Ëéšªh´‚g\\‘=¶ÿ\0t\ê8\Îô\"ð‘v\"‡\àc§±3G\ÐV\é‰1Ûš\ë–Å¶\Ó\ÎÞ”\Ý\ØL\Ú\àoA*F\â´@\nÄ SÄû\Õ.ô\ÅI¶H:I˜ ó)q|(¹>ˆi¨Šf÷Or\ÓC!Y\0\äpr(Mm‘Š‘‘‚*.T¬	Iª”4h\ï\\ViR\ÓQ¦ŽWÒªRv¤p°(®Š¹X\â»H¥ \ÙH©¦*kQ¬Š+«…0\ÅLjxŠ­!€q\ï\\`;úƒT\ÍZ	*#&°6\ÜWm\ë]Mp š\Æ\'\ZN©ž*Š³ð`(ˆÞ ©š\Æ\"*\"§}\ë¶\â°H\ÌG\ÓVœmQ2#@Ä†<\Ô\ï\éUœW½(‚‰>•{Wk™¤\ÏÚ…˜\é\ïPXUI®0E-D\Ì\×1Š¯µDP°\Ð`A\\“<TAš $UƒQ»½DTƒœU\ÔFe@«\ÅXÛŠ\àSP¥ƒ\\$®EDV YmPMISA„‚j\Íq\"=j7¤c\"jj*AŠ\Æ:\Ñ]]5\Äö\Åc\\bkªh­O­uLMj1S]r<»f¢ \ÆÕŒA®Šž\"¸n\rj1»#\"¦$ñ\\kŠ\èòÌj˜5\"È b±ª\Äi\Ä\Ì\×N\Û\ZŽk\æ>Rc×š¡«j\0‘\ÅMu\0ŸH·¦B:\ïyª5¼»® ƒyúPô¸`¬t‚&I\âŠ3i\Èúpuzú\Ã\ä)¦V\â\êu\"\Ø J\Þþ•ñqJ-•\ã~{Ó¶—S(f…c \Ä\Ò×­4©]\'µe±\á*`“¦{\È÷B‚I\íKº(p<´\Ép¶\Õ›\Ê~F©\ÕY¸‘®\ÙX9ò\Ó\"\É\äÏ¾ƒp#Ú—0\riõ€l0e\Üg“¹ld†÷’H\ê„ð,¼Š 3ôª7\ÇÚ¤“‚)<—\"Dö«©•Ÿ­B\Ãj•½\r+DÂ«”:‡Î­{§”WL{Q\í¶ƒ \ä¨4þ´ ÿ\0M·Ï…€	™»\Óó\Û:[š%´Öš[x©¸›¹•\Ôt^\"+õ–²\åH¯^\Êl˜1¤÷¬¿\â\',\é\\¼\Ü=•£«‡š3º­rÙ¶\ÄU¯>št\Îý“SP*i	©¢§jtÀ÷¦-¨f¦\0\ÌR\ã&\0šf\È Ap$\í\ÛÞ«\r“ž‡-©º­¤\0:§·Úœ\è\í\és©\Õ‚Hcƒ\Úb–\é\Þ\í´²ž+]!\n\Æä4Í»ZÌƒ£;S\Û\å]‘\Ù\Ã<#c©µnõ‹vm;eBP’·¼\0{\ãšBÿ\0AdX¹p‡ò¸HL\Î;\ÆôW}Kü\Ùªñ…e#Td\é\ãcˆŠ\"Ý¶:h9.¸Df„\ß$0§q\Í\nX\'\ÙØªô-q¢Òº*l\\œ`Á\' \Ç4£t@_PršK\ZJ\Ä\âb\'§z\â°ð\Üÿ\0ñ’ò\ÎL\æv3?Z¨¶öžî§Jj}‰^þûö¡F\îÖŒb ª“mŒFñ¸ûÕ­\\o\ë\n·UeB\Ý^26û\ÓW:r\Ë	CA#ò>_:\r\ÐliV\àV\n\\1Á<q\ïA¯\n)&E\î–/‹W ‰,Nÿ\0­)s¦\n\ÚH*F=\é\ë÷ó;\ÊIxÒ¢$w\0}\ê@Š\Ê\èN\Ë\'#ž\âµ&²e&ŒË1OQA(Ë˜Á\Ø\Åjø%“\Ë\0œÐm°6\Ê.®HJœ¸¾)›\ïP@§_§!5(-\è\rf¨\ÞEAñ²\Êi€+U((\æÙ‰ª²vŠGÔ€ª\ÅŠ‚ \Ô\ÜGR]5rµ\Zhua²$ó]:k¢µ\ZÈŽ\Õ#\×ª@®+š4k:Hù\×8©\Æ\ÑR\à˜ö\ïF€T\0s5Q¾ôP@\ÔBŒ\Õ\"8\Í\n5\Æ=\ê[iy:\àH\Í\n	\Âb	\Ås\Ø\Ít’=tc1@\ÅxŠ\ãµIk¹ô¡A\"`dT|ªcÒ»;mB‚TûTm\ëW#0j\n\âF\Ô(\Ö@$6¸	5\ÑÞ¦qX$ˆ\n¨«‰®*8š\Ôk9MN\Ô(VŠ(Vƒ‡\Ä(ˆU·¸1WiÐ¡Z\Ü	P\Îõu»ˆ\â¹Ä®®\rmñµ\íW5CHÂŠû˜®ö«i0\í\\ RPöp®S\ë]i¨R\"dŽ7¨«	$œTÀ€I¡A+\ÄT\î3Û½YUq˜\Ìk\0¨B\Â@À\Üö©*\à\Zu@Ÿ‘õª‰9‰\'Œv’R`‘UÀÛ·j¾–\01&¸É™Ö YR¦r#š•+ˆ\æ£\ß\éZƒg»LÕ´Â‚v;Wc`(¬gz\ãRqQ30+‚\"H®:``Ô¶j´Aª\Õ\àjˆµ\0¢½\ëªbº8 c\è\î5½,²À€unÿ\0µg¼\ïñ2\ä\Ì\0G°¬Þ›¨¸¤üzQuÙ‰ú‘Z3ž!7X§Oÿ\0±õ)Ÿ5\É\Æ\Ñuq‘0Fv¢\Þt±]m€\Ç‚m]Y`O÷\'1\ëEË\î\Ê~203\ØS\íP1\Ójbº€LŸASz\ïˆm\é\Ö:˜Ÿ3\Î=(™¶AC©d‚\âbx\ÌN\Õ\â\ßa i7Ic¾Ø£ù[Ñ•q<1¦\âŸH<PJg0 \Äþ•¡~Ò¥\è\0‚Tcžÿ\0ZZ\âª1!u\r†¡:\ÌéŒŒÛ¶\àšª‚\ÒIb™¼²»\á„\Ò\ê\'\ÊG¥#G\\eh\å¢Æ¥›Ð”½L\Z\0a¬\ë¤n7¢h%c±\Å.	K\Æ\Çz{P~œ(T\È=\è5h›\Ã`‡C?Þ¹\í\é\"\êIÐ‘\Õt\Üµ±ˆ÷úÓªe1j`hª_·•\Í,lxj‚(\ÖÉ³sIÀ4wAq6‘\Å+T*<\çñ>…r\àV#\Û(b½\Û:˜\Ûa \Z\É\êÿ\0‡«+ia÷®^n\ÙG=a˜U\"ˆöÊ²(q\\-4\Î\ä\ì‘\Ô\Ô\Zœö¢€\ËLô\ì@`³\ëÈ¥†õth5X:bIZ4mjbhYœ\í4Ýµ\é\í/õ™\ÐˆùgÞ’´H²L\\a›ûZ`€~‡¿D{¦Î…bP°%\í1™ú\×b‘\Ë$hkiiÁ%¥VRü»I£[¾–\×úˆ\ép\ãZD\çŒýk5K½³/¾\ÊLv\ã\åLt÷\\\é‡7€¬\'ü\íô§ð‹ˆ\çMa\ã¦\Ó#`³.2ù\Z“¢Ý™»|±uUˆ0\'\éŠ\\{p¼@‡iÔ½±˜\ä\äQm\Û]¡_Q>]Yv3\Þ>ý\è¼ø)hK,/%ô\ïM§ð\ëlúo’Tµ\Í,°9\ã8ùŠP—:t[h4\Z\í4\æ=€Š›w®\ÚD(\Ë,\ç<“¾\ÛPo²Ài‰\Þ\éU”\\X\0“\0Ö«ü¥\Ëm8,º‚\Æ{¶kdõQ‹\Ó§…–\"!³€A\'o•BZ&À\Û-½a˜ \Ô\äŸóÏ¥ôšÁŽ\æ\n°\0HÀ\Æ FDoŒ\Ï\ï]nÅ·!A\ÇÂ“þ±Z\'¤€µ™U‰óÁ 3ô?l\ZÞ–\è\É\Ü\î\Úw\×qL;‹[´¹Kl-:\åugLòx÷ŠFý¢1\å=€\"¶\îÛµd[[\n\Ê†&uI‰œd\nþ‘o;0º¬\0À™]öüæ–“<”ò`‘*\0\\òhMm”µúŽ˜\\ø\"œ¨\Ó\"”»c\×;n\éI.3¢¨@¦3½U­‘¼mÁ¦ô0\Zt™\ßjZu\É=Ç¥FP.¦(V£M1\á3Ž\ÛÔ›D¨aˆœÔº\ÜX­H\è¥7\ÅP­£v²¤NET‚\r*`V\êk½u¯Ê« …¡²2=*rÄŸÖ»LTAõ£@²¢õ\ÊB\ã9æ¥‡2ýª\"`š\rÊ²\â«R\0PdÚ ©z…0q‰5\Ä\ÌQ…\"õB#Ö–ƒgb\àñS¢DþõÀg\"¸(\Ïz\Ôb¤w®4l\âˆR³jU\Ò$r}ª°t\ì3Be\n\æEDA3V‚6ª‘\ïB†;Š\á]\Åp cŽk€¤µGX\Çebv5`j•\ÜV5š\"\Ü\à\ÐCT† `Ö°Pgô4\"=k…\Ã\Zg\Æ+]†ŽUb	\0À\Üö®1:\é\Æ\'51<\Z1f,òÍ’y5	§Í¨±\ê|\íD\Ç±©\n‘¿j¶¡‰®b5\\O¨\ÖSÖ§Š·©a\n•jÀ‚À»WE]QHYÜ“Š ’b®Šw˜£@*š\'š³€\0GÞ¬««\Êv\'z«œGm¨\Ð,¡‰ô¨[¦1S´c4´Š‘\Z¤ªû\Z±#LF{\Ô+¾\r\n\ndD‘\\xŠ6\ÞO\Ñ#\Ûz1^s]N\ÇT\ã5cLýy¨*$ilÖ ¦\"DMH]FI®\ÜT‚\äÐ£*F+¢7¢‘¨I¡žsJ=2‰\nŒ\å€\Û\ÓÒ™³|ÿ\0\âI \Ü,—\0V2\Ëý\Ð \êY\Û\Óo$Æ£;\ä\×\Ó7Lñ\Zµ“Fû¶ü]pb1D\éo¥\Äe¸€y;ð~¿*N\å\à	UR‹>`\Z@\íû\ÓÍ´o®”ò†_/\Ä\Æ>ƒ$ü©\í4sJÀ¾\'O¥uj\É/™ôŠ…yPg~?\åX\Õ¼\È\ÃQÔ¬\Ä#Q·þ¿J7‚\Ý2ƒ%6´ødÿ\05»-qiŠ=›¡%¡°[ ;ŸI\ïI]¶\Öþ5a#Ö¸¶—üÍ²Yd)Y?ÀOÎ“\êm9¶\ÚY\Ú\ØnDdS\'aM§“&õ²A#*¸\Ô)VCñ\r\ÅhÞ±F\Z1\"•{z@\"…˜¹a·Ö¤È¢\\XûÐˆ\äP¢©\ØUa¦;ñE²\Ñ\ä úR\ê¦r(Ã‚»­$†!D“\Í\ÕÒ’‡qµY@»j\0\ßjUµ\Ü>õ9 E\Ú\Å\ä*px Ú¾öœ\ÛoŠ15\î!†\ãz=\Ë+}C®s@\rn\Ö\Í\Æ\Za\Ø\Ðn\Úñm\ÌAö¦:suˆ1Ö‰v\ËI+\ï\0b•£)S<\ÇWÑ•–ÞkFz\Ëý8|A¬®¦\Â&©g®iñ¦wqò³AÀ“€&3O\Þ\éW\'y¥Ÿ§n\0À\ãš\ä|mji‚\Çh«Á\Îj¢TA\Å4Á>S;\ã\éAŒY¸\ë[&Ÿ0Ž\ãcD¸2\ät\'¾h^bN©&®¤\çÛ¼WTNv\0zâŠI\0Æ£¿j_µ\ÛC«€	t\Æ\rU2m\Ú\"ñ1tQ0\Â5g`sÄŸ•>\ÍÓ¢ZB\×-Z¹5†!fLÀ\ÜÀÁ\Î\ÜEfYU-\Ê.\"“¦\îoz1¹¥b\ÝËž¹m-¼I\ÌM6ØŽ‡žðº£úmJ\ÆH2DŒ·ý\Í3Ó£Zˆð\ìµ\ÛF\ÓN5m‚O\' ˜ç±¤\ì^d\Ò#0‰EœsŸÖf²ŽÁ|Ö™‹—V	\0¶\ÐLN>qJ\Õ,U\ä;5\ä¸\×|;€\à€4 §l‚p6Ú¯a#§\ÓoM\Òøpa¿—b\Ô\ÔuOˆÖÀ-o>@v\íÏ¯Ú†·.\"ñO)`&d“z`GÒhŒ\álh[(\ïo\ÃI’\Ð\Z@Œ{ûUHc¢Õ°\Æ\â:”ÀF;\Í@*§\Ã}-T‚\"$\í\ÆhÀuý3wU±*5ñÿ\0\×\Ó­U =Mˆ\êÀyKŒIH‚}ù ½µD³p‡¸™WŽIrÞ“O§ˆö‚U\Ä0*$‰1?µE\î-Z(ŒŒ\ÚAKŠ\Òu1¾ø\ßÒŽ°\Þ\Ä\ØD·mÌ„\Ó\ìw}7¤úž‰\Ô\ëAªÛ©+†w³úV›†½aQ\íic’F$ñ3¾û{Wkv\ë\Û@D+*[L‘¶A$\Ï\í[ò2“F¥Ì‰\Ø\ìx#ÞzÀ*ZvŽ8\Íz²…m½›n=³¥K¥\Ìö\çh\æ~TÞ›¨rm\ÞÔd™\í\É1Žô\Z²ñ\ä1n[\0Y=ýûU`s\íO= ¦’#\æ#½/q[H˜\Î\Æ*OŒ\éŒ\ìy„\Æjš\Ô{ˆE ø‚HŸ¥$‘\ÈûÔš*™M\È\æ¸[0qµX\0Nq\\\"{\ÒP\ÖÁ\é\Ï\ïQ±\Íƒ\\F­\ÆhPl*\Ð0&¤\ä\ÕkQ¬†HÚªG¥\ZW3æ‘¼\Ô@‘2}¨6\n+´\à\Ñ\nnj¹¨Pl¤vÁ¨ƒx\âˆ;\Ås«+e`Š(\î\Z\0\'Hž;\Ôi\ïRW5XKA,u:cË˜Œ\Õ#\åÚ¤}\ë†f\àE-‚\nü·ô¨d\ÒÌ¬\n°\Ä\ÍX““<\Ô-\ç€â• ”?‚«Wm\Î\äwŠƒ©XÈ‰\Åwj\èŽj+\èÞ»Œ\Ô\É51Ž(¡®\'2UŽ j§È™\êÀ\Ð\êAƒKf ‡Ò»‰¨y®¦šêŠš&$À1Þ¤™3jÀ\ë\ëÚˆFFjH ljWb G$Š%½ ,„¤dŽ;Ñ¦-”D–ƒW©¸\ÊÍ©F‘ŒÔƒ©X¸­øvÞ¨\í$û\ÑQ>dvÿ\07\ËIŒ\çŒSÖ¬@\ã6¨ ƒA©ÊCšb8œv\Å[L‰\íÚ \ä\Ì@\â¯3$\r÷ZeT$	ñ5\Z™þô@³€F7š°A¶\æ;\ÐhÉ\Ó9ô©*d(\\\Î;Ñ€:g<ŠœúÐ¡¬\0\'nõ,aŠ³jŸ4do;T38ö¥	\Ð2\'mªŒ	Dln \ÐØ™9 c\Ö_gv\Ô \È ñúýh\"Ú›\Ê\Õ\ÖH2\ÞQ¶óM–»m­Ze\é\È\nÍ¹˜\íÁ\â–nœ\æKH‚Z1\í\ÏÖ¾”ñð=\ÍÙ´	vw\ÖÐ zœóB\×\äEl¨\È˜\ãÞ¡:{º˜%¶uP O¶{\Ïz²Û¼Ö…ð¾%µ!Kˆ:{;|\è&z\Ú±|ml$ˆ?X\Î\ÛSöœõÔ¾`¦dD\ëü\ÖB]Vf¹\á\"\ætÇ”sŽiþœ†¸`o Á\æ\ÑOù9g\Z-e£#*\êb$¸\0ýzfý»lóe\É••$\Þ#½%­-BT+™\0$œ	5ªM\Ûv\ÚÎ¥\n$iØ‚bO`;\ïYºdúÑ›\Õ\Ú7\0¸¥	,D 1·v¤^\ÑK%š\Þò5ø‘÷û\ÖÅ²|6#¬\í\ßÖ“\ê,»˜f@\\Œ\Ñü\Z2­™\0Iƒ™ª5“m\Ê0\æ(÷\Ö.`ôk\Ó}µ1Hb$Àû\Ñh\êRôL©G*\Ä|ŒŠ \"dµQ\ÓIŠ²Ö£\Ê\é.‹w»‚T™n¢\ÑP‘?¥%—X\äli\ë/\Û&r¸ÚƒDžŠ£xW5¬\Ç\"œ¶\Æ\Ù>\\¶¨;Fð<%‚%MMvE\ÛA\Ó\ÄOŠº\Å\Õtÿ\0ðk­¹G\Ò\ÛTõ=9 ]²F¥¥ü1Yk‰\'\"&“\êº\è_D÷­+·\í\î	\ÑV\ßö!½)Ñ“G•^—C\0òT7ŠÞ›HœN;× \ëz-,``\Öu\ËJVYUÁÓ‚E+Vt©˜7:iœE[6\Ü1;ŠÝ»hF†=\r­­»Ú’\Ðe\"4°ü\ÍIñ¦Yr±;jt²›R\Ä¨ñ\ë÷¨E,Lƒ™5b¨€ª÷\ïVVW-«L\Ä\r\Íd¨6P\ä†Uõ©ñ \0@$ˆA1\Î\çoÖŽ:g¸]\nhkBnør{dK‘DmL´ú™@:\à\ê\'OÇ·\äS#„»\ã+dr¡¹  ‰ˆ\ïY«\Ø\Çø§\\\ê:€ª\rË®J€©:˜“°ùñNŸÁZLv\×PVß€®§Z\Ë;DñH•;\Ì\âv«Z¸\Ö^.‚B¶›–\È\È\à\ë¼Vzj\r1$g\åLZ6\É%\Ú\"g>Þ´hV7i…\æ\Ð9«]\éUX«(b!”œŽ1ù½.Îº¶ºV#y“\è7ŽûSVº‚t3±%*w ~1@$tº\î\ß6\Â.@É™\0‘Û€8§mõvúÎ•‘oI,T‘©ä‰–Án{\ZZý¦6\Þö’\à/ Àb1§\ÓÒ‚\Ö<’ÁKA\0\ÎDNÓ·\ë>ô[\ìÉ¸*5PöV\â€0\0‚ø\ÎÓ´¿j\ë:®\ä›a,©ó]$@zŸz\È{—\Çõ®šü\ÒòwúÖ…Ž±nZV>¤\ÓÉ™\Ü\à—\ÈSe”{HÀ\ÜD>^2²@öž\Ý\Ç\Êý3\Ø[Ì¯p+)\ÍÀXY3ž\ç™7©W·qT2—\0b7\Ó\0\Æ6\ßý\×:[\nY&\àp€d¨ÕLo\èßŒ“\Âý]·\é–å»ª/=\Í.[Q…Ç”\âÁ;\í\éJõý!·yN\Æñ$Ë…\r\É\'#o®+¼.¡-µ\Ý%4\Ý\ÐÏ‘,FÇŒAúšbõ\Ë7\0º–‹~bH\0\îx#H‰ð\Ïy\Ð\ØfwR–®\Ügÿ\0ûu)e\\À\äL\í\éB{¼g¼¶\í²2øˆª5ÿ\0\ë\ãúÖ­\ÆŽˆm8R \ØND€x3ˆß¸”µmo¯ŠE²\Í\È$c·oz*ýAºXf\è“úš—XX˜\ÜñI?ORÉ‚\Zv­ÿ\0\ë›D\Ý\Ã}\ÝdN\æ7ýˆ¥\î\Ùn\Ä«8\Ø8\Çb	\í\î`Ò¸‡$¬\Ã6\äêª©$ûO¬m›w	Pú\î‚<\Â5¿Ú”\êzt\Z<=^#€ti )$ˆ“¿\çR”\ÑD\ÄÀ%fdû\íUx\ßj\"¦H˜û\×	˜\ìq4J\Ø#$\à\ÔmE(~)ó\\\Öôß™Ò¸°\Ú)3U†\Ô\Â[/qWT‚`\àw¡ÙBŒ™Uf>PNx® {ñRO>¼T`ŠºcÖ¹@c`w«È€öª\Æ&…Ê•##Š¬w\Å0„f¡‚¦}¨8™0:jZ` EK`\ÕO½+C¢\nÔ•\\\ÒF}ª& \Í+A8\éŒò*€@š´Wh$ošV¬dÁœ\æk†\æD\â¯\0\rŒñš\à·0}©:°\Ø5Þ­¹\0U\n`\Ä\ïƒT“¿jA8\ädT#§-’j(0F\0ª\Õ\ê\"ƒAL‰«©ª\é©+ 2\ÑVg½qRF\'51L‡\0Ngn\rY\n¯\Ä58=ªBm7%{úU…–f\n¾b\ØrM5`…w8	ÁˆR¬¸\ÔLOBWZ .À‡–R\'1V\áG˜‘\Ó>´>?j˜\Ò&}b‹\êd%q0hD\É\Ì\×1’rO©®U\Ô`}\Íc\êd\Ä\Z°\Ò\Zd\0Mpš²CiŒúÖ£ŒM\\	3\ÌN\Õ\n99«©[W€Ñ¸;\âˆ!uXVŒ\ì7\Ûz²j.F¡õ©eÞ³p1ž\ÅZÙŒ€D\rÁ\Í\n5•\"\0ƒ™øG\Úø—qŠ¾X`Oµs(	:L‘¿Îƒ01:£®™ƒ‚`I\ÏÒŽX¼IÀý*·Y™¤¡“\ÜÀŒ\Ð\Øüª\ìBNóƒAŸJd{†>µP¯´8S\ÛÞ‚./m¯[ñAd˜-\é<Q¬ø·\n¡b±€O?\\TE¡f\æ£¸H\\o¹5ôŸ³\ç¢\èO©g[ˆÁˆfFñ·Ö¦ôx¤A\ìb\çöŒÇ­¨Ý”\Û!HP‡#iÁ³Z\ë—\r\Ö\Ð]¯\ì˜9\Ð-c\rm’M‚.’š<MF0\Ô=~\Õ(\Þ(‚\Íp\í2V$\0GÒ”k‹nß…pCk…2Hˆ‡µ@°…/\\»­€ðÀ2 \Æú~§‘Z8\Ã¢¤‡/[6zY\ZKbu	Á|ˆ˜«X\êå¥·y‰6¾\ß\ÊHdÂjIÑ¶¥Å½`A\0[\'\å1û|È–œÜ‰T\à’7&F1þj”A¯\r[7]\ØZD¶Y\n )\Òz#\"\\[fJ•\Ý\Õ9ÿ\0´ší”°4\\¶Ê€\éÜµÀ\Ü\Ð\';½¦d+å¸Ž|\ÆúÒ‘j™—\×Øº\×5\Ü,\Æ\"Xð8¥(Š4˜>iÞ·º›gªI.b?¸\ÉQùÚ°\Ý4\Üi<\ãñ\Ê2ñƒº…\Ô`\"$šV\r·ÚŸ*H}™\0˜øsü\æ‚m0F$ôhÊ–A†3¼ñF´E«¡öWÞáµ½Á\Ó0Žª\Æ\Ë%\0ž\Ä\Ïø4/Áª‹©pDŠl\ØRƒPò‘ \Äæ²º+\Ú\\[¸@#lñZ7(\Z¶88Þ£8‚.°\Åo \ãq‘~\Ìm½j\ì‰uu“T\Û`2c\é/0–\ÏI\ÅL#œöšÖ°€qŠ\ây¡E«\Öb$\Z¯N\í\Ó\\n¶~i^Pº\Z½ao[À\É‹\Ô\Øð^@D‘5\è\Ô)\\Rý_F·\Ð\àMI:eló-\Ó.‚Ò¦W\0fw\ÏÚ–k»\àw­Vé›¦º&Úº	ò± m\èE¬«\ÛÔ¡˜ˆ\àDUR1ntñ\åL‚84¿‚4±d1\Ã¯z\Ü^Œ³Àrt\Ä’c\Û4¥ÞšUû\rŒP¤\Ê)±¦t‹j\åÆ‘\ZsÇ¬õ¨¸¾`‚K‘œ\Ì}ý©\äd,Xˆ\Õ\Ægõ?Z°\é×¨m†%mcS“&@\Þ\0\äÐªy)\ÚÐ€f˜³\0I8Š\æ±l\Ðn\Ë+ý¹\ß\×­u­+2$‘CÞ°v\\\Ø\ÑVË…Ô§a¼÷ªô\ÌüÀi88ù­n›¤ñ\æ\ïN%™\ÖD\Ùg~ü\Ör VD/\Â\ä’L4\ç;Ñ¬ô\îJ€óñ[º+]]\Ò‡˜ð\ÐÆ’&`\Õ÷9©»Ñ£½¦R\ëh*Z\"2bvâ—¿†¬\ê\Ì’x§ˆ¢Ýº. W\É\n¥\Ûû­¿\Ã\î9(¡IU@S™‘Œg>”³Y¶\'Lº\r\ÆAJkLg^}¼\Õ\á\Ë \Î\Ã>\Û\ÔtýU\Û}9´­\n	bs>\Ã\íLõv\ìµ\Öe·A…ˆ1\Ä\Î\'\íY\îŒ?»‰§Ftö;bþ¶Hc,¾e&I—\Ï\åò¦ÓªnªõË·:’\×\Z<\×€6“¶\0j\Ç\Õz\Ã\r©\Ðw÷¨kú@\Ú\Ûq†!rw\É\ß\íYþp´o¥ö]h¶Å¥0pNA\ï\ë\ÅP\ÙkŒoC\\»:nlI\Ì\ïž=\Ï\ß6\×[eeIb\Ü(Á\Î\0\Ú+O¦\ë-\\¿j‚Ac\Ä?:7G< \Ð;L\Ú]\à“ñ\ÒO¦ÀOKp[±q$ª²…p«$\ä;q óS\nP£6’C7†¡´ƒ0w\Í,\èT\ÜP\æ\Ü\Ë‹´f?*7\á\"n­„Fðú‹ºŠ6½FN7ŽûL\ÌR¯õ\n\Î]™¥ƒ\0\Í\'\æ}gõ¦U\ÆK%¿¦Nf\0Ÿ(\Ç5[n­uC2\Û üdb9žh¥ô=½´¡\Ðko¬øf$m03Žß­u\ëVZn[f	”ú™\ÄSºU¾úúfð\Í\Æ9fÒ¡6ý\í(\×\Ýn&¤HP2X• Fø­½Y3ü—Ï¶@ß±†ºý‹eŠ…*Š\Ì5\Z;A?›V‚º¹r|S›Š\Æw1¶øõž*ša(š¸3«ö)-–þF¶dør`ž&c\í] …Õˆü\ëB\ïN\Ì\Æè…‹‡\à\0|\àmúP/t\Ëh\04¾¡«\Ê\ØŒóõ¥hª\äLWF5c5aŒ˜;™`m\ÏÊ‰nÎ¦*\Í`\äö«fµ£K=¶ž~q\éK\Ôn\ÂmkI€\ÊdN8\æ¨Dš;\Û\n\Ù\Éõª$I\ÍMÄ¢#5\Þ\â®\ÙÀŽj™œ\Ò4:,šž\Ü\Ô)C‘ˆ\à\Ôc}«)‹h-‰;‘Š)SE@\ÄU€T¨3€Iˆ\ÎôzÙ®…\È\Èv´\Ü-\ç|šG”¬¤\ç½Nˆ’|¤py®©%Žd\æ”$&\Äy|Ø“\ÅWI\Õ·h\Î\Ç«›9“\ÌÒ„“ \0Hó¡¸\Õ3\ÍYNö#½\Ëq\0€œ\ï\ÎN\Ôj\Ít\0\Ú( ±F~Ÿ:‚ú\Ñ$®\à\Z††¸X(\ÉøDÀô¥\ëA²«lQª$Œ/Ò¨Vø¢Fû\n–@>ü¢‡P©‚3\Åpˆ\Í‰99š²\àð‘\åcQË\Ä}3Þ–ƒ`A \ÑNÙªœš\áƒY`\Ï!\Ô)Y=ª\ê8ƒš\n\ÌH£¥\ã\å\r¨„d=­,DÀ˜\Ï]\"9š`qœú\×H ;zÑ¡E£ÀFhº}*ºhu5”\ÓR‘Œ˜«\0ˆ‘S¶O¶1ZeHP\Æ\ÇÞ¤¤;+\È=€œ\×i9ô*x­@³”\îHßµJ±€Á«\éU<œw¢#-¿\é\r¨@\'ûv\Í\ZÀ,€°¡\Ä@‰\Ç>¿J‘8`À–“\0-s[\Ó2B@\r1\ïRH\0¬¹¥a-3¨–*Hœ‰\ÔjY@ÁªIR2°ú¾\ÑRº_\ãx\'\á3\ÞijBž1ˆª1\Zv\ØT\Ü!L“$|\Å/¨\ÎN\ä\ÖhÄŸ\êyJˆ\Ü\Æ	ü»€Œ‚6\")€\ßýˆ\Ô<\Ç\Òj§Y\0qó\Å+CEžµ¼B\rÂ·\È ;\r\Ço½]:›ŠšÀXÓ¤«fDò>ŸJb\ïOtYºŽ…\Øý}`M#a/[G\rC\\H$cô¯¢gš²Á—ú`XÕ´~w ,-\ÍM,2fc9Š=ÀÛ›X²‚ Æ“?\àqÞ†o\Ü\n÷R\È1¥‰œGp?\çÖ…¢±Dõ­oYp\Êg\nË¦\äz\É\æ¢\Ðj\à»,ML‘¸\Ü\0x?\rRC#¢Êƒ™ô\ïG=(³\Ò5\çK„¡.(\Ò}3‰;\Ö2Öÿ\0—K\Æõ¸Sð0º¦q´Õ¯_³p‹ˆ¥	a¤™ÀŒn1\è}¨!Ú›·-OW™\íðÿ\0´N¦\ët^ŽˆK€Ákc*@\0\Äc\ßz\É\Ó5vE¬)µ~\â0kn„Ê¹\Ðc\æ7Úµ˜5›\är\áB4+¦†\"]³š\Â&\í»j–e&3)óLGi\î;Ö…®¡\îô\â\Øw2~ò\íÞ©¼\ä\àÕ´\ãG‹3©‰t¹\Æk?øC\á\0Àƒ¬Hr?j;2¡Ê²\rd©œ‚bœ¸GSü5W™ ´ó¿\àŠM4ü#I~\Ì\Ì\Å| •\Zf~T!dò‚\Ç>]<G\ëNŸ\"›~\Z˜“:D\æ9ù}\Í\r­\ÛQŸ/3¼UZ2\nÛ’¤B¶œ®¬Ð˜=²TO$\Å1\åB´ˆˆ\Æj\Íi\ZÖ³sS‘€£<Ò”R\á\Ån[\Å\Ä#˜\ß\íš\Ðé¯­Õ$ñ	¤|&™˜¦,‘n\ài‹l|\Ð$\Í	?Ê«‚\ÑCDYð\Û3ðÑšos\Í&\0\è0(fÖ¡žýª-\r[¦K;hf•\â´Z\Òu=9]ˆ\È#½g\ÙrI·p\ÉôÍ«…™§+n\ÇA:K\Äj\é¯0Øš\Ò[e\Æ\0R~u™\Ô\Ú=Bøˆb\â\r5ü?¬ñ-\è¸GˆG­NkƒFÞ $À^}úv²H ‘Ûµz\âEÀYFv3‰¬þ·¥y#j•`g÷Anœ¶™FÄ©Ì‘ó\í4¡]L®‘Ÿ0™ô¦\ïZðW\0s,˜?œwªX@º¥Z p\ßcƒTð\ÖgÝ±l\äÛ“\ÊF;qUø`T[¤\ê¶Džñy\Û\ë[£¡º:mzU\íµÅ Oi\ÆO±¡•·p\ÝÍ¢˜o‡L\0\Ød});^Š&Ñ‹\Óô\çª\0¶\r\ÉÔ°cœñŸoŸ¶Z\×\ÄY¤d‘Ï¥k›ES¶ú…°Zý„žN1Ç¥\í…\ê†•‚Y§03\ÌI\Þ>B‹\Ø\ÊfE„\í;\Ó}5÷¶\ÚCy,€ÄŒÿ\0“A©\È\n@Im\ê\Â\ÞC¥H‘\Å#Ám›¶\Ú\Ê%®¢\ØðõA\ÓmN\âG\ÄL\Îr2)‹Eˆ\0[§D*¨ ŒÄ™Ls\Ï\Ï\'¥\êÅ·P@‘A§¾\Ô\Ðc~ó_·©Q¥›Q\Ä\î@>ó\ïJf˜\Û\Û¢\Ý\ëwM°ð¶Ç—I\äA\ä™öæ˜¿\Ñ[{hÖ“\Â\Zd»¾¨3\Ú>Ô‡F\Þ$—f¨V\"@2wøOw¦u\éB\Ä­l¤y$Àžy1œO¥©	\èÖ­±Ô‚Ö‘p©M@\Ìgoo—µf\ÜéŸ©[¿\Ëtú\Â0¤=~•°-Ú¾u\ê¸Á´‚¤\ê$`˜;Žx>•sÑ„\éu[ý­P§S€O`I\î5õ\ížr\å\à›Á51(‘ƒ8Aõ\çp¥Þ—MË\0Eœ+°b=\'½þ¦!V\ë\0\Üš•	œ`ŽÀq;\Ò\rÒ›Å­\Ü\Ú\0t•\0–c}¸µQ;É»5ƒD\ÜdkŠ	\æ]¹\Ç\Ò>u@\ïn\äÏ¥l¿CÓ§¹2\Ï\nmˆ^\Ä\íqŸJXô1}–\åÁ\à;¥Fd\Ä\Ç\éDe4öù\×W‡ AŒzSK\Ô\êÖ¬\nÀ\n\Þ]¢f]\é®\Ø,\Ä+*Ç›¾û˜\ÅQ”kT:¤7ü\Íd\èWÄ¥£Z\ÛxÎª£=É¨\rq\×@†E:Ž ø+5º‡·p‡B§Qˆ¢[¾r\")\Ó!.&²?eüeº–\Ó-²f,@\"7\Ç\æ*†\Ðs\È\ãNN\0ü\'\í@kŽL¹\ÔZI$Ï­Z\Õ\ÄK\Ê\Ï\ç@s‰\Å\0Uh\ë(.«Ù¸ÁV4k\Ìcm\èz¯\Û\Z°\ÃIöÿ\0TÍ»ºe4!W9$\0b~\ÜUŸúˆ\Îs;Œ(N\0ÿ\0P\Ýþ,¾\n^Ó¤°õƒœF0G\Ðü¹¡™m[·®\ÙiLpbcnÿ\0.j\æÉ¿p7œ–\'€={c~(FÛ‡|W—mM’Üžô­}4Võƒjý\Ëw‘5IY\áN\Ñö¥YC¨$¨“¦J€†nÅ†ÀóW+oB¡´\æ\át°\Òv#oI\ÅÉ´g”\Ö\ZA. ,H\ÍI´\è\Ì| ÁNŒI\Û\çŠiú\Ùv[gBˆ\'a\ÊhN4,ªÊ¾¸?}ÿ\0\Å%\ï‘/\r\çR\ÈÓ™\í\\UnÀ’ÍƒM\\´\ï,\ØH1\0ûP\Ù .¦&0Nø\ÉûÐ¤QLT\Û!Kb=\êŒ!ˆ\Ï\ÌSmi‚©\Ó‰\ï\éTksl\ÊùÉA\à\ÏÒ§(¦\0HYƒÓµü2ˆm\Ès‡RfOqŒJ\è`Qˆ\Ï\ÌU\ã]²Á‘X\çSo‘ù\Í \ç	\'\âÇ¥U•‘¤J\çsV[÷-`Dó<ü\è£Eß‡O˜\ÄP3Œ“F¬\\¡R€91Uó¹\Í\Û(:¦´·F¢Ì}v˜ùPShtÁ™š²¾•‚ É‘<T0š©]\'&G¥+À\åÅ²\Ê\\«`$,ÿ\0\Ãôª2:©0t\ÌOË¨,NV€\09\0w\Í%XtSTŒš¾:N\Ó\Ø\Õ5•>S¦D;Š¬Á¡CA‰!ô“¶\Õ$¨2„¶\ï\ÅQ]¸Hj#¯„WS‘‘˜ö4\ÞX¿‚·-\Ò\r¦{\Ð\Â$F&‰+}DoS\â)rX-2Bˆù\nV‚˜&þ£L°0*‘¾ô}!ˆ\"LA?½U­•`ƒ\È3C¨{\Ê1­\\LU|2 z°f\Ø\Âk#0\Ö\Ýr#4d¸Ë…Y\ZYHœŒvš½«[\Ì5zM:&4–\ÏP\âÝ´,\ÌaUD’kF\Ék[¨:¾7¿\Önhu¸!24˜#=û\Ó^5»¯u1rZ\á\Éiû\Öwf³;AoÞ»\Â ‚`M½¢]£\ÍÛŠ†´I\nF\"b™dOA\Ä\Å\Òh\ZJùš “5\Ú dsWw@\Ä‚N	>Ÿ§ÊZ\Ù\ÏuY\Ò\Ãv}\çö¨,\ÞxLH>•P¥etˆ+@m¾\'cW\ÌJ\è†ùÈŠbn>U*\Çx\"\ÅB§…\Ï\'óµTµE\×	ªG\æiXS%™…¢\á§;\Ï4¿#}öš²*µ§™$	œÀüý\ê…hÀe@\Î3?¶¤¥\Ó\æ#x\æy\æ(lV`I\\N š»ª€}vª4\Ì\ïJ\ÐÈ‘¦AI©u!5\Ç\ÍsQV\ãY€AP\ÇöÛ“õ¬\ÜjFCq¼\Ú\×J«;Œµ!d‹JµÕ‹b\à\Ôƒ\0ñZV˜\Û6Z\Â\ë‘\é\r\éóÿ\04—\\…\Ê0¬a›pX™À6Œ\n÷Û³\çøð\r-%\ËÊ²¸Ñ¤°\Zv\Éô¨ºõ\Õ\Ò\à W\0ÉŽ*|´J\\\àI\áÿ\05y´–C\\¸P ¶ñ\ÄOÎ\ä{V\"\Ò˜©\ÒNŽ\ÛQ\ÓS\Øü]E\ZRÑ“«m£¼š-\Õ~•µu¬ºÃªÉ\\G9ž(6MÆ¸\âEˆ,v\ï¶Ù¡²·‹\"à¶€,©|±\0ü88÷\Øý¨¶˜¸?¤‡)¯Xòˆƒ°‚38Œ\ZÁa¯„e\ÐÃºù™„Î­\âc·j2¥›M\ânò²H]´\Î<\Ó\îvŸ•t2’\Ó\\V\ê\íÝ¸\ç\Ã¡­³\0JLD\âv¾T~š\å“p«%¥¶I†\Ð@\à±‘¿jT\Ø3\ã:[\Ôò\ÚPnsˆ\Êy\àT›·\r˜Â€K¦`Fsòõ¢%z6/tú<[F\Í\Ól \Ë01\Í1\Ó\Þo\r\Ê\Ë*Œ(\ïY/Qe­«µ\å\×!@\Ðp¿úžû@\0\âv\çAQ^õ¤´F¹UFX;œ\æ+cLæš¦_¬²à¸ DÁƒ\íšQ|––\â°\ÔÅ”2¢#>óZ(Q\íK(\0#T™\ÎÃ¶?JKÁ\Óx«þ¦Lð?4^)‘’\0ý:Å¦…+rVAƒ2wœr>Q\ïJ0kwps†ŸzÖµkB2¿˜\ìs>\ÛDþ”—Qf\\\ÄDò\"›\Ð)x\ÛRšŠÀ$”ÕºGefR£°$MÆ‹h\à±»Žsÿ\0haM¶\ÔDF\Óý\Âh47lXr¾V@\ßÒœ¹hÆ¹\0R¶Hºr\Ë0m0T0\æ\âš\éú\Ñ}4\0¦ÁÀ*RN\í\r€$4\äsM\"-\Õ\r³U¿8ó\r‚H0>™«%\Õ<÷\Ôå’‘t\Û:´6>uK;Û¹üÅ\ÆHúQÆ‹©\"«Z9\nXŒ\æ§t3W”¤\ëý©\0–\"˜k!\Â\ê™;¬n¢\Å\Ë7¿™\é\ÉÁ–_ýõ¯ü?¬·\Ö\Úù“U”\çf}þŒ8%A‰œŠOùAm\ÍÉ\Ùû\ï^ \Ø[§A`=ø¤\ïth¤»\ÐAŒÒ©”\êf?N\ëm[PDfM©ù}\èZ’Ö’‹-k:»±31\Æ |½i\Û\ç\Ãe·\á\"0rq\Ç\Öx¼OX-:\êaT–\Æóœ\Æ\çze”c¼([ƒ\È$0+¦c8\Û~qŸjU\Ó´´§\Ê\Äjwn\'µ3t„\Óz\Èv¸cT9œ\Õ\Ô=\ë«q\Ð\É ®¶’s;ÿ\0\ÊY5ødµ¥A(>u9¢^\èn\Ïeˆ<§\Èw9\\úñ\è)‘ü=mi‹\0­\á&c<˜ô©°À“ª\ÞeTl\'¶ÕžQHÉ¦bC#\écG³\Õ\êjþ£mO\Â0FsûÖ½þŒ\\MgK™\n{3Àˆû\íX7\Òâ´°÷¥Y\ÑÒšk&\ËA¼[?†\àÎªºDœƒ·\íF±\Õ\ÜkŠªTºyDŒ¨\Ô\0\0È\Ï©¬‹=C\ÚREÀ\0Æ—\0\çI\Ï~&›\\õ,\î\r\Ã\r…û°F\Ô\Ë\ãQ£K¦¸U¦¸\Ïjå²¹=ûÁú\Ä\ï\\._·Ñª£§‡¬ U9˜\àv\Î?\Ígx>TM\í±”6ü²I\í\Ä{ŠÑ·Òµ»\Ý_+$¡7\"@\êI\Î\ßz®6s5\à\å‹n¢:kþ#Bµ°!G\ÄH\Î\Æy\íKõ·n/KdõhŽ¡C—\nU\Ü\Ïþ‰\Þd\äs\í³pZ·\â\\M^$\Ûm&6ÜŸý?=\èÎª.]¶\ì\ÆE³¤˜GlŸ˜¥¥\ÚÌœªõ`uNŠ€\Ù}”ª\Èp\'Q™Û¤\æþQº\àŠ®¨\ÆF…V2\Èû˜aZB9²<;I\Õ)H¶\äEÅŒ\ê02q½S©\é	\ê˜_am&T)3n(\Ä\ã\á\Û<S¦mMÐ’&\î¿‰e:A\Üÿ\0°?1óUú\Öz§†Ó¡¼\ì\'°úOÊ¶­ô…zÆ·j\Ú\\*t°ŸˆG\Â0$™ö\Æôµ»\0\Ãu\'”*$g\Ó\"=y\Ïvm0FMd\Ì\êÿ\0‡²\ÆÑ²XM¶ø±‰=ÁØŠB\éTf],¤24ò6\Ç>\Õ\è_£tõ7`ªaÇˆK°\ß0 sô\Ìb@\Ömuœ?Nr\í\Í!À4m°ŒOs¿Ê“¯Â«—91|F´ª¤D \æA\È>”Å¦·•\Â9˜©½\Ðÿ\0/Ô¬\ÛX`¡\Ã)\ã\é[\Ý\ÄúY`{‰Á¢\í£!¢£\Ä%X”Ÿ)#qV–U\äµR\Ý7V\Épø¶…\Åa…\È\âO,[º£\â\Ä4)$@ˆý\è©-”$Š,;w\Ùg\Ôýª\ìRö\áQA\à\Ìg\ëÿ\0*­HÎ­…É“Ž&§Q7\ÚýµTcyGh\äžÚ·®\î\Z™\à*\ã&b…\ày”¦v\Ï4r÷Ø©i}H×#WKÀ\ÛdeD@\0@õ¬Õ¡2\0¯\0m\ëB)Ã¬|\ç¢m#[\ZLƒ¨zŸz\ÛpAp¢cLD\ëXe1RE\ÅB÷\\`€\n˜\\\0÷?­U\ÕRN¶`v=¨\ÝE„Ø\ÄU [\Ò\èA1æ™ˆ\íKVQH•¹nß†\n2ùX–ÁŸ\Ónô6·—Q:Ž\à‰ÿ\0´E\×\0\Ãh\ØGÎ‰7n„¹p\êEò\É3\n\Ðgòk%c\Ý_\é•4”pÁ¤ˆj[N6­;\Ö|2ƒ©w\Ç^óù°.tºP²i*¦<@L6ñƒž*r‡¥¡<\n2¬\Ð	,Š€NwEK#°g*H˜-\×Z`„jPã±©S*]‰p°\Ú=½\ê¾e¶U ‚fw2iõ£\éP…¶À‰%#O\Ó\çBUlžü?¼|«5b¦”kƒ«ŽP®&f)‘ež\ÕË«§J\ç<\Ço_QD´Ž\à\0ð÷–\Ë?\\bjF—£Ø‹(\ÉPb\åW#=©ö\é\åN»`gP§\ëJµ²=§zG\Z\nš`ô€ \Ì\É\Øoùš«[Àe2	À\æˆSIŒ4\Ô\éò‘¤s=©\\F\ì/*úµ|X\" ¬mœ‘0õ\Ä)$pv\Ôv¡T5“n\ã#¨À2G¸æ®¥Ye˜\ëÀøAòÿ\0š\Ú\Ð\äV:\Ì´\Ñð€A“‚\ÌeO¡üÚ‡\ì\"9£j`hd\nÌ‹‰w‘ˆ<q?:³Øµfù±uõ`qX˜ž~”\Z\Ú\è,·«*w’O\É`\Ù\Þ¬*–‰8\ÞjY9G¸$vúPüVr5´\ÆG½¯]½t—ef8;QY´L³cN&¤[\Ð\à8‘¹ƒ\Å5h¨[Œö‰t£†#A\ã÷ª1pÅ´Áf\É5|¶ùQI\ÞEl¹S\0ŽôÝ·Ð¥§\Ës\r§x\Æ)wD€\á]@g2s\éô~U\ÔV\'\"i \ÓsJªº±À\Æ\Â\Ú\ëoÂ¶Ä‚	`n£˜õ?J\n\\\n\Ú\í9\0uf2Þ®ö\Ñ ±Ô¬´@\ã\ï½`¦]””\Ô@\ïS¡‹P4\Ü\0\äg;z\ÐÍ¶@\\34eK—@:B\æ2\Ø“Y£ ¹±]Á\çÒº\r¨)uVs‚dA8?J*…\ÔÁ*@\Ò}yw\Z\Ñ\\j{\ÌðI\Ïh¯˜2€\ä„À1ù\Ü}j·„oQc\æQ\Æ\çÊ˜\ê,;\ê2\Î}OzP&$R‚\Ø®t»X5€D\ïž=;U\n²©v#hº\à4¡-¤&xüûQY”Ú¹fÍ¯)`\á\ÈóBƒñƒ$Â³FLNî‘¦$˜ó`\0;E<¤Ÿm\èöÅ»wV\å\Åg¶®$¤°\"x4\"¢`ŸóJ\ÑDÁ\É$“WB gÒ¸¬\n•œŒf…\Ïajõ\ËDÆœ8‘\ëŠ-óeº%my\ÉK{iõ\Û3ò¥-«†c	\Æ)ŽŠä—¶¤#—¹ v>½«\Þg€\Õe\0\0Ý´P0\àzm™¢t×¼Q€8V–Áö<c\æ=\ÅªA©E¢¸` \ê\äRŒŠ¶™Z|U ™\Ä`\Å\Ø÷ñnšò\è\Õp±\Ð<K!Œ\Ù#9?X¬Ð¬-»ª&Xû\ì=÷1\ïÚ‰\Ó[¸\á·k’¨|Ð´¬†™$§óÞ•*C¬`’\0¶Ú™u)ˆ\èõ¦ún \ê-%t²…\n#o_j]dZgeÔ§9;N1ô«YtW@š•Ž À±\çŒšf°²\æ\Ã]¼\ÛXF\"Sú¡’%	\ÜFh*\Ã\"åƒŸ1\"8Ì´úÕ•›j\Ë\0‘\åc¼\ÏÚgQÍ•ô\Â;\Â\äG¤\Ò6\ÐÉƒw½e\Ú\í\Âöš\è,¬\"LH=¢v5§d³t \Ú7Í°@€@\Ô8\ßiŸ`kó8+q¼©p±PRDS½+†\ê:fÿ\0\çˆÖ…`…P n\'‘\Ç\ÃôÉšq\ì9{Œ‰!€%Œ<\Î~\æ‹~\à½d DùB\äf€¶.›-q”y	\Ôø\"º\Ë—›£O÷lŸnôø\Ú9i\å2 ¹@€dlE^õµu#A7\ê\Ð]AS:†DDz}\"‹j\Ø\ÒCGhŽ??ZnÄ¥\Zfj!7t\È&XÀÀŸÚ®lµ\äb«,«!W8žh·mÃK\Î&¡bHœ\é\'\Ó\îi›³\én§O©®¯		;Ÿ•÷Ll\ÖYŒ\ÆT>¸ßŸÖ…~\È5Ô£7÷K‹&uiˆÁŸ_•M\ã#&u‡¬©X3™&*!­±•’õd²öJZ\ÝXnÇ¥\í>™ˆ\ÍE\ÑD\0–Ykg}\Çj:^d¡d&`úƒUeþôˆ\Ú(5c\'Cöo2=\èWºv\éîŽ§¦>]\Ù/\âdGÒ™µ\Ô	DíšP÷f‡ðÿ\0\â#ª¶$ù\Æ1½5~\Ó\Üd¸†BüI\ßý×›\êmµ«\Þ7LÁn\Ðl\ÃÒµ?†ñ‚«¬89\Ôbi\'\Ç_\Ù\r\Þ\ÍÄ¶	m*úbW\Ó5—w¤¶®…À‡ HŽý«e\íZ¹yˆP—_$ŒM\rºRR ii 0Ú§}J£„\Õp\nZ\0OäŸ—­.¶`º‚®\àb6>\Ø\Í\å±fþ˜Æ¦\ÌPÁ²·\Û@\ÒL\ã\×ýUPˆ¾”·f]|M/\åó1±\Æ˜JZst*‰d\0Œ€HŽýÿ\0x£5û¤ \Õ©¸\Æ~\ßj°V(4O˜˜3\é½M`{eAW\rk¼¡‰\Ä\íïŠ§[ü2ß›]‘h–œ@\ã\'rFv§‹ P-[\"\ëA,\Z@\Éÿ\0DQÕÞœk¸I\ãô\àR¶\ÖJÅ§ƒ\Çu_\Ão4¹e\'\âŸý`\Ç0v\ã3H\Ö/º’WM¶\ÒI\ï½8¯g{¥\Õrß—Ã¸‹³B°#°\0\æcz\È\êzwT·…¢\Ò)\r\röÿ\0úû\Õc+µ:3OR\å‘5J\0„1DN?\Æ=t\Zû[·r\ÈrC•¼L Ažý¸¬ûv…‹öœ¥ðº”’ C\ÌN¦üV\î–\áP\ïlkc”E:\â=£` þ´\êI4˜³V­1«6\×\Ä	Ò•t0|\ÉÀÕ¸\ÛL\Õ/‹ÁŠž%ûl\Æ\ã*±{q¹x\É\í3C-%­/Ó–mK7š\á ŽtrG2$Qzu¿jÈ¾¨\r»ˆ\Ì\ÊLFH ¶\àú\ç\'Š5bv¢,©<¶Ù‘•-qô¤\Äc±Ž\çk¾ø:m¬²‡ò\ÎÁœ\ï¹\ÄRÚ­ZD»u\í\0*gÙ\ÜS`Ÿÿ\0¨ônÀ\å± ›DŒ 	8>\Ñ;Ö›©X‘Ši (·º–-dVn\\0\â\Ð\à\ìs*N¬ñ\\ç¨»l\\D²	:Z\áeKm ö\Î`{šS\Ó]Ù™[S«S‚Túc®ýª÷‡O\ÓY*Ú®c¨e€\'Lª‰“¸#„\Ó&¶\nz)uƒYº\ÊtÔ¬Xr\'“˜O\éI\ßv´mˆV7	\0‚`\ã\áôÞ´-µ\ãjÒ¾”°¾_ \Z\î¡3˜\ß\å\ë@¹OR-\\ð\Ñ	,¬«:W˜#Œo\ïµ2\Æ\Äm°Vú&\ëZ@k\ÝF\æ&dñ\îL\íÞ†z[%RÑ°\ç[h\Óo\â,\"A\Üó\È\ã\Ñ\î}97ú­\Ú@+HŒ\ägµwS¦\í›}J¾¶$š´’X\0vñ½³<WzF°¤£ù”£.‘\"#w÷ª=’^dw¶†¯ü¸ƒ#°\Çþxæ¶–\Ã\ÝG²¶\â\ç\ÂM©`t\âLb=i\Ý/ôI`\ãK3°??­#Šz/V°\Ä\ìõq Þ¶\åXZNø\Ä\Ô\âm\í\Ý1ð\âWÞ«ü‡P«j\Ý\Äk–Q›\Ãdÿ\0\\~O\Õf\Õj\ê\Ý%\ÐH,my\Ä\Æù;˜ùú*”“\Èò„$°i1¶\ÎB¯†±¦&7\Ï\æj¹[`\èuM—H=H\Éú\Òöºý®ýˆ\Z±ƒ¸\ÜûS5\ëw\È,.aUH\Ç÷T´\Ñ\Ì\á(¼‹Ê©rw©\'Q\Z­ƒ$F¬QÊº9$y”lslýhO\Ó\ÜE\Z—g\è‹`t2¿’\Û4gLN\Ù3\é½G†\×õ-¬ð?\í\ZÁ\Õm\ÚTÁS‰\ìwü\Åu\Õ?ø\ÝASH\ç3ø\íAŽ˜¥Î›Â¸ª×—I#T‡\Ðú\Õn[ðC/‰/m\Øh ùvÏ§ú©¹­’¿\0˜½PZøP¨2I>`)iÝ–O«\Ô\Û7,\'‹®C²\à\ç·\îiKjz6\Ò\ØH$“\êIŒñúQn[k.\Öô¬©‚cc€r\ß:‹Z\åÛŽ€ª\Ûf*3a¹\æ‰\ß\à\íBýc­`\rûE”6¯+4¬£‰\Ø) ‡?-\é²\ãNH¶AŸ/c÷5ºŸ!Ò»ƒ¶vúš\r&QI­ƒ[ºoøˆ¤*´\èv\Üv$D\Í0,[6–çˆ€¶2r=`|÷ý\éf¶QA‹¦z^¤„®ð”\ë™–\çozN­`\ÒÊ´TYw²§\nW\Ë*¢3Ÿ¨Þº\í¶\é\î²¼—CIŒò{¸\à\ÓrK…K¾]D€\Ç \éM8E\Ò ×³\ÕáµDA?:W¢÷10`6pD)ƒþ\ê‘r2\09’gH˜\ÌmZO`\égD\0B“\Ç\Ï_J¾˜+Š\Úô	 ˆ0{\Öq\nš3®X\ÄO\Ã\È\Ì\×[Àdaü£y\Ü\0w\ã=\ëSE¿\r\ËÎ¹øA‰þ¼~ø¤\ït\å!@ReF0\r+‹C.K\ØMVô5\ØLa}\è\rh˜\Ð	|½iÙº ¯Å±1\é\Å[J\\fwÒ¥ù^3’E/Q\Ô\èH°KEB¨Õ‘*\íñBd…\r…;i\0\Ìw¦\ï\ØD\Ô5«\0L2´ƒòõ¥\Ù\n™\0\Ô\ÜJ©MLL°] \æ\é\ß\ÔÑF7Šª,Dñ$\ÐY™\r¬˜\Ïz¿Œ\ê|£F0\"†ƒ²—­*\"VN#\ÞjˆJœ\Ñ\Ý-¦@\Ø\Ø\ìsR–\Ú”T‰ŒV¯†¼d\ápª›@«\0Ä†œ­n©V\ÆD‘šÞ™\í‰\\\Ãj¨\äIŒF\Ô\Ë4˜\È@\Ê\Ï¨\Óq#q÷û\Õ5(·\æ2\Ñô\ÕA“§*º¦Š¾\ë\åmDñGö)!Y*¤Ç˜˜$GÏŠ%²Œ“¬Ž\n™À<Ô W°T\Z~\'|o;sµKX„>A™ßµlš\Ã!¹£LT#A\\\É\Ç;ñµ,\Ë\á\Û,IÍ¥\Îv\ç<\Õµ‹ –\Ñ\å ødòyý\êu1¹lEh´\Û4\àô—´\Ö\í²\Ü.Z0T\â3ÿ\0kª¶ t †\Þ3½\êee\niX\Ó\"N;`ŸÍ‚¢·®u/\Ã\Åm€„Evþ¦¨ô–\ÕI¹ˆi\"bE0A¶ ],ˆV\\™ùqúdD©óP92?\ßÞ\Ä\ß\â <°\0\ÌgoûV¾P\Ü7Q\Û,a5L=~uª%”ÿ\0p€O\í\Õd%“DinÞ–‡°N \ê\Ò\ã\"ª\Ä\r\í)‘\0\Éú\ï\éE»¦<«\ZD1\â3ö¡:ùŽy\É\ïAI\"N\Õ\ÃL-\éþ\ê{\æ\rv\0\ï\ß6=ž ¦¥kE!\ÕË¸8#‚?u¢[JZG7–$n\0\Î9\ØoF»-øC[\é9+\Ämúý)r\Ú<\ç9ó7ô‘µ{\Õgˆ²:\æ\Ó\Ø\Ón\Ù!\Û\Í;·¥Àµn\áV·iÔ€6¨YÌ´d˜\Æ*z}\"¥Æ¶\ê\ZE²Hø\Éýk¯[\ZV\Éø¦\à\Òvˆ¥€G€+xD¥½L™\0û\Äv£{I\"\î \ß\Óhf\â \ÏOJ·\én¯P™òù„~\ã\Ðö\Íñþ[©{l°E\ÖR®\á¢Ló± R±h©¶÷-Ý¸\×¶¼\ê¸%\Û\Úg\çSiuºrX¹\0\äUQ\"ð”H$¶\0Œó\Åê¢µ²¶b«f.,\Ï3õ—\Ö\Ø@–›¬K=?N·KB*A—&\äd\Î~õ\ÝHð\ËZ`Å´wŽ}ù\n¸·â—»g©Y]L\Î\ï·3ò\Ï\é\Ý-×·i\î-ä‚š$£ÿ\0\"¦\îÂž¯J–úKWR\ê].¡K7\Ål\à‰\0\Ìd\æ8Pl6”\ê\é\ï›`‰FT`’a€9=\Ø\ÕeF\åü\× \Ûe\Ô\ä1\Î7÷ö¨Fð’\ìxz¯!Bº±¶\à©Áýñ4¹1©¼—‚_¾nfñ²\Ä€Å¶#0>x%Ëˆ\Ê^\Ó\Ú\Ò\àŸ”’\'8…¾\ÜGY6\r\ËW\r\ÆP\á\Ø+0Go—\ë\ëO-\ën¦\Û=\ëNút„¹\åc±1¹‘\"\'sò§qhV\ã\"I==Àªò™S?Ãšv\ËZ¸\Ê\nJˆŒO\Û]¦\×Ss\Æ1Î”ˆ\ì\'±™ûTtwÊ±‘\æœ\Zv­Y3C¨·ã¯ˆ¬\ÆX€‚`mòˆúRŠ\æ\Û\é+*\Â ‰i­\0Œ\Ö\ÙÆ§V†Àwô\ß\éUN.0\Ô`uB\æ•I$NQv*–Ä¿‰4c\Æ?\íQf\É\n¥„\çzl\Û €¹\ÄI\Õ\Z\Ò;i$\0©¬J.^µ¥Œ1\Ï\ßIx8P\Ò1\ìw¤‘˜\Ý\ÔH“\Ä\íÚ›¶¾\r\â\Ä?w©IxR/\ág\èÃ¡\"V)K5\ËcbÝ½+_§2Á‘š\ë\à\åÝª]štWªhÀ ¡˜ªõ==\Íu\'R\çÞµZÕ­C`\Äç°ª0P\0 \çzg \ÅQ˜—Wª@.J¸\È<ƒG=32‹\ÖÜŽ¡F@þø¥º\Ë-bð¸ªJ4\å¿ë¢‘p#\ï©F\ß\êžðžÑ¥ü/¬µ\ÖñUC¤;ƒÛ½l\'N\Íj5‡a±#°zŽXþc§xÀ‰­?\á}Š4\Üò0,\æ¹9\"Ú¸–„’t\Â\\\èK)\n —0\'Š\É\êzÓC)‚¤A&b\'Šô—	%YgL‰\êzpøŠI2q“1·\æ*P›-8&ŒT¶P“\á© j’A xþ\ÑV@ºQHTgh\È\ïù\Ï[\ÓYW\r¡\ÂBü§rh\ÐS\á‘\r A\Ï\éVYVGN†ø\îjR\r\Ä8\ã¢>´Í´[LTD&Aaö\Å.š„yC«\ÌX	]¸âš°HTn>\ÄJÁ®üüªRE \ÉÑ®\ÙMN`t Qõ›\ÖY¶M°¶Á-\Ì\È a¤\0;ø­Ö°\Å\0Ter°t¼™¸\È¥®\è° 3•1À\ìH‘9\ïµ$%œ’¥“\Ìõ=3%Z\Ù[z“O\ÂO$\â\'3ƒ\í\éYd\\\én:øa±¤©Y\Ä@\Ïõ¯Oz\ãôýMÁ¡	fÎ¡,„ó±+\Â\în	|9\Ì\àA\Î Áó{wš\êO\é%&aBM²º\nM¦ðŸ\rŸB	?Ji¯^´ºntö\Õ.(Y`°_)>°W|ãœ‚5þ\Z\Éu]GRº…\Ö=\ÄsœW]ÿ\0ñz\å@G‡­\É^\æW®ö¦{;X¹¨Z¸\×4†\È\íhJ®À\Éú\ï»§\Õmú‹W‘­,…A‚$ùc!X\ÌQzö\Ñr\å»w-Z\0X\0Ã\ë\Æ(\Ö\ît\é~Àþ[\ÆPirYXi:¤ö“&\"=6 y“4\î\ï\0^ô\'L÷M¶%\Û-8Ù€}ûq\Ä\Z(\éÙ¬\Ý=¥°\ï$@5H€\'>Ÿ-„\ê\ß\Ì\'Qo«K®¶–\Ò$8Ó\Æ{\Î{\×[¹jý±z\àUñX\ËùÀ\ÎXw9Ú¶P5€\Ö/tþ%¶´t\\°\ê•ñ	#3\Z~q&©¦\Ëô\ïuúu\êHµ¤\\\ÈU1\ë;Un\'ò\Éez›ÈŠ\Ë`9Œ\ä\ÏÖ«i\ïx6,µ\Åf„¸¾Uÿ\0õ“‰\ßl\Ó!Zƒÿ\0Æº·E\áxP\îH…c±\ãx\â*aV\Ò5\Û~5´|,Á&	aŒ\î\'ÛœÕ­µ¿\Ýþª\ÍÛž\Z…Sm‡”ñ«\Ê{º/Ok¨¹\Ð=\ëV\Ë5›q¥Vu\É$úv\Æ{\î\îMlEÐ½\Ë÷\â+=Ö¸Šu›„–`€g\"jT\ÙgrðbT\ÃZ\ÒC2I\Æ1?O£÷<N¥\ß\Ä\r%õ[²IøŒ\í€ ûw¥z÷¾ší‹ƒ\ÃRT°ŽwÇ¾ù©“oBR\0\Ïi­\Ùò3hf\Ô\ÛBcO·5G°€\éñ-’UÀU†üLû\Å2žÝ·n\éð¢Z\é2Bƒ±ý£•‚²†ðƒ\\\n\' €3Œ¿\éZ“C&\ï\à…õ¸\Ò‡]D‚I\'aœm€#\Ûj^\Ù6¢\ê5\Åy\'\âG°\È3úÖ»XW³u\Ñ	(ªX1¨\Î\Ò}û\ÏÖ©\ÖX¿\ánËª\ÐÓ¬)RCi\'\ßõ\âN*ÿ\0©\ÑLb¶:û]KøûFŸ‰ N{oN–KŸ\Úu˜\'\Ò=+ô·úkÖ„@&\Ù\ÒHhŸÞc¯¼iÔ¹¶-\éP¬x\î\'Þ·òVÅ—\äz\í•4ÀÉ˜l\Z©ò‚YRW\ÊH3;\çó6ÿ\0ˆ§TÚ‹«—\0{DzQ\Þ\ÎB€Äœ\Â5X»G,“‹¦-ö\Z\Ð \Ù“þq÷;Mºt(\Ð\ÌVF6;\æž~œ%×µ|\ét&dó\Ûó½\Â[G¼oÞ|\n•	ª\Ûðˆd&\êŸ*(ú“>\Ã\ëU»b\ã\ÜQn\ã;,C(\É\0D\ÎñŽi›¶\ÈB|Ehm\Â\äÈ“\'\Ó÷ª>UA\Ò\Èò±3\Ä\æ{P«\ÙU,\Úý—o3xdŒD\r\ÌL\àCÚ€,¸wXÂ‰p£Wšq=ó‰õ­v\Ãnš\ãÔÚ”Ž3\Þ$qôšF\ãðüVñÎ­l!§#~FÆ¦UHUX±&\Øo\Û@U&XE¨Ò·2x qÚœ(z{¡\Ù\Ò\àV\ÓÀn3±ˆ\íÁ %¸*I+\"f`G5˜\é¯-\\^±­\Ë1º|­\å8\0b#?l{Sh÷ºn¥š\ÒIF\n§\Ã\ÔT\ê\äFò79Ú²\ì°BJ\êÁ1þõ¥e\í\Þø¬†\"\Ù79sDdz\Öð›\Ã\"\Ë^Uw•‹žRM\ÕpO A;}*ý;[¶ªzvU¹¢ZXG2ÀA˜ˆªv¬0%Z2n.¯\í2n3&GoZ5»¶\×\Ä-¨VJŽ€ú\Z›£~A„g,\ÊG•d\ã\Ç\ïD\êÙ¹¦\Ò(B–\Ö	c\É\Ü\Î\Ç#QT(¸-C+\ÐÄ—\êZ\è³|2¨{dmwË°\Ç\Âw\Äúú\Ðk6jz{t[S\æ-¤3úsA\Ò\Ð¶\0;ñL3M°Dc>´#ÿ\0¡7ƒJ\âQ6ªÝ²Jø‚A \Çû\â”~œ±\Æ\Z\'\Íž	ÞœWp²¬¥ZpN\ß\ãµ\n\ã$¥\ÂK.\Í&sòŒR´½\Z2~\n0K—•´ÿ\0LB0¤€7Žô¸¬\n³1ƒûf™kE€\'OŸ\Í\ïÞ„-\É\Ì`Ny©u.¤™Ü‚\ì[Nv…§6ˆpÍ§\Ê`™€xú\íó º‰\Æñš©f\ÚqKC\ì\Ññl›ŠÁ\0e‰c«Q\àƒ=¨&\Ñ6Ë€\0X‘9>¢…nð)>ˆ\íûÓ–\Ü-½L@‰\0†\'ƒ;H\î›4&\ÊË¸1©Km”©†\\\ê>”Á³u\Ö\Û0q\â.¥‘†Q {#\ähW,\çJº¼	%v¡AL*8e\ÒÎŠ \ä\æ=6\ßÖ®V\ä‹`ð¼²˜\æs\ß}\ékNÁ+¨	\0zð}sGñ´‰†Øœ“¿je‘-ÿ\0ò+\Þx[„¬¸:bD{ý>õF\ÒÚŽuI\ÒÛ­\nÙ¸¶­>F}j±–âŽ·Z†r\"YF#ô¢“ºPrÁ[láŠ†\\ŒN\Ä žý†ha­†ð†N’ôg\Î\ÔT¾¾„E@Ya\ÔBŸ_Òª\à\"vˆ$\é™X?}·\ïY#6U­(_`p\çŸ™¡Þ¸\Î„¨€1ö£\\›6\Ê:ud œsÿ\0t?&\ã|ƒ¹\Ú@¬#eš\ê\Û*ºœˆf!A÷\'Þ¸‰\r¥V\r7\n½J9_ƒ¡s¬öŠTWôm«˜\ì1þ#\ÙD\ír\í\Â$\È:b’@#\éŠ\'*¤D@\Û\ßÞ‹«M\Ý7\Ò<¬\'1ûPO$\àö¥y\Z \Ì	”0@8«:b	`\ÍWu	…\Ä½#(dGŠ\Ü_\ë0€d¯\Ú=¨7\íÛµeT®¢ÀA}7ûmµj\Ý[ƒ\ÄC}cPJ…\Ô`\ÆL \äžô\î–\Ñé‘–\à7Ê²+(›m^ÝžX%/,h«n5,\äfc;þw Ù´Y\Û6\ä§\Ä;\æ6;\ïùE³üµ\Æ[ÖŠ^W`Áˆ\0\í\ïT¶E»’\0%Ž1…\í\ïYgE	\ê-\Ù*Ž-jugr58\Ú#Ú»ù«÷‰\áje·\n4„\n\ÛI‰žO¢\r:oX.H`5`\Ø0I\ãÖ‘qt\Ô¹–r \çõýiZ?C¥ðÒ‰jA#86\É\æˆ]¢\â\ê»0\ÒT“$\æx?ÿ\0Ïµ\Ý\Ûh\Ý=\ÛHC\ØG.††’AÛ±3ök^ƒ\ã\ÞB¡\È¥@;\äDƒ‘·ÎŠb¸ü/d\r+m\ÐÏŠW1úŠjûô\×A³Ì üLLd\ì}d“ø(wl·‹\Û jUY:\ÄIl‘¸\È\Å.»e˜ør )†òdûŸz\Ûv\'‡[\éž\ïT«´´iÒ»oúÿ\0ŒSúqª\é`—‡E\Ù$œo¿z„³~\Ý\Ý\ru\n‹a•®Â…<d\às¾\ÕkS\\\é\ÖÏ‰­T\Òy„ÁžH÷\Û\í7 	ý7›lAƒ\Z”\Z¿ˆ\Ï{N¢\íu´\îu19\É\Írt\æÿ\0HlÚŸº\Ë3K\Ì\'#¹ƒ½\ê\×SE\á\ÔZCj.HxGNwd˜\'8*/‘<!”=±\Ï\å\ÛÀ·e\ì)u¼U	.Hbc\ä3\ëY\ÒU\ÕôŒª-\Þq\Zµ£¼1$\Æ3ûFY®\ê.¨\ÔNv÷ý{S\Ç\"=šÿ\0\Ãúÿ\0\éWKAU–8\Çû§ºuKª@ÿ\0Ðšò\è\Å<\â4†Œý+o¦\ëüDQ	Œ võü\ïI8VQ›Of›%½%\0&p2)7±¡™@\ê\'TÈ˜\Ç\Ëzv\Å\åºt+ƒª˜ûÕ¯Z_\rûž\àA\éÐ­^D§Z‡E\n\ê \Ç?‘W\é\ÛY€%[u¨ð˜J°\äýj\\xl\Ø$ˆw¦u¡Ý)þYŽ™\ÐLl\Ã.©Œ\Ç#š\r¶V_L€¸\Èý…\Ñd:\Z#u?µA–‹ð]¬yˆ$g“RQ4>q‚1N½ \ë½	RØ¾\Ü\'ùK\ÚÇª3|:­º\È\Ø7¬Û‹w ¿-›\\\â½[°# R½OL:«e§S§“Q?\Ãz\ëW­+[pT\Ñz\ï\áº\É\êºO-\Ý\È\á«§Sü3¨{dc\Ç>µ\èz^°E\çŸÚ´¢\âû@\×©—þüNX[¾p`˜­>¡\rÀ·UC9õ¬Þ³¢N¦nX1y{\èÿ\0Âº\íCù{òc5\ÏÈ“þ\ÑE¸\Û_\ÖLS\Ó\"m+*A:k5zcmÀg”-:¢Jgh\çÒ½VŠ­ \',f²ú«X%G“\ÅhHÓFV\Äˆ¬oôõûUº&tºÃ¨F\Òc+¹˜?\æ–[¶\ßÍ³\È<f˜¶\Ú\í y@F\Ø\Þxÿ\0T\í}&Ÿ\Ãe\Z/›w€¸\ìKDOáŸ/v\ÙW\Õp´ŸŠ	Ô»oøj¶\Ým\0[&\à\03<\ë™?±jm”¼\\’ÀÁÇ§Ú¹´Î¬4%s qvm\Ü_üs•ùœ{gž\â‘aÿ\0\ç+øMl–œ¼\0À\ï \ãjØ½liI\r‰´\Å$ë©šú4\æ‚`ˆ\Üb©1$«FM\ßE\ÛaXx.þ`|\Ý\æ6ž);\Ý;\Þ`\íml\èSp‰ ±\'\0\äLûV\ß6…V}d@dÏš b;P¯}9¸\r•k„U¶Y>üÿ\0\Ê\èO\Â7\í˜öºr\Ý]±p5¡¯8#±\'Ÿ¯\Ð>?ò\Î\è\ì\Íq?ø®+ƒ$\È\ÉÕ˜\ØóZfÈ´\ít39u…\ÔfA1‘ò8>”¹K–…\×\ÄX6\×#LHs3™g˜¦ò<S^­\î\ÜñKiOš\àP I\\fG[½TjQ\Ô5ûˆB“ªB€<ªbOüž\à\ë:{I¡\íYd§A,`‚LŸXßŠ;^±nØ²\Ö\Û\Äf\'\Êƒ¤\r†Ãž1F­a‹+où‹\Ê:d· 1\ÒYÆ¯˜@F7;A\Î\ÔEºý;ß²–Mƒ¥—¾?ò[‘ž;d\ÐYN™A\ÖC©·q—@,@-\ï¿ÄŠ§ŒM\ä{¨È\Ë#JÁ±\Û~\ämSk\Ñ\×Áûúí…›©m­1´\ÅmÐ£\à“ˆ>É¾‡Gk´\0©6”Ÿ$\É\Ä	\ß9SüAºW¯Ý·w\à\\\ÚRT‡I3\ì9\àú\Ò\ïyo\ßm\\²(*ªOô\Îe§\â&g=€\Ú4[Ð^Fún¯¢\ê\í‹w–úi·¦m	,\Ñ\çô\0Ÿ’%E»b\Ê\ë­\È.O”®\à`LûúmF±z\ÇH†L#\Ã{J mˆûH«^¾©k\Ç\èZê£¡TR`)\Z£Ì¦~ði\é\Þ¼hD]ef»l½­ ÷Û°ô\Ç;\Ñ,+\ÛT\Ô\ÞFX¯!á ’ò#õš›6®\\´\n€÷u–uU2˜ \ç~Â†@¶¬)*$x\åY\ØÀ\ï\Þi“½\é(¡EµwB\Ç\ÈL…p9ý\0\ãÖ\Õ][–Â—›V]\Ëø†LN\àFcnÿ\0:-¦¸·5\"‹eWIc¤\É9ú\róµ[²m\\@öÆ­ ,N\Ä\ç3ˆMr@UŸ¶\ÖÝ’Ð¶™+uUw…\'\ÔûÒ·úpý#[$PŠ~] ñ<É§úŽÁŽ¥•ô@„&N;Á c·µ\Ô\\ðm”’\Æclð?\r#I8³À½l›L<=A´‰†þv4Å®¾õ†þ¢´[%²qZ-\Ò3¥À«* ±…$Ä˜\Î7Ži.§§ƒv\Ú}cf\Ê{‚LñKÑ§‚«–3_\Øy:Îœ\Ý[½9u\0˜,À°O\æj.B¯ˆ3\îk Y¾—‰A\æ¸2cóni´\ê®[º:kŠo\\˜!F\äŒoOV\ÉO‡ØŒ]>9ciB9$\ÆaŒsøj\×OŒ	³m3eTG†$\â}ª–oÚ¼uy)3úŒ\Ñnºø\ìQVÞ“”¶Ú–A\à\ÌÇ¬Ÿz>\àžVO«K\Þ+:\\XO\êü±\ç\çT6\Ñ\Ý\Ð[\'X*50LŒú\ìv•X\Ûñd@ˆ&btý{\íö÷£º­2\\@ª\0ˆ\ï:w €s¶\Ý\è0&\ìÍººÔ©f\'Hó€wöûPb\çŒ\Ä\0\ä4ç™ž+]’\Ò]G×©­9‡U$9\\’#»oI‹n–X†…¦Ÿq˜û}kW¥\ë>\ê\r,ºe€Ÿ ¹Ç±\Ä\ïG\é.½«–ÀrL\Ã!Â‘3;\Z2Û¼Ö˜[\Ô\ÑoF¤Pq±\ï\æŒ\Ý|\'ky\ZLK\Zy?¨~\Ê]1x\ÞUÍ¸„+¬\ÌD>£õŠ£y#3j`/Å§\ÐO0}>´\ÇMp\\¹k\Ä?\Ó\\Âˆ˜8ýj×‘´eU.I:‚“¹\Èçˆ‘\ë[ª\'Ý¬\n\Þ-x5øº?¨\Þ)\"’q™\ß~8ú,\Þ3¢ ¹©JÀ\ÈÀø£\Ðs\ê\Ûk~%ƒp›n¡˜‚@$;d\æ–\ê-y–%†¡™\Çyõ\ÏÞ…1Ô€­^`A…\Ô\Òp\äU‚b\0X9†\Ì;ý\ëš\Ù\03Ž5³´\Z\íRHU?3¿\×\éK‘¯V\Û+ê¥²0KL\0w\ÛÞ‚\ëlÄ±\Ä\Ì(ùsšaÏ…t\Ê\ÊL‹nO¶F3K¸!YU·Ü¥†‹r¡¥”‘3rFÿ\0\\\Ô >-¢\ìxx«\Ý\n\ì\0\n \É^j‡¦`®\n¶´9`*m2\é¢nô\è,J/šÙ‹„I\Æ ûRŒNdp{\Ó\Ý\Ð0\r\Ö9\åµUr\n\Û÷¤¢‰Ð¼@£Û¸\Î¹Db$û\ÎõM†\Òû9ªi\"Hºcþ3\\´,‡k–Ð³\"1Â“c\Ô(úT®à¹¦Xyœ»N²M/b\àBÄ€q€D\Ó\n\Ú\Ø›AB˜ÿ\0”Ê™&šd_\ÕyÃo\Ï>D§&\ç¥QC¢¬€Ac\0žqŸ\Î\ÔDd¶\ÃX$ýc9\Û©Ÿ\Ø]ôÀ>ü“Z¨\ÖR\Ù§sóM V\ÂAnñþ&¥Iü@1\éEKfXŸ†<£\åó¬,‡ÁUGÑŒˆ\Ýu	\Ìcm·Š\è\Õh#Pi9™\æ—[‹qy7û‹ˆ\Å^\ÛgHYœ‰\çõ¢Ð\Z\æF\Ù\"\"3ˆ\É\Þ>UDh\0#0¨™ˆ>Ÿj%°U\Å\Æ{7)ò?·\Êw\ÛÞƒ¤\0! gE/\å(À\Ý\ÞŒ\ÃG¾\Ô\'¶n\Ý2.h\Ù\ÕÅ\Äo]‡\ØqR`…˜\rž\ÓKÝ† dÞ•¡¢òV@\'P\\p&„\Ù\Ì|¢®Rç…¨mƒ\0ñ5[m¥ƒ0˜â’‹ G#`j—} \'Š¹bKI“š\ï59~zsý>œxH\ê3p<\ê0O~ý«Ÿ¤k	ã½»ŒÁ§\ÅT\ìO\ÎMGôK½øV,—œ	…\Ï4D\ë.\\\é<¼|mlˆ¡K! \ï±\ïµ{\r\Ë\ÃÀTÌ«ª.’À¿¿ENT=\Òm®Ò¢I\àcœ‘9«›.\ÚCt\Â\ã\Ü|Ä™‘’v¡¶µ]\'KÁ*.	1\Ï\Ü\Ó7z/9¼-?›NA¹9ò õA¦¶µ2¨óy±\';\r¾§j ¸,\ß[ž\n\Ü\ÒÀ²\Ì+g°M¨Á\Ú\ßVmÙ¹{EôTr\ìT‘q `ˆ‚+<°!\Ó\\[%Ô $\Êxƒ\éFk-a\Ùz[¬m‚5\æŽw\Î\ç\ëQÕ©µ~ò\ÚR«lA†vS DúúL\ÍZ\Í\ÕPVã—›d f;\Éùý©Ý¢®\èa.j\n½E¬\èg1#I¶ª£=Û·-\ÛVeR\Ä\Ûy\Ç\ÓüPÂ‚P]\Ö\0\×tjÁÆ®{G¡£Ž¯Þµq4*°\Õ\æòó°#\'¶sL”R\Ð[w\Ú\Í\×nÿ\0P°t˜\0@h\ÌÄœšb\ïOo£ºmÝ¼.xjV‘¼`\ã·8¤­›·C\ßrÜ7\à\Çþ‹’N¬ô\×P\ÂÝ¨ -\Í\Z´u	32FeO\î;R\Öp	\'\éS~ð\r ‡&\Þf\Î2AAžh}\Ú\é\î\\–,]>Ö¶v‚´HZ%’§·pG•Y ´‘÷\íó«]·xªu%žtFj\Ä``ŒDf•¥¡£6(\Ö\î(#,¬\ÚV\â\Ì<~\n›Ö´\"jF\Èò–<z\ne„\Ù\×yØ¾Vô±b1\ífs\Îf“W»}übÝ¿=*Ð–k%ü+Ka\î2\Ü\"KT\æwõ­_§vH12w«ž•\ÏJ/^*-ðÝ‘2°iõ\é/8\n\Ä `\Ì\Ó)XpzŠ\é$„´HÀÚµ\í:¸D\0³{\Ï(¯-\Ó\ÞP\ê\ÌI‚MmÙ‡°Œn§™d\ê\\\Çžµ.Xz\"“tŒ\ê?Aô¡[ð\ÑI\ÒLñz\Õ\ÇQ\ãAQi5	UL…\Ä~Ms¥¶bÀg‘Ú¡_F»(ºm(\\C\Û|ÿ\09§-¦¥¡\È±9ü®¿p£±\n~\Õp\×:{šIð\Î\0vü#\ëJÕ™1\Ë.¢V\è \Î3*€œ`Tþf\ØP\Ê$\Ì\È}hˆÁK#0ØŽj/e¢ð-\åW,\Ó\0`¿ø\ÅH\Z—^\æ\Ô[/\çÉŒO°\Å‹j/2g“¹£´1>¿¡\ì\ì5\r\'\Ð^t-n\æ\n˜>•®²\â\'V6“\ëº3?\Ì\ÚRü@\r\Å<eÿ\0‹3I\åO\âŸ\Ë_Kóü$fi»¨J›½;u0`Eyñt_Ci\ä½kKøUÛ¶t\Û\ê.¸f\äSN	.\Ë`‹zz5º~·Ä´\Ü8\Ã\ÍwR «² \àO\ÐTõ=\Z\ß@V~¾ô¯MÖ­—ð¯¶–ûŠ\åJò‹¿ŒÎ»\ä¹\â\ÛCœ2\Ï\ëU³\Öx`?S*€j\Ñ\ê­\'ž\è@¤È™\ÜVR\ëJùG1°š\éƒRT\ÎI§hÓµ©\\hc¨°•$“\é¿ù­%6ü\é\n|¹žøúV7J\ì:ôöe\Ô‘$\í¹‰\ßi<Öž©–\ã²ÈºH:ˆÿ\0õ\Ë\Ég\\$‚õnd\Û6Í¶\0 \Ú\0³K=°\\\Ü]	¥¢·\æ=±LÝ¹\â\Ú: »Üƒ¨™\äûw %×±:H\æ™\0\ïöód¤4©±T¶…\Ú\Û3:($O1·¬q½+~\ßNA¸–\Ê\ë1\nL\'~ü\ïZJcqYÄŸ+‰\Ïø¥Ou‹wÐ†%œDdûÁW‹ö\È\ÉRª¿ü¿P\È\È.Yu\Íq\Ã=‚ žw¥nô\è—½ýA¸´\æ \í™*Ð¿\Ó]\Ö<UóBŽ \âp\'Ò†ö\Å\ëš-;°0{\ï\Éõ\ÅZ2\ÕyØ‹t‹\Õ\Ý+rà²¡J¢8ø„Â‘\Ì\É÷¤º›irÊ¢J‰f\Ô\ÆG`;ƒ\Î\Äv­R­\ÓõŠ\Â!\ZC¨T\ãŒz\Ð\ÖÚ·ToxLF¼](¡U€˜ŒŽ\ÔÉÚŒkw…²¤½«lÚ‰S˜€ @X“\ß×ˆ¢‹\Þ%Î²óô¶\íXº\"\Ù0t±&;v#Ò‹~Ö‹ó¦\Ú:‡–Hb\Ü#\Ð\È\Ü¥Å•fM+§\Íý¥„dŒp6õô4ýU]¹3@Y¼[f\àgµ¤›maqnÙ’T\ê$\ãWzM\n\Ú\ÝKl¾(|\î5@\0‰§o°ï‰¸–\Ô(Tuv2\0;\ç>û\×]¼\ÝU¿YD6WS‹jA¹œ‘\îv\Ä\éAÅ¦Š\Å\ÚŒ¾ioˆ+m jdj\Üpb4KV]® ¿\n¶¾dNçœ€=†\ÔG°¶<kb\ä¡&Ñ½\áÿ\0lfL\Ì\ï\0Už\Û^fo\r\ï6”Ñ¥A˜E-ÿ\0\ì9\Îfi[z@\êžNµv\Ò#Þ»e/h´\nª¼u\'°\ß\0q½u¾¢\nƒ|.T‡o‰v ‰Œó±AT³{¡-p[[1¼!9¾­¶’Dö§\Ð‹M\ëŸ\×\ê-Þ–»e5$ÿ\0\ì`‚&+vqL\Ý¨Y\â\ÏY}\Ö\ÑEð\Úc:‡\ë™ÞW V$¹FBê ‡\0(Âƒ¦}Š\Ù{\Æû\\—\Ô!vÀŸ]½VùµÔzd\àH:I\ZÀ·\Þ\çŠÖ˜~–¹cù·[0w¼ªN€$•™ˆp3õ =¹\nÖ²— SŒ\È;\í\È\ïµ7kø‹tc§k}=\ÅðYnB¤K)Ä‘\é¹ \ÜTn˜\Ügkkv<¢°\'™\ÚG®}©Ô\ä^© v™­Xñ-\è\'fR>XûÖ³k¬o\í°›‹­#A†ÿ\0\ÖƒÞ³Í‚:E@ °c\01\ã1Ltý}\ÄE§\éÁ†\Ð›|Nü\Î;Qo\Ô\Å\ë~Nmº³¤¡¤ˆd\Ç5Ÿ\Õt\ÖÝ¼º€œ±\Ì\ä\ì8ö“\ïZ\Öz›oÒ­–<ú‹À€>„ü…WLj[¶‰QÇ®ñ[ýl\Ö\á”c7O\à+Ÿ\Òõ¹ò\0\nÄ¼ÿ\0ûqÀ\ï†z?\âim\ÂõA 2\Ã	O¸™ù\nn\ïKdõh²•\ZxQÁ÷\æ“{\"®4\ê-‚\Ø\Ì\í\ß=©:¸”\ï	ªhÐ²+±e$\04\ÈóL*+]\n ³(Â‘˜À#;ž+Î‹·zvA€$sø>U­\Óõý5\Û,Ì‹mŸ\ái ¯q\ë;S)Yñ5Ÿ]PYu¼;\rÁ“\é°ýª\ÍxÜ¿j\Ó\Ú\Éói™?H®(«h_{€™²I,£\â1\íò ·Q 1´ #/©\Ø\àm—ÎŽ\Ñ8á•¹o@.\r:·&|°cl\í©t\éM\Ð\Ê\ÝÐ€jÁ\ãê®·d\\ ´0>a’w\ïœ÷õ41­\0i\Ò	‰\í\Ï\ëY§C¬2–XÙºš[h>Æ´\ÖÍ»\Ý+1\ï\ê…!ˆf$ö¾”•\Æñ­–s©\Øù‹-\ê~¿­5aƒ\Ø\Ä6¸ƒ3þ+~\r\'\éK½8	ÁÓ•;\Ð.#i•AAqZbÛ®‘l+%Koˆƒ\Ï5S\Ó®M\Ä\0-‚±\î}=\è±TŒ\ÃaB–•,ò™˜þ\ZW\ÃRþvlm¤O<\Íi›J¹V91 \ÚM.\Î\Ö\î½\Å,¤Ì•cwõü\Í#‰U1Sb\Û\ë`Áq\'?Nkš\Ð\n@ˆ19ú\Ó>\Z2*ªy²Ï¨·ú\â†\Öò¢\äÁ4\ì\"l„¸¦\à,H\×Úª\ãI-l–ADi&{\Ó„ù‰\0Á\íK\è3‘ \ë­Œ¬¯’\ê\Ã\Ê4pLöœÁ\Ì`{W)`rÁJ¼ƒ\êX‡–`M\Âd4\Ô\Ú,W9_\í;\ã5M•™FIô\âŠm‘ yª~Bx˜Þ•¡“E•m@Á«“b¤o\èkˆO,6¹$™\Äb?z\å]N4$\Æx¡ …%\ÛJ±\Ò\ØDWk¡WE»zr“-‰ûgoAC.\Î\Ç[jcrI5\ÅYVuB“´\îG§\Ïõ£B¶\í­ªL\È\Û\×o½	›]\ÖfÌ“<W1Dq«”#L±83KY0[n¥€a+\É7÷š2J-\n÷û\ÒÚ™•A	\Ø	^õaq•Š\Îðw¦HI+aCfvù\ÑVZ[\'Jù¼\ÃoñAK¡X23±‡\ÐÔ£. Hf\ZN\Ø\Ìcö¢%&@\00“ˆƒÒª@¯\é\ßò*\n°–™\'&ª…,r\"Hô¬Ì­8$‘P˜d\ÈõŽ)\ã`ª³¥tL©\r‚~ß­\rÀe†ô^Š)\n¶[û`L™\æ„\ê5NGq\Édy”\Ò4\Â\Æ ÷8\Ï4MDJ¤	2}Td²Z,÷\ÝBe¯\Þ\én*ª.Ÿ,¤˜fÁœLŽ\ÐD·¬«¥­,ˆê¡µ‘>°cƒW\ê:­==\Ë6\Çô®\0t ™Ç®7\í\"€\ë‹nò)¹iV_Oöd\àO¤m;×¬±³Áÿ\0Kô<\Ý!Az\ã=\ä\n¤¡Cˆ8ƒ$€}\à\Öi´\Ön’ö\\xi”€p\0‘ŸˆV\â²\ÚoÛ¼™-6\ØGø¤:¾‰‘˜\ÛIµª@\'\n³\Û\éZ2Ó¦#¥\Ù:r\ïhÁf®£\Çój\ëYD€6­F±9‚G±Ç¡©¸—|qnÝ…\"Ò‚@ƒ«·ø1ûU\í±·\â¥\Ó\0–dü\Ç1µ:\Ê)”OSdWXh	\'T.\Ä\àF2H\âc‰*¤9ºÊªŒªš} Àß…7\Õ\ÙøÃ¨,‚N\"&Iyú\Ò\n*“v\×ôÑŠ¬5\É\Û\Å\r+-\nx³\Óÿ\09{GŽÉ¦6C*H\'&0\Õ\Ø]K–\í]K–µ\"\È\ÈÖ¤Èœ\ÄE(…\ÝAµŠ<¼#9\ïñ\Ó]3\Úp¶\Û\Ä·G‘Ô•¶¸3©r;})-\ì\Î!: ¶\îõø‚\à\n¯‘lfTœIû\â¯\ã#\Þñ5¬8m:~%ò\ã¾ÿ\0>O¥*:†¸\×bùe±\Ó\åœ,O®\ßö©eJ^*†H\Üþb,k&›\âÜ¹búZðƒ y\Ì\Ï;\àúý:Â›\ÂÝ‹HEð\Z?º1Û€3ž7\âƒi\íñe\ï5“\áH¹pjózGöŽ}ª\ÖÛ©µ\Óÿ\0*š®Yf-€Hc¶¨A©+\Ze\ît\ÏÔ™WE¶eù +ó,pG¬\Æ}jq\é\Òð¾„9s(€ª62\0ò\"¡|¶›V›¬Fu\0N`Œ\âŠ\Ý%¶¹uúé®©+qÀe÷|ò³µ.¶\ÆY\Ò)Ó…»h ºn* ¬(\ÔN\'yó÷I\Þ!\î:\Ù\Ö\è\Ï)¨y½9Èš(\ÔnE\ínYˆ7 \ËN#\'\Ó\ïV6\Õ{z5\\¸	h€&G\Ô\n´UdG+t¦Ä‚F¥8R+Iø€0\Ò^\n\0O˜dc\æ+\ë40:I“‚L|\é\ÛLŒ¬H‚24\æ\rR\ìœ\â¶lY¼¦<<\"ƒ@??Z\Ñé®½Þ¡\Ûø§Jª\Â\í¶ÿ\0:\ÃN©|\r*¡N XŒ\ä·?êšµÕ¼Y:˜­$\æGÎ£(1-&mÃ,\09çŠ­²·V_4ñ¿\ï÷¡[º¬	Ÿ($†+&G\ÏÖª\ÌXxÈ…d\í2Î¡Ô£–,r\Ù6M\Är¡¢p$\Ä\ç\é\íLƒ¬‘ß½\"t\Ö	[ƒn>ô\ÇMz\Ú\ÛòCŒ4–÷\ÅNQ$2ƒXhG\ÐoZ-ë¥0²†E\Z½ý\ê\ÎÁ#0?»z´ÎšM\à\è\0­4P2(j\Û#i¢\Ûòˆ;\ïò£,\ä\Ð\Æ_\â=Øºz‹bSû„mY\Ö\ïj\ê\Ã…€FWÖ½U\Ëz”‚“#jó_\Å?†ž™¼DS¡\ÓÒ­\ÃÈ®˜\'‡¢éº¶˜1#-Áªõ–º?\â­–*\äF\à\Öð®²ò–´\ábD\Ç5 ÷U\Èkw\ÞVŠ‹¬¬?\ÈÚ J\×úGo>¨>V#zioÔ›\ÅQƒj•g\0qI‹}E\ÐRõÁuI\Ã\èªK7OtÁ\"Tž{\Ñp¿ÈŠ_T\ß\é¯Ú½næ„€\nŒüùü¥Óµ¶)7\0VH™\ß;RV¯¢‰a(\Ç9ý¨¢\ák!mŸ,†l`úý\êrV\èt]¦\Ø\Û\0¾\Ü\×\\\Õ57”™üù\Ðlu	m\ÐHV\Ø?&›¸M\Õó@p9ùT\Z¦U;@|D»kÈ¤\ÜÁ\Õp\Ì}3õ\Å\03Úº\r\ÛJU,®\0=¸ûo½3n\Ø*ó+A\à|þ¿J­ðR\âd©f\Äpgž”miò\Å.uˆbB°\Ô|]›\Øýiv²½0p\Ú_Dùƒ¿§¤ý¾­\\¶\Öô‹—.m\Ô\æx²j·,\Â2ª\áIÐ 1\Üüª©×¸ \×\ã\"mÒ±¶\În*9_)A\0óƒ´þoT¿hô\Éy,\Üy\Ô	€\Z\Î;8š:i²°\×-\é\Ê\Â\Ø2qœü»Pn\Þ\Õi\ã\ë\0\n\Í\æ\"7Íª–\Û\Ï\êm2*±Á)ý5‰\ë\êNy¡·L\rË…Ù˜Oœ \r\'\Ó\éµ2\çRµ¶r¶@\ÔF\æb„ŠB©Áˆ 0¹ß¿n~µÐž	·O\É\Ó[_J;O<$5³¬dö\ÛX¤|2l½»`µ¹\"g\ÌGh\â9ß¶¢?™Š\Ãˆöò¥Rå›Œ ·Ä†T\Û\Ó\×?*É«)\ÙÑ“vÙ¶\è0* \r^em²$lq\ë\éDR­\ÒeÓ¥t)\n˜r	\È;\í\Ø\n%þœ-\Å\nÁ›\0\\C±Œ‰#ó¼S¯Qkúd%“nBi&ƒ\Û>‡“\ãuE\ã<P¢y®\ØW´ÿ\0Ë†`šQž\Ú}û\Ô\ÜAqUÆ²QT:\êóad1€±\Æ\Üó\\Và¸ ©T@H\Ð«n´\î\ÅUº.œ«–VbÉ­Z\ê\èƒ\ë\ÏaÜ\é\ZiŽ¥’\Úô\ëqqP\ê½qq‡\ä\Ô\'ô­!\é˜^bCK\á\ÄD2Þ‘ó\Ån\\ºá¿¤%–HY$ÂŽfG\ÌúT\'Uª\Û*Z·l¶‘©\ÓT¨\Ä\Îc·Ÿ•\'oï¨½`±siI\ÔMÀW\Äa¼f y£œ|ª–o\\±i_¨µ(\Ã\Ê\\\ìD€~¡ z\Z±\n8E½q…$,`“Áõ…y\îY\nN´¸ 0€7\â@?A¾+[£a\áuµM\ë®X½¼K¦6ö\æ¯\Ó‹i®ª¡n)\ÉoCôûÐ\ÜK~pM\ÅYRð0\Ä\å}¤©«\"%½d\ÝUº¦M¹&IøHô\ïŠk\Å_]¾\Þ$\\E`\Æ5\á°3¿\íšf\Ë\\ÿ\0ú‡„Ö‡‰¢=¹b4\Ë4HNL`IŒš\ÏB FµY6Dúz½*\ï\ÔÜ½s¦*)i]M°\ÔN@˜\Ìñ\ë7X_G­õWu”ƒimLt\Ï“¿¿úª5«7\í\\¸\Û)\ÌÊ“\Ä\ÞñY©xº”bÀÎ¥ Œ~EõòÚ™•± ´Ì™ü\Í1?\ã¦qµj\é6\æ\×r\0\Îü’#4¥\ÛOfø7m!\Ó(AB\00{FG\íN\ÛðÜ…<Â–S…=\ÌL\éAk\"\ád7V	‚ù\Å	$\ÊBN,·K\ÔõBÛº*2ó[\0\ÉA\Z¶Û’r9Úg©[\ê 2©\"Tüö¥-Z¼o]\Å\ßH•‚x\Ú\'l\Ï+\ÙCj\à3Zf$	ž)kc8FJ\ÖÍ»Œ¬«¾`\0%¤\à\Ð\"Gû ](·õ²†I’¨\ßiôÛŸ\'kø…É›Ì·;»¶H˜ù\Ìþ´ý\ÍW[]\ÍjÊºH\Þ#\0} S©\'¢‹\ÉTmH\Ú	K™;d\ÌGý¦­õ\ZºqoZ\"¯›œŸóþ»Vb6ƒ\Ùa gjv\Å\ëbö¦@\ê£\Ê|`J ”}5zK\Ú\í,˜6¤I÷ÿ\0T{–\ÅÀ\Ît³>X±óÏ·û¤¬·ò÷Qõ[ƒM\ÄMýŽÃŠÐµ‘ŠB.’°\×\"G\í9\íAª\É-ˆ7K\á±,¬W \ßó4f\ÚF¶\Ú\ØB’\Â<ˆ\í\ëþ+f\è*À#\È| \ê\"8\íù\è3œ‘–\Æ{ü«\'fÑ›s§\n\Ì\ÜmT{O1nß˜yœcýS\Ïn\0QDm@{d¶£\í¶h\ìe#9Á¶\ímÄ°%aH9œ\äo·VÚ† {\Îôk–\Î[‰çŸ•P/›°žsHt&\r\Ê:8 …\03\"#3Œúô]-\å\Ú)†O´‰?Áª:ùˆi“÷¥¢ª@‚Ì‚¥‰\àU|-cÈ¤÷·\äUô\Äª\é<mÚ…˜\'@®Dƒ\ë\ÅV8Šbƒ;‰Þ ¢‘±¼\ézŒ¤\0y©‚E\\\Û ‘Fþ•\Ê\ÅH1‘±\Ú)h-œÁI•Mø\í\\\ÖÍ²¤Á&\ÌLg¶\Õ!d\'ÔŽ*ÁX	ù\ÍjG’Cƒ\è@Q’}*\êª<\ÇnÓš\æÑ¨\é˜;I“õ­@²ˆ¬YN\Ù\íµ]+¯šrH©TO–s?J\á\ä¶\ØlO\"°°ž%·]Zô¹c#N\0\àþ¿j¢‚\ZX£>¿8úP\Î7U\ÃfM\Õ0aRL\ä=±Mø\Õð\æ$Œnw\îjK\"I;\ã\Ü\ÕWNº\È i ÿ\0Š‹n¨\Êîš”\æ4\nD\\½ + ‘±ˆõª2+(*K9R\ÌK|1°\Û\Ó\î\å\âl\\T\Ò>ô4\åQ‹\àa>#õ\ïóS¯¥\"ð{}+jô\ëWN‚ 3\ê\ÔP\Ýóª3€¬@fŒ\ã\Ý\ázÛ†MV\ã$LFÑŸ¥	.6’¤3†p\Ê\Ú\È\nrN9¯Sòx*U€½PmøI\âºv\Î{=³õ§\\ÚºM»¬º	\Ò]F20qYýM\Òo‹šjš\Üù²I‡¿\éJ\Û\êB†¶\Ð99\íKX“nöE\Ä–Ù€&$ÿ\0~6ôþ»\Ò\Å^\ë\Û\nú\Õw33½9yZõ\åKºm¨`³žLIõ¡•@m.QIb5\Üm2‰ m\Üý¨\ÙXh°¸½1·p\Ù[W-©uV\r/921 ö1\Í\'¦·qm²©\Ò@i\r¤Hg\Üb­hIpƒJ°\r¾~^øùQŒ!.2ø¤	S\ÂO\ßnxçƒ¡“§ƒ)Ø¼¢P¦A	\0|ÁŸ§=\éÞš\âZ»e\ì²J«qX$‚$\à\í÷ó]\àz“¨\"Ú‚C–2$Nb&*Œl\é\Ò4ƒ©F\ãp§ô‘÷\Î3V\Ê÷µ@-xzC¬\0±*ÙŒN\çœzS½5\Û\ÌK¸3k%‹(‘$A\Üø®\ë:d´·VÕ \0EòW\Ì} ñž\Ô/\æ.¡[Kp•d\0­µ91Û“\'\çµkt6?w¥\0ÿ\00\Ô\Ò\Ä%F\0™Âý}\ê©¸:?5¥[\ãy\ÕT¹\Ú\'ÛŠZ\ï[q­ƒvo5ð;¸mK\Ä\îAòÓ½/ˆ)\Ô\Ê\ë\ã\èb¬ˆ…ÁG4ž[5S\ã[\ê\Þ¼R\Ï\06ƒ´\áG=ù&rØ½\Ö¸…u¸\ÒZf\æ®ur¯½+Ô»^ñ-žB\Þ(` d\É91¶\Ùÿ\0%²<Koeš\Ûx-I9Û‰§š¬ƒ\à;–\Ð<Þ½\ä·*®‚8$\ï\ì\Ã1P\å\Üÿ\0/u\Ó>`\ä\Ä\0{c\0\íš\'SÓµ·½a.-\â˜8\0Á\Üg?m¨@Ü³~\Ó\ÚÔšp¬DÌˆùü©\â\Ó\Ð\Z:ý›v§¾P¸„uò’\Òz	ß¸š¥²\Ê.“qYQ€\Ôønx\Þ?\Õ‰¨ž¡®b\é¶0º¦&p9\Ø\í´R-j:‚—Q‚¨>S 9ùSFÃ†‡\ì²\ÂPÌ‰Ú^ kv\Ð4’O”bk#¦¾¢rL\éOô\ÝS’m°°HŒ\ïÞ¨\Òy9\Úkº^WµnE\Ãp\ìN\ÄsûSo„·pºpauLq‘Ç¥dZv\rd5½*Ýš5Š\Ñ\éX]Aj\à:\Ú²N\Ãn\Ùÿ\0U\Ï%AA\Ü=µEU\n¤\æ\0H$ü\ÎûÑ­¢_tb\Ú8c„©|\ê†!“\ÌH\Ä}*\ä=›¶ˆpÀ˜q2@\ãÞ¤ÿ\0ö±»m!:. œ¿\æi‡U-©I\ÄÁú\ÒD\\(.\Ùlj ÞÓ±\Ë\0ª 	J„£\éh\É\è6½c\áˆ\ß4!l› j\n	Á;\n+Z,\Ûi\'œP\Ô\ê0DzRþŠ_Ð¶\Øþ„\Õ\ï-«3Xt	UM-¢D\r<\ÔŠN™\ÏjYU*<\Çñ_\áÇ¥\Ô\ÖY…³ r+ u÷º[ªº‹\0|\Ñ¯ww£^¡;Ey/\ã_\ÃVÆ£iHa\Æ\à\×w2®²#\ÉGú©:”Œp\rwñNÇ².[D¬\í\íX¿Án›l\'ŽGjôA­]b \ÈØŽÆ´\ã\Õ\ÚÐŠOL\ÌþüA`\Û\êX£ $IŸ_JÔ¶pÓ°e¥z®ƒ\Æ\'À>\í8<8Þ•\èzŽ«¦\ê\Z\ÅÔ„P ·Ö•¤\Óhj·ƒeƒ;Z*ê®­3¤\ãz·E\ÖxŒC\ê,§\Í\Çüù\ÐZ\ê„‹\rlwšÊ¿\ÔpÜµ©H –L\È\Æô«I\çÕž­­[u^g7ü\Å/t²´¤IRI˜ú{VwOü[E»6›O†Àù™²¹ÀüŽ(\×úôUR¬\Ìùw\ã’eŸ\"j\ÆØé¢r[—›.M\ÖÕ¨–V\'$\âG\Ôý+‡ñ[Vm29\Ò_\ÌAÈœ®~Ô³u\Ý5nµ\à(\0Áx\Çz1‹ø+’ð\"„\r\äƒ+\Z`-Anž\Ýÿ\0	Ë‘\ZCÀö\æŠ\×R€\ë,1Œ\â;TÂ$J´Ê‘ûš{k\"PƒB¦I,d(\î2*—\Z\\³k`C	ˆ8úQYuZ(ù\ï\Îk–Ö»FXÚ¢\í.*©­²tôÜ´Ö‰T\à!J¶gc\Û\Ò=6¡\Ü\rs§Ru›jJE±ƒ\åm³œS7RÝ»mh [„\é\ÖNñ½iFgðÁ´\0tÁel‘\'&y\ØcEdkK@-%« ]g¸³«\á\ï¤\ç#¾õD\ZR\è½g&\Ø*¤‘žw#\í4Ë­\ÇYYƒC\Äy£c›U–ý¿\å\Ö×…¨j\Ô\Ì\×	:Gö\Çÿ\0Š£b¡)Ô‚¥°÷	‚	\0`™#n\ç@GZ	º\ê.$x²|Øœ÷J2ø}9(ö\î:³d\Z†\äL|¹\ß\ë\×<lÎl\Å\'ú}\"$ˆŒï¿¥jOÁ”\Þrg“ª\é.X¼\Í&Û°¦\0\'\â\Üyˆ\íµ ½3\\º]K-°\àÀœžp1\îv¬êŒ„uZ?Óº‡L7¯=¹\êxuÌ¬º¥ö\Ô\'}†4XóZÈ¿OÓ§TR\Ãßµ­\î\Ö\ìÀ\0`y‰Àù}\è 8¼Ê—[]£*\ÅÀ$ûÀŸQ·,\ßþ¶»¢\àw\È6\È\'1¹;oJÙ¶Šž[*\Ì\ä€y\"6ý\Îv¤ªY/\Ý=dñ-9€)Uiy;\0sˆ‰ž\æ\Ë\Ó\ÜrM²Î¨¹kk© fpxOnj\ÈY:¤\Òux\Ä1\nLO1\Ì—Ê‰sª¹mM\ë¶l\Þm©!ƒOyŒ—\Õ_d>n\édve%!P`I;v‚@ô;Á¥[x+\"K[fŸ\"´ÁŸiù\Ñn\Ù†ø¸HÁ\0öý	ò¥·uAðÎ¦…-«g‘\'Œco]\ée\Ze]®…“T±`\ï\ß<\Ç\Û\çV7m2\é·#K |þt¶\ÙQn´¶3¿\è~ô%¸\"¨ \êÜœ|«w¡º¦°8·™£I1´\ã¢¿R\äbñH1#}…*·\Ö\ãx’k\Â\ç\Ø\ã|z\ÔavZ\è\'y÷÷§SñŽS*\Äü»\ÐÀ ,º‚œ©Àa\Û\áX€À‘Û½_^¸2ŽûS\Ú{«Y	u\Ûë²¬šB’ue^‘ó–G¸.0!™˜ùaÏ·4\Â˜#|oQxŸ-—fEb\Ê\'°*r‹ðx\Ë\Æ]z»o\å¸Ÿ\îš°@ Á;¨ƒš\Ì)rñU]8\Zq\ëV\éïº°¶dÉ€9ž)£/’\âµýMþ›¨:OO¢Ï˜— 4z{\Ï\Û\æ\Ò\Ýk²`\àH0¼\â³l9·r\Ý\áÀ\r*\ÔýÛ‚\é,Pª»0¦N¦\ßJNFÅ«ž*;Î¦eÈý¸ŽÆª\×¢\Ë\ä€ZdG\çÖ•B\ÖÎ»Xtø‰]³ñU-_\ÙZH~¤‘;mY¡)Ž\r!Pœ\É37Š¥\Ëj\ÖðD¿5_]K‚t±\Ä\îk­\ÜD$™\ÎûoXmhiƒ(H	3ôþ”ñ¹:W\â\0\äûP_K|J!†H÷¬ö<d$\è[N=*º€\ï?¸OÊ˜dArj\Ä%¼ð\Ç´Z2ms¥&¼P™\01<\î9§ `‡\â]ôü\â¨ö|4Wb£P1MÔ…b$­U€Ó•£›FbfªPFtJ\Í¤K18;G½UÀ,\Ú…\Üd\Å  \æ\ã½K[M#Ndžß“ICöD$4¶‘÷ž*AŒ»Ñ’\Ã\Ý ª“ŽümU*lq\Åjkj¡´\æ)Ÿ	\ØšZ7\ëC6°I;qZŒ¤Š£`$O;\n•R\ØWfcý¿µ©ßµN`Ÿ]¦”`þ%«E•>\nÁ\0\Æðdz\Æ\Ô2£\Ä>Œ\í9ý*\r\Èbaf4À\Ú\'Þ¡diCý)LUô\ÌçŠ¤•l0 rµf8ˆ\ïThBÞ£šA\Ñg\"Z=\æ¦\ÅÆ·u.+²hmA”AÁ\à\â¥²°ŒsQ4t\Ës\ÆMl\ÄiƒñO¯Ê‹ø{¿XºC\Û%”H¶\Ä\ÒýAº\ì\íw\ÃÐ¤˜F\ZTü±ô\çn\Ô\â2^	mI¶U‰$’\é.§úC%¸t\Çÿ\0`ï¿¿Ö»\ÖY\àªk¯¹p•WV3¿xª=j\Ðtp\á‰Ö…Xi\ã}¤Ð´32”`òˆ\"µ?–¼lµ«\áõ\\U\ÐÁdpdw\Ï\ê(<G^©<$.—^T@’rx\Ü\Ð\\«©t•\r†\ns38\n½þm[V7\Ôø€’ !\äùUÓ§coù«Cú/sGŠÀ0Sœ\ÛzÖƒFeð©	©Ž\'h£\Ø+\ã½ÁsL}&¥\Õ5+_¸jJ‘o\Æ{bAÁ#ŸJ¦œÌ†P¶S0Oü¦»\Ã(ôMô\í\Ü\ÒÀJ¯÷Ú„vÚ ¡6G\Ó;ó÷§üIù‹j¶°%-\ÄFIŽ1 \Äm\ï(3\0d8Àºªf3µ¿²†\rÎ¡ŸP\éÍ•¾Ò¥N•œŽñ~TGeðJ?TÄ§™Ai3…ß¸\0FxªøD›A\ì¹[‚W@$ð7\ÇÚ»G‰r\Ñk\r¥Ž°Êº”8˜\Ül0=‹Ÿ\æW§·\Óm®\Èv!I3\Þvö\Ô{\Ñ\á\r««q\ì[\Z­Á\Îg°˜3ò\Å@\ë:†¶ö¼3iN”ƒ\àD“\Ì|»Õ–\Ût]5\ä\êSm\àÀVÓª6\ÄdNfs¿¡û}-®óªõ6\ÈP©œ2ù„€v\Ó…-Ó‹\Æ\ë*«[+J€¬<ffL÷I¡Ž«§KÙ¸¶\Ì:œ†\Øss¾Nõ{B\åÛ¶™ª\êÍ¥Ó¼\Ädoš\éŒð3z\Ée\Ö.øI¨;0¶Aq«r9 “újªÛ‘ü\ÈTmqlùt\ÓÁøF\Ü\Ñ:]o|½\ç·\åÒºZ\æðF\àdƒc½\í\îœ\Û\ZU`U‰\nó¼“òÛµ\n¬y3\Ôq[\Ëq	%£P#¶þ˜ù\Õ\îôöš\È{~QWA,\Æbca‘\éˆ\ß5F7Z]\ïƒ*Yˆ;mõ\âª:‚lx!”–’úŠ“d\æwÇµW §\à+g\â*«!rI\Û##Öm\ÛR	$DECZ-sÀ\éQ®ˆ’¥eŽ\'J\Z¶˜”\Ô%dD#õ{Šu J6[.O™HÒ¦d“\Ï\ç¥7ný\Ëi\â‚NA\Ö•™Ç¿ø¬»7È’T€GsN\Û\"\í\Ô[`x\ZA\ç\åó¦i5g$­:4­õhÀi,LgUjX(öÍ·\Z_Fõ\ç,õ-\Ó\rŠ¬\ï}ý«IoøaŠ\Ä1\Ä6¨\Í8^Š\'[5”ž•\ãJ-¢<ÙŒŽOsoB1mÀ\Ä\r\Í\Å\ï\æ@HÉ)3LX¹\áùœI€?O½r\É4YSýÔ¼\ÛR6;¨\íŠdYVú¬R)+\Ï\ák{BU»\æ=ªlu¬¦> v\0~\Õ7Õ¡\Ô\Òt\Æ0G\æ)k¶\à†\Ì=*÷\Ü/õ>†¦\Ýåº§:\Æ\Â\r*Md¥§€o\Ô\\	L5eõº©K6\ä\ïZ=R\èH\Í/ÓG\Ì3Þž4•‹&Û£5¿…‹L—QDˆwõ¤^õÎ–û\\¶\ÒóÈ¯]nÅ¤²\Â>D\ïX}Oðàºž%=½*œ\\\Ôò4ø“C\Ö.\Út¶Ám ˜\ÌM+üZÝŽ¢\Ùb\Ën\í¥Ñ—\ç\çX\í\Ö/J¬Rt*\æ\Ø\Ücµ	:\ÑÔº\Ý\ÔYHò\É\ØU†Ÿd\É>F•P»º\×§Š‡\á4Ý«\Ö\ÙS¥Ntp³¼}©é“©ó\Ù:n \ØÖ‘\éz“j\ç‡qJ°\ÓTÆˆ\Év\Ê6ÿ\0—¹`øEH»‚¤‚=ø5K£I.§Ul\ÞRgV¦\Ô\â[\ÈB\ÅT NÀ’~Q57hZ±d2;jV m\Ç\ä\Ñ/\\J¥¥þ™P]&Lo‘\Îþ\Õ‚k¥ŒÁ\çc?j‹—K»’·û`\r¢6\Æ\Ô*\Øn\ïN,‰klX\ê€\0z§Þ›R87<\ÃHd\ïÛ¶+#¤êŸ¡¾nÚº¬«:|E\ß\Ò+HõVo\ß\Ùÿ\0–Ð¦5I\×\è}wúTfþBQÿ\0úX]Pk\Åh-¤œw“A•N\Éu‘2&F>§> RY™\Ãuòœzv¢•w€÷\Z!0qK¡Œ\î¢óP\ïo\É¸ˆœc÷®B‹d­\Ëa•\×c¹\É\çŒþ•\Í\Ó\Èkd\ìp¤y·\ÍHUZ\í»d@\n¡\Èc\Ú$š¶*‰{`/\Í\ãl[\n‹t®óÞ‰~Ï—ú€.”š£bDöm¸\'\íƒB\Ø\Ð`±>a+ƒ\Ïz†BX\Øm¸P\n“œg\æi“¿Ñž\äV\åŸ#8ñø%d÷1ûU‘l:-÷]N%ˆº\Í\çÀ¶\"¥\ÔØ¹†ó¡ ²´\í\éE[š‘K\"ºŒ\ì„i\n1\Ø\Æqö[teIƒðQ,x£+tŸ*gI*A÷}gz\ÏK\Çg¶C²m¹m¦w\Æ`IúS\×Ý®3\r.\Í\Zu#˜\Æÿ\0\â…vÞM\æP\Ä\è\ÕðÈ™“\ß\ç\ÛÒ™<d\r\ç}\ëg\Â3\á\01¤	#xp>\"coRR\ã2ÿ\01pYy\'\0L@\Øý¦Ô­«CI¸\× @\Òmý£>ô±)l¶µýÓŒžGqƒLÕý»`l¨‡ ƒ¶\çsó¡|Ù¸CY{’T™\n1À29÷¦B#¹0º”j\ÔIX¿j‹\Ömõ(º€2†Up\00\ß\ì\"JId\é„ñ‘;\êZ\í´eX9T2ª\æj¦6JÛ»m\r\ÛP\à-\Å`\à€D‰ƒ\ì3šbøK}+[vWpÄ£¡S@÷Œ¨¥®xvš\à¼\Ì\Ä\áYF\äÁ\'¶\Õ&“\Ét\ÝP+\ÞûtK†#\Z€Ú…yQÔ¥›:Q\Û‚‰÷&3¿v¢\ÞWÓ’m…Z\Ø$\ß>ñôªô×¤J‚¡µ6\íF\æqž\Õ~Xu·h¶§Y\à\nG\í\éQ\â“x†UR|º`ãš½\å>sqeFr~T%h²ö™Ó•3ö¤\ì\ÑD“	\ZS\\\é \àg³µ]/ø*\ÖÁaœf1É¥Kœm\åX™ßŸ\Þ+µ»4`±0$þôý\Í\Ðy–CQ•1Œöú\Å\Ù7!Fþ\âü\Í$/€jÐ¦\0À‰€\ÃðÔ¥ý*3$ðx«Fd¥\Çð\Ò^\ÞTj\Ö\ÓY\Ô\àN\Â¹\ÎÞž”¦Þ£\â.ˆ\í>µkw	\éÌ ;\0Žy\ßõ«RA\'±8\ÛþSÕ‘¶…ú{·zpU\Ã\"G\äV\ïC\ÔZ»n\Êx\ÖÕŒL“\ä™göš\É6Á@N\ÛÞjÂX1FU‰\ço¡?J1M	>²=¾•.;X.Š\\S\"\Æwõõæ½\Ó5\Â\ÚF\ïˆ{\nKÖ›8%•‹K4G\Ôóò\Æ[\é.¨3ª–*adv‡\â™zsI8±;z¬9µq5€gKLG¶7©¹}•I,##zz\ê\ØÅ±#ŽÁ\ç9¤º”Sm‰\Ì`zG\×¿&M<1glÁlÀ1Èš„¾\"6Ú¤v¯ü\â+\Ì7\ï:¯ò¬\î-£#3¦9©l~¨ ¤—UR\Ðgy\Î\àf©qµª.•P¸\Ô\Äfgô 1¹d‚\ÊA\"D\êMÅ€÷g<¬2\rÛ´¶\î(\ê[m&ÉŽ\ß17(ô\×R\éþþ?½\Üpf I4KFZâ¿‚L9\ï\Íi zs¨&\Å\\ªø¤ ú=\è–P:;·	\Ð\Ç\'o¿ø¡°Ô\ÍÁ\éœÖ´ƒ6–Y›qÿ\0˜\Í£\ÕŒN\ãs5(¶Ê¶¶U L\îO¥\nC&À1,A\ÜÀ{Tª\Û\Ø`\ça¤þª\ï©IQ;Ž+œ\\uh\Zˆ’Y{c8ýk\rd\\ƒhJ‰i\"?\ÕPøbp]Á˜0CQ¬!)uXúlAâ¥œ¸ Lh\ß\ïJ\ÆH\ÕðŒq\í[¶ˆ ‚\äKvž\ãóK÷S\Â\n\çÎ¦ .»\â–f@\ZX†œ)\\EM²‘°M€}\ãW¶\ÎY¥|\Û.ÀzI¦-\Û}|ª‚\ê²\é\ä\à\ÏyüŽ\êzµ}\í:”tb¬¤A`ˆŽ™eSB\ÌA\0\0\ÚL?z³\Ød@I\ÙfŸÚ¹úvY2ƒ\Z†\ÓSl\rR\êÌ iƒõƒLo\àkhö•Lj\'5W@\ÊN&v&*Q\ÛH“¶\Ó\ÅR\é:\0Xƒ¸^‰«³\ÞZ»mn\é‚c \ìj·­\Úña™g\Ë\é5~¦\Ð¼\Òy÷]nÃ€\í,\à`8\Ø\r«µ5³\Âi\Ý›,;‚\Ùq9>µ7ºµ¶W¦Gcl¹ŠœwX­\è®\\´Ž\ÂuˆFþ\Ü8«\'ð\Ëwœ¬HÈŒLNqô\Í#œR¶UE·F=\ÄV¸ŒÚ¸\n±§\Ë\'÷œ\Ô5›kn\ÙE\Òt\êd<s÷\í[W?…X]W.]¸\ï§Ê®\Ò¦õ™s¢\î›zHO0ºt\É\æg\ëvMlji‰_/*®WJ¢\ã1À\Õô7*ˆY[Zˆ\ÍI\Îÿ\0õüše\í\Ýð€\ê\0\Ñ @\"{ŒoÏ¶jnÙ¿fùŽ¯ia\å‰ó\Û#Ò©ø5ú\ÅZýÆ¸n(\ÚiFmF”ƒ¿þ€\'\çA\ê]UI\nH i?ùï˜š;\"Kj±©I2\Ä\rYŽv\ã\ë&ƒ¤\ë-q\Ël\Ç\Ïi\Üöÿ\0U´Q0÷]\é­ô¿\Íj0t\Û*|œýóôöª\ÛgKJˆ.kG>h?@A¿4 Yz€‰ini9Œ\Îx\Ï5\ÙZ«\Ü\Èa\ç\Ü8\Ûa#\íE\Z¾‡\é\ÛÃ¼\×-\"wpƒ9Ÿž\Õ\ZÝ¡J·ˆ­¨7\Ã\Æþ\äs\ÅVÝµñ™Ag1£synŽÀ%I¸Erd‘\"¤~|«a_\Ò\ÝG‹Å\Üq:òDnO<Ð…—…[ždC, \âD\É1L5\Ózç„ Mµ yb\"N`I\ç~þ•_‹\Z]­©\ÃN±\Î\Ò8ó4É¿FO\èFt.[n¡\×\Î\êD»~D	>Ÿ:a¯\Ý+º±b¤/™†\Ò`\Äl8\ÇT¸—-ƒ\æe+mÀÜ™#8^~¼W^KA‰#Ä¹¡‹½¬€gû§\äO¥&\ØqTU\Ö\ÏRH´Ä…+\çeÓ¦°`n(wUÑ‚%å¾«©\Ö\\i\È`œ`\rû\nzý\ÅnŽ\×P§Re‡ƒ¦04\Ì,\È1M\Åg„\ÒN¤†t”\Ô1¾AZ\Ñvd\êE°E\Ùððà¾˜&\çÞ—wløK¥#Q2	&\Ìzý\æ¦\á\Ò\0¹¡Et\î#¶\Ñ\íþ+…²\àÅ·—\'@#p±§¯B´Y³ib\Þô\ÏMfO†\ÄdœGy¤\Ì+\ÈR\Æ\Z9\ÇúúÑ‹9¶‚\"F\'\0Žÿ\0oµ:d\çM˜xz\í-\Zt\æHˆ™\Ú0~\Ônšû½´¶HT^òÄ‘H[¿l»\Ü*ª\0ÿ\0\ã}Œ\Ð\îõ–\ÃiP¤\éÏ©­Dº½š\ßP–˜\0\Ì`NF˜\ÆFÿ\0ösø§L¶Kžn3‘úWŽ~¾\åÔµ\ã\\:B!Nß¯5nŸ¨\'ûOÿ\0]Xš“\âL=$‘\êmÿ\0½q–\Ò\ró‘0IŠÞ·¨VS¬°˜&¿j\ÆG/H<Ó?S¬5»\Æ#`G•¿/v\åôÕ·\×9M©dö\íúS6É²K«y\\í­d…kl\È{\Ó}%\Ãr\â\Û+Hª\0\çj” –‡Œ\ÛÙ­«\Å%g|‘\Åz|ƒÀ¥²lDyƒÈšÓ±n`ñ\Åp\ÍÖGŠ=¶!vM\à€@Z5\Ëks¦\0‰\r½[©é™¯OÅ·4gP \àR6±E\Õ\æ\Ï\rükø\rÅºzŽ‘‚œ\ëñQYö:S›`\éa2µ\îºÎœÝ¶@:I\Ø\Æ\Õ\æúÿ\0\á>Ö½lN\ê6÷®\î[T\Î>dÌ¥v\æ½MnòbvŸC\éL]\é­]P-¿\'¼R}_ˆ÷•\íGˆ˜oþÃµ£\ë­\Ü\\0\ëW’d2©¡1\Ô-\Õ\è¸$.0)ûwˆ5€F¥\0™’x\'õ¡õ*uaX—G­g}Q¥¥Y†8š°Òš\Æ\ÏJ†Ù²\É*3\ËFgò\ÐÜ¢\é’\Ê\0ò•‚O<þ}«2\×ñ\æ®ü dÂ‘þ#Úµ-=›ö\í£\0SÍ¤™\ØÉƒŽEIÇ®Yšze\Ò3#\Ã ƒ>ž”¥²P±c\0\Ì}i—ˆ1˜Áž\"†-–<¨L\Üþ~”§-\ë\Ý5\ß+Ê¡chý\é\Û]gˆ„=\Ñg>X&·m\çµ,E¦Rµ‚wúvÞ—u{\0ˆ*H+÷¥qLe&h¥\Æ=\ËG©6\Èb\n€|\Ç#?Sò¨\Ö	`à½µøC“Iô÷n\ro¬¹\0+¸\Îy\Î+@\ÍÄ¼öÀÓ³¢˜Ó¶czV©Ž¢@:x¯úhÈ˜\ÏÈ¿Jƒq\Ã\Ô\Í\â\Ätð3¼ý8ª[mg\Åña”1\Îg\çj ³7C¹\0&\É\ØúS$€\ßÀ\ä­Ë£S—\íÂ±a\0O\Ð}MRõ\ËifÕµ\Òò²\àƒ\0ž\Ü\íz¿„€øjV\æ|¬ Á3ÿ\0w«\ÞD6m<2g[*>±ZÒ¤l¼™—Giam3Áñ\ÎJëŠŽŒ\æ\åÐ’lü¦võ¦.Z[wU™U\Óc’>¦”\êW_M¨ n\'\ãµ]4\Äi¢Ÿ\ÒvSu˜…o\r˜B	™\0\ï\Çý¤\Â;\Ü7ti FGý¢º»ÿ\0ò€1\å¤\éS1¾ÿ\0z©MD¨´\Ä	“ƒ\éþ+ \Ø+¨E¯7–D\É\Ï‘@\"\êZð´:å¢A}\Å;\ä\ÈQ¦hœO&”`\ÆÖ³p•˜€s<~zQ\Øñ˜¶¶Z\Ñ\Ó’\Ñ?òš¸†÷ð\Ãe/\"©r\íi®\á^\0˜ˆþª\ä­\Ë\'>#–- ƒåŒ’ ‘úPí—²ž*¶’\ÌD…ã‘¶\ÐsÞ‘\ÆÎ…6gøjm¸¹gQ$™SAývüš[\Â ¥\Ç&\é#\'\å\é\ÉúÖ£ô\ÇU\Ì\È7 \ã Š\0\Ä˜¡9±`…V\Ô#Q%$“˜ý¾U9AVÇ‘™Œ\Åd­4™:¹\íù\ëUW%	Ft\Ã\Ú1û\Ç\ÐS7SÁ6¯(,\äkþ \ß1pF?QB\Ò-\0\Èóyd\í\ï\ïûT%¡HU2`d\æâ¹šÊ¢‘lëˆò‘¬þwg¨F³x@@AY\Î3þ;b‡}\ëŒö¡®\ã‰Û‚bv÷È©KEb\íŠ3–\0\Ø@ô\Í¼¦\ÈD·¹…·\ábä²ƒ\0N\Ô2\Z\à7 \Ä·jT\Úcºam±$\çžw§U†.\é\Z~üû\Òm¦Þ—\ÅS¸\ØNG¥v½0\ÅH˜ “¿á®ˆrQ\Â\ÍkM5³°\Õ6¦\í·‰n\Z\à ‰Ú²V\ã\nHsl±\ÒÙ‰ qÈ¦­õ\Ù\Ã¹¸fy®˜\É3Ž|ln\å’\Å\Õt•ò\ä}~T_\0¥¡¡Áo)\Ô\ZrF\Ã#\ç\íAµq­‰[ª½\äm\ìOÖŒ·\Ý\áõ™KA3oö§iº)wªº‰ T)($\é\\\äú™ü€){\Ä\Ä\ÓzTL=;\Õ\Ø²¹Ü¹ý¶¥: \×\\\Ýfgv2X\îI¤•­\Æ[4Vú„e…\Z\ÄKœ~Ÿö™ñm%”}@»Î «¤(\Ú=I€~}\Î0d\ÛmjÏ¬TÀ¾PP“‰\ZX¬múÐ¿¦—\ÃS©\ïô\Æ-\"±e\Z§\'}½?À¬»\Öt¤‚1lóN/]\Ó\\kv2ó6¸\ß\ÐQe. \'H\r9$\rû}l1Wha™Š.)\ÒDO1š\â^\Ðd)¤\äf??Zu-Y¸\Ñq\Øt\ï\Ý\è7zv…w¸\Ì\Ø_6H\0\0>\Ô\ZvQM=FPe‰T$m@\çµOó œ\Ã(\Ùv\Ä\Í\r­y¶\Ä\íU{l®U\×A\\@\ã½+±\ê,¿Šu— ±\æj\Ú\î.@gŽvüš*€uA\Ú*\Ïn\Z\ÆF\ïš\ÌÔ¬+u(\×Yƒeü\Í3˜õ\ÌUSÿ\0É¹¥\î`˜*¸ž(,°\ÞP\0d¨,XS´`@\Ø	\Ç4®üE~ 5\Ími	-ªBùI\äcŽcÖ‡~\Ã%\Â	X$A‚\'÷¨›‹m‘´•\åR¯u“L’@Œ,\ÆÝ¶R$\ì|`A‚²Ç–9#ýU×¥7„‡ˆ(Èˆ’\'¼qû\ÑPZ–X\ço\Ì\Ñ\íôý>¤ax[Ò \áL±°I\ãj. \ì\ÈJ»’\à†\Z´\É\'x\Ï\Ë5v\éOŒ °[Œº\æ\ç;9\Éõ\ïFDg[‹qSúk?S\í<™>§•[‘q@l´\04‘\è·­\Z&\æÀ*±\\³4ž>õu´¯qM\Ópœ‡ ƒ1\ë\é\Æó\ïL½«)Ò›5 Î¬f\ÛF\Ç\ÒD\àm\Ìâ’»\ÔbK2ùq\Ì\íþ÷ \Ú[ti´¥n(\'Ï¹\ãþT&¢\È\ÑUq$3ò\çµu\Ô\ç\Ô\Ä\ÆOø¨\Ç\á\Ì\í\Ò\Ó)x>—\Õôþ]av\ß4ñ\Â]zU~ˆ\ÒfN7­\å\Ú\á!H™Cü7kl<8Áh\Ïùª®T¶yK½\nØ°<]AA$ýi²–\í\Ú\Õl\ra·\î(wlß·wK¦œ8\ZcSµm8x\Ó³@ŠœŸ¶Z1¯\\rn­\å•:w^¥guO\Ñõ7^Ò¹«\0\Ï8­G¶¬ \ê†À“¨“Y\ÝWðõ7|v\rró[WTó·§8õ¦\ãqºfœ]X\èš\í¼@p@™Œ?J[\ê,+µÀT9ÔŒƒNy\Ï\ÐüøšôVº\"­ ¤™\n¢\'aLU´	,¼¨+ }\'ôÏ–‰ÇˆñHa*¯u™Aù8û\n^ñ7MÇ½mž\í\Å¦\Ùò ×¨\ê:qÍ§µl\ÝÊ\Ügû±“¾\Ý+\Õÿ\0\é\ì\Ùth\Ô[\ìG|}ª\êhL¦y¯\rˆ¸ˆÿ\0w#\íô¨|ñu‘\'\È\ÚÄ·\Ç\æ\Û\Ó]Mƒló–¹\"1ƒ#\ç@·£§¶\Íufæ¢Ž‚Löÿ\0#÷§\ÙH»\Ñ]K7´xE¯–\ZnHp»\ì˜öŠ„¹|;%¤G:Jo\ìr=@¥õ\Ú[*\ãR2´IÀa½„Ï¸¢(\Óm˜´1t\Ü\Õ(\0ƒ8Ž\àQ\ën\Ìð^\ÕÖ³t\Ý6et|\' \äŸ]\äsö\ç{mÃ‡¶·\r@zˆõ÷¢£-›€‹¯ldZ\ÆA0\Î\ãj”\ß^ª\ê&–#+4ð>\àcÒµdªÈ¶\â\Ü6A,°%§3\ÅKX@&ô›…eK	\0zú\í\íA«h½¢..­:€Ì‰þôBGNRY$HL‚1·¶ôÁ¦²‚%›\×Sp»*¯„.1\Þ@P\Û|±V)e\Ô^¿º{¥m‹Œ¤°\0\rL36\"{P\í_[¨‰w¤…B¾•\ì@œ	@\Ï3\êj\Ïr\ßOÓµ‡\éŒü.¡ü¬\Òa¨#\ÓÖ•§¡“ú\ná·©XiC\àƒœÏ¶sU\à•I¶EõÙŒ\è\Î3\âª-½¢mµ%2$F\Ø2O8À\ïô©¼\Å/\Úvñ-gQ•=À\àÈšd¼,›‹x\Æ\ÈkŠžf`°4‚1£š’Ì—YF„\Ôœ\í\ï½¦¸÷\ZU¼5·‘\n<\Çp\Ò1\Ïz[¨¼¥\í«§ô\Z­\Û0XLž7\Ï3A6¬t“tQ\ï³i‡\0L%d\íŸiù\Õ\íÞ”\0\"\"&7¤Àp:\Zt7¢)\Ô\0\\°;U\"Ç”gV\áäœ„MB°$\\/’I\"3]cC\\>)u“§\éW\0[0\ÃQeL\'\æ=k4#\Æº{\Ä\àž)Ô¸4.’v?^+RÙ¾UºYtœzI§­\ÞHa\0\ÄM›—Ž²ž“¬[¡-\\Ivvž+j\ÏI\à¤0 ?™¬¯\á6‚ÙšÝ·-o\ÎHˆÚ·º{£\Ãœ\çÿ\0\Ì\×/+\Î\ÇaúR\ÐK°ô­;6M±3*Oj\ÍPm;žm[úÓ–/Að\É~?j\àä·£¿Ž–\Çô¤fóÚ¾2‚NôÈº•³;MCÊ·#Tc†^TÐª\é¸tÌžý\é~«¡•Á£:²>¥\Üf¥úƒ|\0wUU¬¢.ž\å‰ÿ\0W\"\í¬0“\ë\Í\ß\éOLúÀ\Óÿ\0¢7ô+¶dvô\â²úÿ\0\á¢\à˜p\Û\Ç\Í\ã9e\nv9\Ó]P£\ÄiÇ”ƒ]\Öt‰\Ö\ØT2ûÒi=øŽ3ƒzS7X¾¶\Ï\íœ\Íul\çqqþ\È\Ëön0»“Z1Úµz½—ªU{\ïm4“©D™q\íV\êz{}E’a·x¬\ë5Þ\r\æD™Û½,¾2ªK‘[\Ù\èÓªºv.\ÐdG#ýP‹!l@ö\ïY6¿ˆ]6‚\ZdÈ…ÿ\0ªöºñó25%Zf\ÍÅˆ}0w‚\"ô&ºƒ¥)¤´™þ}?z¯O{ù‹\r\0 -3–Ç­p,\ß	iŸÏ-x(4”¼¬\êYO—H\ß4Tk–®«Ù½\æ0™\Ý{~\n%µ[\Æ`³<\ãüg\åC\éÏ…t<0‚|\Ê\ÚO§·žL\Ú\ê’\í¥E\"ÁP&œc\äðÆƒñŸ†3sY7®8\é\r«m«Ä¸.2h‰ŒÏ©ª÷\íp‚@@UN8\ß\åC¥\äe?¦‹[¶²Û´d~s½¯Z‹\"HÒŠ¤À9Ø˜ÿ\0u•\Óÿ\0µzî»š\ã`À\ì)»F\íõ, \ê*G \ÍgXm¬\"nª.\"\È\"\Ìgùº\Z\Ò\ê}84\â;ú\Õn=\Ûn |&s&¢\àkˆ	2\ÄbL\Ï&i\Ö	»=0mE °\ØN\0\×>›Ÿ\n›z²D#ÚŒ¤[¸m½½JG\Â\äýJî£§¸iPE\ÂJª¼&\"8ªXƒ˜³³r\Ò¬A‘ôš\rûV×¤R» “$6ý‡‘¢8òfe‚½¹\Üþ\Ô\'’<7¸4€œÂ’\ã\ä\'Ú‡¥\"ð-q\nÛ‘¤†ŒŒÇ¥µËŠSI€\ÔSU“I+&\rQZT\0>` zŠ%#,\ÉdùIC¹8ÿ\0Ÿz—·\á\Ü-v\ê8 …‘Lz}¨¶\ïøWuipý a?~ÿ\0‘Tð\ãY¶€º€$$\Ç\Ïx\ïôÀc¦,l»_m[\Z\Ä\Z¦c¾”/ºu.U!e\ÐD“‚$cns\éNŸSª\0A\æð8õ¨aoYk©ið\ÇK‹f&31>\ÃÒ§(&V”d=«€\Ã\È€\È\0\îÖ„\ÅT¬&\à‚I_lV‹ 7]\Ãtƒ=\È\í\ë\Í.ö‘\íA“rI$ó1¥F\\xÁ\ÕKØ“Y\nšõ\ÈS\0o«­‡6®–¹iZ\Ì(VbI™8\â‰r\Êÿ\0/\ãœ>(\Þg\ëŠ–S‰„€™;\Ç\È\×<£GBv«B\Ï\Äd{c\ÍK`Šƒ<ƒ\Þvõž´,1óIc\éRA}ÁOzK)C6\Í\Ë:É¶0H\Òq§¬‘Š*õ)j\ëø#ZU.€¹@?3ži@\Ú\Ãjc\áÈœü]¾{\æ®\Éqt>^\Ù_,\0I\Ç\Öj±›BJ)š=-ò—€¦M<½^¤Ü\ÆXF$\ì\'\ëX„¡‰4ü÷jcÇ—\Ò÷503¨‰\r\çš\êŒÕœ“â¼šaZ\æ W·Œr(w-Z\í¨±|C9™1\ë\é@N´C\Èž}h\ÒHPdo3W“Ÿ«ˆ š’\0 ŸN(Mj5(\0\íŸñM@!p\ÂpHôª6 I\ìOj\r¤\Ê_f¿q\Â![j¤ªüEG¿\à\ÍÛ¿‰ùÓ–m5\Ç“¼Á¸ µ³’HõšZIh(ê¯²”,¬¶\×SP#ƒûQ.õ~\åË—aYž^6i2—B\ÄHŸ•U\í”:\\t€\";\Òi‡¬Xõ†µr\êø\Î;Äƒµs\ÚBšunH‰š\Ï#\á[dÌœw?Ÿ½X\Ür¨I\Ìyb	l_\ãøÃ…ð\ÙYL0\Î\Û¢\Ûð\íÜˆX?\ß;o\Ç\Ï\íK¥ð\n ˜\Øbrw\ãðU\î\\¶/\Ü\à@X¨™18÷\Ç5§ ÷-\ÙG6\Õ\î]¶ ©uŒnp	‰ô;Pž×‡ [tióaO—1€\ÕøE7\à`™\Äþõa\Õ(–`B‘‘\ã)ûöP¥Á1\'PŽ=Ï¯Ò¹þ¤‘0DmŒ|¢©ü\Ê+k\Ã\Ïž;Tõxt[\Ë(\Ò<¬H\ß\'Ÿ~Â†”˜EP\ä€…iÊ‰\ÒG¿¾\ÕW*Id‡Kÿ\07\n\ÚdÈ™i\è‰\Õ\Ü%–¶v,N};ÿ\0šÊƒ\ÒCV’Ç–_só\çµ\í\ëÊ”cu$À8#|zWV&\ï£TŸ4;\ÕC…Q\æ\ê\"v‰\çŠW/Œ¡Už\ïKw¨K–\í~P®\çQ€\ØóCiTx¹XŽù\ÜýhN •6gQ\Üüé¶·jð75\Ýg@4«I\0g“\Û\0wô©¤Û²¸HQl8º¡\Ä3	\0\ã£`OJöŠ0\Ò4œ Fw=\Ä\àw«t3\Ø\æ/t\Þ-´!\\80\"$}Þñ1>ôŠD\éŒ\äûqÏ¥?¤\å$ð}Qz&,\0\0@¦Ni‰#|S\n’7š Ml3±‰®6\Ç\\iWºi¸wòŒÀšRó@B(Àf¶®Û”\Ôœù¬\ÛöŸX)\'FD½j°Ÿ\ÒSÀ\Å\á§@•HÁô \\Wg\á˜|\Îxª-²·N¶3\åNª±$€O×žj\Íu\ÑÜ„ô¸º  \ÆszjÎ–´u¬ðÀ\æ‚	·¨®¬D€?\ÅY\Å\Â.\É&Fcó_ö]•\êm­»W¶@i\'|HöŸ­\"¨\×ú—o‡\Æ\Û)˜\Ûó5²\î(c=Ž~†—\ê:{«\ç\Ò\Í\0ÀÕ¿ûýh\Æu†	Bò`ÿ\0\é\n*« º7Qœöâ°º\Åñ-\Ét± q·¼\Ï\ì+\×T»üÀ*ÁT‚’WWy˜‰r\Â\Ý\ê’ã°´Iò±9¦i\0zWG¾“xª1Í¦½`³›\×B\n”õ½=*—•šü\Ü\'|A˜˜\ß\"3GK–\Ò\àW•B\à<\0qÇ—ƒ\é\Í^ú’\Þ9º¼¶€šCgŒ‰8\çÑ ¦\Å.\\»r\ã5´€«\ZŽ•\Ú2p?\ÍV\ÐKl ù”\äÁ##¾)€H´\åÂ”Ì¡ô\É\Ì}3õùR·®8%UZ6\ç\ä(\äuM{K\Ôõ–Óµ´e·m<»\Ä\Ç\ë½	¬•a¦aŒ\0DN0\Ù\à\ç\éC\n\ä’´[\'Ì°a·úQ\Ö\Õ\Ï=\ÆQ 3O\Î=\è\åzm Öº®º,¦4\ëe$œFòH\É¶\çµ1y\Ù;¥–]E…\Å>w$\Ôò6\ãžiAy ‹mr\\À˜ûýi»kÓ¸ñ|2\\‰ek†¶\Ûƒ\éHð\Ñ7õ¿f÷IjÐ¸\È\ÊD\"\à˜9“ÛŽ*\á|+Ksù\îœh–ýÇ±š»—sp°Sq\æU­\ê\0–É“Û¾x¡:Z\ÒPXu1$\Æ9\r6Áx\È\'·aU.©ñ\í¬jð\ÞF\ÄL\âgaó¥Y\Þ\áð¡a±.Q–0y\ÛôóZ{I*\r©hbI‰ù5™\Ö[þ±7	7òI&LžhW…¡%&\r­\é+¤NA|+?œQ<fuF¸Q…¨\Z8\0“R¯jó\Û\Ö\ÆÆC¸\0\æL\Çp?\"¡J\Üó]\Þ§ó<[Ò·ôªI(7lS–\Ü\\·n\Ý\×Y Á3·\Ëý\Ò7e@gƒÀ«\ÙoR°Z\0Ú©b\Ê6¬cÁ ùn.dN7¦:n™K {\çS<›ed•\à\Ï\'\'€¥¬º¹\â[fb$i1Ï´W+²\ÛRVDÈŽIˆŸ\Îô\Z²y¦qÒ½®œFb¬<¦@81\í\Å;n\Ú\Ü\"\ä’è²±ú•x›?Æ¯¥¸º$®\ï\Ú7ÚŸ\é¿þEx¬vÀ5\Îø¤ôMÿ\0Wuƒ\ØÚ½üÊ„F\'z•b„«iœ\Ça^>\çñn¬1»mØ’A0\0­D\ë/õýO$’\Ó¥.¿B.l~M^§ø º¢Í·\âÎ¨\ãó5d{t\\“\ç­\êV\ËA\Ç¥Ó¹¹l¸o€Àÿ\0	q(¬<®R¶i­ûˆJ³I\ÈßŠå¸³;Z³\â(š\ç\Õ\"r@Pê‹©:V[ŠGz\ØðÁ\0\r·¥¸Vq>^f\"˜\éúx€üR¸µ¡\ÔÔ¶y\ïÿ\0ÿ\0\n=Zx«\nËx>õ\åOK}m_]-ý¦¾\Ôtá”˜x¯?ü[ø5Ž¾\ÃZ¸‡LH#q\í]<\\¸¡i\çGŸ·\Ôh*®ev\r?ž”Á°.J¡\Õi\Ç\'aHõ\r\ï\á\ì-Ü—@0Çš½ž®\í‹l 9XÔ”=@/ô\ïa—G\ÛI\ËÜ¹­z\â¶òÞ€$\Î\àÒ—º&´\Þ-¦kz\r§µ¨§\'’\Ù{¯ E\Ô@ø‡c\ëö­{L ( ÀŒ¬\Åy\îžü0·p”\ÎIâ³\Õ\Ü*m¥\ÆLj<O\ÔýjmX%›¦\Ð	$ \ÍQT›‹h)%\Ì\07“ŠW¦\êI\éÅ²\à‰’ |©‹lŒ¡„i\á\'zZ~’l+ 0\Ä\É ˆÓŸ•!z\Ò\ÜE£}L¦	‘´ü¾ôýÆ´QR\Ú\ã%‰9ö¥oô«Ô˜U!AÀ\çÒ„_\Ó{ƒ<\ØtÓ€§bO5[W^\Ù+4\ï€5´–\0I31C¸—\ÐÀ:bû\Õ/\á»^\ÆªW_4#É«\'…u`“•>¿z\Ï\ÒöÏ‰lT\È;E^\ßTm¤’C\ä\Ðk\á‘{ö\ØA\\’\r]™j‚¤b¦\ïRN‘%†qAñ4(fYó\Éü4\ÆIŒxi©™Ô™0ü$OõU¹j\í²M½r¬N\"~U_\Zå¾iB\ä\Ì\ï\ëò\"–R\×‰ƒsô¬²:L»\Þwb\×¸\Îd–É®PBÛOšdóV}J\ìÁ\ß\ÄÝ‹%¹­sM–rp\È#\Ø\Ó*1Kƒ\ÃP\è\Ñ\æ1\åòÞ†Z@Û¹\è\Ý.§uUuF]œ¶§¼Õ–\æW\Î[\n’|\Ã_P#ô \ÆX8{\rq\Þ\ä\"®I÷\í½\ÂCmIaHIÞ˜k~:«™]D±1™s‘\ë\ïÚ‚·\Øo,—$‘\ç¾\Ôü3oúl6­µN>‘ø)fAªT=ˆ\çÚ´n™ô\é%@€A·¶(7-)‹v\ÉÓª¡¶`lvŸj²±‘ž-˜e(ü:‡®ß™ ^²¯o\ÅKl¬ŸüƒX+’b\àÏ¾b´Ó¦gBNBù²b`Ç¾qJ½½:©ÀžÞ›\Ç\çA3¦™32–Y`aŒƒ\ï\ìMZå³£\ÆF¶\Æ\ã0\Æ\â#:x~\Ôû\Ø[\î\ËbÚ:Ù³‚œzGµ\Ë\ZµdƒÉ™µBP:W\"\rh\Ø)\á\Í\ÂgQ18\0}~Cl\Ì1\Zv0d\è\Ú4\é6\É\ÕFŸ\ÐûGm\è]B2Œe—­#¾*MR*š²xh\n\\Av?‘\\¤/rcv¨RB#\'\î*«q\0`m\Î<¤\î?\Í&˜\Õcñ\Ô#\Ûcšb\ÅË…\\$•X,FÀwö˜ú\Òn	8> ó)\0Œ™dd6”)\Òòu\ã\Zq~?Õ£Í’oh\ÙK\ì\ác\Ê#\äSº-J\\@^~\ÕòR\Ç\àñZ©\Ô:\Û[l|K[\Ú>\Õ\Û\Ç5#ƒ›‰­-Žzk§TASƒE6_¨ã€„V1´ýªz{n\éu½\á`7ÿ\0Žô`A–ñ1o\Z£x=ÿ\06«$™\É)»3Y¸ˆP30¡	$\Çþ½;S·ú•:ZÒ°=›‘ù5eKW\ìºEÑ¤n\Ü\ê\ïÈ‚I\ÅxYNKfa\n¬PùÜŒ\Z¡\'L,¨^=c?ZkÁp\ÙL\É}´\Åw‚!WV¦\ÒY8Ÿ¬R5O%”Ð¢ \ÒfHƒµ÷Kr\ÒÔv\nòW\'´\ÍA\\\éE™\Ú2jÙ´Š¦;\éi\Éý0Þ–‡¶R\ë1RŽ²¸Ò«ÿ\0\ÍP+‹E\ÔP@,\âŠ\ã\Ã\0)ˆóq·\çz²¯Ž4(1¹\Ï6\ÞhQ®…\îZƒ!§\0\×iGS\0Œn9«hf%TLŠ±´È„‘ ˜\Þku° Ž3ðˆÀj>\0–œ\Z­\Ï\Ü`ŒQE“j\ï–\Ë$,ÁžÆ®|&¸5˜ ù\àNÝ³h¥\È\Þv$y´n Ÿ†wŠ–²º‘¤\Éüþ”cvù˜\Üf70gv\ï&¬¶z›.\Ìm\0\Ö\ãR;ò9\Íj X¥›jø;Á\É\ãœ\nÑ²?¤n0¸\0\äüÿ\0Jé€¸¨.\ÊL}\Î&?nqM¨7z[®\Ö\í\ë,§\Ä0\"q™ü\Ä\ÖðF\í—é®¥Ž¤üW˜;3 \î``’ñ;oGký;\Ù=;øjE\ÆmM‚Š}&y|û\Í%»Fà» ³3H!¼¼‰^r1ï˜Š¤nžõ”e6$\Ë8\'iø„vô\íY«`¿§\Ø,<¤\ç×š³)œ¨`›hH\Ü\'“GV·vÜ¢´’OÖ¼\×ô\êYÀ‘\í¾)k\ë\0²\ÄM°‚@\Üâ«¤*|@úY:F%\ë¼Ú€`	óž\Í	:‚K‰N\æ´\ï\Ù\Z¡¶\àð+;¨\éô\ÛWb\Ðq\Ï\ä\×Tdž\Í(µ”u\ÝLD‚v\Çû \É‚óHlƒƒ\ïSn\ë‰e\ÇÒ®Á¼KO¨” Á\ëM	–·q fa†cV¹x:Zˆ\ß+žûEK@`·Õ¡€\ãlþwª\ÞMy‘ n{E\0Ð…\Û,©VU‡\ÂF\æi~¿£¿yt()¨­GœFû{\Ó\ÝE¹$¢\êþ\Óƒ\ØúP¤ ²°t‰\ï÷«&ö‰4´\Ï6z~£§¸.J›§\á. \ÉùóµE‹Ÿþ*X=:¹·¨›º5iÏ§¸Ç¥z§¡Kö€g!£%—lv\íþq^w¯±r\Û8ƒ=\Æ\'\å¿z\êƒSTK1yw¤t\Ò×—V´°`v\ÜŒ¡¤\î[\Ñxµ¿,\ßà¯§¯ù§­ž£\Â:R\ë,¤(\Ä~n;g–\Ò¹Óµ\Ä, ›\Ù /o©Sò§X\n“Fm»n\åA†\Ô|\ÂrÜŠ\âÚ’„z\Üz÷\Í8Ù·¥õ\âVØ•2pÈœŸ¥Btöúk©s«\é™\ÖA•x\r\Þxö¬\äRþ„¹It²_\rPZ@ƒ¹\Ï>õ\Ã[@\Øp5kf¶\ä9\ÌúihùÐ­[EO²\ÛU&H`®}g6\ÌT‹&\ê‡Uµ$\âd\â2G±ôŸ†M¬\Ú\Z\éÛ§²\Öz€\Î\ÝfB…s\å\Ä\ê&7Ÿ^Ð®\rw/\Ê\ë%‰{‰\ÜÀ÷jr\ïO{@´¬\å¢\\\É\É\Ó±>ôw\è\ÒÂ§†@es\ä‚I\ß#x>Û‰ 3=ß¶¶\î`ð\'N¡\è9ô4½\ÄVµ\æž\êªhƒðŽøÇ¸=û\Í4¶\ÚÍ‘p\ê\Éan\\j\Üp3¿9 7™\Òƒñ\0I’ý[z:fp-j\Ý\ËM ó,$Œl\'å˜œ{\ÕU”fvaF?\"t]FsvÞ’u	>µk\ÇX!X°·¨\'‰ý‚g	4(\ê\ì.Ö.¤‚WN\ç$\íôªº\ÛM(‘œ{\Ï5cpª1Lj’ul\Ô\".‰-hjl«mÒŽle~„h 5¢\ÉR\Ñ\Þ6¢¥\ÒË¬E¢@4¸\á®\r2d•8Š”,Š\0\'$œÓ 5€„{S°\íSm¼Ë†8=¶«ß…ºm\è(\ëñ)b\Ï\æj— ±(dÌƒŸZW»j™£o©ñP\rD‘Oô—e|³–ÿ\05\Ó^¯j`H\åAŒV­»–Å»en—c¸Œ/Þ\Ç\Ë\ÇZ6\Ø\ëP\â#’õ˜£\Â\Æxš_¦\êuù XŠj\êiøI€{dTš¬\è\Ñ\énj]JÄ2\ç\åL›ö\î1·X¶úCæœ‘aN[¾—X3PŸl\è‡&(r\å¹\Ú(hZÙ’b\Õ\Ò\ákj[Þ®\Ê\"@*_†[ò†\ìõ\ï[\Ò\Ø#rh=M¤¶¤‚\ÞE&F‚X¦6¢£ø– œr):Ó´W»k\"]gDN|²x5\å:®’\ïAp©Yò+Ü‹O\ã\0¤xŠñ_\á¶ú‹\'Rdw«C—«¯pmY\â«C&\Ä\'ò\ÝB4±“\Ú)n³£½\Ò;\ÊP‘Žmœ<\×^Èµh=þŒ\\\×+\ìEe¸~À}Zg$V·Iw]\ï\ê\\¿‘L^é“¨vU]Kd\äqA\à1›Ž—ný¦²¥›™\ÔdÁ\íŽ)\Û=Jøs¬Ê¸û\ÖgQ\Ñ\\\éï—·©\Ó9š›Wâ–•\Z G4£‚–bz;w‹[G\Z3°\îj\êÞ´!´\ë \à\É\É\Îÿ\0â³¿†õ\Ëg©Wv\rhL\ãTü±Á­$¼Œ5X¼\Ø\Îÿ\0\ÚI|#Õ£žHQÿ\0œHÁ¡·Nú…·Ð„jÌØ“GP.‚<V\"%„~b¸¯œ\Ûv¶\Ú5\0À\ï\Ï\ç½-³uB¾\Ûrº†Wr$\ZO©\ë–\Â*ˆgÞµ]\í/‰¼)»Ò—¬¼‚\ÉÁ\Æ?\Í4Z`x3¥\Ñ\n‡`§p1\ÅId2Jrg×Šd¡º\æÖ¡mŽA|{\ïHµ¶H\Ð~\Ïza\âìº‚uµ¥¸Aùr#q·\íT¸B¹(\ÊŒ‡Yú}\ê\Ö\Ø;u€\ä)ƒ?QPO\Ã\'aœQO#\Ùe¸©ml\Å`\Îg¦m‹N‹¾•\0\\ ¹;¶|©t\×v\Ã*¤€AfOmøê‰¨\ÚQ\á;#•!†\Þùü\Þ+o@g]¶\0‚¥ˆ\æ\"¹Y…©hýéŽœôÈ‡\Å[¡‚Â²ƒ\ë?˜õ¨þ\\«C¸ÿ\0ÿ\0rd{\ÇÊ‰x\ã2¯\Çq€\à\íùþj‹¢\êÝ§ œ}\Æûs¿n¢\ÉFkHDiW§5U\ÕhÊ%†a¾bcŒVÞ†N…`‹¥†¬yq\èwùŠ½\äT\n¾[Š7eR\'\Z5\ÅQp¯ˆB\î$\ã\í@¸J…hbd‚L\ÞháŒ˜¬£\ËrrGÎ¨-—(@\ÖbL,“\Û|UÊ…·+\æ3\Ûmÿ\0Z\âÇ¨Uµli\0\à‚\ÄñCeV°*\Ö\í\Û\\‚{‰Œ~EV\å‚/en.pE1\Ôx—®5\Íõ¶¶3¹&†ÁUŠ«®d	“ùÏ¥$¢Z2}#¨’ª	ø‹gÜœ\ÒýE¸!4„t™\ØzþvŠ{\àV¢c\çT¼ \" V\n\Þa\Úc‰Ï¥s\ÊL\'Bd\0F•˜\Ô\ÊN1#\å¿Îƒ¨+$y¤FÀ{}>”ý\Äd»ªÞ–‡—pLv\çš*¦H5\r\Ì\â­EÀ¼gbþ[šH\Ü\"\ç3·ü\ïD\ê\r\Æ\0´\ÊcLAQŸ)ÀÏ©\Îó\éÌ©¡H1H\0\çz±´\ËxÜ¶)b-£0c¸1ñS\ê\ÊX%:‡ˆ\ÌYF9\Ì\íGµ\Õ•g,™€Û\â—U‚šŒ–Û±J\äOi\Z|V \0\Í<f\â\Íe¼\ê‚\âÛ¹mÆ²O˜\àœ\í\ÈúŠ£\ë-{.G˜yL\îN#·$×²<\ÆÓŸN\Ô\Ïó\rd#(%YeI`{\ÎgŠ\ê\ã\æð\ä\äÿ\05ƒ~\å„.­iƒ(\"F\ÑMj_Hm,wp\Øf	<\Ú\É\é.^{lJ¢¡ruF¨\Äú\æ~ôÕž¬_\éÅ›Ï§H€G#s#\Þ+¦./Gø\å2\Ö\íß±uIVi24Fwý{Wu635¡–™V \'\ïÉ©Nž\â[o	\Å\É;Lª@[v\ËÎ­}j”ž\Å\ìü½\Ñ\\²ˆ\ÆAa!A\È1ŒÒ¦Ú­\çKŒ\Ë# \Ó\à:õ?\Ô!P°’TÆ“™\â3K\ÜA\â‚Ud\åE%D¼dôÀ3Yt©$	\Øÿ\0ªý;Ýµ\Ô%\ë!‹£€+\Æx\Ï”Kv\Ùü¨£Q¤d™«YW[…­B\è\Z‰czG^\Û\à-!T6¢\Í\0ƒ\äU\ìy¬?œ+‘0ufyÛ»w«£[Sý8\ÔDG\á\æ¢\å¢#\Ì@$¬$L{æƒ¯E°aC0¶Y\n‘ƒúQ‚&—SoNd.eOø¨·P ù„†Œª\ëmFˆj\Ô\Ã~?ZQe\"M\Öõ\ê\n‹…Ei‰ž	ŸûW\"\çŒ\ìz—p\Ì\rÆ¸5Iýòh½5\Ån<\Û\0 ‚rv<\ï\íUµq|@n+*$¨À£óšZ»oJ<%1\"U\âIññN^®\èR¥‘ñ>‘8¬\ë:ºe.\É1¸&\Ûnz¤8é•\n—\Ëe`Ï•l*Vqr|5\Ã<›ö‘±\'>´u¶\ÖHñõÜ•\ÒXÎ¢£,N@\ÚhW‹-»d„P\ÐÁ§0{öŠþ66€F‘\ZÀ‘\ï?8£V…R¦}f\ä¡:¢\àƒúTZ\ê\nÊ’X(ûšJ\ÏñNšó›\è\Õ0A\âŒ\ÈT\ê¶H\Î\Ó^V±$u©§˜±ò\É\á—&g9¬î¯¯6B¬)##Sy˜ØŒ\ãsYýEk´Ñ„\ä^^GX:\ïñ\'>B¤A™$\×/UcªAg\"\é\Üpi;\Ú\Úu©	˜[\ï÷¤¯!{Få³¥ö\"r\Ãz\é\\qg\å’Ù§\á‹wJ\ëxh1G°\ÍrÛ—u\Ä\àÀ¶Ÿ½dt\Ý†Ž¡A]3«ÿ\04\ê\Ì\nT\äHkJ\rl¤&ž‡oh´\í ¡\È\n Ž\Ñô¥oWð w2w¢©6Ý¯·„XAv\Äúûb„\×\Þ\å\Å\"H\Õ\0D©W\àgŒ2\êb÷nŒ™c§-ô¥™ÿ\0ü„k¾O4#a<{dü©§þ—Œ¬¥Â±\nPùdc\é·<Š^òª°ò0u)˜\î)\ãD\åe\ÑIb|\ÅF\0À\Ô?¨\éE\Ô~¡\í³\0A%d\ïõ\ÇÎŠYG†H\È\ß¥]®]MJ·\0Ì®’\0\Ú23Šd\ÚxI¬ž{­6\ì¸\ÓeB†žqó\ëI€\â\àRŒ¦ð•%L,‰ù\Î\'šsø’\\¸ª©\0¨\Å\É\Îø“<R¥?–\é\Ð\ÛD­‚\ÚÁ \Ädr;WbvŽx\Ð\çU\Ñp³²©Úˆ\0’A8$úúA¶¦\å\Ä\Ê\\`|\Ú\Èÿ\0\É\æp[\r&\ê½\×V\Ö\Ì0Lc\ÜÈ‰\ï\r%\0ºò\á&5i>\Ûm?OJj(˜K‘/D‰\Ïza\r«j.9,„I12qŸ\ÓO.¼[eRªš@bg\Þ~\ÕF\êš\íÀvUóÞ³V\ZloE‹ˆ¹/¬B\rC\\LcD\Æô\È/*]½bý¶A»Ç„	 ÀiN{óJµ»VÑ˜%†¨*O~rö¨\éú‹Î‰aÀ6”C\âI\ï1\Øsš›‹xc7.‹v\î[·e\ÖûÁW9õ$\çyˆô&•K\×m\Ây(QX‰“ö<~M-\ÍX\Ô*Š°4\Ë@^=¶ûõÛƒù;#X\n-•M5d€g¼ƒòõ4bÖB\ZJ†[ˆ\Ïm\Û,– m÷6´W…ˆØ“}#\é•WV‰¶¤\é\×‘þ¾\ÕV²\×<@Ž÷`‡\'3}¾õ[¦Q?EX\Ü(¶11ªy\ÈöŠ\ÛFE-:3\Ú=…2÷\Äk¬\Ê|BWJN\'ß±=ø©\Òý9R\á.†BGŸV˜\çy\ïX¢x+’ ¨\Ñ\í™ d¯›#VH\â´S¦{ª[Â…½!n\\‘‘˜‰81Kx.i:H†8=\ë&R2^“j\áUgly»We^b3v4%°Ak€“Œ\Ä~v«\È ª4€q5¶—O„®Ñ‰€cóŠ·K\Ôn¨9™¥\Ù\Éc\"\'â ’W{\Ðô6©›©\Ô\0\ëüÚ¤(\'3\ç5¢[¥Æ¶\à©+¿½y«7\ÛB—$cóZ=\Øp¬G9\ë4Ž.N&\ÖEø\×*{W#mRG\ïTµ\ÔZR§\ÆIb(®¡„Á\É&sŽ[\ê­8l\éšr\Ý\Ä\'•\Åc%\Ãmµ’#l\Zn\ÏS\0Û¸\0\Ìú\Ôeð˜ý\Ä$r*‰\ÐÝ•\Ð50\Õ-»>‡—\î+B\Åÿ\0\èüÓ¼\Ô%qX:!\ÖO\'%³au>=û‡X{\Z?Sqxµ!\ã\ÆFüRE^JÉ¥„%\Ôô‹qH*\"¼\ßñ†\çN\Ìm‚\ÉYÁ÷¯dÊ¬³É¤úŽ”8 ¬\Ï]ä­œ\î>£\Ä¼\ÛS¬	a<S\Ý\'X\ZCm\Ì\Ç<{Q‰\rðÎµ˜\ß˜@³yŸY$Á;\×Wú\n\ë5^›¶\Ð]S%\n¸ƒŒŒŠ\Í\ëÿ\0†ø}C0ÁN@jŽ—®kW\ÂV‚kMz\Ë=U·%¢\é3¤SSi¦p<\Ãø\Ö.Wua$€w1Zÿ\0\Ãÿ\0‰\Ûk/[Š\êx!DG\'\'o¥_ª\éV\å¨Á3ˆ\Åd·JŽ¢\0þuš´YN3Töz¼	 ˆýùù\Ñ\ì]VòxšD\ãx\Íaô÷Ð¯˜M\Ñ#Q\ÄöÛ÷§PÀ\Û\Ö1ŠJ³žPh\Ð*\îB‰osŽ*®\ÝC1K ’«:™³;\×X\ê\Û.t’yf-(4\ï\æ7ŠO\"5býE»n|·51‚	\Ìz|©7¶X²Šsª\é\î‘B‹ƒP’9ª‹%­jh\Üöª* [LÊ›ª\Ù=Y¯=\Ë¬½¤\'Ì 2y>ŸœS·:r\01%³©g·ÌœžØ¬\Ñe4\È6\Ö\ÚÉ¶R\ãý\×MIH$b\É\ê‹e\î4*\É#hÛš\æB„I‡üVA\Ã[—,\Û\r¥\Õ\ZTD€{þ\ßj‹ª|m)T[b#\×÷ qlÉ’š£˜\íò£\Û*Ì§\nºf{bµˆ\ÕH[¡Šk§\Ê{>\ÕE\Óišm¯˜Dœ\é=\Äñ÷¦¬\ÙÓ‚	$J\ç\Ìp{\Û>\Ô+„?•\0!p4\ë9\È\ÇÚŽlXPJ™$ÿ\0\ä	ÿ\04\"Vû\åE\\“÷<Q^o86\æN7úGn(-l‡\Ú4ï¾uŠDeœ±\0}ª¾\Z\ê*U‰YŽ\ä\Ç4`-\Ì\Â\ä š\ë«u­£—$	ÓŸ\îhR7#\È\âF\â\á$n#ôª\Ü\0²‹z¾\r;Cò«2*©!Áœ@\ãó÷®•\0°œðcÞ™¿©­IuvFQ†¼T\Ü\ÂVP&sò¢²I6\Ën\"…u\\•>Sœ\â)\Z*²«j\Ý\ÛjV\Û\0\ÇY\'\Ï\0cßž7¥\Ý-!K\È3;}þ\Ô\Ê\Úo‰Tª“\ZÀ?††-‚·VÀ@<™ÿ\0µ\'ªB\ímT:”fsFÀFf†øLB1óoÀŸlýi«vÃ¹i\ÜÁ!T\É÷ÿ\0?:‚\Æ\Û\\*¤L´Lý\ÏÊ¦\àYHW\Ã\ÔN—œmŒ\çoz«¢±†ª2=\æ™kl¡€\Ø\ÚqEÔ„<Jù‰S$|ñ¦\â:‘/X~¡\ï[=FÄ†c,Oyûý©|±:gc\0\r\\sò“E6ˆ\\\Ûð\×\â\Õ\Ì\×h«(º-—\\-³œO ž6‘\ëKCYKwJ)B—*uÀœN\Çx\Éý\é\Ä\ë^¹‡Ts¬*DA#n\Óú\Ò.ºyÑŠ\Î7¦BÝ¶T·¤•\Ö\Ï!·ópG±é”œt,¢¥³_ù\ä{v™!Ì•=úU\Í\ÕÕ¥IÁ•œqû\Ö½\à]1p\ÊJ\ÊDLö>\ÔÝ®­­²Û¹©b‘˜0AúWT9S\Ã9\'ÿ\0=f&•´”\è\äú}3ž\ÔK6º`fc,< L.g\è(þ-·¦\0\å¾sþ>Us\âŒ\é\n\rC&co¥Sg;»-¤\"øvô±c:•s\íø>µEñ-±€Bñƒ\ïVñV\Û2d\"Y|\Ç>»d~\Ô[ao†•ÿ\0\Ó&N9ÿ\0”Em‚d·¤ª“­X‘\ægœ}ý+Š²T\0H™ç¿µ1o§7-—™|M§_‘û\ÕJÿ\0]¼9\Ðd\r[{zÒ±{xN”™\Ì\ÌG\ç\íD²™ö6ˆûg=aõö«* ¸¤\Ãi\Ü\Ã¿5ki­‰	0#?¾(3Ye/¬xGR°\ÒH<\ïŸÞ©rò!R¾ŒÇ¥J€U•°&4\î\"2qµ][\0\\\'Ê²‘A¡gj\ê[–%L™Qƒõ¦m›:¶v\Éf‡kD\É\Ï\Ã\ë•ñQc¦k®M¥\Ð\Ëh\ë\×q@8\ÜLq\ï\ßÒ£§/o©Ö1\ZY¤gh’\'šµ@¼”¸Ž/]kjö\ì´B‚‰¯\éEþZ\à\ê,5¦þ«\ÄòÇ»qƒ$ñMÚ¹\ÔtŽn¥\åVKdf\r Ž7’;fƒm…»\Éy§¦¡\ÃÛ¶N5I“œ\È\Æ1\éC&³{«´:.°õùX\ï[½ñ7\ÕWP\Ö#\Ê\Çz\Ç\ëU:‹?Ë±Ä=\ë+¡¼m\Þ V\rp}\èKù!¡c\Èø\ç3\Ú0ÁH÷Š¨\é\ÙÄ¨ôœVwA\Õ^{šYHÞ·l\Ä\Îqö®§°k“&[i¤ùq\éKH\n\î#<ÿ\0Šô\Ä:e)©V=¹¯?p”¸\á„q¾\ãðUø\å\ÙÜ±p‡SeÔ—·#\\\ç¼ðk¬uo\Ñ?ƒt3\Ù&2”\Ôf™¸Ÿ\Óf\Òc´ŸC½%\ÔZU°*;žk¦5%L\æm\Å\Ú4šñ@Yh< \Í.…–\é\î\0K‘?§5\æ.kð\Ù1\æä“Œ\É?j‹7¯ô÷\í¹o“\Í\0+3˜Žüz\Ñþ\"«–\Ñ\ì.7K#%N\Ó\Ï\äý\é;¬n<‘\0r?&™\éúÄ»a@)wÃ˜ø´¶vžNNj—\Â#i\04œ\í<Á\Æ\ÕÌ­<—i4\Å\ß12 A$‰\ç<\Ïjd»ø\r\Â\à(U@G\Âd–ô\Õl‹\r§y˜ÉŸQš~\Ê\ê¡4ù\Ö¹Ào~\ÛzsL\ë\ÑUø\çH:‹^+\\F¸gQ\'‚1\'Ÿc\\\è\í\êò\ÒC0\Ò9‘^ž\Ú[p-\Ð\Æ\"L‚v\Í+§\n\à(\Zœ\nNG¯ÚŸ“\Âs‡§•¹Ò‹Öº‹\Ä[´A\Zµ`\Ïa8\Û4¶CFf%¼¯¶=\ç\è?ˆ\Ø6\Ð-»Œ^\ãi\Ð&IØ€?jÅ¿¡:‚\Z\Ù@í•€H€ó\Õz\"oL@Ÿ\çÿ\0I\È&C	œû\ÆôK\ÏH\ëu_ûH•ó,\æ(÷¦ÿ\0V.^Fi\"C±–\Ø\Ì\Ô\\±fÍ¶UV/$•L@#9úŠ.´UJ\Î]VˆÖšž\é2\ç$\0r}â®ŽC:¥\Õ,\ã\Ì\îNØ#Ÿ}¢•—{\Þ\á\Ë@½ýÿ\0oJ|ø`\\µ~\ÂZ\ÒC\Ë\á\àÄ€\"}s\ÄÒ¶+G[±e-©µp\\¹P«\06Ç¬‰U¶¢-\Ø{v\ÕC:Ÿ3(1„‚c\ëR—•î­”RR|¢rO¯½0¶À¾\Z\å\Ò²\è¯`N$R7[<\Ó\0\Í`ô\æ\Õ\Û©þaþ4\ÆÑ±Ú’E²Š\Ì‡YP\ÞXõ÷ôõô§.tŽ®–/\Ú%ü¬\nÀ#Pœžxý1B\êú!\ÑÅ´\Ò\ëx\Ù€<ƒò\í\ïT‹^ülVøÖ²\à‚ÈºD\ì0\éT¾‡ùj\Ó+d rºN#\çö£_7’\ã\Þ=7†6bLƒ§|ÀÚ¨¦\ãR *›ò\ØS,–º\Â(\Z\çGy<\à0\0†F\ÚF\Þù¡«5ÀÀ…,NI\ØW]ð{¤°‚\0Éª¨@Ag\Ä\æ2AK’×­2\Æt–@<þ´´i)ò\Îô\Ó,A\n\Ì\ÞX \ïQw¤»mQŠ°,	2¸\Þ$Ek¦4eXe.tð¡Ã‚1!«PR\Äv©gumu«\"L<\Íf†V¶s¨N wžô\ÏM~\å—(\Ûb\n™\ÇE,º™G•A’&¯\íV\Ë\'$cl“J,–\rK7\Ù\î.U/°ÀýL}kb\ßVn7\ÂFÚ‡þ½Ey{m¯v\"2&´,õŒ\å5¸&\Ø\0\r±\Ûš8ùxþ\Æ\Ðha%	\È,Ê€\èØœ˜¡t=d8\ÅH‚\n\çð\ÓQ¡G7‡L\çE­\Þ\n¶\Ì\â6­.žÿ\0õ¬‚\ë£\"Fô[7Å™«\ÅJp´R¦o’L<VgXŒ1\Íu®¦\ä¯~\Ô\Ù+yD\äw¨%Õ.JhN\Õ\Ò\0ŒN°N\ç½E\Û G–¨…\íj!d\æò\ÌQtò€­a‹\Þ\é|U21Xð_)k@gŠõ\â\è\ÉÁÞ…z\Ê\Çzxò4\è}G€»\ÓÜ´N¡+ô¢ô÷B&GzôÄ¿†‹\Ö\ÉC¥£«\Ï\ß\é\ÏN\Ê¹õ®…$\ÐÝ»ašI\Ô+¨\r\Æ$\ÑGK\ã«>„`°HÀôÛš\È[¡!Yµ\ÌN+B\ÏRMÁ­\Â\ê2X–\Ô\Z\Æqiˆu}%\ëR±=\Ô\Î#j«šT\Û.9l\Ö\íÛ\Õ6£h³?9$ñ\Íf_\éP4ýö\ÜR,\Ýi“fð\Ò\Z5yŽ¦&fc~oGN¨¶<Hóy°Iôû\Öe\Ï\ËWH=¦&¯fðþ\í‰\Ï&·\ì\Î£a\ï£\ß]:`py}\"uÜ¶W}Á\íY‹s\\\è`I\Ì\0\0\Îô\ÂõJmp°Î’~~\ÔŒf\å¢\èX™Ò¹34±D©9\âh\Îþ†lNA úc¸\Æ\â«üÍ³¨º\ê$\åK@úoL›ØµX2Å°I$yÿ\0l\Ô\\[A\ålŒ(1™\æEY]t\æg¢®–ƒÁL–™fð(µƒ[LEnx/\\D1\áLsúIû\Ñ5½\ÖDPl\æý·©[v¼ˆ×©m°a\È?hù\ÐÊµ÷\r(]˜fr7”¾\'©fc\ÈDå£“õ\Å\n\Õ\ï\êŒlZ\Ü\nˆ`\ÈKDA\éU0\ÍƒŸjj\Z†­’‹®}$œÒº\ëNÄ’ûAÄŸñA·\Ô¼5\0\É\00$V–» \\{HE­\n¬…Iñ3˜1iùVn„j™—yž\á7™\Ën\Ì\ÒNd\×j6\É*HV\à\ÎõkˆUƒjR¤†‚\Í9?Ò±E’·Y\é¶\ÎˆbFûqR\Ö\ÖÝ°ú–\ä7\ÂG·ûúT‚\Ì\ÛRX\r8‘½rŽHDñZžŠ]]>\n\ê\\‚|Ú£µSMÅ²\ÃPPTyô?\Ñ\ïEq’Ë±\ç\0z\ãŽ*!\Õ2h…0pQCDX#c\èhO.\ì\Ä\Û]Fap´{Ñ† \Ã\Ê\n©œ¯\ØÇµXØµm\Øø³ cN\ä\ÍC&„™­A†\Ùãš›lVl¨@\Ì\ë\ç`R$nvÏ°¦A¶_ˆKI\Ü\çjSl#d1\Å$£eÀ\Ý[Á‹9-©ruj€qŸ_z‹I¤€ÀA:YFû1DD:ƒ%I\0¬\É\'\Ûs‘F¹¬> Uˆ*Tv\â§U±\ï\Ã8 (4©,[ô®þZò¢³#*¸Ö³È’$|Á*kM\Älµ\Ø\n\ãPV	m>´ ž,½Ç•U\Ø\È|þy¥ª*¤\îÚ†€\Z1ŸPÛ„’ AŒsùûÑ´JÁú{n?\'zâ‰ A™—\á\0\à\Ï\á\Å\'Qû\0\Ñq\í*—òjm ƒc\íö®d¸Ž¬mÀ.;}¨\ëh\Ý6\íZY$Ï™„’`·\îj„½¿3ˆ`1¨`Œz\íú\Òõ±Tê®§›Xž;Ö—M\×ø‹¦\à…v“Ï¾>Õœê¨º\0\ê|\ä8`{D“V·m®=\ÔdÒ€\êfU™ÀóGÒ©¸\äœø\ã?\r—\Ôñp°2\'z2\Üu(ù\0\È\0O–6Þ°—¬¸˜|€g\"1Z]7R.)‚°\í%}jñ’‘\Ç>)DÑ±|Z²Í§VÁAAžA\Ú>t\'q¥@fhQñdwj¯‘›úld\ËK\ÄT0bª§*6¦9\è;”:T[HŸ.˜?ùùw¢86\Ë|3ƒ¢2`D~{Rpº\é\n&xŸ™ý*\ë|~PX\Í\å‚#±ùþ•€\â2­\ê`Tž\0ôûÕ¡­Ü–\æTó\ßÖ•7Qœ\èR«8§>ôæ¬™\åµ 1ðö\Ïx\ë*&\Ó\Ñba”á˜¤’[\Ó\×ò(Ä²\ÛÔºKQ®A‰ŒÁ\ß`Îƒr\ë\Èfr	R@$ŒAH\ãÖ„\×õ\Ü&\äN£¥@{\0VØ´\Ëõ\ÝM§¸ºT	$\àI&9Þƒ\â2\ÛŠP1 \Ë\Ä\íûûUWÁ3Yº6Õ¹‚\'\êAùT%\Ûj-ø€:[oþ1\å\Ä\Éõ£eG´\ê-Ÿ.a¤\î¼U\íX\Ô9»`»2‘\Î\Ô÷Q\Ò0¾:€0I\ÌoA´6†$	\çÒ §\Ú%\\)\èÒ·m-¨‹zq‘GG+pdJŒU\é\È\Ð\Ëå´ƒ\ê>´CÓ¶²\ÅI?‰ù\×y\ÉÖ£ðe\0¸ºX‘Y_\ÄzøA\É\ïO«DGðÔ¸fM\ÌÒ©8; §\Z<€Sl²]S™Óµ/}€\ÙÀðò}k\Ø_\èzbóqbd3/\ì}«+©þnå©µuÐ‚\0S7Ú»!\Ï³‡“þi\ÇG¿h±g\0‰\í@e[ˆTª¨\\\à\É?Ÿ½z^«ø%\â£Ã€9‰³X\×úk¿\Ãï”¹d\ä5\'·C÷®\ØN3Xg¡(< \Ãÿ\0‰\'C~4#\'›\Äbuc3°\í[{]•¹l\êfPP\ì\Øû\ä\ZÁ½g\Äu(Á%@8Ž)Þƒ§º…t¿…¥t¸1$’g9\ï¤”R\Éxò6iôö‹-·% †ÂŽwúŠc¦¿©•M­0¤o_}þ”R!k$Ióôªbú\Ø0cVw>õ¬ª~\Z]3]·\Ô+ZB\0>]&\'>\Õn©F.]Q& }{\Ð-jÚ6½\Ðƒ‡§?\à\ÓW.·lº\Ü,˜ž1þ~´i\å\ÝWIi,¾sr\âø\ØDÀ\à‚3\ëY\Ë7|Žª²oe´“¼|À\Úv¯Rˆ\×^.#”\'K‚5HÏ·jZ÷D½S]v:C°’\0s¼`s‘xòV\Ï(z\"\Æú8»%\Â\ÉÌ°¼ûŸM\è7E·\ÒB²•l–bBöƒŠß¿ü6\ïIæ´¤\Ûec¤6\äˆÕžD\ïYa.Çœ\\\Ú\ë	\ÜL\Îv\ßõ®…$\Öfu\ÒU\Ã\éR§\ZWH\ß\Ó\åG_ÿ\0*ñ\Ò\ç[˜]n<«Ä¶6\Çqµ\ïL\æ\êxŽ|K™:H:„@Û\é{¶\í%\å»i\í¡Vtc¤÷ŽùqÞƒ\n§\ÙPD¹\äUTÆ`zúž1W\×v\Ò\ÛEÆ¸\0(VDp>Â©\Ò@\×…­CL³Àúnp˜\ÜU\ïu÷|5´,Û²\Ïm²[Uò9\Ç&2NóJ\íº¯¡ZÀ¹\Óÿ\0N\Ù[ÌºÄ@Œò=>µKv…ûžB˜\ÊLo\È\Î=~U^—¨¶\ì©\Ô\ÚvFe©\n@\ç\íú\æ®@_-ƒWSqôý\é—Áº‹W\rÛ¡\ï+9\0©\è`\ç?µ-\Ô3týK¥«¡’\n’1¨by\ç¨¶“ÀVV\ÕxIrÀÀŽ6\æÖ“Q¿©m2\04%\\L’O\Ó\ëôu+ú#fßŠUm¬1d\ÄýkOý`…!§\Ú~•\×-¯ŒQK˜ øš\äk½:¹P ²•mh­‚3\0ýF\Ô\Ù:}	¡Á´T\rÀ\Æÿ\0›W0m÷’\'Q’T³t\ÖC\\OgC@#€G¼}*\Ö\\‚²›™\'H\ã>þ”=¦²	´µ¢£hø½hg»nÞNH*1\æ?:ªÿ\0RN1\æ1ˆ\Çmªµ§\"@ iÚ˜o(\àa\Ê\êu¶L¾&\'\åC7	•,˜¿­5 jb¸ôª¾b\Æ\æ}(5L)œÁ \ævý\ê\êúL)Ž{úT[b \à\Ë“õûT\r>)\Z\Äƒô\0\Ç:N¨‹\ÞV\ÍzN—«Ch	$\È2	¯\'pÁ<@[:\Ó\'X\èúA\ï÷ \Òg7\'\æ\'¨º“\çI3½±P3\ÜPºN¬:«Ši”7\0’)*Ž@vnh:”9¥\ÓuÊ–\Ôyòž+-&Lc¼\Ó•EÀ\ê|\ÜÈ¥œSi›®¥\ÄqÚºõ‰\\	œ\Ò\rÔ³:–\'P\ÄL\Ó\Öz D6ýr¸µ“­I<12h\ê\Â\æ \îi»¨..¥mI^²\èq!†\")“½ŠÓ‰-l0ô¬Î¯øz»y–ciSž3¡†\Üö¢¥ÔºbA$Fi“q\È0ðyŽ¯øi\0ˆÀØŠ\Î%\ì¼6@^Ë¨\éÂ©€¬n¯øppYOhË±¯®ŸIpÝ¿oK,jÀ,wM]4=¡\ã©sóù4•\îší©0f­oªbž°Àg\ÜóZ†j\Ö®\Ø*„_RI\0}k6÷LAñ?Jy\ß\Ênk3‘õTv¾$¨B$o‚h\ì	¸\ä\Î[Œ„5\ÐLœ‘Eºn­¥\"\æ¥e$L	ûdS]GGmÏ‘Ä…œ\Ï\Ó\éHu5\Û2\éLŸS\ëJ\Ñh\Ê2\Z¶\È\Ý&£”\0ª>dŸÒ£Z­øV/lL1\ZIýi;7H¸T€\ÐÅŽ?>”[ŒB\Ú+H,WT€}¸\ã\éB¾\Ã\é§d#«\rZŸpA\Ä\Óˆ² j\ßúSÁ\ÎÕ“j\ì],q?ž´õ«\Ì\ä:‚\ã\ß\çGösN\r¹fÚ—\"\á*\Çp1ùµ$l;¾¡i\ÄyZF\é;Ö…\ÖG”¡T\í3\Ûs@iwðô²;2÷öú\ÖY6„Z\ÚxeYI\'?­X\Ú[v\ä°b@ˆ¦¯\Øô½»ž\"œød\ÉP9=¶úP›\Ìñ9\â¬QI°1¥¢2 ŒT\\!Z3b€V/œ`\âyÚ©u!Xiÿ\0\×\ÅZ\ÆO9Äª|A£\Ò3û\×yBù‡§õ¨P\n“&\Â7ª™Ó1‰µ”:\ìZ|\ÓP\à™h1L—F¤¶ 	œÄœ\Ä\ä\Ðf\ã	Éµ2\Ñ\Ól€*\è·//„‹\åYl\Æ f¹­µ\Éc¤»JŸ~\ÑV_\é\Ûc­DÀ\Òw#|»QÁ¯\á*™Qo$9\Z¤@\\‘œv\Írôþ23\ÛÍ’Tƒ#`7\Þ>½ª–Çœ0\0®q9_J¸þ• ~º €p@\èÓ¬\ZÁ\ÞTW\Z-\\Ôƒ\ÎXD<ö\Ì |½h~‹~ P\ÈNg¿ü4Q€Á|Å±-¸ª·Œ\ê\èU¦\ÔWJ†‘\Ûv?,\Ø\éƒ(¨_\n\Ó0PN y¾X\'\ÐwÞ«x#YEó€™<g`\ï\ë¶3eYTüQ„\Òù¨\"\ß\Æ$™9\ß1>”´2°°·.E²\Ç\Ä#…’>£*\0¶X,0\ß>†™UShˆ&\ì @È«-­B\Ù\n\0«€F£Áž?\Ý%\íB`k\É,bÚ¿\ÍC\ÛŒ¨‘\'´\Ó\í¾-µ‹g\Ê$‚\Òd\ßü\Ð@a‰0DwÀú\Ò\ÐöTOˆ.cX:¦qŠ[f…%[H˜\ØÇ½2m›h®\ÚJ–\È‘\Þ\Ï=\çÒ†ú…µ·¤*\Ì\ÉQ9˜ž?\Í†Œ…Šim ¨4^•\Z‘3“\ë\éûT\è,p\ÇõkŽ÷n}\É|(\'Ú‘\Åú?aw$¤“œJº\Ü\Ñ-°›`H\î3Ûš(K\Ö|;Ö˜m¤<®\â6\ï\Å\"\Ô	\Ò\Ó\"}¾ŸJü\r¦‡ún°4\r\04A$Œ\É\íZ^»R\"u6Å«†E\Â(?ú#\ï^p«\Ûe$ƒ3\Í\è¶.ÝµrŠ€21þ\Å:›!>ò\ßSXldgŸ\ÏÞ¢\à›÷\ZTÁL\0\Ç…\âA\Ým\Ýf\n0b0\'1O-\ÛgSt\ï\â(c§R\æ8\'”\Õc$\ÎIq\Ê%QAeONImö©W!$\Ì)¥p~U]JUŒG\ß.h¯y™\î\\g,d¹l“Ï¹“L+8eN¯éœ}¸ô£³-Þ‘nYC©%n3.ó‘™ƒ±\r½pn¢G÷jM^\È\Z\Ê3x`)2w•…Àº\ÂÖ€ZX9\Ä÷\Ø}+¡E²Kdm€Ÿ¿Úˆm:–BJ\æ\0\Èÿ\0u\È ™\É0ßž•ƒhúÁyFØštà¾¢¹)¦LH¨œù·¯*2­\í})a·“\"\Ï\íNá¶†!w\Í\n\Ù[ªÎ¢\Þa±¢(m1À?ZY;\ÙHª\Ñ\Zv$b˜B§¸\Å\0±§P˜«04&\ÐK‰©bb‘ºL\é<ñZ*\Ó\å0¯–Œ—š1u°J7¡$BªII\\	;ø(gIg«´Z\í°\Ï?\ì)«ª=ûNâ†ªXÁ°Z-§g<¢ž{Á\Ñ\Ã**„A2Ü‰ÿ\0•/\Ò[´`Âœi<GÒŸº†\Ûj\Ò< \ßýÿ\0ºV\ïP\å`\Þl‘~ù®”\ç#‘¨DV\ì\0\Çwm\É\È>¾†ªÖ™\\\'`Fx\Ø\Ï\ÌU:ž©AÀ‚~@Z\âË¯Qÿ\0·z¥1SLs§¹q\n€<\îF’û·o½1fõÛ—\0U7’\0\Ò19Ÿ½+mÊE\ÈÄ¡ ù½\Ùú¢\Újqª@‚O\í?­O\Ñ\ÛÀE>Å½¨†cA’§“\Å¬.ò“p9˜ö\ÍR\Û5\Ò	\Ð\×A\Òˆ\Ò{÷É©¶\×.;2h099Ò´È¿b\å\ë®\Ò¢JÆ2ˆ?:\Æþ#ü;I>[f\È*\Ûýkt\"Ûº—C!%T†Œ\Îÿ\0­&\È\×P°Sq¢r	Ð¢›ŽM	È“ýž;«\éÂª­«Q y\ÞuOcŠÞ™žß‡o/™@þ\ésþ+c®\é®É› ¡	“·\Ûòsœ\Â\Ì\ëveø?\Ü@\Ûc¹À÷®\Ä\í\é³3¨´\âõ±yVÂ²Jž\"H™çŸ¥\ì\Óˆ\ê\è\êqŽ\â\Ù\Æ{\Í5xÿ\07sÃ³\\•Ò N\r»š\È\Ó\à˜e9\"bkgÓ¢-I\r++1t¶Ê–ä²«dˆÏš9ÿ\04\ßM\Ô\ÛR<0ˆ.d+\Ó\ï9ù|«=–Ø¶n†Uto=¶;oŸ³g©¾|¶/˜µ¥·\0É˜€	\ØŸ®\âG†pLa\\x\ÑRˆÆ¶ø\'LD1\Û5VRl$¹T¹ 6£\æg;`­.\ÌÁ\Ö\Ú\â£Zq\æˆƒ;Q\æ\È\é–\év‹ùŒ™aÿ\0¥ùƒ>ôV\ì‹MP‹©,¶Ë‰\0£Þ¢ñq­ø3¬ý6ò–ó$\çÖ´‹7ž\ã2\è¶t‘\n\Ú\Â\àoŸ\×*Bí‚—\åd‚ºt·½U5\"‘˜µ”.†Ó¤I\Ò`\Ä\Çq\ÉKj<URZÐ¤Ž>f™}CW‰ýU	\Ô1ò‰¥™aÎ¤:YúS4Z2°Ž«mµfe##WµQ—S’\æ™\0\Î\ÕÀÙ¤LÊˆ§­:Þ·kÅµ\ä\Ò\'\Ë\È\0Ž#Þƒ\Ât\"Î¨\êö\Ã7-\ßÒ¸2‡RZdw©m>eD“$Àš¢Æ¢\"9Y¦h?††Ì‚\Òv\Î=£÷¡!ˆ+)\ÒTˆ4C:dƒ?˜®\"\Ù\ÔD‚q#žô¯`N°d>`Gi\íVF[ƒÍ†UW‚%u\0 \n\âÁ[Vbk ´5\Óu¯m…¶:b·º>»™=½y+sˆŒƒE\éú¶°\à\\\ãoZ\r}!\É\Å\Û1\Ù\ë\ÛM\Å/l\0\ÕMD7 óIt]r8Xi‘kLw@\Õ6¨\ä¦\å\ÂðŽŒ†š-«\æ\Ñ\Ñq°O\ÅB¸„p}\rv¯6—=\éZ´*f…®¨«	i^ý\é\Æ)y¹\æqˆŽm$\"\ë;ñMtý^I\Üm\ÍFPô¼y<¿\ÓNÀ\Ü\Z\Ïk-bæ¬ƒ[¯\Ûu·Úº\ïL­l‘™Ú‘M\Çw,£?\ÄÕ¹ùUnYW‚¸«\\°mœ¢ª­N=iÿ\0Bþ\Ä:Ž•X\Ë,jæ²º\á`y’\0\ì+\Ñ_ó/ù¤o#.V«`ÖŒ	k~R‰Q\â¶Tf´-Ü¶Q‘CL\ë>Õs§k$\âVi\Ãi‡¤ |\è\àŽþ¼\Õ.\Ú[°\0\ÏiÞºÞŸ\rõ\ÜX‰9Ç·\ëGµxÚ¸Á20†MX#\ÔOÊ—°z\çu\î.%«Hu9÷\ÜÒ‚\Å\ä³qÝ€P@ø¢{Gz\Ô{ŠX«ª‘„~•\åð\ÃÁ#3™£š)V°\Ì\å>)•00¦`~~”Ò˜vuxpu\0³i Ž•\í?—P\Æ\à‘\ëÇµ\rº»„›n\\ù¦uJ\ì¥),\Z\ÌÁ@ö˜ \0·\Ûl\Ó\r\Õ;>«¶™\Å\Z¡`°\í\ÜVG\Ô\Ûk\ê.»$ù´\Î ùšf\ïRof¾.=Ó’wOÈ¬ˆNŽ\ì\Ñp/‚ªTHor\æ);¶-¯[ql\Ý\0\çA\áˆ\Û\ïDñ\ï:\\\ê/6±!A3\é\Ç&§¯P:†>\Z”\'Z1Œf=¦²~¸‰8tº<B520+˜¶‚YˆQ?ø\Þ\éL†0$L\ì>´IPF{\Öe6M\Çe¸¬J\é!€Â’&?;P\Ôk»¥WQ8\0s]¥T«\Ì{\Í^0b¾Pr?j\r¤Utƒ¤;H5P‘p®û€(¥®±\ÓMXY\Ô@ý\ë¯(\ÉF\Ê>ŒÚ²fÄ©c´öôªØžh—D;$€§0¦G¥+Èœ\Ó‹\ê(ª€(‚[X\Î úc\ïPÒ¦H@¼.þ“P<23«Aß½\\h¶Á]&L\ÏÒ™0–\Ö\Æ\Û[V\Ù\Ë/\ç¥PÚ»I‚	!S’\ÛÞŠl]\n¤$‚1‰ú\Ô\ê:|+^\Z!‹4ƒõ™\éÚƒü2‰ ¦§v`†#LdŒþsW3»Ÿ7”.…\0N\æ@ú™©`\nº–\Òs‰\ïªÖ‘Ä²4#&\ã´úG¥eF¼\êl\è\ÔÀ1¶¬<ðaŽóŸŸøªlY,\r\Â‚‘\0L\rB>x«u7¨ÁmRd&\"qž3úT:ý;Ì‹$\0$¾ø3\ÄóA¬­,œ½+£\\»\ÓøŽ–Æ¶!`ª\Î\æ	÷J‚‘d–?µ\íh\Ò.\Ûy\ÍpsŒU\\xr\Ý\çh\Ï\íKEúT§‘a“’Ã‘Ÿ÷TeF,\È\Ò6)ô1ò«x`€Iõ®\0«–\ËiS\Z¢¿J2(¦R¬dihª]GR\ã|©›‰\á³%\Åë‚½Œ|\ê¥ó\"H\\´`Ç¿Ëš2b\ÊBŒ\ä6\Þ­T\Û!C6\ÄqFúµj yWTŸ;U‹+#\Ä,¡ \å„@\Û\ÓzV‡°	l»·D)2p0(Ö–\Ë\ÞDº¤‚¦J8\ÃF\Çx\ÜT7[B)\"\0úi«‘¤5\ÝB\ã9 –Á>§sƒþ\êmx)\ÔZDwMjZ8žÙ™ý*ÿ\0—\n¶\î±r\0:Oq‘÷ˆ«²\íq\ÕÀP$)ÝŽ6µqqf\ã8\ÄST•!ŒÚ²F.nu\"\êÙ¹døš´i˜ob>b¬Ÿ\ÄQ”\êP\È\Î>”˜¹t\ÝR4\ë‘\íž\"¥­\ÃK …c08¦M¡_^Ñ£kª¶\Ä\ry1\éL=Å·›KÄG¶>†±™YC¸@54@\Ø{W*º€ø\"Hšn\ì›\à‰¯ü\Èo3±,\Æ}\"ŒýJ“ý7PX\r—0ÿ\0>µˆi[¬\Ò&È’=;P¤\Ü2\ÃûD\ç\×óÒƒ\äÿ\0?OÐ‚4\í½	\í‚OC\å15$J\à×”™\ÖÕó.POz:\Ò@\0óC+Z›l4\äf™\äE‚\Ð\rÁ\æ\n§’6® \0\0<j;‰ƒ\ÄÒzå»¹ƒ™“L¢\Ø’´Nœ\ã¶(¬\r\ËyJB\×P\Z \Óö\Zp\03šI*\Z-1gF\Ã$ñ\Çø¥\ï[PM2\"7ýûZZCI#8¤\î.\n‚H\ÜÞš,Iª\"@¶0#³\ï\Ù\"\ç•\â\æCm0?\Õi”\0øÀ,A\ÜMª\éü@n…\0‘#Z\é„\ë\'\äó\ÝWCýMõd\é#\0û\ç\éó«tö™­€X(D‰;ûÖªj™S0??Z½\ëH\îUI˜‡\Ü	«¾GTsÇ‰\'h\ÎW\Ô\Ð[1 óù÷¦\ì3]p«‚Ä–—‰ŸRFii7-å‚™,\åöbEËƒC€\'$	\Ç½+1¤74Ë±+*7F³\ÔxŽ\×@1\åÁ¿\ä\Ð-\Þ\í•b¥­ˆ“\È\Û\Û\ßje&.YK‹\å\Ò4‰\ÌO±4þ‰	ýSq‚\Ûe bFœv\Û\éTimA4¬°0§y\ã3\ëõ£¤›¥©\'N÷·ý¢²¤·(Dª\ÆEMÊŠ(Þ?\Ötž\"[.\ÅB ®\Är}óXGG\à5ÃÓ«-\ßü|«Ù½´ðÔ±\ÛË¾F\ã\Ûô¥ºþ‹]£p¡ó£H\É=½k¢µ†sO‰\å£\Å\Ü×¦\áE&\ßþ@‰\Ïni\â uL.xj¬T(UD\0Oxÿ\0³\×\Ù\r¥\Ì(Î±>nG®õx=\âuY³\n\'¹\'\ï\Ì\×LiäŠ›0\Èn•VçŠºƒ\0®g¿\Ès\ÛÖŽ®\×n)¹rt\Épd™\ï~E«´\×\"Í¶uH˜-\ìy\ÄR’á€³`4HL\Ã\ÞšŽ\ÈË¼B§Pu[e”¸€@‘\íô£[[WzÀ¾(Ka~9}\é^œ\éŸ\Ëh±`§V7\ØUV\ÛÁ\Òr«\rAJ¨\Î4,ª_\ÎX\Ó\É ü¿z¶„S\áMLO\Â~#8Mý©¬“\Î~ô[7m\Ûê‡ˆ¦°\\‚G¡ŒZ|­pü\É\á\ßu¸Ck\r¦þE\í†Ò¥Ñ­†BÀ° 0“‘¿\Å1uOPu¢;>bT\0{zµ\íÆ¸\Â\Év¹¡aKŸ„\06\ÎÂªŒ˜º\ìÉ¥!Œ\Î\ç\×ò=\ê–Ýµni$’I}\È\Ï\ÇQf\å«\×ÀUô‚DfHý*Ž|tg¸%!Xö\Úx¬ôQ4Bt\æ\ïNî¡\ÖK6¬§¸\ßÖ•dó\0Nú¦\é‘rHR¨I5$ñŒb#zT†{LUHÏ›H\Üzý©PñtÉ°5]T€\Îv\Ì\Ó&\Ð!tZ¹|£¹\ÛŒ†*$\é˜õ£µÁ‘!JÁ÷¬Á(»$!_¨É²*šH>f\n3#¼z}¨šÿ\0¦Aˆ8S=\ê¶\ßAØFG~\Ô™6Cym)ù\Åq\Ò\ãCñPö\È\Ýr¹aµVe\Ó\'xÀ¬\Z\én·L\Ò\íÇ­mt\Ä5D·5†z¦=8\éÜ†¶¬H dT\'PöwSZŸ¤y8»\ç\Ó\ÙZº·’ \ïT¸¦\Ù\î\'z\Ë\èºý(lÝ•2EjY¾.$L­Mª8\äš\Ã I:—\Õ\Åve•u¢=£ºMŒ°\ßl\Ð\"\ßT\è\Óp?ú\Z\Õ\éú\ÐHY~k,œCNñUV{@ó\nœ ¤Vi›®\îFô¯Q\ÓI‘Iôýy\Ô\íÁÞ´\í_K«˜Ï­E\Å\Ä\èRR3R4Š[¨’„®9­«\Ý8#\Ò+:ÿ\0HùÓµ<d€\âÑŽn>Vª\ìÙ«u}#*®i@\î¤S\ë]I&°#T\å¡u™”…=†&‚\í¸ÒŒ\Ä\àÓ¢Ü¤\ÍrV\0\íJÑ”Œ\çr	P¡œ\ï]i\Õ¥’J\É\ÄFOÖ™~™XÊ¶IÏ½ª°‚\ÚG¶cÌ¬òfO \â+©¢\Ép\\%Kƒ9\à\íCn€õ-\Ú™\Î\ì&‚\â9Õ•û\ÓNt©X¨°\Ê\â³6b\í	5«½=\ÄgU28\0Œm lh¬ 	‚\ßù\È\Î3Z^h\Ô|\Î‘\ËQ{¥Ð ²Aó\ÇÎ…\"«—\ê·|xkn\í\Å«PrI\n`Im=\à\rªöú–¶R\í»—56¯0Ì®\Ù\ÔÖ¼u|?	¿¼zvý)Î†Hn\r\Ê()e\Zd\ëP–nb2\Ì\0ù\Î\ß:\Z°[ªm° ‘1Á¥üB,’X™?!\é÷ªù]€V2\Æ$\ã\ëJ@u\ß0œ>oÈ©RCt2e´ˆ0}=¨o¯¦]!\Òâ¥\\\0Loò9ÈªÔ¯	ƒ¹¬š«/pa¨#\Ë=ª©qTCp\Ñ½\ÅÞ‹ b`\0`H\íòù\Ð\Z\àR]‰cªI;š*™’ð¹Ð‘\0³\';wS¤ŒAÚ¡X\0Fa\Í\\5\n\ç\Ä.À\Ñ\È=\çö¦a p¥ Ž&¢â„¸t1\"w\Çz%½\"\àÖº€9\0\ïó©UF¶\Ì\×4°`\é$fO\ËZ5…°\×.+&¦8ÀR2sš5\Ù\éô\Ü\è\Óû§b~°#µ+’šmˆ$ÿ\0­1Ó±¿rÚ”YÓ¤0ˆ¦i¿d¤½r\Ò ´Rr$´ó>þ\Ô[¥\×úB%¡\'N£\îw\ëWðõ:Z±\Ïz¿Vu\Ùb\×$p˜w<ö\ßyÂ¼;\ê,¡\ên` rÎ N•YÀ\çÞ“¹muùPžÓ‰¦\ÆžY\×ƒ¶\Ô.¤ø—¼T,º€&Nf™\í3\íYŒ²Uf\Ô\Ú:ˆA$\Ä\Ä÷ûP\Ã6wY\0N\0 p~•{€¹7\Ìg\ÌÚ»ú}j’¡O¬dö¬2;[«\n\ìWQ4\ÛÖ¢\Ý\ÂT*³È‚8\æª-qe\ÛH\Ö5`\æG®*Y\ÖG†Ì·,Y\Û|~»ŸÌ€ß„!\ÒU‘•\Ù\åJ\ÜI\0s\ß\ÞFh¥A\ÔI\ìqÉ¶¦À¸\ÄNú²x>ÛŠ•%4-?“ö­I…2\Ö\î”Q Jœg%r8\Æþõ[¦\å§-/n\á\ZŽ¡¤\ç·Ê­©n\ÚÒ¨ÖŸ?žVg¯­M»CÀ»ý{AS0\Ç\Ì\Ä\ã\åJð\ÆK%€\×2	\ZH#ûú\ïK°/p,IóO4VE=C\Û\Ö«`7Ue\ÒI´N\äq\Å\nAL«K^.ˆ-,’¡I\0zd\×\\ô•¶4ƒ³\æ;’yúU€P1\È!k¼#\Z–X€\"…¶J\0!Psù?¥M¶UV\×j„Á0v\Ï\íÀõ¢k´V\äHxÝ€2g\å÷¡¤?	Û½-Î›)oN’Ä™\ÖO¦\Ñ\ïQi!ü@ ªC?˜¬f?S\Åë©™¶-Zv.¨\'\"\çjÛ¸\Êo5Á¤&rfx\íƒAŒŠ:\Ú7\Ò\Æw?æªª®%šŒ÷¢\\V¶°$2Ì©ø‡\àª0\Z\'^ a\ÆOÊƒC&~+ô®\Ûc\\\ZjH¯,¡\"ªþE$WŠ\ã\æRg~\rÀ\Ö\0ø¤[>U•¨¾.kd&`\ÖÅ»:I$\È=\êzž‘/\Ûó	>•xN1yG<ø\å%³¥¿¬\r\ÌL\ÅjØ½.$\â²nÿ\0\r~šëµtÀ‘3>\Ô\ïLÄ¤F\Ôüª-ZŽ\â\é›ü‚H“Äš^úùFr9~\å\0$F\Õ.\í5Ê3©«BF$;8©°\ÄB•>_Ï2mª>©>Qº÷¥„F\"wšª•¢.4\Î~\0B’\Ç1˜<f—½Ò³1{€jf–ÓùûÖš9X	R1¤ÿ\0ª£ª‡\ÔÏ¤\âŒf\ìYñ&Œž³ ¹mT+¢\á\Â(1Œmõú\Ò\Â\ÊÁU\Zfw2N\Ð\'m\ëv\å°\Ö\Ü\'“KAœýk*õƒ;II\íùŠ¬\'j™	ñS´,ñ„i\n[~bcL\"\åo›\å‰&%²6\Üz‚ºnZ¸\Ò1ñD\Çoz=‹!”¢dÁ,cŒŽ\ÜU;\éa53ô\ê¬\ZP±,$\ç?\æ¢ð¤he$FwŠ%ƒ7\n\Ù]-vu\0²[rb®ö®]|B|§$\0­M´˜\ÉZ!º{Å™\Þ\ë&t2\ëE.\n\ëñ4¨˜S1\Î=?iªEÛ¶‹\ç$&#}\êP•.…–:ƒi1\ß\çš] \é˜=Bmõ¡€\×l©:Jƒ;Myþ¦×‡sC\Ú`\Ö\É&L{Wµ\ê\ÊW-½Â‹€Ñ™?‘^k®$]\Ô\0,¨HŒ\èwŸqdEvðÍ¼3ƒšŽQtj¶IPÅ› \É\ç\×jC©\Ùþ\ÒÅ–\áS.\Æ<sŸÞ·:\Û:\àVòù—hœ^)\é	»\áZ\ZH\Ö\çN\ÐN\æ?\ïµtª ñÎ™ž«v\ÇQ¬¾ƒˆ`¤j@9	œ\Î\âj_Àð”µ\ÝEˆŒ(\ï5&\Â\\6µ6‹a´±1\"LÇ­PtŒ¨¯\ÄFA*&3#\ëYªgUÚ±†ºš¿˜Kjò•	¨\Â fp&ƒfý´¹¨¦\'r6ù¨VÇp\ámüV\×T˜œ	\ä\×e\Ö˜\ÞL\âŠB´:\â‡dS€¦H?\Ý#|\ã=þ•»h\è[…Õ¢³o\éò\í@\è§\Äb\ën\â\é\Ú\é1\éE\Z\Èñ\âÝ²Ÿ\Õl[Ü¯ \æŠtÉ¸\Ó\"V\î«eT“\æ:71\è*¦\r¨–`€;\ç>•að)E!€¶ nE_M¸g\r(—+œ‘\Æ9\Û\ïNt³u\Êõ«4Lü†Æˆ\ëfÅ‹AnÛ»q„\ÂIÁûnô9¹æ´¤ª\Ü8E˜?™©\êzkFóš\ãÜµ€\Ò\Ðbh4ì­§°wÊª´u¦©W ƒKí€¸\'3Lÿ\0/rÂ’öZT\àˆ\Ð{5]¤uoˆ\çµ\î\Ú]l¡\È9<Qƒ2S\0\Ð\ÙYP1§$o¿;\Ô\Ûd,1cˆS\Ï\ïLœ“K¤\ÕJ\0X“´\ÄO§Ö¬\ä»2€\0“¤GVQ¨\0qŒ‘¥*‹ FX“‚1Sd\Z\"œ\ÉÚº4+g½X0):F©\ß4\É\Ð\Ì\á\ât\í©I+Z½ñt‘Æ²\ç2\Û\Z\àJœô \Ñ)ÁMgg¯\ézŸ0$Êž=)“i.J\Â{r+\ËôŸ\Ä\n\á±\Åmt½X\Ä,8Š”£\ê8œ\\]1»–\Ú\ÖHŠÜ¦™µq/¶’\Ð\ÄóC\ê,€|ƒm\Ì\ïS[¦g«B\Ïl%F}LT\'Sv\Ë\Éß½\\«&ªŒ©\ë\é“4º_\â¡X\ãõ§4[¿•‰¯>¶\Þ\Ð.™\í?µ9\Óul‡N\Ðv\'j„øýGD9<aº®|µŸs£ƒ•Çµm[¾—‡ù¨¹eH¥SkSÉ„–4À¹;T:-Áž\â´/ôðH#I£!F,§}â¬¥dš¹foZ]\Ãx„8Eh\Ü¢g8ö¥¯XW\0û\ÕS£^_	úKžÁmg\Étƒžb4µ\ËJUIufy€¹#\ß\íUk7-]\Ô\Þe\n°Yuf¹¢\å¡TR\ï\Ðiq­	0bbG\Ï\ÏMz\È>guH3\ZŒHß‰4£V\ßQ>V#\Ðóô®¶¨F–%[\Ã\0Phd½aXgwfb\ßÿ\0\ë\Ü\Ðzž•­\éC“o\ÊÚœhÂ‰h´6F‘“ýµ¶ý&—0†|«ßŒ\ã\×¯,É´ŒŽ¢Õ¦6\ÙW@YIø»\æ¥úgbGˆ©¦ßˆL\Ä\í\0;Se-+•#Sm¾¡\\µ\0\Z´Ê±\Õ \ïvº¢ñž…,uMf\äÚ¸m–M$¡ Áß©¨ñ4‚¨î“º¾q1ùŠ\æ·(uZ’§0»ŒEx\ÖÏ†º ò\Ê\'?~)E\ÒLa\\B:LO›<Õš\âi|\Ç20›\Ò\Æ\åÕ¾\Ú\Ø;ø¦d÷ª3ƒ\â²…±\ßPFt\â\0É¨[¦\Ý\Åu 2\í\"~Ô¿M}-¸,	^w‚}v£\ëK…D€\0-Mb¸\Ó.šš\æ¥`dæ­¨™Õ™ƒ«·§\çj‚ \Ü>	‘ñ	`H_R*„ƒ¥µ35¬J\ZñI¶°\êL\0=\ç??AE´„t¸W\\œL“\ê6Ú’³’\Ú\\,š$Q­Ü¶÷\Ð3\àSªD\å^\è\à]wb	\Ä}òjž**+iLRw#ô÷÷¦/5§¸\Íná»¹ˆ\Ø¿hJŸ­1bŒÀ9$F8 \Íe@f-oKx‹\Ä\äñU¸ºQD¹R\Ûÿ\0Z)Fr\àb¤ð\Èù~´\×\ØU¶X)¨™\âƒ(‚%›\Ú\àºÚ cÃƒ\ß2Ox¥\Ô:\Ü\'‰‰Œu\Ê\Ú\0;…œ`\àI\Û<\Ï\ëQnÛ²„[,\î\æB€|\ÞÀPO\è\Ú@\Û\ÈÎ¨\Â\á7II‡ ™bÀúmVM!›Z1ò˜\Òb\ßeciPFq?\ã\ç[#~ùXC¬É™\'Ú­el;?Š\ä\"ü©—\ÈÀ€`çŸ­qž;G_	”’ƒ\æ9¬\Î¨Q/\Ëqƒ±ù\×v\Ñ\Ä2|\È\Ô\n°\'\æ8‘‘\ë¼\â\í\Ãý%´ƒl’=\É=÷¡8\ÛB\\%O\ÄG\çz8\ne5\ÉV\Î\Æv?‘Sn\å’P\\¶t\æ\î\ß>*¨I1ªÌ‘\Ûþ\Õn\\\Ö\ä9\ÒŸ.<Ô¬d¬c\Ã:<1\åe–‡\">ûs‡m\\I²…\Ùd± \n­›a¯¬^!˜\r*£SÛŒ\ÍA:F²$LñY¯ÀV:`Do\\·§J˜Õ«ož\ÕVU.BC¹wŠ‹ª4)_Ÿ§j0Aªõ\ßÿ\0¶P¶\ÍU\ì3;\ÛÔ–ž\Ø#EÃ¦H#§sŸñ]ã¥¾ž\âÅš†—¾Po]{–(1fNÀ\Ç\ÚZGâˆ¾­f\áPb!\ÓI€MR‘\ZeŽ\Õ`Á\È\0[@;\æ\êSTUHr\Ïð‰ÿ\0F–LªG\è%j2™²\ÑP×˜\ÐPB¼\ÅJ\â¹O\ÑA \Z\ÚjZv EQX+G4PLOµ\Ðj\Ì\î¢\ê­ÀŒÀ1û\×[Pn\ÎÓ±«ÿ\0\èW©·;8\ØöªZ²QAdWE\Å\Ç3‹R\ÈÊÞ”\Ë…d&NÇµ&\ZR`\ãž*ö®\ê##3\ÍE¢ñj‚ Á>´³‚8`HšjL‘‡ue†\0#‘\Í±e(Îªa\Æqh¼7!°\é±Aüýª«\æ\\p$\çj•PuA\ØI\È\Ìv§†np‚\ÛdÈ#Ÿ÷÷¤z\ëN\Ì]V;rÇ·ý¢8\Ý[Kia$ööõ£23Zu3	ø¸\ãš\Ëú°IvN\Ì\ç	­\×IrG?^6¡%¢\×\ãL\Æóøh\ïo|Lrx¡²’€j$ò?Jªg;Y\ÈÏ†\ì H¶«\ç_\í }9¢\"-Ëu\Æ\\{Gs@´¾\"¨Ÿ,•cÛ·\ëFBnÚ€š\Ê23CÁ½mƒ)\0\Ê±¨ðÉ’A\"F\Óbœð\Ð[B[CN£+±oMªm¸$ñ\\/\Û\íC¸±kö²@uB¨oœú\æ±ÿ\0‰t^@\×,I\nÄ¨ƒ9\Û\í·mû5 \Åus1ò¬Ž¹\Øð\ÈQf\êiH]>b8<“>§Š·vC—4\Ï:\Ïp½\Åfn¹t™=¾SŠEúU½®Ü¸	\Õ1\ï=ý+S¤µrÁ/¢\Ø6Nn\\3ƒc\â†\àt·ŒiY&3‘ƒô\çÖ½\r:G–ñ“zt\r¨\Ûkª	Ô¤À\\ƒ\ß}\Çm\ë/ª°á‘­¥±$…ƒù\ÍzV²Î¦\çOª +«oÀ\ã‰ý)?\âJ\Ý[¹\êJj¶IE\Zv•\Æ@ûQ¼|e˜=>mu#Oc\íFµ\â.Ÿ\r¼¬û\à²Ç¯Ï¸¡u-ÎŸªðT‡ør	\ï\ëL5À\×m§PÚ€ªA€&N;I\â‹\Ù\ÖóbUŽdpqˆ\ÍN¶´¦Ø—¶D\Ç\Ë}h†\Õ\Ï	M\Çt·x\êÌQ€}bOÞ†\ÌÄ€\ÄðŸo¬\ÑBž@\0e0T\ï3VKŒ\×\Ë\áP¢1¶\r\ÐY\â;F\ëœ\ïÿ\0}EZ\ïJV¶-•\Ò\àó‰ ˜C‘ME´Á\\´#bp\ÐT[†€Œ­‚?\Ý­”&Û…\ÔA0d2Á\"\àâ†€£¹U‘\"ðV\ãê¶€*a3’qó&¥Ù\ÌiY ò&9?™4WQ\Ë Š$q\Ï\à\â¢\ÊZº—õÒ…T\é%K|·\Å\0¦/uˆf\0 ù\ÕP>!m:\ÄO§jb\Í\Óf4H¸¤4“‚GC¹n\â\rµžc ûqô­”\ÇL y\n¡T13óªõ·(Xb	üÚ¬E¶¸j%7Ÿ¸ö¨“¤†>eÆ;\ndóe[\áF1“ðŒT‚0Ä‚GµT±\Òuf>¢…1&rk•Œ­†p3°«q\æi`\í¤À¨\å \ãj\0qX(\';Ž)®Ÿª6˜I¥-\Ã‘\ÍY²qžôp\É\Ê)ážƒ¥\ê\ÅÁ:„{\äV…»Œ j}&?jò6\ï5¶…oÿ\0Äš\Ö\èº\æð\ÎH\0y©l\æ—‰µv\Ê8%yDZ[6\ÛÏˆ\ï]fð\'|\Ó$Ù¿h,	\ÛÚ“XdjôL\à\0y®¹bH\ïÛµ\\\Ø6L0ö©&\r#P93Cô2`¨»d\é`H\î7£\Òõ\ÉpH:Gx¥ ‹4\é\Êÿ\0RÙƒ\éA\Å2‘“F\Éaue|\Ü\Ð.\Ø%µ·Ÿo¬t`.6’6<V®¨2y€3€jN.%T”„º«Zˆh\0úRg§(úÈ¯B¶Q­\ê\ÃOµÎ6\ßz+’°Lo\r]|\ÂGµ\'\Õt—\0›c\äEn\Ü\é!Š¨Àæ–¹d\ìjŠdú\Ñ\ç\\\\2Œ4° xW\Ò\è%ƒ€N\ëšÞ½a	Õ§WzI\íiV\Û\ÔoTT\ÆS\êgª±`º LoV^£PÁY\ãD¹iF\Ø\Å(ý*—ö4\Z+±†T%LÞ†¬ 4ˆvª2\ÜP’\æ¡\\fb\Ì\æd¾·\ájÑ¨††…íŸ¯Òr\Ò48]Qƒ56®…r[ …Ÿ)¹š€O‰ˆqB\ÃTC\ë*\Å\ÛÃ¹i!g„R2­¾˜\Þb–f2D	Ú›ffmW¿rÙŠ$[\Óý&*\á\Îsƒ·µ\nN‘–m5\ì(¾*9Q}u@Q\ä…Àm¿¯Ö˜¹Ó‚\n®’	„Ï¾ü\íW·\Ò-\àÀZ„@I3‘\Û&‹Cÿ\0\"¬‰7\ZY\àA0qþªC<\è\éfQ\Îñ\ï\Íù[`)Ù˜	¨v†\æâ’¬¸h\Ì3 \ìt\Ó\Ð[,¬W\Ä\â\ÒsŠ*\\t´V\ÚWQ<‘“\éµ\Ó]¹q™-;½¥ñ\Z´‰Ý†Ñžq]â¡°-«	\ÖZY@9Oo•d× pm\Í\×$\Û\Ö$\É?_Ú«t¹vb\ÆG\Ä\Äý(Qt;›ˆ\á‰&Oþ¹\ïT7µ)\ZA+‰$¹}ý~”÷ðU\à?Ž¬\åUYV\äjøÇ¥n¦€5(FÁ\Ú>»Š^\ÛôúIs§J`%Œ\Õ|FL –-·\Þ(]\ÂÂ›\ãNŽ\åoûk•÷`;úf€n[\ÐT)€\'Žð#Ú¨..1$òx407@\Æ\á-¤¶°YÄŸø>”AwO†öð\ë8ˆ\Ì\Ì\ïþ)o3__1…\ÆqR\×\\\Ê\Ú‰	1\æ°zŒ1g\ã1q0KME·‹Š\Ãûr#¯ˆD\î*\Ë1\ïB\Í\ÐkX¶J²’\Ã1´T=\Ær@¥@ˆ\Ûj_Y>f\Ìkš\îDD\íž\Ô7@—ò\éœTArV\æ2`	û\r\êš\Ñ\0³¼õý¸¡¹$Hò†\Îô;¢YHG!°V|¤sV60 2p\Ü\ÐMÂ­¨´3\ëT¹v\ã\Ý\'Q’\Å\Ç\Ï3I\Ú\Ðým‡k¦\á,J‚\Æp\0ÿ\0•v²\ÂZ\â´\ê†y‘$H\ß\ØÒ‡¨¸¼\Ë1’Njú¡X\0\\A\"AÁÿ\0»-«,|2­!d\ã\á3\ï\Ûõ¥üAW}‰£\'O\å¼/>—·\0&\ægôÞ¹z[·JI¥¶€|\ÞÔ¹÷²<&6\É\êò\È2G~õkv›)–\æ¯Ö˜°ª·-‡´H\r$goz+¢‹jV\Ü0™Ì–>\Ãaþ\é\Ô\Ù)rx}_Öˆ\Z•\ÑU½k\Ìh­#\Í5*¦y««‘ŠZ\rŒD\Ñ\Ê6Þ‚Žc<\Ñ)XÉ…b\"A™ ŒfjÄøª†Äš+“±cpx\Ím”©˜5ÚŠ4©?*5\Û>0\nO\"–{n\á¶\ã“\ÍWŽPÕ»Á”™\ÈŠ&\ã\Î\Æ=iO\á_<\Óa_ûw¤jŠ]•Â÷ª\ìdŠ \Ò\ã3¥	¥A&M2–\Z\Øx…õ±\Þw9«©Sp	o$\çi¡\Ød7|\ÅPFI\È.hšJ1ò\ÆùÈŒö£øä¡´ú¡L/J‹zX’#½<\'S<Ç‚j…aŽ¦$CÉ¢”E¡A±žsŒƒ\Ê²H3žþ•--t\Ü,–©+m\Ü\Ì\àdŒ?‘ô­b\Ðo3Y%ZcI\ÏÞ¨\Íy¯\'‡*\ãy#õûQ-He’ ’0;\×[ŒH]¤Á\"$õBò;M¢\Ú\Ú\ßTÌ‘#üÿ\0ºS«\é­^{©l•RRWþ¢´	{…`¶’ \'°ùU¦\Ô\Ä\\P#\r§0c:b\Î7\×t]\Ël\Ö\Ô*Ø¶ªq\09?UûR+ÒºY6\î¨\Õx™5O©\È\Î\åz›–…÷·£P´t’ j®v¬>²\Ëô]K\Ü=2[žRm’\0 \à{w\'õ®\î>N\Ø<¾n.¿\Ûÿ\0¿úŒ#`ª›JŒy1\Ï\Ó¥\ï\Üa:\r.@+Ï½ju¢\çUpH,²\Ît˜\Ä\Ë]¶”==¾™\Ñ\Ù\í\ÜF‚\Ë\á¹\Ç3±\í]I¯N5h\Æ\ê¬´ŠT¤\"cP\ßõ´VS±[ˆ·€Á’Zvõ\æ1[W\Ô\\ò’Ï’D‘ž\rfõ\Ë\á\Ý\n‡\ÐdK}{\íúU\Û\Ã+\Ã-a\åÁ\çÒ¥°c ±?½CÛ‹„xr}x\â‰\Ó)±\Ó:$¢«c:²>ž	£=¨\ê*¢”\Ë|g\Û\ØPô2}Xš†¹m!OD»z\È\Ä\\6€:T\n±\Ìf1ÀôŠ•ÔŠ¡ƒµ¢\Ü$ˆúý\êŒ.b\Ø\ÓùÚšŒžA\\/k\Ê\à\Ê\Æcz`3\\\ÛºªÓžžÔ²‚\ÈK\0H88\Ìö\Íu”\Õh›·Š\ÜÀEe&x#n(\ØZM‘b{þ{T”\ÐT´ \Ò\0¢º‹HelK.\Æ3¾&ª4D\r.A\Ë\0cýSX—\éB\Ê\á-1ˆõûmŠ«¡-¤{®>•fKº ¨\ZOA\ïE¼\æòÀ\ZŠ&•R \Æy\æ°Sø\"¶\Ö8óg+º<F(y\Ã\nltw|}i\Z¼\Ç0Hï˜¡º\"\Ù\ZS|4œ\ÌýhzYIX K–D80LþZZ3¿\"º\ài\Ô-™ž\Õ*\ìðÂˆ•®´Q}%X\ä\è&ª\Ë${Ô€C\Ïz\â|\ÃL~+U›$+¨Ž#m\êŒB\Ü D	‘Š€\År§\åJf¬gHbL€Àbyª­\Ãm¼\àÇ¥\rX–Š¼\êò²ýh“¯ýŽµ•A\ÔH‘Z?Vg5\æ\È(C#cô£Xê¡¾-\'¸\Å\nL„ømZ=m®­he29;\Z#ô¢\â—G‚z\Â\éº\é#ÄB+[§\ê˜ó5\'²ŽjGQ‚·Å¶\Û\Ñ\'P\Ô\nƒ¶ô\Å\Ëvú…0\êtö4Ó½±1*iSL\Ô\âUút¸¦TH\æ„R\ïL†‘;©„y…L\Éø}kÃ¨†\ìhddýŸÄŠº¡ß¬È­}R°\Z€3±šÍ½Ó«ù´˜;\ÐF«	\0“\'n#ò(8E\èu6D-\Ûuy§\ëA½\ÒJ“:\Ìé¿‰²\Â)ú\ZÒ·üE!ñ\ëQpœK©\ÆHÏ¿e£F©Q¶)£¥™c½o7†þaŸj^÷O«`4­R3¡$¬óW:GL\î(M`˜\Åo\Ý\éÁƒ“~˜\Õ\Ôì›´bÝ´gÍˆ gQÒ£š\Ô\ê:w\Ün;\Ò\Ïa@<ZjLxÎ„\Z\Û DFj¦†O÷	Áõÿ\0TõÁr\ëke’VB€ z\n„¶¦I®>E#‰e\Èœjò.d4U\ì g*ŸOAD35§y\ZV$–\0\çš‡§ýÐª¦\Z\Ù[@–-\ê#Òˆ,j¶\ã\Ã\Ô-9]†}$µ.þ\'Ou‹¤:’°sždQ-;xa­\å]r¥u@Ø˜;d˜\çoJf½:\ßF÷\Õm¢³\Ü#žð>ô•Þ\Û®|LA\\`ŽsN³ë² “\å\'\Î\æI® [D¶\îuk\Zxœý…ec)4!Ô—½b\ÂøcúK¤\0L	\ãóU-Y´T\ë`O\à\n\Î\çÓ¸¿©\Ïz§†2fg’Z+ü¬_Á¸¶‹ƒC6W\×÷Þ«{§u´.\0¦X\ÉS1ò\ãzmU\Õ\Î@8W\Z³<cŠ#A´Ÿ\ÜÕ«K@\É3óÀ\ß?j:2\äfQ°\n³x„8ˆXG&x;q\ß=\à QhÁQ#m=‹ŒË¯L$\r™ƒAtc\æPJ‰=‡Ö•Ä¢\ÖP\èP‡\Ä\ß\çCm^Y…Ò²A<þôW ðBÎ–$B‰L‘¾\ß/™ªµ°ˆf1ž;R\Ó(š]U\É\\­™©{¸m	£_À\ÞK«k.0`\Ù#\éûPÂŒ	z\ÙVÊ±©pL\î\rC0×¨‚>‚ óù\ÍXZ¹’5`\Ä\ç5e\é\åY3 ˜#\ëH\Ó\Z\ÐqH$˜i#­wŠM\ÝD\ë0\Æ$Qnô©ip\ÅüªpA\0H\'\×™ŒŠ\Z¤ ec‚G\"•XÖ‹-\ÅkD.}ý?z\Z° \ï18«$3\îjÃ¦“?ú\àƒö£LÖ½\Ævn}+´pWY7Ü˜\Ï\Þi£eO˜(Q\Ä¢CkY\Ñ0	\ÜZ\ß\Æ\ÌùRð˜˜\0\í\ÍX*ª¬00s\ÜQÍµ™úU\Ü\'ˆB‚«D\Îc?y¦\\i|ƒ¶$Â¬–1¥Žÿ\0:%¨·d79¨t™\Ì\×,c\å$ñTI\"m\ØFÀ\Þ`\áŽû\í]©žæ…1W*µ$Û’D\Ò{ðb‹e.‹­\êñò”h\àGHú\Èjºš]Z(¡«\Èhê±•j*0ùÒªh\èv¥hd0¦Œ¦–V¢+E#À4\'XÈ©W©ô]3­œ{W^\në‘ž\rU”©Á©w£ù\àB\ê\ËjñD±wJ\çÌ§qL\Þ\é­uš\ÝÁ*\ßQI›&\ÃB1ŽõTÔ‘:qc(J\äv\ämVb.$…÷‰4WeŠ€\Û\Íý¢¤F`s=\è©RŒ[.h\è\Þ ‚ùcœUJ®\n61ƒTj4‚B\ïGb\è2ùB‰<œoWfòÁ3‰\ÍQoA3ó3\Îß­Y)\ãµ`¶€É€\"6Š·\0\é2NM]^\'T< ñùa»\ÐV+H›PWJ\Ì1ÞŒ¤„\î\Úw5E-¶=}j\ÊD\ÌÀ–sY\äe‚ÁKB“°ÀÕ¯€Ö¥˜1\Ó8n{ýª-\Ë\\$`:Ž{þ”d@\êT„\î~û\Ðxe\nAbnl@“#H1¶Õ•üW¥k·Œ/‹\"4œ	u|£j\Ý*u\ë›;ƒ>ôOÁ•C\Ú\"©\Ç\É\Õ\Ù^Ê:0zK\ÅóqD€`bFþ¤\íŠXZ\ÎÜ´\ÖnxMˆ>R¤œOž\ÜÖŸ[Ó¿óAd\ÒE\ÌÉœb9\ïóÌ½\Ñ=\ØÐõ«‘\Î\ÛúƒóŒW§j\ìñ§\Z•P§Y`õwžõ¤´–P…\nÅ²Àýf³ú¯\á\æÉ¸¢Õ»·]§H:™rD38¦cK½¶!`\ËiÁûÉJ\Û]]Î ‹¾\ä“\Þw¤ñUXÅ‚Í™’¤·Pl%°p¥	\n½\äôÿ\0u-iÇ—P•ÿ\0\Ï[ö¼+v\í]¶…µm˜z“\Î\ã\ïEl\éþ’j.ƒ+ŒS\ÙI6tød³€K\0g™?,}j·­yn8\n-£\é\Ñ0`Ï¿o½8m­©\êj\ä  DÁ\îJ¡³m\Ñu2®A\Ó2ø\ãˆ\ÄVR4™žÖY”4iÏ“¼`P\éã§üÀ<\Èw\Äm\ßy¢Ÿ\È\ndý¿À¥ôk:\í\ëk™.HˆóŸµ=‹oeÑ’ú39„\ãIõ\Íp´PJd“qU¥u›\ÚK©˜O;ÿ\0Š=\Ë\Â÷Sm¢\à x\Ò7\Ü\ÎÕ½3_\n\0i¤\0œ\Î\Û\æ¤!DSrTÄ˜\Çz-´6\íµ¥W–ƒ‚\'c\ß \Z³Ù½fQ†s	\É\0ýó?Jk&\ä…kºYœ˜\ä\ãa\\-\Ú.’.2\ã\Ä²Ùœc÷È£\ÛkV\Ä]¶úµH ÂœDU.¥\ÄV\Ó\êy«¤*\ÖU­£ ‰žÀn>{\Òd20dÁ‘O¼™‚\Ø\Ó\íõ¡hk[ÒxJ¶\ß7.3>X™$`\×`O”fª\Ë\Ç%‡;\Í@!†¥À4­¥\áuQØ¨\'\ÛÖ«¸þ\Ò}*\È9ª© “;\àÖ°¤Hœ\Çbjá€‰\Ì\Õ\0i#Lˆª9\ÆÂˆjÃ«FGz\ç@r£4|\Â9B\Ý\ÏÎ€S/k¨6‰1Z/XFU°7³”[Žw\Ü\r¨l\Z\É0dV±%\Çþ\ÏW\Óõº”A \íZº¹\ZXˆø¯c­+°\îkS¥\ëÁ\0Ò•Á3–\\r\è\r‹wR´1;Š\å¹m€d\Æô­ž¨a•÷Ûµ9k«W„qSi¢4˜8\0D6ùš\å\ÃB‘\È4\Ût\êð\È\Û\æ—t{D‚¾^ôL-4\ì+“\0H\ï@{wmaXƒ1šk\Ë01Uu!ˆ:b\'™\Zð\ß]r\Û	‘ŠÓ³üF\Õ\Å\ÞF>µŸr\Ê9: Ö–kVdlFôc!\Ô\Ú=\0ð¯	\Ô+2\äŠÅµ\Ö]´\Þy=\ÈÁ­þ\"6¯q\ÏÖ¤\á(¼SL\ë\0i­Þˆ2Àa3kHu6®œùI\à\ÕÍ´`Hƒ÷¦\ì\ÐU3\Ï?L\Ö\çO\Îh>\Æ Žõ\è¥ð†zRÿ\0F°\n˜\îÚ¨¹\ØLw *À$Žj¥Y€V\0F	‰æ´›§U!Š’\r\íL\ÅV\ìb™4Át\0YKšKfp\ÇÒª½&±yŽ xÒºµ4\ìO“ò¢@¶¹\Æ7Šº\Ü{,Œ·XbŸ\â+8Œ¥B«i”4\0d	Ÿz\Õ#Ê¥•¢I`wúÓŠ€&É‘0Àö\Ï\çµ\n\âx \È9šW”\Ìð\îª\Ú\0 ’»\Õúk\Íjî²ˆ\Ê>—øLq¾Ù¦\Ð*© ú\æ ô\èpL)c\Z¤ã‡­¥{ !î‹Š\È$\Ü$\0»\ç\0÷¢-\ÔGAÀ†|‚q\Ô^´¡Ð³3#EÖ¹P~\Ø\ÏõB™°\Ð[JŒ51˜P1Òº\ïN\åÙ˜h\\1c‚±¥\Ò/ë¦sD$ª¨}!€$\ëZ\ÍY»j\å\ÇfÅ¹Î•¿¥\0X1,t™Ú›¹x+F‚­\Ä\è¦øuk‹lH‚Àœm\Æ?J\ÖW´–‘ZÜ¡$ƒÀö¡Ž˜\\:‚Œº<\n\'‰¨\0|¹O>õ{En=¿\ZV\Þ\ÌÀG´‘\'\çY¶&„o\ÙPÐ€’¸ÁO¤R\Ïv\â1eN3Zw…½a\0˜9\Ìs«à Œ€d\æF)^QXòV\Ì\Ëm-O®1½\å£ü­» B³‘\ÉqM.ƒ£ŒU4\é ¬®’Œ 7ò&\Å\Ñp\Ûf	‚3\'ŽØš% \ÎI€`|©£l5öð\í¨\ÖIES1<}(¬óm@\Æ0$w\Ç\Îh‚SLVâ€‚i\ç\Ó\íTV½\á˜DŽv§ß£¸T\n\'‰ŒEP@\äXH\\˜Ú™±\ÓE.²²¨>\"¢\'\Ôýc¨diB\n	Nco\Ïa\ëF+$“¹;mVKzƒ \Æ34´n\Ô	¼\Ö\Ä\í0=¨–£QXN¨\ïôûQ­ô—ž\nNûD\ç\æ>µ×¬¥§P®\nOÆ¦g;\Å…\ì´.	\n\ÞPd\01ôŒÿ\0“Ve\"Àp\ç\Ì\Ñ;l?\Ùú\Ô\é…\Ü\Zb‰4\Z<° \Äc÷¨Ý¤«ˆ\Í\Z”V\èˆÝ«\Îh\êºVš*´R–ÞŽ­RhtÆƒ	\ÞhŠÔ²š*šF†±€Æˆ\rZ®­4(6*¥#jª4“\Çj$È¡ \ì€ñ½\í½cCP=x¢±<\áˆIµuU‰$\Í.A*\Ò;{Ñº‹z\Üd7qJ(¹hvöõªª’%˜±Ñ¨g¤dUŒˆ\0ó\Å\n\Ý\ÍACj“ŽÜ\Îõ\Ì\æe§ô¤*\nM§\ãJ½¶\áhÒ \é;)aÚ†­¼œG\è“À]ZA\Èp9\êC–\çl0w«’¡2r\Ëóz\Ô«o\âþ\áŠ-²T0Nõž†Y\\A›[¿\Òò\È;’22)Z2c›\ÃmR¬\ÄÁ88üŠeô¨.§R\îjJ\Þ\ér;Á\Í\Z\É(4é‘¸ù\Ò4V/À·Y7:I&‚I³s@A˜`œð)‚¤ò\0;yùÐ¯T\íD@\â‚™½gDzÄ¸ÁŠ3Á•?µyn®\Óø\ê¾\Z\'†ª6\à–=ýM{¦¶úf\ÜÀ‰n{|ø¯üN»n2€®c\ß9\Çm\ë¿þY·hòÿ\0\íâª’Ø§Sa­µ\Æqm\Ñ`ùZ7ødO“B\êM«\ãÀWV;³’\Ð6óŒ{\à=ë–\è}h¬˜c\'>Cžw\æ•\Ò\Ö\îÜ¸\Ùðü¡uÀÄƒ8\çŸz\îHórŒ\Û\Ä\Øfº5HÄ“ˆ#o¥6—BÎª-*€Ö­\Zg9òD\Ò÷\Ú\à…K‡Àe\Ðuÿ\0aF¶÷¬t¶\í›FÕ»±¥–8¿\Þô\ïÂŸød	~\ào\êY\n`ØŽ\Û\ÅS¨k…\n\ÜK€\r*¹\Ç1žd\çz±\é\ÈtXL¨ƒm¤I\âM[Cu\Ú\Ý\äk\Î\Ì4¶¯03¶\Ù&—Y<ÑŸu<6‘\ã`q¿¥Võ¤!™?§l¶£iX6‘ŸYúæ˜½d\'N\éumM¦ \Î\ßA\ëþ3GBmøŠ‚\é\ÎÁ<ºŒ\â~¿J¥¦QZr\ÐÊƒ\\%€Ž\Û}*Š‚\åòˆ­\ê§\ÌvÉš\Ô7”\ÚÊ®›v˜)L3±gyƒ\íŽÕž\Ö\Û\Ädj09\ãüÑ‹c©x1„CmB°5\rY3ù\Ç^,T±ƒ‘\å$\ï˜\Äûª—n«¸¶²\í*\àŠB.KŠA\0Š(N¹/uË [©#T\é\Ì\Ç}\è\r\çrI\Ôd\ÆûqL0^¢ð*4£´yŽŽñB{k­•s£;\ÑMX\É\Ð\'²\ím\îÂ²®w\âwóUÐ¯$®†HÌ‘þhƒ\Ï\åLùe‰\ÅK[º/prqÞ‹\ÄnZ\n0a³ \Ðn[*d@\Þ)·]*À€3\Ð\î[%»‰š^2gøq¦G\×Ö¬cf;\×]¶ºð6\ìyª+BD\êœ)h²\ÊÀ@HRI‘\ÆjAƒ\ÍX\0rMJ²#þ†–Á£€\0j˜ö«<\ÜiƒØ•C C1hÀ\ãšà¥²>„\ï\íMf¯B)US«1ˆš\å\'Fw3;O5(\Ä	 \ZÀ¢\×9•P¤v¨[·my\Z`\\­\æ$´\n\"\'\Ìˆ¬Ñ¿b\ÇV\ËAú¥ktb¸\ç”÷WœkdF£Y\ënYÀ%uˆ>´,„øT–acª#\à}J0 \ÓI\Õ[a¦\à\ßÒ¼¯KÖ‰ø œ\È\æ´\íu\Ô\rýFôŽ	œ’R‹É¯s¦·xj¶@öÚ”¹j\å¦ó\rK;Š\ëwq(\æbŒ½L˜pOb)\Ä\r&.4@‘3½P\Ì\Ëg\åO¯O\Ó\Ý*bsš¥\Ûž[`2˜\Ìfk)#8±	sªÞ®Ù ¿H[LH$Á§—AF\ÖÌ¬~=ó\Å«2\ÜIÁ¦¶?Ä½h€|Ã±£\Ù\ë´À’†Š\êÀœö žI\ÔG4\ØaN;=rÇš3È©7m\Þ$HŸZ\Çnž\ê™Sój„»u.º†\ÒE\'ñ¯\n.Fm½«V­†p\Ä qA+\ÓõJ\'±ªtŸ\Äm½¡e·\ÚMÍm‹¦–\×j“Mlªi™DUÊ«B¹\Ü\n\Ï\nU¼“P\ÈÕÿ\0\çÒ½Uñfå° ¬€dv;oH‰y\nNJ‰>±UŒñ“?ˆ\ÉKy\æ\"qÞŒm(\nF\Ìxúz~”\ÅÎ—LiQBkN¢0sOi’ô¨²·\'S\ÚVð0È„\ÜTó>˜\æ9‰?Z›\0kð\Ú\Ùcrù´\æj\ÍrÁa&\á–ó@˜\\û}\è^C\à½ô² -˜(¨¤\Î5OÌšU\í‡!œ»`mNaa®j:@ƒ\é÷ûR\×Txöõ£AM€ðUQ\0\äAz¥À.\n³þ=i\rqB¤\ë&\0\Ýòª=—\ÒY\ÓlFù\ÏÎ•¢‘bL¤9	$÷<Uý°Ì·K\0s\å\Äö§^\åÂ¤#-0*¥u,\011\Æ;Ð¯)¯@2 ¼@F’®*eX\\\Ó]]…t\éªJJb~õ\0\ém@\âƒA\ìŠ-|\Ý\ÂÃ‘\09<Š6‹¡Þ²ª\Úu3‘æƒ·§\ÏZ\ä\0;µ\\ 53Hi\çÖµ\n\ç\à?8“€$ˆ@³*Lû\Ónm‚UŽ \0\Æ\Ý\Æÿ\0)\æ6]v\Ý\Ø(\è\ì\Ê©S\äPŽL\ZÅ‘r\Óô\ê\Þ-½ºù\È26ƒ\"=¤UmZ½\à‡r\Û\ZP1\Ê\îp;oó¨mSp–¦#\ÌU’\âŸC\él\ïœm\ë´¼\Z\Ýque‰–ƒ!§ü\èiiZ\î·V2\ÅG˜£‹zì›‹ª\â:0\ÌòýjÝ‹]C\"½Ç´3Ÿ,˜í˜ƒúQt\Ëw¨>V04¨˜ö\ï]6¼)V–@Þ¬n\Ùñ1o\È\Â\ædú\ÕÙ¡µ(>1‰1ÿ\0{\Ñ01­mÆœ7s\ëþ«……galÀ\î\Ä}|Ñƒ³–D3;‚HÛ¿Ò‰w¤ðt`D•Ÿ\ß¿±K\ÑqµZ´mÊ\å\\\ì\'1µ\Ò\\}jŒP‚&c\Û\çF»fÝ§{lI¸¤ƒcýÕ­¹K ¢\âc\ÚcjŒ\Èõú\ä\Í]\\\nX\0\ÍX^r=:­¶h\ê\ÓI[h\Å1m\ç­1¥j2µ.¦Š\rM”­Š i¸&hŠf”!•³½Zi`czº1ƒ@ºR	\ÍK[\Æ(jÂŒ­4…J\è=GJ/(\àƒ Šm”U \Z*Me\Å<30-\ËD†\ÜUš\ë˜´˜ƒ\ßö§n\Û6šÆ½Õ­‹ÿ\0\Ë^5ÿ\0vœU£ýôIÿ\0Lê†‚`\Ñ4\êCzU)±¸ˆ·ˆ¸&mŠ-a\í\\ 2ª\Ú\Ú|GB\é:|Ã˜¡º‘!‚9\ÈfU\È\ï“¿;\Ñ¢\Ú==\è\ÊÍ‰, Ž=1C‰39\ÄûW0e9ÄŒD]\Ùe$\0HÄŠ \Ô:\È\Ô\Ò	p´lJmI,J‰R`„Ú¦\Õb5\Æ#ŽõXM@¼\ç‚vüý\êPŒ’¬cO\í÷û\×kQ$—œûÒŽXÔ³\å\n\ÑLfMy\ã\ß\Â\ï?X\íe—\Ì4i-\Ìöôÿ\0‚½Qu€\Åu13$~µVK?€a¶Áªqò8J\Éóq.Xõg\Í:›‡_ú¯:¸L™#p\Ø\Üóþ*½e×»qÂ¯RZÖU\Ê>@\"gr}3>•\êÿ\0þIi|~\rµ^\"‚Á@\'´L×˜Kõƒ\Å4´,¡vb \ÄHï¿¿\Ë\Ó\ãŸxög‘\É	t¿fÝ¦Vf›‰>\"ø¢iž1¶üPzKp½{E¶?1i0`Ï°?¥0\Ý8½p7‚¡^J)b##Iûö¢z¥¸„7–\Ùó1q’ùœWA&\×\\\éÍ»\î\ÉrÏˆ<\ÌYAbI>\ã~$\Ô0Ö…\Å\r:ð\æH$L÷\çš w[_\Ì\Ùþšøn\0ý;ý~vÑ·d³*:±•e\Ãžcq\Æô1d2 \ì/[[e•W:m	Ÿ]\Îfq¨7®2\\6”ê‘§R\â@·\ßi¦¯-Õ»m\r¬¸›`‰q\é\çBº½8¸\Z\Ã\ÝC¿Ÿp\09»S&Š+ô^õÀ\Ïýg75\ê\Ò\ÚõiY>²3\'>ü\æld*³…6\å”\é ñ\Ï\é\Û5V°m–KŠR©Ô¹óµV\ê”)ýU]B  g?¥6\nli-ô·\í;±ðÆ¢d‚cñ@b÷ž.1¹¨\è,	$\í{w\\ô\Æ×Š\Ì\Ò@;–*ŒŽö‹ V@}\È÷¬°(–Ë¯‹.À$\ã\Ûó½@ñ<Å›\0l`m\'\Ðj#ºœÆž#\Óóõª\ÛaŠ\Ê\äA\æ1¯\r®–Á$É\É\Îf©¨›“lƒ\Î3½6o\ê¨¶V\Õ\Æ\\kÈ¥ü6¹€´@<\ç\å\'\åY1•LŸ\ílxô¡\ÜF´¼ù‡1Gk@Î†Õ§yûü«–ú\ÛB+\ëBQ?·l•a\ÓÉž\È#i“¹\â¨°€D(\ÛoûL¸Ó…œ\î\r\Ã\ZðLw¡£¡H^\n‚ \È\ãµ\\i œ\×:\Ï3B8Æ¬\n\r\Ùv2¸¹5Î› ²\ê\0\åIÞ¢`ú\Z\à9\Õ0iOž`‰š•–\'\Ì	«°\Ði`Àœ˜\È?\â„À\ÏÒƒe\æ\ÉÞ¬.dvûÐ\èl¨i\àÔ‚¾\ÑÚŠAT\ã¶k™ œM\nH=ý*UÁ98\â™ü?É¶\Ä\ì¼\r\éÎŸªÍ¤ö\ïJú\Ô5±2§\åKBJ*Xf½ž¸“\"´z~®Wÿ\0\àlMyUv·É¦­uP \ë\Ï+Žyÿ\0\Ï\ê=2õCL+\ëƒL[\ëhi‘¾¡û\ÖKüI4x#™§\íukt\î	Ú•\Å\Î2ŽÍ‰·|AnûP_¦†”;½..|¦ˆC`ÿ\0n*tÖw²¬“\å`j«\\HõŸ½0·\í²ù”˜\Þ*E«w3m£9š\×[|d:r\rI³l²³Tc†\î\'?½5vÛª\ådR¬¥Œœ¼QN\Âð\'s¥O7†`\Î¥Q›ªO\î,}sOxd©‘{o\\\à0v\Ü\Ó\ØSú!\ã\ÜG\ÒË¥LÓ?ñ–\ÙYnù„A‚*^Æ’ÁÂŒ\0IƒJž.¡Ï•Ii}>_Zš\È\é\çˆ\ê\í´›‚z!·b\á:^G\0\r\ë¯Ued£i\Z\"?Y:\Í\r,¬„\0|­;\Òõ^Ù¦öT\Ø(Iøµ.?\"“~ž»\ë­e\'Eø$A±£/Si\È\Õ\å–ÞŠ´\r‹xNž%¸¶LÌ´§\0\íø\"€\È\äò2I\ß\'\éNx¶_%Š\Ï\n\âˆ\ÊJ\ÜoMf³:\à`*\æV½\â…]ZØc\ì\0=)eŒ\êcœw¢V[¦\nSK©0c~\Ô¤&\Äh6Y\Û)2X	8\ÚyûPÍ­ \È2s\å\àN;Á\Å5s£{\Ór!F	vcô¡ÿ\0+uA\ädVÀT\ÚW°º–Ró¥\r\Ò\âN–\0A\Æ\â;Q3T¸.j¦‹‰”²\Ã\0…I\Èi\Åu\ß\å\ÂÎ²y#ýQ\0\'\ÜyªÀ)\ÄÐ¡û–fó	f2dóÜšµ–E¼¥Ý‘N5\r\×\×Ö`€t°”0¨ozP\ÝCPšIþ\æ;ûP\rb\×Tº³*Ä\àER\Ú\éV”˜\Î\ß.i¦´ª\ÐLžH«8_²yu0\Ó&3õ3@e5@]Éº\àT6N“\ê\'1÷¨\ÉR2¤g#õ¢ø`i\0lj\á<@\Ü0š4/…§\nd°,2Hß´~µsmm•x\0TzO­HMÕ®€s\Û:\æ\Z›\ÎŒÞµØ­˜Oy-w¢\\*VmœÈP4÷¢C0e;²ˆ“P^ÞˆÁGT#\ÒÖµµ”–¼\É\ã4ˆ\×‰¹9«CO0P°÷ª\Ú\êl[%®«»„†ƒ8ö÷¥[¨vÖ¨|¾£\é\í½”[\É\ë\Õ\åvÚ¥X«Z\Í\éº\Ð\Ë\Ókx0Þ¼\ê£\Õyµp±mX\0â™¶\Û¬\ÛW4’M7mñ\éY¡\r%lÁ3EVŽiw)¤¹\"¤\Ð\é\ëWSºµH”0pÞµpÃŠšºµ44\ï\Ú(\Èf3J\Ìf¢\Åö7X0¸¡F\íL\Ñ\Z´\ÏÖ†¬6˜¢%Á¦AšJ	!w\íS*\È\r˜¥ú®Ž\ÏR¸ •2=)¦YTc™6 5xfe\ë\Z\àf}\és¨	$\Ø\æ¶n[»^cøýÞ«ø{‹½92W·­tqú>¾œÜø\Õøi%Á9ôÚ®1\rJóŸÁŽ·Up¥\Ô@\ê6þ\Ö\ïù\Åm[¸g\ÅP\Æ\Ô\Äöüšyñ\Ê™£8\ÍZE3¤‘Ü\ëˆR\ÔNð6ô+`¹,ñ˜¦\Û.\Ü/†¢ðR¬§\ÄpLžh¶®h]&t“´\íCò6\Þ_~\ÕdN ðy .‡-\\	\âyC+j4ÒŸé¢’Yˆ™ôíŸ•gÛº\ËA\Ø\0@©G,t–Fóù\ZJmp F ‰\åO4;¤\éP\Î\'\Ì\ß!CFS\æ0t·\Ð{W; GÆ–²3x3ÿ\0ŒŸ¢¸\à¢\Ü]Jš~\ßö¼Ý«_\Ì0k\ã\Ä[²^óy„\æbw9üÚ½ñt¶Ö•f\Ù\ÒÌ³\'sŠ\Ä\ê\í\Þ]8\"\í\Ï4L<\ãa‚3\éÚ½ñG‘ÿ\0K\É\ÅþOR¶^3‡Dˆ\ß;˜‰8œ÷¨¸–\ÏVZ\â\Û7xŠ™l\É\ã\Z²#Û½<—R\ïV·¼H»\Z\Þ_HC€\Ìo¹\â\"—-¦\ê5÷4Ki\Ôi\Î9\Çj\ëO\é\È\ÝR*¶¬‹V­©k®ª\Ö\Ø\rl2Ix‘\ÛJY®ø\å><\à\ÉÏ¥Z\í‚V\Ðñ\ËQ¥n,i’H\în{\ÕÛ¨\ê\Ý[E\Ä}@xnUr=~F>TR§¡rì¬’î®ª|ÀI \â7\ÛO\ë¹\äH1lœ\Ì{ÿ\0ºµ\æb¯%µ@XI\íŒP:v\ÔRWK\Z¥H\Û?Ný\ê½p ½U\Ö7\ØÝ¹u\ÞJË‚\ÒDþø¥ú¯-\ÒK+¶¶%~\Ó\ß4x¦\ë4À\'x>¼þµ.Í‡¸¨ƒQø@\'\Ã\Øœds“Ž)S¡\Ð+\re/]o2\Ì#.00g3ŸJâ—´±¢F™\0œmC­\"`d\Ä}O\ä\ÑBª¾¥\Ù`†+#ÜŽ\ß.i¨bx« \Ûf\'Y‰1úýj–\Ø\Ã*(<´Ž\'þPÀo\ëR\åFÅ½*¾eˆ\ÝA\Øl\'zaº¡\ÛEm0º—Tµ¦>Q3‚3#÷\àúHÀ\Äp[ss\Þqóm\ÕrcW`&G­3rõ±}ž\Ê\é\ÉE\r!w\äo\Æk\n\Õ)¤‹žÁÊ™ü\èL\Í:•\ã\ZD\r:\Ü¦\Âuj39$Ô­´¹o\Ú<Ä·c\ÏÊ·\ì\ÊU±M(\Ë\åi*Ñ·”úÐt³d\0NÂŽT¢²‹ŠTö\'Ž~{PXX™^˜ÿ\0”hª(À\åN¥––6A™8¦˜`\à\Äbx¨ðÛ¾™`8\Ä\02q¾+aŒ¨A†‰‰Ç­]Rm3xª#ûN\íF€dF©\Úx¡=­<oB¬·k;û„fÂ¤,«.\0\ìxªªF$\ä\Ñ.\â\Ûi¹\n±,\Ó\'\Ó”’m\ZŠ€S\ÊZQ£P¨D\é\'¸ª™^LsR­­t˜Î¬\Ï8œPlj;Q&\"{WaO\Ã>õÀ-G*¡‰3´Ö¶Æ¢\Ú\àÀù«-\è\Å\\@;k™a´©,Fþµ¬\Î(hC/\ïU\"6¥\Ñ\á}h¦\è,H8SZ«AüKz@n{\Ñm\ÞU‚¸\'x° Þ¸\È\ÌH\äŠ$\ÜÁ«k®eÂŸ`O\ïO\Ø\ë54O½yµº$	ƒ\ëŠf\ßUhó\àøzU¼§û±ÚŠ/Á;×žµ\×2\ãTóšn\Ï\\	\ÌGy \âˆ8IŠ\Ø\Ã4.\Ù\ÄU‚£¶cj\ÍN¬3ô£òwŸQSqb\Ú{Y\ÄûPn\Ù\Òr7\ì(–º°«œÇ­]º›nH†—û&5*{lqB¸…ró8ŒqM\ÜTfô=ŒP§Y*\Ûú\Õ…Š!$ü$pf(oKAL0Fi›ŒG\Ä0{ó\\\ÅF¥\0ŽA9¦\ÐS3\îZPg°\íP\\@4’=Gø­¶Ñ˜\è)Ú‚l\"°\Ôò§xº\Å¾Š/U\Ô!}\'cõ¢/Z\Î@\n\Ê\Ä\î§j\ç³3š)ðŠÀ2{~ûÖ¦?õ~\r\'[\0\0òÓ±À¢ÿ\0>¬þ¤yA\Éö¬ûºBÀH¨lG\"—\Z¸i\íž)Fè™¸:°]Ÿ++œlùšå¸€†Hþõˆn8&Xús\ÆõÈ“¿½`ún0]&X36DñU\ÐK’L@«5‰üÃ®Ä‰\ìhÃ­º»\Ý\Ô#š6+\á’4X‚	ƒÀõ¡²†2dF\"sÿ\0)Oÿ\0¨<\É*Orj\ËüA·…ÿ\0jÖürC¨–Š\È\Ô.\Û\Þj\Ú^\Óøb<\ÇR‚<\Ò­b5h{\ÍYÿ\0‰5\æ’\00yC\Ýf6B\è·t­s«\åUfºsp±ð\Ï\0\æ¦i&\ë…Z\çZ\áÁ*c\Ì1?\â+`=&\ÆaŸrjSJ\ì&Di\'jJ\ç\\R\á\Ð\ÃL\á€?Q\\\ÝI\Ô\Þ‡\0‘¨ ˜8\à4,o\â\æ°<§1<\ÕZ\í¿ \'r{þ\Z\Íñ.öÌ–lgs\éQp^U2•:I\ÜO¿\ÈÑ±—\ä\Ð]Ÿ„&\ægT©+½c¼®£“=\è7Kh0d wöü\ÑeH-l°$@¼oúv¡e#Æ‘+\Ü*˜…À¶â«¼ˆ¼MY\0\å	’#<U™Ii\nF±@®©l\Ôÿ\0Oq‰‰®®®v2n\Ýd\êÕ”æ¶­A\í]]ZZD\Ö\ÆâŽ„\×WT\Â5l’\ÑEuuE\ìu ŠM\\\Z\ê\êV1r%#oj\åøÈ…uua^\Æmljdƒ]]I\éOƒ†ªÀæºº€N«3øµ¤eæºº©\Çþˆòÿ\0†xo\ã6¢\êY\ìJ6™™\æ+WøYz\ïIf\í\ÂŸ\rŒ\Z\ê\êõ¹³Ä™\ç\Ïþ™¹n\ë+‚˜4Õ•sÀ&ºº¼\É’%lj\ÊH$q\Õ\Ô\0\É\ÔX€c>”du“€Æºº³[,`L\ïV¾<4VRFWdý+«¨-\à¯VüT1ÿ\0j\Åþ «e\à]z™d10dz#\Õ\Õ\Ñ\Æ\Ý|\É6„º\ç\î\Ükhª/9¢c\ë\ëP\È-_·¤’n1\'yb?C]]]±ÿ\0(ò\åŽL}vØ±\Óøö\Ë+–i\Î@\Ï}\ÏÖ”\ê´ÛºQQByFž#â­uuQlAÒ¥\Û+u\Ëg\"qŠª \é\î¨C2 ù³\0®®«È¥ºd€\ÍËŒ%—o¥/|—²—\ØË½\Æ\r\ë±ýë«ª^Aªi®nC\0\Û3B™KDD\È««©\ÑJ9\Ë3€X\àŒóF¶Šo\ÛPºu2)`L\ä	ýI®®­!–€uK\á²FAEh>¹5SqÁ>b`\íŸök«©\Ð\Ì5«\ï-mòŠ-¶®\ndL\ê+««e®\ÛSÔ­”oñE\'r\ØðµI’N>Ÿæºº´F€f\0 \'L\íUs€;\n\ê\ê,\é^u¦\ë0\0H˜Œt&ÃŠ\ê\êTxC*ùHP¾Y\ÅON¾5Ð¬H=LWWR½ÿ\0ˆ&A\á\æO\íþj„Bƒ\í]]SEQkˆõ\Å\ä	\æ†\ä†Ó¨0&ººˆQ\ÌìŒ«º®@lŠ\çs¥H\0Nñ\ÍuuQÉœòIPŽt“ \ï]]G\Ó‚@ÚŠ¬Muu2D”²w ·”\ruuf’—VüS6®¹15\ÕÕ¼‰Ú¸Ë±Þžµu´¨žNk«©?‘&¬Œ|A\êk«¨=ô!vñ\"{\×® \çj\ê\êS¨º@©U\r\å;WWV2)}« .\Äf•¹¼\×WQˆ\Ì\r\Õ9ÿ\0t)>y\Ér±\éü\×WQô¬tP“o]¡B³@œf+««T£T	š—²‚w®® Á‹Kª=\éT\Ò\ãa5\ÕÔ…\"³É ¹$\Ìó]]J\Ë\Äk¥3p\åöâ†¨	®®§&¶Èº \0€UŒ€ F9®®¥\\«zmPŒŽ\Õ\Õ\ÔÀ\Ô/c¤d9¿d»Hûd\Ç\ÉGÞ‚×®5¢,ÁŠÉ‰\Ï3õ®® ´M\Önœ¡ˆV\0yDýjSÎ¬O\Õ\Ô@É€@\Ø\×GˆÊŒN™Úºº™ÿ\Ù'),(25,'testdd135','cc1234','à¸™à¸²à¸‡à¸ªà¸²à¸§à¸‹à¸µ','4','test@sat.or.th','User','Pending','2025-02-25 04:43:16','2025-02-25 04:43:16','à¸à¹ˆà¸²à¸¢à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥','à¸à¸­à¸‡à¸šà¸£à¸´à¸«à¸²à¸£à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥ à¸à¸à¸—.','à¸‡à¸²à¸™à¸ªà¸§à¸±à¸ªà¸”à¸´à¸à¸²à¸£à¹à¸¥à¸°à¹à¸£à¸‡à¸‡à¸²à¸™à¸ªà¸±à¸¡à¸žà¸±à¸™à¸˜à¹Œ',NULL),(26,'orada','12345','à¸­à¸£à¸”à¸²','8732','orada.s@sat.or.th','User','Approved','2025-02-25 04:44:09','2025-02-25 04:44:45','à¸à¹ˆà¸²à¸¢à¸à¸²à¸£à¸„à¸¥à¸±à¸‡','à¸à¸­à¸‡à¸šà¸±à¸à¸Šà¸µ','à¸‡à¸²à¸™à¸£à¸°à¸šà¸šà¸šà¸±à¸à¸Šà¸µ',NULL),(27,'test_55','td678','à¸™à¸²à¸¢ à¹€à¸­à¹€à¸­','235731325','test5@sat.or.th','User','Pending','2025-02-26 03:14:31','2025-02-26 03:14:31','à¸à¹ˆà¸²à¸¢à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥','à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥ à¸à¸à¸—.','à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¸—à¸£à¸±à¸žà¸¢à¸²à¸à¸£à¸šà¸¸à¸„à¸„à¸¥',NULL),(28,'test_eiei','eiei22','à¸™à¸²à¸‡à¸ªà¸²à¸§ à¸­à¸¸à¹Šà¸šà¸­à¸´à¹Šà¸š','213459999','test5@sat.or.th','User','Approved','2025-02-26 04:23:24','2025-02-26 04:25:14','à¸à¹ˆà¸²à¸¢à¸™à¹‚à¸¢à¸šà¸²à¸¢à¹à¸¥à¸°à¹à¸œà¸™','à¸à¸­à¸‡à¹à¸œà¸™à¸‡à¸²à¸™à¹à¸¥à¸°à¸‡à¸šà¸›à¸£à¸°à¸¡à¸²à¸“','à¸‡à¸²à¸™à¸žà¸±à¸’à¸™à¸²à¹à¸¥à¸°à¸›à¸£à¸°à¸ªà¸²à¸™à¹à¸œà¸™',NULL),(29,'test1','12345','à¸™à¸²à¸¢à¹€à¸­à¸­','8712','orada.s@sat.or.th','User','Approved','2025-02-26 10:54:14','2025-02-26 10:56:21','à¸ªà¸³à¸™à¸±à¸à¸œà¸¹à¹‰à¸§à¹ˆà¸²à¸à¸²à¸£','à¸à¸­à¸‡à¸à¸¥à¸²à¸‡','à¸‡à¸²à¸™à¸˜à¸¸à¸£à¸à¸²à¸£à¹à¸¥à¸°à¸ªà¸²à¸£à¸šà¸£à¸£à¸“',NULL),(30,'kk123','12345','à¸à¸Šà¸à¸£ à¸ªà¸²à¸£à¹„à¸—à¸¢','8714','orada.s@sat.or.th','User','Pending','2025-02-26 11:23:47','2025-02-26 11:23:47','à¸à¹ˆà¸²à¸¢à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨','à¸à¸­à¸‡à¸žà¸±à¸’à¸™à¸²à¸£à¸°à¸šà¸šà¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨','à¸‡à¸²à¸™à¸ªà¸™à¸±à¸šà¸ªà¸™à¸¸à¸™à¸à¸²à¸£à¹ƒà¸Šà¹‰à¸£à¸°à¸šà¸šà¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µà¸ªà¸²à¸£à¸ªà¸™à¹€à¸—à¸¨',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_backup`
--

DROP TABLE IF EXISTS `users_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_backup` (
  `id` int NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'User',
  `status` varchar(50) DEFAULT 'Pending',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `department_name` varchar(255) DEFAULT NULL,
  `section_name` varchar(255) DEFAULT NULL,
  `task_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_backup`
--

LOCK TABLES `users_backup` WRITE;
/*!40000 ALTER TABLE `users_backup` DISABLE KEYS */;
INSERT INTO `users_backup` VALUES (1,'chayuda23','ch_232545','à¸™à¸²à¸‡à¸ªà¸²à¸§à¸Šà¸à¸¸à¸”à¸² à¹€à¸£à¸·à¸­à¸‡à¸‚à¸³','0992844532','chayudar64@nu.ac.th','Admin','active','2024-12-03 08:38:57','2024-12-11 02:45:47',NULL,NULL,NULL),(7,'admintest1','Ad12345678','à¸™à¸²à¸‡à¸ªà¸²à¸§à¸ªà¸¡à¹ƒà¸ˆ à¹ƒà¸ˆà¸«à¸²à¸¢','6','Admintest1@sat.or.th','User','Pending','2024-12-12 06:38:29','2024-12-12 06:38:29','7','3','6');
/*!40000 ALTER TABLE `users_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'inventory_management'
--

--
-- Dumping routines for database 'inventory_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-27 11:09:35
