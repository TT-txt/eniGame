-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2020 at 12:58 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enigame`
--

-- --------------------------------------------------------

--
-- Table structure for table `maps`
--

CREATE TABLE `maps` (
  `ID` int(11) NOT NULL,
  `content` text NOT NULL,
  `whoposted` int(11) NOT NULL,
  `finished` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `maps`
--

INSERT INTO `maps` (`ID`, `content`, `whoposted`, `finished`) VALUES
(1, '{\"size\":5,\"maps\":[{\"walls\":[{\"x\":3,\"y\":1,\"z\":1},{\"x\":3,\"y\":2,\"z\":1},{\"x\":1,\"y\":1,\"z\":3},{\"x\":1,\"y\":2,\"z\":3}],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[{\"type\":0,\"coord\":{\"x\":4,\"y\":1,\"z\":2},\"onUse\":0,\"activated\":false,\"group\":null}],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}}],\"theme\":0,\"endMap\":25}', 2, 1),
(2, '{\"size\":3,\"maps\":[{\"walls\":[{\"x\":1,\"y\":1,\"z\":1},{\"x\":1,\"y\":2,\"z\":1},{\"x\":1,\"y\":3,\"z\":1},{\"x\":3,\"y\":1,\"z\":1},{\"x\":1,\"y\":1,\"z\":3},{\"x\":1,\"y\":2,\"z\":3},{\"x\":3,\"y\":1,\"z\":3},{\"x\":0,\"y\":1,\"z\":3}],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[{\"type\":0,\"coord\":{\"x\":4,\"y\":1,\"z\":2},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":2,\"y\":1,\"z\":4},\"onUse\":0,\"activated\":false,\"group\":null}],\"solved\":false,\"type\":null,\"exits\":[false,false,{\"x\":5,\"y\":0,\"z\":2},{\"x\":2,\"y\":0,\"z\":5}],\"spawnPoint\":{\"x\":2,\"y\":1,\"z\":2}},{\"walls\":[{\"x\":0,\"y\":1,\"z\":4},{\"x\":0,\"y\":2,\"z\":4},{\"x\":0,\"y\":1,\"z\":0},{\"x\":0,\"y\":2,\"z\":0},{\"x\":3,\"y\":1,\"z\":2},{\"x\":3,\"y\":2,\"z\":2},{\"x\":0,\"y\":3,\"z\":4},{\"x\":0,\"y\":3,\"z\":0},{\"x\":0,\"y\":1,\"z\":1},{\"x\":0,\"y\":1,\"z\":3}],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[{\"type\":2,\"coord\":{\"x\":4,\"y\":1,\"z\":0},\"activated\":true,\"facing\":\"s\",\"group\":1,\"onUse\":2}],\"logics\":[{\"type\":1,\"coord\":{\"x\":1,\"y\":1,\"z\":2},\"onUse\":0,\"activated\":{\"x\":1,\"y\":0,\"z\":2},\"group\":null},{\"type\":0,\"coord\":{\"x\":4,\"y\":1,\"z\":2},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":4,\"y\":1,\"z\":1},\"onUse\":0,\"activated\":false,\"group\":null}],\"solved\":false,\"type\":0,\"exits\":[{\"x\":-1,\"y\":0,\"z\":2},false,{\"x\":5,\"y\":0,\"z\":2},false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[{\"x\":0,\"y\":1,\"z\":3},{\"x\":0,\"y\":2,\"z\":3},{\"x\":1,\"y\":1,\"z\":3},{\"x\":2,\"y\":1,\"z\":2},{\"x\":3,\"y\":1,\"z\":1},{\"x\":3,\"y\":1,\"z\":0},{\"x\":3,\"y\":2,\"z\":0},{\"x\":0,\"y\":1,\"z\":0},{\"x\":0,\"y\":2,\"z\":0},{\"x\":1,\"y\":3,\"z\":0},{\"x\":2,\"y\":3,\"z\":0},{\"x\":0,\"y\":3,\"z\":1},{\"x\":0,\"y\":3,\"z\":2},{\"x\":5,\"y\":1,\"z\":0},{\"x\":5,\"y\":2,\"z\":0},{\"x\":5,\"y\":1,\"z\":1},{\"x\":6,\"y\":1,\"z\":2},{\"x\":7,\"y\":1,\"z\":3},{\"x\":8,\"y\":1,\"z\":3},{\"x\":8,\"y\":2,\"z\":3},{\"x\":8,\"y\":1,\"z\":0},{\"x\":8,\"y\":2,\"z\":0},{\"x\":7,\"y\":3,\"z\":0},{\"x\":6,\"y\":3,\"z\":0},{\"x\":8,\"y\":3,\"z\":1},{\"x\":8,\"y\":3,\"z\":2},{\"x\":8,\"y\":1,\"z\":5},{\"x\":8,\"y\":2,\"z\":5},{\"x\":7,\"y\":1,\"z\":5},{\"x\":6,\"y\":1,\"z\":6},{\"x\":5,\"y\":1,\"z\":7},{\"x\":5,\"y\":1,\"z\":8},{\"x\":5,\"y\":2,\"z\":8},{\"x\":8,\"y\":1,\"z\":8},{\"x\":8,\"y\":2,\"z\":8},{\"x\":7,\"y\":3,\"z\":8},{\"x\":6,\"y\":3,\"z\":8},{\"x\":8,\"y\":3,\"z\":7},{\"x\":8,\"y\":3,\"z\":6},{\"x\":3,\"y\":1,\"z\":8},{\"x\":3,\"y\":2,\"z\":8},{\"x\":3,\"y\":1,\"z\":7},{\"x\":2,\"y\":1,\"z\":6},{\"x\":1,\"y\":1,\"z\":5},{\"x\":0,\"y\":1,\"z\":5},{\"x\":0,\"y\":2,\"z\":5},{\"x\":0,\"y\":1,\"z\":8},{\"x\":0,\"y\":2,\"z\":8},{\"x\":1,\"y\":3,\"z\":8},{\"x\":2,\"y\":3,\"z\":8},{\"x\":0,\"y\":3,\"z\":7},{\"x\":0,\"y\":3,\"z\":6}],\"floor\":{\"x\":9,\"y\":0,\"z\":9},\"traps\":[],\"logics\":[{\"type\":0,\"coord\":{\"x\":4,\"y\":1,\"z\":4},\"onUse\":-1,\"activated\":false,\"group\":null}],\"solved\":false,\"type\":null,\"exits\":[{\"x\":-1,\"y\":0,\"z\":4},false,false,false],\"spawnPoint\":{\"x\":4,\"y\":1,\"z\":4}},{\"walls\":[],\"floor\":{\"x\":6,\"y\":0,\"z\":6},\"traps\":[{\"type\":3,\"coord\":{\"x\":4,\"y\":1,\"z\":5},\"activated\":true,\"facing\":\"n\",\"group\":null},{\"type\":0,\"coord\":{\"x\":5,\"y\":0,\"z\":0},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":5,\"y\":0,\"z\":1},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":5,\"y\":0,\"z\":2},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":5,\"y\":0,\"z\":3},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":5,\"y\":0,\"z\":4},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":4,\"y\":0,\"z\":4},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":3,\"y\":0,\"z\":5},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":5,\"y\":0,\"z\":5},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":1,\"y\":0,\"z\":5},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":2,\"y\":0,\"z\":5},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":1,\"y\":0,\"z\":4},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":0,\"y\":0,\"z\":5},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":0,\"y\":0,\"z\":4},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":0,\"y\":0,\"z\":3},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":0,\"y\":0,\"z\":2},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":0,\"y\":0,\"z\":1},\"onUse\":0,\"activated\":false,\"group\":null},{\"type\":0,\"coord\":{\"x\":0,\"y\":0,\"z\":0},\"onUse\":0,\"activated\":false,\"group\":null}],\"logics\":[{\"type\":0,\"coord\":{\"x\":2,\"y\":1,\"z\":0},\"onUse\":0,\"activated\":false,\"group\":null}],\"solved\":false,\"type\":0,\"exits\":[false,{\"x\":2,\"y\":0,\"z\":-1},false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}},{\"walls\":[],\"floor\":{\"x\":5,\"y\":0,\"z\":5},\"traps\":[],\"logics\":[],\"solved\":false,\"type\":0,\"exits\":[false,false,false,false],\"spawnPoint\":{\"x\":1,\"y\":1,\"z\":1}}],\"theme\":0,\"endMap\":2}', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `REF` int(11) NOT NULL,
  `who` int(11) NOT NULL,
  `score` bigint(20) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`REF`, `who`, `score`, `date`) VALUES
(1, 3, 5, '2020-05-27'),
(2, 2, 5, '2020-05-27'),
(3, 2, 5, '2020-05-27'),
(6, 2, 5, '2020-05-27'),
(7, 2, 5, '2020-05-27'),
(9, 2, 5, '2020-05-27'),
(10, 2, 5, '2020-05-27'),
(11, 2, 5, '2020-05-27'),
(12, 2, 5, '2020-05-27'),
(13, 2, 5, '2020-05-27'),
(14, 2, 5, '2020-05-27'),
(15, 2, 5, '2020-05-27'),
(16, 2, 5, '2020-05-27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `wins` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `login`, `password`, `name`, `wins`) VALUES
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
-- Indexes for table `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `SEEDtoUSERS` (`whoposted`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`REF`),
  ADD KEY `SCOREStoUSERS` (`who`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `maps`
--
ALTER TABLE `maps`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `REF` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `maps`
--
ALTER TABLE `maps`
  ADD CONSTRAINT `SEEDtoUSERS` FOREIGN KEY (`whoposted`) REFERENCES `users` (`ID`);

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `SCOREStoUSERS` FOREIGN KEY (`who`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
