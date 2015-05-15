-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2015 at 02:38 PM
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
-- Table structure for table `contributor`
--

CREATE TABLE IF NOT EXISTS `contributor` (
  `user_id` int(11) NOT NULL,
  `project_assigned` int(11) NOT NULL,
  `role` tinyint(4) NOT NULL,
  `date_assigned` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`project_assigned`),
  KEY `project_assigned` (`project_assigned`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contributor`
--

INSERT INTO `contributor` (`user_id`, `project_assigned`, `role`, `date_assigned`) VALUES
(515165, 1, 1, '2015-05-10 16:40:58'),
(515165, 3, 1, '2015-05-10 16:40:58'),
(515166, 1, 1, '2015-05-13 02:28:31'),
(515166, 2, 2, '2015-05-10 16:40:58'),
(515168, 3, 2, '2015-05-10 16:40:58'),
(515170, 2, 1, '2015-05-10 16:40:58'),
(515170, 3, 1, '2015-05-10 16:40:58');

-- --------------------------------------------------------

--
-- Table structure for table `defect`
--

CREATE TABLE IF NOT EXISTS `defect` (
  `defect_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` text NOT NULL,
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `defect`
--

INSERT INTO `defect` (`defect_id`, `title`, `description`, `status`, `related_project_id`, `assigned_to`, `priority`, `severity`, `target_resolution_date`, `actual_resolution_date`, `date_closed`, `note`, `version`, `platform`, `created_by`, `date_created`) VALUES
(11, 'awful bug', 'this a very very awful bug keep away', 'opened', 1, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515165, '2015-05-10 22:00:59'),
(12, 'bug 2', 'bug number 2 ', 'opened', 1, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515165, '2015-05-10 22:00:59'),
(13, 'bug 3', 'bug number 3', 'opened', 1, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515165, '2015-05-10 22:00:59'),
(14, 'bug 4', 'bug number 4', 'assigned', 1, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515166, '2015-05-10 22:00:59'),
(15, 'bug 5', 'bug number 5', 'assigned', 1, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515166, '2015-05-10 22:00:59'),
(16, 'bug 6', 'bug number 6', 'assigned', 2, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515166, '2015-05-10 22:00:59'),
(17, 'bug 6', 'bug number 6', 'closed', 1, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515166, '2015-05-10 22:00:59'),
(18, 'bug 7', 'bug number 7', 'closed', 1, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515166, '2015-05-10 22:00:59'),
(19, 'bug 8', 'bug number 8', 'solved', 1, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515166, '2015-05-10 22:00:59'),
(20, 'bug 9', 'bug number 9', 'solved', 2, 515165, 'Low', 'Minor', '0000-00-00', '0000-00-00', '0000-00-00', '', '', '', 515167, '2015-05-10 22:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` text NOT NULL,
  `description` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  KEY `created_by` (`created_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=39 ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `description`, `created_by`, `date_created`) VALUES
(1, 'FixPhase', '', 515166, '2015-04-28 09:15:03'),
(2, 'Documents', '', 515167, '2015-04-28 09:15:03'),
(3, 'Bugs', 'desc', 515165, '2015-05-09 05:44:03'),
(4, 'pppp', 'dasasdasd', 515169, '2015-05-10 17:24:41'),
(5, 'pppp', 'dasasdasd', 515166, '2015-05-10 21:08:43'),
(6, 'pppp', 'dasasdasd', 515166, '2015-05-10 21:09:25'),
(7, 'pppp', 'dasasdasd', 515166, '2015-05-10 21:11:44'),
(34, 'ssswww', 'sssssdddwwww', 515166, '2015-05-13 01:07:28'),
(35, 'ssswww', 'sssssdddwwww', 515166, '2015-05-13 01:09:09'),
(36, 'ssswww', 'sssssdddwwww', 515166, '2015-05-13 01:12:02'),
(37, 'ssswww', 'sssssdddwwww', 515166, '2015-05-13 01:13:11'),
(38, 'ssswww', 'sssssdddwwww', 515166, '2015-05-13 01:14:54');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=515171 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `role`, `username`, `password`, `date_created`) VALUES
(515165, 'Omar Essam', 'omarito2412@gmail.com', '', 'omar', '12345678', '2015-04-28 09:12:19'),
(515166, 'Abdulaziz Alaa', 'abdulazizalaa4@gmail.com', '', 'aziz', '12345678', '2015-04-28 09:12:19'),
(515167, 'Karim Tarabishy', 'tarabishy1993@gmail.com', '', 'tarabishy', '12345678', '2015-04-28 09:13:38'),
(515168, 'Karim Ahmed', 'karim.asu92@gmail.com', '', 'karim', '12345678', '2015-04-28 09:13:38'),
(515169, 'aziz alaa', 'abdulazizalaa@ymail.com', 'tester', 'zozz', '12345678', '2015-05-01 03:49:48'),
(515170, 'abdo aaaa', 'aa@m.mm', 'developer', 'aaaaaa', '12345678', '2015-05-01 03:52:15');

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
-- Constraints for table `contributor`
--
ALTER TABLE `contributor`
  ADD CONSTRAINT `contributor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contributor_ibfk_2` FOREIGN KEY (`project_assigned`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `defect`
--
ALTER TABLE `defect`
  ADD CONSTRAINT `defect_ibfk_1` FOREIGN KEY (`related_project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `defect_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `defect_ibfk_3` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`user_id`);

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
