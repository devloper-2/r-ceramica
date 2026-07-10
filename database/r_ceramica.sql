
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','editor') NOT NULL DEFAULT 'editor',
  `last_login_at` datetime DEFAULT NULL,
  `failed_attempts` int(11) NOT NULL DEFAULT 0,
  `locked_until` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'R Ceramica Admin','admin@rceramica.com','$2y$10$Lr.9JpJ2YpK11SH3u/POk.NKc2T6N40gBRkxczk8.0NSYb/YAPQ3m','admin','2026-07-10 09:40:46',0,NULL,'2026-07-10 05:14:59','2026-07-10 09:40:46');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `record_id` bigint(20) unsigned DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `audit_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,NULL,'login_failed:badpass','admin_users',1,'::1','curl/8.18.0','2026-07-10 05:32:53'),(2,1,'login_success','admin_users',1,'::1','curl/8.18.0','2026-07-10 05:32:53'),(3,1,'login_success','admin_users',1,'::1','curl/8.18.0','2026-07-10 05:37:41'),(4,1,'section_update','sections',1,'::1','curl/8.18.0','2026-07-10 05:38:01'),(5,1,'section_update','sections',1,'::1','curl/8.18.0','2026-07-10 05:38:19'),(6,1,'login_success','admin_users',1,'::1','curl/8.18.0','2026-07-10 09:34:02'),(7,1,'section_update','sections',17,'::1','curl/8.18.0','2026-07-10 09:34:05'),(8,1,'section_update','sections',17,'::1','curl/8.18.0','2026-07-10 09:34:05'),(9,1,'login_success','admin_users',1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','2026-07-10 09:40:46'),(10,1,'page_update','pages',2,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','2026-07-10 09:42:53'),(11,1,'publish:not_configured',NULL,NULL,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','2026-07-10 09:43:08');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'tiles','Tiles',0),(2,'bathrooms','Bathrooms',1),(3,'accessories','Accessories',2);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `path` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `mime` varchar(100) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `size_bytes` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'photo-1584622650111-993a426fbf0a','https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200','Petra vessel basin in natural granite','image/jpeg',NULL,NULL,NULL,'2026-07-10 05:14:59'),(2,'photo-1631679706909-1844bbd07221','https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=1200','Obsidian mono basalt basin','image/jpeg',NULL,NULL,NULL,'2026-07-10 05:14:59'),(3,'photo-1604709177225-055f99402ea3','https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&q=80&w=1200','Calcite flow large-format porcelain slab','image/jpeg',NULL,NULL,NULL,'2026-07-10 05:14:59'),(4,'photo-1552321554-5fefe8c9ef14','https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200','Luxe chrome basin mixer tap','image/jpeg',NULL,NULL,NULL,'2026-07-10 05:14:59');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2026-07-10-120001','App\\Database\\Migrations\\CreateMediaTable','default','App',1783659889,1),(2,'2026-07-10-120002','App\\Database\\Migrations\\CreatePagesTable','default','App',1783659889,1),(3,'2026-07-10-120003','App\\Database\\Migrations\\CreateSectionsTable','default','App',1783659889,1),(4,'2026-07-10-120004','App\\Database\\Migrations\\CreateCategoriesTable','default','App',1783659889,1),(5,'2026-07-10-120005','App\\Database\\Migrations\\CreateProductsTable','default','App',1783659889,1),(6,'2026-07-10-120006','App\\Database\\Migrations\\CreateProductImagesTable','default','App',1783659889,1),(7,'2026-07-10-120007','App\\Database\\Migrations\\CreateNavLinksTable','default','App',1783659889,1),(8,'2026-07-10-120008','App\\Database\\Migrations\\CreateSettingsTable','default','App',1783659889,1),(9,'2026-07-10-120009','App\\Database\\Migrations\\CreateAdminUsersTable','default','App',1783659889,1),(10,'2026-07-10-120010','App\\Database\\Migrations\\CreateAuditLogTable','default','App',1783659889,1),(11,'2026-07-10-120011','App\\Database\\Migrations\\CreateCustomersTable','default','App',1783659889,1),(12,'2026-07-10-120012','App\\Database\\Migrations\\CreateOrdersTable','default','App',1783659889,1),(13,'2026-07-10-120013','App\\Database\\Migrations\\CreateOrderItemsTable','default','App',1783659889,1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `nav_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_links` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `parent_id_sort_order` (`parent_id`,`sort_order`),
  CONSTRAINT `nav_links_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `nav_links` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `nav_links` WRITE;
