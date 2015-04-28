-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2015 at 11:21 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `fixphase`
--

CREATE DATABASE fixphase;
USE fixphase;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `defect_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `comment_ibfk_1` (`user_id`),
  KEY `comment_ibfk_2` (`defect_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `defect`
--

CREATE TABLE IF NOT EXISTS `defect` (
  `defect_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` text NOT NULL,
  `date_raised` date NOT NULL,
  `related_project_id` int(11) NOT NULL,
  `assigned_to` int(11) NOT NULL,
  `priority` text NOT NULL,
  `severity` text NOT NULL,
  `target_resolution_date` date NOT NULL,
  `actual_resolution_date` date NOT NULL,
  `date_closed` date NOT NULL,
  `note` text NOT NULL,
  `version` text NOT NULL,
  `platform` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`defect_id`),
  KEY `related_project_id` (`related_project_id`),
  KEY `defect_ibfk_2` (`created_by`),
  KEY `defect_ibfk_3` (`assigned_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `developer`
--

CREATE TABLE IF NOT EXISTS `developer` (
  `user_id` int(11) NOT NULL,
  `project_assigned` int(11) NOT NULL,
  `date_assigned` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`project_assigned`),
  KEY `developer_ibfk_2` (`project_assigned`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `developer`
--

INSERT INTO `developer` (`user_id`, `project_assigned`, `date_assigned`) VALUES
(515165, 1, '2015-04-28 09:20:26'),
(515165, 2, '2015-04-28 09:20:26'),
(515166, 1, '2015-04-28 09:20:26'),
(515167, 2, '2015-04-28 09:20:26');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  KEY `created_by` (`created_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `created_by`, `date_created`) VALUES
(1, 'FixPhase', 515166, '2015-04-28 09:15:03'),
(2, 'Documents', 515167, '2015-04-28 09:15:03');

-- --------------------------------------------------------

--
-- Table structure for table `reference`
--

CREATE TABLE IF NOT EXISTS `reference` (
  `defect_id` int(11) NOT NULL,
  `ref_path` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`defect_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tester`
--

CREATE TABLE IF NOT EXISTS `tester` (
  `user_id` int(11) NOT NULL,
  `project_assigned` int(11) NOT NULL,
  `date_assigned` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`project_assigned`),
  KEY `project_assigned` (`project_assigned`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tester`
--

INSERT INTO `tester` (`user_id`, `project_assigned`, `date_assigned`) VALUES
(515165, 1, '2015-04-28 09:19:25'),
(515166, 2, '2015-04-28 09:19:25'),
(515168, 1, '2015-04-28 09:19:25'),
(515168, 2, '2015-04-28 09:19:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` text NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` text NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=515169 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `role`, `username`, `password`, `date_created`) VALUES
(515165, 'Omar Essam', 'omarito2412@gmail.com', '', 'omar', '12345678', '2015-04-28 09:12:19'),
(515166, 'Abdulaziz Alaa', 'abdulazizalaa4@gmail.com', '', 'aziz', '12345678', '2015-04-28 09:12:19'),
(515167, 'Karim Tarabishy', 'tarabishy1993@gmail.com', '', 'tarabishy', '12345678', '2015-04-28 09:13:38'),
(515168, 'Karim Ahmed', 'karim.asu92@gmail.com', '', 'karim', '12345678', '2015-04-28 09:13:38');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`defect_id`) REFERENCES `defect` (`defect_id`);

--
-- Constraints for table `defect`
--
ALTER TABLE `defect`
  ADD CONSTRAINT `defect_ibfk_1` FOREIGN KEY (`related_project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `defect_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `defect_ibfk_3` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `developer`
--
ALTER TABLE `developer`
  ADD CONSTRAINT `developer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `developer_ibfk_2` FOREIGN KEY (`project_assigned`) REFERENCES `project` (`project_id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reference`
--
ALTER TABLE `reference`
  ADD CONSTRAINT `reference_ibfk_1` FOREIGN KEY (`defect_id`) REFERENCES `defect` (`defect_id`);

--
-- Constraints for table `tester`
--
ALTER TABLE `tester`
  ADD CONSTRAINT `tester_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `tester_ibfk_2` FOREIGN KEY (`project_assigned`) REFERENCES `project` (`project_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
