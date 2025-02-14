-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: newstock.sat.or.th    Database: inventory_management
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

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
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `request_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `approval_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `remarks` text,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity` int DEFAULT NULL,
  `return_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `borrow_requests_ibfk_1` (`product_id`),
  CONSTRAINT `borrow_requests_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `borrow_requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_requests`
--

LOCK TABLES `borrow_requests` WRITE;
/*!40000 ALTER TABLE `borrow_requests` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Imation','วัสดุ'),(2,'Compex','วัสดุ'),(3,'Asus','อุปกรณ์'),(4,'Laser','วัสดุ'),(5,'Panasonic','วัสดุ'),(6,'NEC','วัสดุ'),(7,'Xerox','วัสดุ'),(8,'Genius','วัสดุ'),(9,'Seagate','วัสดุ'),(10,'P&A','วัสดุ'),(11,'AMP','วัสดุ'),(12,'Lexmark','วัสดุ'),(13,'Kyocera','วัสดุ'),(14,'SAMUANG','วัสดุ'),(15,'HP','อุปกรณ์'),(16,'Soccomec','อุปกรณ์'),(17,'Syndome','อุปกรณ์'),(18,'E power','อุปกรณ์'),(19,'Stony','อุปกรณ์'),(20,'Acer','อุปกรณ์'),(21,'LENOVO','อุปกรณ์'),(22,'Brother','วัสดุ'),(23,'CANON','วัสดุ');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'วัสดุคอมพิวเตอร์','วัสดุ'),(2,'อุปกรณ์คอมพิวเตอร์','อุปกรณ์');
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
  `type` enum('ฝ่าย/สำนัก','เลขา') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,' รองผู้ว่าการฝ่ายกีฬาอาชีพและกีฬามวย','เลขา'),(2,'รองผู้ว่าการฝ่ายส่งเสริมกีฬา','เลขา'),(3,'รองผู้ว่าการฝ่ายกีฬาเป็นเลิศและวิทยาศาสตร์การกีฬา','เลขา'),(4,'รองผู้ว่าการฝ่ายยุทธศาสตร์และเทคโนโลยีสารสนเทศ','เลขา'),(5,'รองผู้ว่าการฝ่ายบริหาร','เลขา'),(6,'ฝ่ายตรวจสอบภายใน','ฝ่าย/สำนัก'),(7,'สำนักผู้ว่าการ','ฝ่าย/สำนัก'),(8,'สำนักงานควบคุมการใช้สารต้องห้ามทางการกีฬา','ฝ่าย/สำนัก'),(9,'ฝ่ายการคลังกองทุน','ฝ่าย/สำนัก'),(10,'สำนักกฎหมาย','ฝ่าย/สำนัก'),(11,'ฝ่ายการคลัง','ฝ่าย/สำนัก'),(12,'ฝ่ายทรัพยากรบุคคล','ฝ่าย/สำนัก'),(13,'ฝ่ายนโยบายและแผน','ฝ่าย/สำนัก'),(14,'ฝ่ายเทคโนโลยีสารสนเทศ','ฝ่าย/สำนัก'),(15,'ฝ่ายพัฒนากีฬาเป็นเลิศ','ฝ่าย/สำนัก'),(16,'ฝ่ายวิทยาศาสตร์การกีฬา','ฝ่าย/สำนัก'),(17,'สำนักงานคณะกรรมการกีฬาอาชีพ','ฝ่าย/สำนัก'),(18,'สำนักงานคณะกรรมการกีฬามวย','ฝ่าย/สำนัก'),(19,'ฝ่ายธุรกิจกีฬา','ฝ่าย/สำนัก'),(20,'ฝ่ายกีฬาภูมิภาค','ฝ่าย/สำนัก'),(21,'ฝ่ายวิศวกรรมกีฬา','ฝ่าย/สำนัก');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CE278AC','-',2,'In Stock','',0,'-'),(2,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CE505AC','-',2,'In Stock','',0,'-'),(3,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF226A','-',3,'In Stock','',0,'-'),(4,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CE255A','-',25,'In Stock',NULL,0,'-'),(5,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','Q7553A','-',10,'In Stock',NULL,0,'-'),(6,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF210A','-',15,'In Stock',NULL,0,'-'),(7,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF211A','-',20,'In Stock',NULL,0,'-'),(8,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF212A','-',10,'In Stock',NULL,0,'-'),(9,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF213A','-',5,'In Stock',NULL,0,'-'),(10,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF350A','-',10,'In Stock',NULL,0,'-'),(11,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF351A','-',15,'In Stock',NULL,0,'-'),(12,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF352A','-',20,'In Stock',NULL,0,'-'),(13,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET','CF353A','-',25,'In Stock',NULL,0,'-'),(14,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','CANON','FX10','-',15,'In Stock',NULL,0,'-'),(15,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother HL-L6200DW','TN-3448','-',40,'In Stock',NULL,0,'-'),(16,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother HL-L8260CDN','TN-451 BK','-',20,'In Stock',NULL,0,'-'),(17,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother HL-L8260CDN','TN-451 C','-',5,'In Stock',NULL,0,'-'),(18,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother HL-L8260CDN','TN-451 Y','-',10,'In Stock',NULL,0,'-'),(19,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother HL-L8260CDN','TN-451 M','-',20,'In Stock',NULL,0,'-'),(20,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother MFC-L2715DW','TN-2480','-',10,'In Stock',NULL,0,'-'),(21,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother MFC-MFC-L3750CDW','TN-263 BK','-',10,'In Stock',NULL,0,'-'),(22,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother MFC-MFC-L3750CDW','TN-263 C','-',15,'In Stock',NULL,0,'-'),(23,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother MFC-MFC-L3750CDW','TN-263 Y','-',20,'In Stock',NULL,0,'-'),(24,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother MFC-MFC-L3750CDW','TN-263 M','-',10,'In Stock',NULL,0,'-'),(25,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother','TN351 BK','-',25,'In Stock',NULL,0,'-'),(26,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother','TN351C','-',20,'In Stock',NULL,0,'-'),(27,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother','TN351Y','-',15,'In Stock',NULL,0,'-'),(28,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Brother','TN351M','-',10,'In Stock',NULL,0,'-'),(29,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','EPSON','LQ-310','-',22,'In Stock',NULL,0,'-'),(30,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','EPSON','LQ-590','-',15,'In Stock',NULL,0,'-'),(31,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','Ribbon Cartridge7753/ S015141','LQ-300+300+ll','-',10,'In Stock',NULL,0,'-'),(32,'วัสดุคอมพิวเตอร์','หมึกพิมพ์','SAMAUNG','MLT-309S','-',5,'In Stock',NULL,0,'-'),(33,'อุปกรณ์คอมพิวเตอร์','คอมพิวเตอร์','ASUS','P1440FA','KBNXCV09T56147D',1,'In Stock',NULL,0,'9D-02-03-031/63'),(34,'อุปกรณ์คอมพิวเตอร์','คอมพิวเตอร์','LENOVO','20X2S75N00','PF3MQE0S',1,'In Stock',NULL,0,'9D-02-03-461/65'),(35,'อุปกรณ์คอมพิวเตอร์','คอมพิวเตอร์','LENOVO','20X2S75N22','PF3MSKMA',1,'In Stock',NULL,0,'9D-02-03-474/65'),(36,'อุปกรณ์คอมพิวเตอร์','คอมพิวเตอร์','LENOVO','20X2S75N00','PF3MSK93',1,'In Stock',NULL,0,'-'),(37,'อุปกรณ์คอมพิวเตอร์','คอมพิวเตอร์','ASUS','P1440FA','KBNXCV09T620478',1,'In Stock',NULL,0,'9D-02-03-039/63');
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
  `type` varchar(255) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,NULL,'นางสาว สมฤทัย','สำนักผู้ว่าการ','235731325','test17@sat.or.th','CE278AC','วัสดุคอมพิวเตอร์','หมึกพิมพ์','HP LASERJET',NULL,'','Pending',NULL,NULL,NULL,NULL,0,'2025-02-13 09:12:55','2025-02-13 09:14:26');
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
INSERT INTO `sections` VALUES (1,'กองตรวจสอบการดำเนินงาน กกท.',6,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(2,'กองตรวจสอบการดำเนินงานกองทุน',6,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(3,'กองกลาง',7,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(4,'กองประชาสัมพันธ์',7,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(5,'กองประสานความร่วมมือระหว่างประเทศ',7,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(6,'กองควบคุมการใช้สารต้องห้ามทางการกีฬา',8,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(7,'กองบริหารงานสร้างน้ำยาทางการกีฬา',8,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(8,'กองบัญชีกองทุน',9,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(9,'กองการเงินกองทุน',9,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(10,'กองพัสดุกองทุน',9,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(11,'กองคดี',10,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(12,'กองพัฒนากฎหมาย',10,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(13,'กองทะเบียนสมาคมกีฬา',10,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(14,'กองบัญชี',11,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(15,'กองการเงิน',11,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(16,'กองพัสดุ',11,'2024-12-06 07:00:12','2024-12-06 07:00:12'),(17,'กองบริหารทรัพยากรบุคคล กกท.',12,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(18,'กองพัฒนาทรัพยากรบุคคล กกท.',12,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(19,'กองพัฒนาองค์กรและนวัตกรรม',12,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(20,'กองนโยบายและบริหารความเสี่ยง',13,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(21,'กองแผนงานและงบประมาณ',13,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(22,'กองติดตามและประเมินผล',13,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(23,'กองบริการเทคโนโลยีสารสนเทศ',14,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(24,'กองพัฒนาระบบเทคโนโลยีสารสนเทศ',14,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(25,'กองพัฒนากีฬาเป็นเลิศ',15,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(26,'กองแข่งขันกีฬาเป็นเลิศ',15,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(27,'กองพัฒนาบุคลากรกีฬา',15,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(28,'กองวิทยาศาสตร์การกีฬา',16,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(29,'กองเวชศาสตร์การกีฬา',16,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(30,'กองวิจัยและพัฒนาวิทยาศาสตร์การกีฬา',16,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(31,'กองศูนย์ฝึกกีฬาแห่งชาติ',16,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(32,'กองบริหารงานและประเมินผลกีฬาอาชีพ',17,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(33,'กองส่งเสริมพัฒนากีฬาอาชีพ',17,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(34,'กองบริหารงานกีฬามวย',18,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(35,'กองส่งเสริมพัฒนากีฬามวย',18,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(36,'กองพัฒนาการตลาดและสิทธิประโยชน์',19,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(37,'กองบริการอาคารและกิจกรรมกีฬา',19,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(38,'กองบริหารสินทรัพย์และส่งเสริมอุตสาหกรรมการกีฬา',19,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(39,'กองบริหารงานกีฬาภูมิภาค',20,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(40,'กองพัฒนากีฬาภูมิภาค',20,'2024-12-06 07:00:12','2025-01-24 02:14:49'),(41,'กองวิศวกรรม',21,'2024-12-06 07:00:12','2025-01-24 02:08:53'),(42,'กองซ่อมบำรุง',21,'2025-01-24 02:08:53','2025-01-24 02:08:53');
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
INSERT INTO `tasks` VALUES (1,'งานตรวจสอบ 1',1,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(2,'งานตรวจสอบ 2',1,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(3,'งานพัฒนาการตรวจสอบภายใน',1,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(4,'งานตรวจสอบกองทุน 1',2,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(5,'งานตรวจสอบกองทุน 2',2,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(6,'งานธุรการและสารบรรณ',3,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(7,'งานเลขานุการและการประชุม',3,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(8,'งานส่งเสริมการกำกับดูแลที่ดี',3,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(9,'งานประชาสัมพันธ์',4,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(10,'งานผลิตสื่อ',4,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(11,'งานประสานองค์กรกีฬาระหว่างประเทศ',5,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(12,'งานวิเทศสัมพันธ์',5,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(13,'งานวิชาการสารต้องห้ามทางการกีฬา',6,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(14,'งานตรวจสารต้องห้าม',6,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(15,'งานนิติการสารต้องห้ามทางการกีฬา',7,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(16,'งานเลขานุการสารต้องห้ามทางการกีฬา',7,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(17,'งานระบบบัญชีกองทุน',8,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(18,'งานประมวลผลบัญชีกองทุน',8,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(19,'งานบัญชีลูกหนี้กองทุน',8,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(20,'งานการเงินกองทุน 1',9,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(21,'งานการเงินกองทุน 2',9,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(22,'งานเบิกจ่ายเงินกองทุน',9,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(23,'งานจัดซื้อจัดจ้างกองทุน',10,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(24,'งานบริหารสัญญากองทุน',10,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(25,'งานบริหารพัสดุกองทุน',10,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(26,'งานคดี',11,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(27,'งานนิติการ',11,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(28,'งานพัฒนากฎหมาย',12,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(29,'งานบริหารและกำกับติดตามกฎหมาย',12,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(30,'งานทะเบียนสมาคมกีฬา',13,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(31,'งานทะเบียนสมาคมกีฬาประจำกรุงเทพมหานคร',13,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(32,'งานระบบบัญชี',14,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(33,'งานประมวลผลบัญชี',14,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(34,'งานบัญชีลูกหนี้',14,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(35,'งานการเงิน กกท.',15,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(36,'งานการเงินองค์กรกีฬา',15,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(37,'งานจัดซื้อจัดจ้าง',16,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(38,'งานคลังพัสดุและยานพาหนะ',16,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(39,'งานบริหารสัญญา',16,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(40,'งานบริหารทรัพยากรบุคคล',17,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(41,'งานสวัสดิการและแรงงานสัมพันธ์',17,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(42,'งานจริยธรรมและวินัย',17,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(43,'งานพัฒนาทรัพยากรบุคคล',18,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(44,'งานพัฒนาค่านิยมและส่งเสริมความผูกพันองค์กร',18,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(45,'งานพัฒนาองค์กร',19,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(46,'งานบริหารองค์ความรู้และส่งเสริมนวัตกรรม',19,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(47,'งานนโยบายและแผน',20,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(48,'งานบริหารความเสี่ยง',20,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(49,'งานพัฒนาและบริหารผู้มีส่วนได้เสียและลูกค้า',20,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(50,'งานพัฒนาและประสานแผน',21,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(51,'งานงบประมาณ',21,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(52,'งานวิเคราะห์และประเมินผล',22,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(53,'งานติดตามงบประมาณ',22,'2024-12-06 07:44:08','2024-12-06 07:44:08'),(54,'งานปฏิบัติการเทคโนโลยีสารสนเทศ',23,'2024-12-06 07:44:08','2025-01-24 03:15:49'),(55,'งานบริการเทคโนโลยีสารสนเทศ',23,'2024-12-06 07:44:08','2025-01-24 03:15:49'),(56,'งานพัฒนาระบบสารสนเทศ',24,'2024-12-06 07:44:08','2025-01-24 03:15:49'),(57,'งานสนับสนุนการใช้ระบบเทคโนโลยีสารสนเทศ',24,'2024-12-06 07:44:08','2025-01-24 03:15:49'),(58,'งานวิเคราะห์และพัฒนากีฬาเป็นเลิศ',25,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(59,'งานกำกับดูแลและติดตามประเมินผลกีฬาเป็นเลิศ',25,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(60,'งานแข่งขันกีฬาระดับชาติ',26,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(61,'งานแข่งขันกีฬาระดับนานาชาติ',26,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(62,'งานพัฒนาบุคลากรกีฬาระดับชาติ',27,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(63,'งานพัฒนาบุคลากรกีฬาระดับนานาชาติ',27,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(64,'งานพัฒนาศักยภาพกีฬา',28,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(65,'งานทดสอบสมรรถภาพกีฬา',28,'2024-12-06 07:44:08','2025-01-24 03:40:05'),(66,'งานศูนย์บริการทางการแพทย์กีฬา',31,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(67,'งานตรวจรักษา',31,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(68,'งานบริหารศูนย์ฝึกกีฬาแห่งชาติ',31,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(69,'งานวิจัยวิทยาศาสตร์การกีฬา',31,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(70,'งานกำกับควบคุมและติดตามประเมินผลกีฬาอาชีพ',32,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(71,'งานเลขานุการการประชุมกีฬาอาชีพ',32,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(72,'งานส่งเสริมและมาตรฐานกีฬาอาชีพ',33,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(73,'งานพัฒนากีฬาอาชีพ',33,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(74,'งานกำกับควบคุมกีฬามวย',34,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(75,'งานเลขานุการการประชุมกีฬามวย',34,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(76,'งานส่งเสริม พัฒนา และสวัสดิการกีฬามวย',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(77,'งานมาตรฐานและติดตามประเมินผลกีฬามวย',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(78,'สถาบันมวยไทยแห่งชาติ',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(79,'งานมาตรฐาน วิจัย พัฒนา และส่งเสริมนวัตกรรมกีฬามวยไทย',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(80,'งานรับรองมาตรฐานกีฬามวยไทย',35,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(81,'งานแผนและพัฒนาการตลาด',36,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(82,'งานลูกค้าสัมพันธ์และคุ้มครองสิทธิ์',36,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(83,'งานแผนและบริการอาคารสถานที่',37,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(84,'งานแผนและบริการกิจกรรมกีฬา',37,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(85,'งานบริหารสินทรัพย์',38,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(86,'งานส่งเสริมและสนับสนุนอุตสาหกรรมการกีฬา',38,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(87,'งานบริหารกีฬาภูมิภาค',39,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(88,'งานแข่งขันกีฬาภูมิภาค',39,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(89,'งานพัฒนานักกีฬาภูมิภาค',40,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(90,'งานพัฒนาบุคลากรกีฬาภูมิภาค',40,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(91,'งานวิเคราะห์และประเมินโครงการลงทุน',41,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(92,'งานสำรวจ ออกแบบ และประเมินราคา',41,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(93,'งานควบคุมการก่อสร้าง',41,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(94,'งานซ่อมบำรุงอาคาร',42,'2024-12-06 07:44:08','2025-01-24 03:11:53'),(95,'งานซ่อมบำรุงพัสดุ ครุภัณฑ์ และอุปกรณ์กีฬา',42,'2024-12-06 07:44:08','2025-01-24 03:11:53');
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
INSERT INTO `temp_categories` VALUES (1,'วัสดุคอมพิวเตอร์','วัสดุ'),(2,'อุปกรณ์คอมพิวเตอร์','อุปกรณ์'),(10,'สายแลน','3');
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
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Itstaff','it1234','นางสาวชยุดา เรืองขำ','o2xxxxxxxxx','kawneaw27@gmail.com','IT','Approved','2024-12-12 07:14:40','2025-02-07 03:14:32','ฝ่ายเทคโนโลยีสารสนเทศ','กองพัฒนาระบบเทคโนโลยีสารสนเทศ','งานพัฒนาระบบสารสนเทศ',NULL),(2,'test_6','teat611','นายสมหมาย ','02xxxxxx','test6@sat.or.th','Approver','Approved','2024-12-25 02:15:58','2025-02-11 08:23:49','ฝ่ายทรัพยากรบุคคล','กองบริหารทรัพยากรบุคคล กกท.','งานสวัสดิการและแรงงานสัมพันธ์',NULL),(3,'testAB11','Ac123','นางสาว สมฤทัย','235731325','test17@sat.or.th','User','Approved','2025-02-04 03:18:12','2025-02-06 02:47:44','สำนักผู้ว่าการ','กองประชาสัมพันธ์','งานผลิตสื่อ',NULL),(4,'testUser1','ch123','นาย บี','021345678','test@sat.or.th','User','Pending','2025-02-04 04:40:32','2025-02-06 02:47:44','สำนักงานคณะกรรมการกีฬามวย','กองบริหารงานกีฬามวย','งานกำกับควบคุมกีฬามวย',NULL),(21,'test11','aa1234','นาย ซี','021234467','test@sat.or.th','User','Pending','2025-02-07 03:23:54','2025-02-07 03:23:54','ฝ่ายทรัพยากรบุคคล','กองบริหารทรัพยากรบุคคล กกท.','งานสวัสดิการและแรงงานสัมพันธ์',NULL);
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
INSERT INTO `users_backup` VALUES (1,'chayuda23','ch_232545','นางสาวชญุดา เรืองขำ','0992844532','chayudar64@nu.ac.th','Admin','active','2024-12-03 08:38:57','2024-12-11 02:45:47',NULL,NULL,NULL),(7,'admintest1','Ad12345678','นางสาวสมใจ ใจหาย','6','Admintest1@sat.or.th','User','Pending','2024-12-12 06:38:29','2024-12-12 06:38:29','7','3','6');
/*!40000 ALTER TABLE `users_backup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-14 17:12:53
