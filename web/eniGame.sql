-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 19, 2020 at 10:13 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eniGame`
--

-- --------------------------------------------------------

--
-- Table structure for table `MAPS`
--

CREATE TABLE `MAPS` (
  `ID` int(11) NOT NULL,
  `content` text NOT NULL,
  `whoposted` int(11) NOT NULL,
  `finished` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `SCORES`
--

CREATE TABLE `SCORES` (
  `REF` int(11) NOT NULL,
  `who` int(11) NOT NULL,
  `score` bigint(20) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `ID` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `wins` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`ID`, `login`, `password`, `name`, `wins`) VALUES
(1, 'admin@admin.com', 'Admin123', 'TT', 0),
(2, 'marie.pivette@student.yncrea.fr', 'Marie123', 'Test3000', 0),
(3, 'hugo.martel@student.yncrea.fr', 'Hugo1234', 'Gugo', 0),
(4, 'louis.manouvrier@student.yncrea.fr', 'Louis123', 'SpaceDrago', 0),
(5, 'louis.ducrocq@student.yncrea.fr', 'Louis1234', 'Singed', 0),
(6, 'theodore.martin@student.yncrea.fr', 'Theodore123', 'TT-txt', 0),
(7, 'noe.klopocki@student.yncrea.fr', 'Noe12345', 'Népanthés', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `MAPS`
--
ALTER TABLE `MAPS`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `SEEDtoUSERS` (`whoposted`);

--
-- Indexes for table `SCORES`
--
ALTER TABLE `SCORES`
  ADD PRIMARY KEY (`REF`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `MAPS`
--
ALTER TABLE `MAPS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SCORES`
--
ALTER TABLE `SCORES`
  MODIFY `REF` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `MAPS`
--
ALTER TABLE `MAPS`
  ADD CONSTRAINT `SEEDtoUSERS` FOREIGN KEY (`whoposted`) REFERENCES `USERS` (`ID`);

--
-- Constraints for table `SCORES`
--
ALTER TABLE `SCORES`
  ADD CONSTRAINT `SCOREStoUSERS` FOREIGN KEY (`REF`) REFERENCES `USERS` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