/*!40000 ALTER TABLE `nav_links` DISABLE KEYS */;
INSERT INTO `nav_links` VALUES (1,'Home','/',NULL,0,1),(2,'About Us','/about',NULL,1,1),(3,'Explore','/explore',NULL,2,1),(4,'Bathrooms','/bathrooms',NULL,3,1),(5,'Products','/products',NULL,4,1),(6,'Catalogue','/catalogue',NULL,5,1),(7,'Contact Us','/contact',NULL,6,1);
/*!40000 ALTER TABLE `nav_links` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `product_name` varchar(200) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `line_total` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(40) NOT NULL,
  `customer_id` bigint(20) unsigned DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `shipping_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`shipping_address`)),
  `billing_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`billing_address`)),
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `shipping` decimal(10,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(3) NOT NULL DEFAULT 'INR',
  `status` enum('pending','paid','processing','shipped','delivered','cancelled','refunded') NOT NULL DEFAULT 'pending',
  `payment_provider` varchar(30) DEFAULT NULL,
  `payment_ref` varchar(150) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `customer_id` (`customer_id`),
  KEY `status` (`status`),
  CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(150) NOT NULL,
  `title` varchar(200) NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  `og_image_id` bigint(20) unsigned DEFAULT NULL,
  `status` enum('draft','published') NOT NULL DEFAULT 'draft',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `pages_og_image_id_foreign` (`og_image_id`),
  CONSTRAINT `pages_og_image_id_foreign` FOREIGN KEY (`og_image_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,'home','Home','R Ceramica — Redefining Spaces','R Ceramica — premium porcelain and ceramic surfaces. Explore our collection of architectural tiles, luxury bathrooms, and innovative sanitaryware.',NULL,'published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(2,'about','About Us','About R Ceramica — The Heritage of Excellence JAy','From a single kiln in Morbi to a globally recognised name in architectural porcelain — the R Ceramica story.',NULL,'published','2026-07-10 05:14:59','2026-07-10 09:42:53'),(3,'explore','Explore','Explore — R Ceramica','Explore R Ceramica architectural surfaces and collections.',NULL,'published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(4,'bathrooms','Bathrooms','Luxury Bathrooms — R Ceramica','Premium sanitary ware and luxury bathroom collections by R Ceramica.',NULL,'published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(5,'products','Products','Products — R Ceramica','Browse R Ceramica porcelain, ceramic and sanitaryware products.',NULL,'published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(6,'catalogue','Catalogue','Catalogue — R Ceramica','Download and browse the R Ceramica product catalogue.',NULL,'published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(7,'contact','Contact Us','Contact R Ceramica','Get in touch with R Ceramica — sales, support and studio enquiries.',NULL,'published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(8,'privacy','Privacy Policy','Privacy Policy — R Ceramica','R Ceramica privacy policy.',NULL,'published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(9,'terms','Terms & Conditions','Terms & Conditions — R Ceramica','R Ceramica terms and conditions.',NULL,'published','2026-07-10 05:14:59','2026-07-10 05:14:59');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `media_id` bigint(20) unsigned NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `product_images_media_id_foreign` (`media_id`),
  KEY `product_id_sort_order` (`product_id`,`sort_order`),
  CONSTRAINT `product_images_media_id_foreign` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,1,0,1),(2,2,2,0,1),(3,3,3,0,1),(4,4,4,0,1);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(150) NOT NULL,
  `name` varchar(200) NOT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(3) NOT NULL DEFAULT 'INR',
  `specs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specs`)),
  `category_id` bigint(20) unsigned DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  `status` enum('draft','published') NOT NULL DEFAULT 'draft',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `status` (`status`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'petra-vessel-basin','Petra Vessel Basin','Natural granite vessel basin with a matte finish.','Hand-finished natural granite vessel basin. Each piece carries a unique stone grain, sealed with Nano-Trek micro-pore technology for stain resistance.',24999.00,'INR','{\"material\":\"Natural Granite\",\"finish\":\"Matte\",\"dimensions\":\"420 × 420 × 150 mm\"}',2,'Petra Vessel Basin — R Ceramica','Natural granite vessel basin with a matte finish.','published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(2,'obsidian-mono-basin','Obsidian Mono Basin','Hand-carved basalt basin with a textured surface.','Sculptural hand-carved basalt basin with a deep textured finish for a bold, monolithic bathroom statement.',28999.00,'INR','{\"material\":\"Basalt\",\"finish\":\"Textured\",\"dimensions\":\"460 × 460 × 160 mm\"}',2,'Obsidian Mono Basin — R Ceramica','Hand-carved basalt basin with a textured surface.','published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(3,'calcite-flow-slab','Calcite Flow Large-Format Slab','Minimalist sandstone-look large-format porcelain slab.','Large-format porcelain slab with a soft sandstone aesthetic. Continuum engineering allows seamless wall-to-floor transitions.',8999.00,'INR','{\"material\":\"Porcelain\",\"finish\":\"Minimalist Matte\",\"dimensions\":\"1200 × 2400 mm\",\"thickness\":\"9 mm\"}',1,'Calcite Flow Large-Format Slab — R Ceramica','Minimalist sandstone-look large-format porcelain slab.','published','2026-07-10 05:14:59','2026-07-10 05:14:59'),(4,'luxe-chrome-mixer','Luxe Chrome Basin Mixer','Premium chrome basin mixer tap.','Precision-engineered single-lever basin mixer with a mirror chrome finish and ceramic disc cartridge.',12499.00,'INR','{\"material\":\"Brass \\/ Chrome\",\"finish\":\"Polished Chrome\",\"warranty\":\"10 years\"}',3,'Luxe Chrome Basin Mixer — R Ceramica','Premium chrome basin mixer tap.','published','2026-07-10 05:14:59','2026-07-10 05:14:59');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `page_id` bigint(20) unsigned NOT NULL,
  `type` varchar(50) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `page_id_sort_order` (`page_id`,`sort_order`),
  CONSTRAINT `sections_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,1,'hero',0,'{\"title\":\"Redefining Spaces\",\"mediaType\":\"video\",\"mediaSrc\":\"\\/images\\/bathroomvideo.mp4\",\"cta\":{\"label\":\"Explore Collection\",\"href\":\"\\/products\"},\"fullHeight\":true}',1,'2026-07-10 05:38:19'),(2,1,'mediaGrid',1,'{\"cards\":[{\"label\":\"Materiality\",\"title\":\"Luxury\\nBathrooms\",\"imageSrc\":\"https:\\/\\/images.unsplash.com\\/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200\",\"imageAlt\":\"Luxury bathroom with premium sanitary ware and fittings\",\"href\":\"\\/explore\"},{\"label\":\"Precision\",\"title\":\"Sanitary\\nForms\",\"imageSrc\":\"https:\\/\\/images.unsplash.com\\/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200\",\"imageAlt\":\"Premium sanitary ware basin and mixer tap\",\"href\":\"\\/bathrooms\"}]}',1,'2026-07-10 05:14:59'),(3,1,'productCarousel',2,'{\"slides\":[{\"title\":\"Petra Vessel\",\"subtitle\":\"Natural Granite \\/ Matte Finish\",\"videoSrc\":\"https:\\/\\/hindwarestg.blob.core.windows.net\\/container1\\/products\\/ae5eb07a-52f8-45fa-98ea-c427f8dde36f.mp4\"},{\"title\":\"Obsidian Mono\",\"subtitle\":\"Hand-Carved Basalt \\/ Textured\",\"videoSrc\":\"https:\\/\\/assets.mixkit.co\\/videos\\/preview\\/mixkit-modern-bathroom-interior-4158-large.mp4\"},{\"title\":\"Calcite Flow\",\"subtitle\":\"Sandstone \\/ Minimalist\",\"videoSrc\":\"https:\\/\\/assets.mixkit.co\\/videos\\/preview\\/mixkit-hand-spraying-water-on-the-ceramic-31834-large.mp4\"}]}',1,'2026-07-10 05:14:59'),(4,1,'featureCards',3,'{\"cards\":[{\"icon\":\"Building2\",\"title\":\"Institutional\\nBusiness\",\"description\":\"Project solutions for institutional & business clients\",\"linkLabel\":\"Explore Projects\",\"href\":\"\\/about\"},{\"icon\":\"Globe\",\"title\":\"International\\nBusiness\",\"description\":\"Our global footprint and operational countries\",\"linkLabel\":\"Global Reach\",\"href\":\"\\/about\"},{\"icon\":\"Headset\",\"title\":\"Service &\\nSupport\",\"description\":\"Installation assistance and technical requests\",\"linkLabel\":\"Connect Now\",\"href\":\"\\/contact\"},{\"icon\":\"Smartphone\",\"title\":\"Download\\nService App\",\"description\":\"Manage your space from your fingertips\",\"linkLabel\":\"Download Now\",\"href\":\"\\/catalogue\",\"inverted\":true}]}',1,'2026-07-10 05:14:59'),(5,1,'narrative',4,'{\"eyebrow\":\"Insight & Heritage\",\"title\":\"The Legacy of\\nArchitectural\\nSurfaces\",\"lead\":\"Merging traditional craftsmanship with state-of-the-art nanotechnology to redefine modern porcelain engineering.\",\"paragraphs\":[\"R Ceramica — an exclusive porcelain and ceramic brand, has established its presence through decades of innovation, merging traditional craftsmanship with cutting-edge nanotechnology production. Our manufacturing units in key industrial hubs are equipped with first-for-industry thermal efficiency systems, ensuring every slab meets the highest architectural standards.\",\"With a curated network of over 200+ exclusive studios across international markets, we bring a sensory-driven approach to architectural surfaces. Our commitment to sustainability isn\'t just a corporate statement; it\'s embedded in our supply chain, from raw material extraction to the final tactile finish of our large-format porcelain slabs.\",\"Whether you are designing a high-traffic commercial space or a minimalist private residence, R Ceramica provides the technical data and aesthetic versatility required to transcend the limits of traditional design. Our portfolio spans the world\'s most prestigious projects, reflecting our status as a cornerstone of modern architectural surface engineering.\"],\"cta\":{\"label\":\"Enquire Now\",\"href\":\"\\/contact\"},\"watermark\":\"Excellence Through Innovation\"}',1,'2026-07-10 05:14:59'),(6,1,'socialFeed',5,'{\"posts\":[{\"id\":1,\"imageSrc\":\"https:\\/\\/images.unsplash.com\\/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=600\",\"imageAlt\":\"Luxury bathroom with wall-hung faucet and white basin\"},{\"id\":2,\"imageSrc\":\"https:\\/\\/images.unsplash.com\\/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600\",\"imageAlt\":\"Premium chrome basin mixer tap close-up\"},{\"id\":3,\"imageSrc\":\"https:\\/\\/images.unsplash.com\\/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=600\",\"imageAlt\":\"Modern exposed shower mixer in matte black\"},{\"id\":4,\"imageSrc\":\"https:\\/\\/images.unsplash.com\\/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=600\",\"imageAlt\":\"Contemporary bathroom interior with luxury fittings\"},{\"id\":5,\"imageSrc\":\"https:\\/\\/images.unsplash.com\\/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600\",\"imageAlt\":\"Elegant freestanding bath with floor-mounted filler tap\"}]}',1,'2026-07-10 05:14:59'),(16,2,'aboutHero',0,'{\"imageSrc\":\"https:\\/\\/images.unsplash.com\\/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80\",\"imageAlt\":\"Office Facility\",\"eyebrow\":\"Since 1994\",\"titleLine1\":\"The Heritage of\",\"titleLine2\":\"Excellence\"}',1,'2026-07-10 06:07:23'),(17,2,'philosophy',1,'{\"title\":\"We don\'t just manufacture surfaces; we engineer\",\"highlight\":\" sensory experiences.\",\"intro\":\"R Ceramica was born out of a vision to redefine the architectural landscape through high-performance porcelain and ceramic solutions.\",\"description\":\"Starting as a boutique facility in Morbi, the hub of ceramic innovation, we have evolved into a global powerhouse, merging traditional craftsmanship with state-of-the-art nanotechnology. Our journey is driven by one core philosophy: the surface is the soul of any space.\",\"image\":\"\\/images\\/materiallab.webp\",\"imageAlt\":\"Material Lab\",\"badgeTitle\":\"Technical Analysis\",\"badgeText\":\"0.05% Water Absorption Certified\"}',1,'2026-07-10 09:34:05'),(18,2,'stats',2,'{\"items\":[{\"number\":\"20+\",\"label\":\"Global Markets Served\",\"accent\":\"amber\"},{\"number\":\"5000+\",\"label\":\"Surface Designs\",\"accent\":\"blue\"},{\"number\":\"30+\",\"label\":\"Industry Awards\",\"accent\":\"emerald\"},{\"number\":\"12M+\",\"label\":\"SQM Annual Production Capacity\",\"accent\":\"purple\"}]}',1,'2026-07-10 06:07:23'),(19,2,'technology',3,'{\"items\":[{\"title\":\"Nano-Trek Tech\",\"description\":\"Micro-pore sealing for absolute hygienic surfaces and stain resistance.\",\"image\":\"\\/images\\/aboutecnoimg.jpg\",\"accent\":\"blue\"},{\"title\":\"Continuum Slabs\",\"description\":\"Large format engineering allowing seamless architectural transitions.\",\"image\":\"\\/images\\/continuumimg.webp\",\"accent\":\"amber\"},{\"title\":\"Eco-Thermal Kilns\",\"description\":\"Reducing carbon footprint through revolutionary energy recovery.\",\"image\":\"\\/images\\/ecothermalkilns.webp\",\"accent\":\"emerald\"}]}',1,'2026-07-10 06:07:23'),(20,2,'chairman',4,'{\"backgroundText\":\"VISIONARY\",\"heading\":\"Chairman\'s Perspective\",\"quote\":\"Innovation is not about adding more features; it\'s about stripping away everything that isn\'t essential until the soul of the material is all that remains.\",\"name\":\"Rajesh Patel\",\"designation\":\"Founder & Chairman, R Ceramica\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80\",\"imageAlt\":\"Chairman\"}',1,'2026-07-10 06:07:23'),(21,2,'footprint',5,'{\"eyebrow\":\"Global Echo\",\"title\":\"Across\\nBorders\",\"description\":\"With operational hubs in Gujarat, Dubai, and emerging centers in Europe, our logistics network ensures architectural excellence is delivered to every continent without compromise.\",\"cta\":{\"label\":\"View Logistics Centers\",\"href\":\"\\/contact\"},\"image\":\"\\/images\\/wordmap.jpg\",\"imageAlt\":\"Abstract World Map\"}',1,'2026-07-10 06:07:23'),(22,3,'exploreGrid',0,'{\"items\":[{\"eyebrow\":\"Heritage Collection\",\"title\":\"Architectural\",\"italicLine\":\"Surfaces\",\"description\":\"Curated porcelain systems for high-envelope architecture.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80\",\"imageAlt\":\"Main Collection\",\"imageOpacity\":50,\"bg\":\"#080808\",\"overlayClass\":\"bg-gradient-to-t from-black via-transparent to-transparent\",\"titleTracking\":\"tight\",\"href\":\"\\/products\",\"linkLabel\":\"View Collection\",\"linkVariant\":\"arrow\",\"isH1\":true},{\"eyebrow\":\"Designer Range\",\"title\":\"Luxury\\nShowers\",\"description\":\"Advanced hydro-therapy systems designed for the ultimate wellness experience.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80\",\"imageAlt\":\"Showers\",\"imageOpacity\":30,\"bg\":\"#0c0c0c\",\"overlayClass\":\"bg-black\\/30 group-hover:bg-black\\/10 transition-all\",\"titleTracking\":\"wide\",\"href\":\"\\/bathrooms\",\"linkLabel\":\"Explore Models\",\"linkVariant\":\"chevron\"},{\"eyebrow\":\"Geometric Precision\",\"title\":\"Artisan\\nFaucets\",\"description\":\"Precision engineered hardware defining the intersection of fluid dynamics and sculpture.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600\",\"imageAlt\":\"Artisan Faucets\",\"imageOpacity\":50,\"bg\":\"#0a0a0a\",\"overlayClass\":\"bg-gradient-to-t md:bg-gradient-to-r from-black\\/80 via-black\\/40 to-transparent\",\"contentPosition\":\"center\",\"titleTracking\":\"tight\",\"href\":\"\\/bathrooms\",\"linkLabel\":\"Technical Series\",\"linkVariant\":\"gold-arrow\"},{\"eyebrow\":\"Hygiene Systems\",\"title\":\"Sanitary\\nForm\",\"description\":\"High-performance water closets connecting ergonomic form and sustainability for contemporary living.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600\",\"imageAlt\":\"Bathware\",\"imageOpacity\":40,\"bg\":\"#0c0c0c\",\"overlayClass\":\"bg-gradient-to-b from-black\\/20 to-black\\/80\",\"titleTracking\":\"wide\",\"href\":\"\\/bathrooms\",\"linkLabel\":\"Browse Complete Series\",\"linkVariant\":\"button\"},{\"eyebrow\":\"Vessel Works\",\"title\":\"Minimal\\nBasins\",\"description\":\"Hand-crafted artisan basins that redefine the morning ritual through stone and ceramic textures.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1600\",\"imageAlt\":\"Wash Basin\",\"imageOpacity\":40,\"bg\":\"#080808\",\"overlayClass\":\"bg-gradient-to-t from-black\\/60 to-transparent\",\"titleTracking\":\"wide\",\"href\":\"\\/bathrooms\",\"linkLabel\":\"Explore Gallery\",\"linkVariant\":\"button\"},{\"eyebrow\":\"Infrastructural\",\"title\":\"FRP\\nManhole\",\"description\":[\"a blend of durability\",\"and sustainable performance\"],\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&q=80&w=1600\",\"imageAlt\":\"FRP Manhole\",\"imageOpacity\":30,\"bg\":\"#060606\",\"overlayClass\":\"bg-gradient-to-b from-transparent to-black\\/90\",\"titleTracking\":\"wide\",\"href\":\"\\/contact\",\"linkLabel\":\"Technical Spec\",\"linkVariant\":\"gold-arrow\"}]}',1,'2026-07-10 06:24:56'),(23,7,'contactHero',0,'{\"eyebrow\":\"Connectivity\",\"title\":\"Get In Touch\",\"description\":\"Experience architectural excellence first hand. Our consultants are ready to assist your vision.\",\"mediaType\":\"image\",\"mediaSrc\":\"\\/images\\/contacthero.webp\",\"mediaAlt\":\"R Ceramica architectural porcelain showroom interior\",\"cta\":{\"label\":\"Talk to Us\",\"href\":\"\\/contact\",\"variant\":\"gold\"},\"fullHeight\":false}',1,'2026-07-10 06:24:56'),(24,8,'legal',0,'{\"eyebrow\":\"Legal\",\"titleLine1\":\"Privacy\",\"titleLine2\":\"Policy\",\"intro\":\"We believe privacy is a fundamental right. This document explains how R Ceramica collects, uses, and protects your personal information.\",\"lastUpdated\":\"Last updated: January 2026\",\"footerNote\":\"We may update this Privacy Policy periodically. Significant changes will be communicated via email or a notice on the website at least 30 days before taking effect.\",\"sections\":[{\"id\":\"information-we-collect\",\"heading\":\"Information We Collect\",\"content\":[{\"sub\":\"Information You Provide\",\"body\":\"When you create an account, place an order, or contact our concierge team, we collect your name, mobile number, email address, shipping address, and payment information. For catalogue requests or studio appointments, we may also collect your company name and design brief.\"},{\"sub\":\"Information Collected Automatically\",\"body\":\"When you visit rceramica.com, we automatically receive your IP address, browser type, device identifiers, pages visited, and session duration. This data is collected via cookies and similar tracking technologies to improve performance and your browsing experience.\"},{\"sub\":\"Information from Third Parties\",\"body\":\"If you use social login or connect via WhatsApp Business, we receive basic profile information as permitted by those platforms. We may also receive updated delivery or address information from our logistics partners.\"}]},{\"id\":\"how-we-use\",\"heading\":\"How We Use Your Information\",\"content\":[{\"sub\":\"Order Fulfilment\",\"body\":\"We use your personal information to process transactions, arrange white-glove delivery, send order confirmations and tracking updates, and handle returns or inspections.\"},{\"sub\":\"Personalised Experience\",\"body\":\"We analyse browsing and purchase history to recommend collections, surface relevant new arrivals, and tailor your catalogue view to your aesthetic preferences.\"},{\"sub\":\"Communication\",\"body\":\"With your consent, we send product launches, exclusive previews, and event invitations via email or WhatsApp. You may unsubscribe at any time from any marketing communication.\"},{\"sub\":\"Legal & Security\",\"body\":\"We may use your data to comply with applicable laws and regulations, detect and prevent fraud, resolve disputes, and enforce our Terms of Service.\"}]},{\"id\":\"sharing\",\"heading\":\"Information Sharing\",\"content\":[{\"sub\":\"We Do Not Sell Your Data\",\"body\":\"R Ceramica does not sell, rent, or trade your personal information to third parties for their marketing purposes.\"},{\"sub\":\"Service Providers\",\"body\":\"We share information with trusted partners who assist us in operating our website and fulfilling orders — including payment processors (Razorpay \\/ Stripe), logistics partners, and cloud infrastructure providers. These parties are contractually bound to keep your information confidential.\"},{\"sub\":\"Legal Requirements\",\"body\":\"We may disclose your information if required to do so by law, or if we believe such action is necessary to comply with a legal obligation, protect the rights or safety of R Ceramica, our customers, or others.\"}]},{\"id\":\"cookies\",\"heading\":\"Cookies & Tracking\",\"content\":[{\"sub\":\"Essential Cookies\",\"body\":\"These cookies are strictly necessary for the website to function — managing your session, maintaining your cart, and securing authentication. They cannot be disabled.\"},{\"sub\":\"Analytics Cookies\",\"body\":\"We use anonymised analytics to understand how visitors interact with our pages. No personally identifiable information is shared with analytics providers.\"},{\"sub\":\"Preference Cookies\",\"body\":\"These cookies remember your choices — such as preferred currency, language, or surface finish filters — so your next visit starts where you left off.\"}]},{\"id\":\"your-rights\",\"heading\":\"Your Rights\",\"content\":[{\"sub\":\"Access & Portability\",\"body\":\"You may request a copy of all personal data we hold about you, in a structured, machine-readable format, at any time.\"},{\"sub\":\"Correction\",\"body\":\"If any information we hold is inaccurate or incomplete, you have the right to request correction. You can update most information directly from your account dashboard.\"},{\"sub\":\"Erasure\",\"body\":\"You may request deletion of your personal data, subject to our legal obligations to retain certain records (such as transaction history for financial compliance). Deleted accounts cannot be recovered.\"},{\"sub\":\"Withdrawal of Consent\",\"body\":\"Where we process your data on the basis of consent, you may withdraw that consent at any time. This will not affect the lawfulness of processing carried out before withdrawal.\"}]},{\"id\":\"security\",\"heading\":\"Data Security\",\"content\":[{\"sub\":\"Technical Safeguards\",\"body\":\"All data in transit is encrypted with TLS 1.3. Payment data is handled by PCI-DSS certified processors and never stored on our servers. We conduct regular security audits and penetration tests.\"},{\"sub\":\"Access Controls\",\"body\":\"Access to customer data within R Ceramica is restricted on a strict need-to-know basis. All team members with data access undergo data-privacy training annually.\"}]},{\"id\":\"retention\",\"heading\":\"Data Retention\",\"content\":[{\"sub\":\"How Long We Keep Data\",\"body\":\"We retain your account information for as long as your account is active or as needed to provide services. Transaction records are retained for a minimum of 7 years to comply with financial regulations. Marketing preferences are reviewed and pruned annually.\"}]},{\"id\":\"contact\",\"heading\":\"Contact & Grievance\",\"content\":[{\"sub\":\"Data Protection Officer\",\"body\":\"For any privacy-related concern, data access request, or complaint, contact our Data Protection Officer at privacy@rceramica.com. We respond within 5 business days.\"},{\"sub\":\"Grievance Officer\",\"body\":\"In accordance with the Information Technology Act, 2000 and the rules thereunder, the name and contact details of our Grievance Officer are made available at the registered office address listed on the Contact page.\"}]}]}',1,'2026-07-10 06:24:57'),(25,9,'legal',0,'{\"eyebrow\":\"Legal\",\"titleLine1\":\"Terms &\",\"titleLine2\":\"Conditions\",\"intro\":\"The terms and conditions governing your use of R Ceramica\'s website, products, and services. Please read carefully before placing an order.\",\"lastUpdated\":\"Last updated: January 2026\",\"footerNote\":\"We may update these Terms periodically. Continued use of our services after changes take effect constitutes acceptance of the revised Terms.\",\"sections\":[{\"id\":\"acceptance\",\"heading\":\"Acceptance of Terms\",\"content\":[{\"sub\":\"Agreement to Terms\",\"body\":\"By accessing or using the R Ceramica website (rceramica.com), placing an order, or engaging with our concierge services, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please discontinue use of our services immediately.\"},{\"sub\":\"Eligibility\",\"body\":\"You must be at least 18 years of age to place an order or create an account. By using our services, you represent that you are of legal age and have the legal capacity to enter into a binding agreement.\"},{\"sub\":\"Amendments\",\"body\":\"R Ceramica reserves the right to update or modify these Terms at any time. Material changes will be notified via email or a banner on the website at least 30 days prior to taking effect. Continued use of our services after the effective date constitutes acceptance of the revised Terms.\"}]},{\"id\":\"products-orders\",\"heading\":\"Products & Orders\",\"content\":[{\"sub\":\"Product Descriptions\",\"body\":\"We make every effort to display product images, finishes, and specifications as accurately as possible. However, colours and textures may appear differently depending on your display device. Physical samples are available upon request through our studio concierge and are strongly recommended before placing large-volume orders.\"},{\"sub\":\"Pricing\",\"body\":\"All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Prices are subject to change without notice. The price applicable to your order is the price confirmed at checkout at the time of purchase.\"},{\"sub\":\"Order Confirmation\",\"body\":\"An order is confirmed only upon receipt of our written confirmation email and successful payment processing. We reserve the right to cancel or refuse any order at our sole discretion, including cases of suspected fraud, pricing errors, or unavailability of stock.\"},{\"sub\":\"Custom & Made-to-Order Items\",\"body\":\"Custom finishes, large-format cuts, or made-to-order pieces are non-refundable once production has commenced. Lead times for custom items are communicated at the time of order and are estimates only — R Ceramica shall not be liable for delays caused by manufacturing or logistics constraints.\"}]},{\"id\":\"payment\",\"heading\":\"Payment\",\"content\":[{\"sub\":\"Accepted Methods\",\"body\":\"We accept major credit and debit cards (Visa, Mastercard, American Express), UPI, net banking, and select BNPL options. All transactions are processed through PCI-DSS certified payment gateways. R Ceramica does not store your card details.\"},{\"sub\":\"Payment Security\",\"body\":\"All payment transactions are encrypted using TLS and processed by our certified payment partners. In the event of a payment failure, no funds will be debited. If you experience a discrepancy between your bank statement and our records, please contact our concierge within 7 days.\"},{\"sub\":\"GST & Taxes\",\"body\":\"Applicable Goods and Services Tax (GST) will be levied as per the prevailing rate under Indian tax law. For B2B purchases, please provide your GSTIN at checkout to receive a tax invoice. R Ceramica is not responsible for any customs duties or import taxes applicable to international shipments.\"}]},{\"id\":\"delivery\",\"heading\":\"Delivery & Logistics\",\"content\":[{\"sub\":\"Delivery Areas\",\"body\":\"We deliver across India and to select international destinations through our authorised logistics partners. Delivery timelines are estimates and may vary based on product availability, location, and logistics conditions. R Ceramica will not be held liable for delays caused by third-party logistics providers, natural events, or governmental actions.\"},{\"sub\":\"White-Glove Service\",\"body\":\"Premium white-glove delivery, including placement, unpacking, and on-site inspection, is available in select cities. This service must be selected at checkout and is subject to an additional fee. Our team will contact you to schedule a delivery window once your order is dispatched.\"},{\"sub\":\"Risk of Loss\",\"body\":\"Risk of loss and title for products pass to you upon delivery to the shipping address provided. Please inspect all deliveries at the time of receipt. Any damage or shortage must be reported in writing within 48 hours of delivery; claims made after this window may not be accepted.\"}]},{\"id\":\"returns\",\"heading\":\"Returns & Refunds\",\"content\":[{\"sub\":\"Return Window\",\"body\":\"Eligible items may be returned within 7 days of delivery in their original, unopened packaging, accompanied by the original invoice. Returns are not accepted for items that have been installed, altered, cut, or used in any way.\"},{\"sub\":\"Non-Returnable Items\",\"body\":\"Custom-ordered or made-to-order products, items on clearance, sample tiles, digital downloads (such as technical drawings or BIM files), and products showing signs of misuse or damage not attributable to R Ceramica are not eligible for return.\"},{\"sub\":\"Refund Process\",\"body\":\"Once a return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds are processed to the original payment method within 7–10 business days. Shipping costs for returns are borne by the customer unless the return is due to a manufacturing defect or our error.\"},{\"sub\":\"Defective Products\",\"body\":\"If you receive a defective or incorrect item, contact our concierge immediately with photographic evidence. We will arrange a replacement or full refund at no additional cost. Our liability in all cases is limited to the value of the defective product purchased.\"}]},{\"id\":\"intellectual-property\",\"heading\":\"Intellectual Property\",\"content\":[{\"sub\":\"Our Content\",\"body\":\"All content on rceramica.com — including but not limited to text, photography, videos, 3D renders, collection names, product codes, and the R Ceramica brand identity — is the exclusive property of R Ceramica or its licensors and is protected by applicable intellectual property laws.\"},{\"sub\":\"Permitted Use\",\"body\":\"You may access and view content on our website for personal, non-commercial purposes only. You may not reproduce, distribute, republish, or create derivative works from any of our content without our prior written consent.\"},{\"sub\":\"Trade Marks\",\"body\":\"R Ceramica, the R Ceramica logo, and all associated product collection names are registered or unregistered trade marks of R Ceramica. Use of these marks without our express written permission is strictly prohibited.\"}]},{\"id\":\"user-conduct\",\"heading\":\"User Conduct\",\"content\":[{\"sub\":\"Prohibited Activities\",\"body\":\"You agree not to use our website or services to: violate any applicable law or regulation; upload or transmit harmful, offensive, or unlawful content; attempt to gain unauthorised access to our systems; engage in scraping, data mining, or automated data collection without our written consent; or impersonate any person or entity.\"},{\"sub\":\"Account Responsibility\",\"body\":\"You are responsible for maintaining the confidentiality of your account credentials. Any activity conducted through your account is your sole responsibility. Notify our team immediately if you suspect unauthorised access to your account.\"}]},{\"id\":\"limitation-liability\",\"heading\":\"Limitation of Liability\",\"content\":[{\"sub\":\"Disclaimer\",\"body\":\"Our website and services are provided on an \'as is\' basis. To the fullest extent permitted by law, R Ceramica disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.\"},{\"sub\":\"Liability Cap\",\"body\":\"In no event shall R Ceramica, its directors, employees, or affiliates be liable for any indirect, incidental, consequential, special, or punitive damages arising out of your use of our products or services. Our total aggregate liability for any claim shall not exceed the total amount paid by you for the specific order giving rise to the claim.\"},{\"sub\":\"Force Majeure\",\"body\":\"R Ceramica shall not be liable for any failure or delay in performance due to causes beyond our reasonable control, including natural disasters, pandemics, government actions, labour disputes, or failures of third-party service providers.\"}]},{\"id\":\"governing-law\",\"heading\":\"Governing Law & Disputes\",\"content\":[{\"sub\":\"Jurisdiction\",\"body\":\"These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Morbi, Gujarat, India.\"},{\"sub\":\"Dispute Resolution\",\"body\":\"We encourage you to contact our concierge in the first instance to resolve any concerns informally. If a dispute cannot be resolved amicably within 30 days, either party may pursue formal legal remedies as provided under applicable law.\"},{\"sub\":\"Severability\",\"body\":\"If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.\"}]}]}',1,'2026-07-10 06:24:57');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`value`)),
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'site','{\"name\":\"R Ceramica\",\"tagline\":\"Redefining Spaces\",\"url\":\"https:\\/\\/rceramica.com\",\"description\":\"R Ceramica — premium porcelain and ceramic surfaces. Explore our collection of architectural tiles, luxury bathrooms, and innovative sanitaryware.\",\"shortDescription\":\"Premium porcelain and ceramic surfaces for architectural excellence.\",\"keywords\":[\"porcelain tiles\",\"ceramic surfaces\",\"luxury tiles\",\"bathroom fixtures\",\"architectural surfaces\",\"R Ceramica\"]}'),(2,'contact','{\"phone\":\"+91-94274-10127\",\"whatsapp\":\"+919427410127\",\"email\":\"info@rceramica.com\"}'),(3,'address','{\"street\":\"Opp. Ceramic City, 8-A National Highway\",\"city\":\"Morbi\",\"state\":\"Gujarat\",\"postalCode\":\"363642\",\"country\":\"IN\",\"countryFull\":\"India\"}'),(4,'socials','{\"instagram\":\"https:\\/\\/www.instagram.com\\/rceramica\",\"facebook\":\"https:\\/\\/www.facebook.com\\/rceramica\"}'),(5,'branding','{\"logo\":null,\"ogImage\":\"\\/og-image.jpg\"}'),(6,'footer','{\"quickLinks\":[{\"label\":\"Explore\",\"href\":\"\\/explore\"},{\"label\":\"Products\",\"href\":\"\\/products\"},{\"label\":\"Bathrooms\",\"href\":\"\\/bathrooms\"},{\"label\":\"Catalogue\",\"href\":\"\\/catalogue\"},{\"label\":\"Contact Us\",\"href\":\"\\/contact\"}],\"corporateLinks\":[{\"label\":\"Our Story\",\"href\":\"\\/about\"},{\"label\":\"Chairman Message\",\"href\":\"\\/about\"},{\"label\":\"News & Media\",\"href\":\"\\/contact\"},{\"label\":\"Career\",\"href\":\"\\/contact\"}]}'),(7,'languages','[{\"code\":\"EN\",\"label\":\"English\"},{\"code\":\"FR\",\"label\":\"Français\"},{\"code\":\"IT\",\"label\":\"Italiano\"}]');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

