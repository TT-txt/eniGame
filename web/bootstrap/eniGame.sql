-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 11, 2020 at 12:49 PM
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
-- Table structure for table `SEEDS`
--

CREATE TABLE `SEEDS` (
  `ID` int(11) NOT NULL,
  `seed` bigint(20) NOT NULL,
  `whoposted` int(11) NOT NULL,
  `finished` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `ID` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `SCORES`
--
ALTER TABLE `SCORES`
  ADD PRIMARY KEY (`REF`);

--
-- Indexes for table `SEEDS`
--
ALTER TABLE `SEEDS`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `SEEDtoUSERS` (`whoposted`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `SCORES`
--
ALTER TABLE `SCORES`
  MODIFY `REF` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SEEDS`
--
ALTER TABLE `SEEDS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `SCORES`
--
ALTER TABLE `SCORES`
  ADD CONSTRAINT `SCOREStoUSERS` FOREIGN KEY (`REF`) REFERENCES `USERS` (`ID`);

--
-- Constraints for table `SEEDS`
--
ALTER TABLE `SEEDS`
  ADD CONSTRAINT `SEEDtoUSERS` FOREIGN KEY (`whoposted`) REFERENCES `USERS` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
