-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2016 at 05:34 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `encuestascecna`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `competitor_id` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `option` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `competitor_id`, `comment`, `option`, `created_at`, `updated_at`) VALUES
(162, 2, 36, '', 1, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(163, 4, 36, '', 3, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(164, 5, 36, '', 4, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(165, 23, 36, '', 10, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(166, 6, 36, 'aaa', NULL, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(167, 3, 36, '', 2, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(168, 24, 36, '', 1, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(169, 13, 36, '', 1, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(170, 14, 36, '', 2, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(171, 15, 36, '', 3, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(172, 16, 36, '', 4, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(173, 17, 36, '', 5, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(174, 22, 36, 'bbb', NULL, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(175, 18, 36, '', 1, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(176, 19, 36, '', 2, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(177, 20, 36, '', 3, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(178, 21, 36, 'ccc', NULL, '2016-08-09 18:20:39', '2016-08-09 18:20:39'),
(179, 3, 42, '', 3, '2016-08-09 18:41:13', '2016-08-09 18:41:13'),
(180, 4, 42, '', 1, '2016-08-09 18:41:13', '2016-08-09 18:41:13'),
(181, 2, 42, '', 1, '2016-08-09 18:41:13', '2016-08-09 18:41:13'),
(182, 5, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(183, 6, 42, NULL, NULL, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(184, 23, 42, '', 4, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(185, 24, 42, '', 2, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(186, 13, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(187, 14, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(188, 15, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(189, 16, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(190, 17, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(191, 22, 42, 'dasdsad', NULL, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(192, 18, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(193, 19, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(194, 20, 42, '', 3, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(195, 21, 42, 'asdsad', NULL, '2016-08-09 18:41:14', '2016-08-09 18:41:14'),
(196, 3, 43, '', 3, '2016-08-09 18:42:51', '2016-08-09 18:42:51'),
(197, 2, 43, '', 5, '2016-08-09 18:42:51', '2016-08-09 18:42:51'),
(198, 4, 43, '', 2, '2016-08-09 18:42:51', '2016-08-09 18:42:51'),
(199, 23, 43, '', 7, '2016-08-09 18:42:51', '2016-08-09 18:42:51'),
(200, 6, 43, 'rytuth', NULL, '2016-08-09 18:42:51', '2016-08-09 18:42:51'),
(201, 5, 43, '', 1, '2016-08-09 18:42:51', '2016-08-09 18:42:51'),
(202, 24, 43, '', 3, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(203, 13, 43, '', 3, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(204, 14, 43, '', 2, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(205, 15, 43, '', 2, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(206, 16, 43, '', 4, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(207, 17, 43, '', 3, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(208, 22, 43, 'jhjhjhj', NULL, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(209, 19, 43, '', 2, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(210, 21, 43, 'jjk.kl.kl', NULL, '2016-08-09 18:42:52', '2016-08-09 18:42:52'),
(223, 2, 45, '', 1, '2016-08-09 19:43:28', '2016-08-09 19:43:28'),
(224, 3, 45, '', 2, '2016-08-09 19:43:28', '2016-08-09 19:43:28'),
(225, 4, 45, '', 3, '2016-08-09 19:43:28', '2016-08-09 19:43:28'),
(226, 5, 45, '', 4, '2016-08-09 19:43:28', '2016-08-09 19:43:28'),
(227, 6, 45, NULL, NULL, '2016-08-09 19:43:28', '2016-08-09 19:43:28'),
(228, 23, 45, '', 3, '2016-08-09 19:43:28', '2016-08-09 19:43:28'),
(229, 24, 45, '', 2, '2016-08-09 19:43:29', '2016-08-09 19:43:29'),
(230, 13, 45, '', 3, '2016-08-09 19:43:29', '2016-08-09 19:43:29'),
(231, 14, 45, '', 2, '2016-08-09 19:43:29', '2016-08-09 19:43:29'),
(232, 15, 45, '', 4, '2016-08-09 19:43:30', '2016-08-09 19:43:30'),
(233, 16, 45, '', 3, '2016-08-09 19:43:30', '2016-08-09 19:43:30'),
(234, 17, 45, '', 3, '2016-08-09 19:43:30', '2016-08-09 19:43:30');

-- --------------------------------------------------------

--
-- Table structure for table `competitors`
--

CREATE TABLE `competitors` (
  `id` int(11) NOT NULL,
  `my_poll_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `competitors`
--

INSERT INTO `competitors` (`id`, `my_poll_id`, `created_at`, `updated_at`) VALUES
(36, 1, '2016-08-09 18:20:38', '2016-08-09 18:20:38'),
(42, 1, '2016-08-09 18:41:13', '2016-08-09 18:41:13'),
(43, 1, '2016-08-09 18:42:51', '2016-08-09 18:42:51'),
(45, 1, '2016-08-09 19:43:28', '2016-08-09 19:43:28');

-- --------------------------------------------------------

--
-- Table structure for table `my_polls`
--

CREATE TABLE `my_polls` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `code` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `my_polls`
--

INSERT INTO `my_polls` (`id`, `user_id`, `expires_at`, `title`, `description`, `code`, `color`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2016-08-31 00:00:00', 'Primera encuesta', '"<p style="text-align: center;"><span style="font-size:22px;"><strong><span style="font-family:times new roman,times,serif;">Evaluaci&oacute;n del evento de capacitaci&oacute;n</span></strong></span></p>\n\n<p><span style="font-family:comic sans ms,cursive;">Estimado colaborador, con el prop&oacute;sito de contar con informaci&oacute;n que nos permita evaluar de forma efectiva los cursos de capacitaci&oacute;n, agradecemos su apoyo, contestando de forma objetiva cada uno de los aspectos se&ntilde;alados en esta encuesta.</span></p>\n\n<p><span style="font-family:comic sans ms,cursive;"><span style="font-size:16px;"><b><span style="background-color:#FFFFFF;">Datos generales de la capacitaci</span></b><span style="background-color:#FFFFFF;">&oacute;</span><b><span style="background-color:#FFFFFF;">n</span></b></span></span></p>\n\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px;">\n	<tbody>\n		<tr>\n			<td><strong><span style="font-family:comic sans ms,cursive;">Nombre del evento</span></strong></td>\n			<td><span style="font-family:comic sans ms,cursive;">Seguridad vial - G01</span></td>\n			<td><strong><span style="font-family:comic sans ms,cursive;">Horario de ejecuci&oacute;n</span></strong></td>\n			<td><span style="font-family:comic sans ms,cursive;">08:00am-05:00pm</span></td>\n		</tr>\n		<tr>\n			<td><strong><span style="font-family:comic sans ms,cursive;">Lugar del evento</span></strong></td>\n			<td><span style="font-family:comic sans ms,cursive;">INTELCN</span></td>\n			<td><strong><span style="font-family:comic sans ms,cursive;">Fecha de inicio</span></strong></td>\n			<td><span style="font-family:comic sans ms,cursive;">22-abr-16</span></td>\n		</tr>\n		<tr>\n			<td><strong><span style="font-family:comic sans ms,cursive;">Facilitador</span></strong></td>\n			<td><span style="font-family:comic sans ms,cursive;">CECNA</span></td>\n			<td><strong><span style="font-family:comic sans ms,cursive;">Fecha de finalizaci&oacute;n</span></strong></td>\n			<td>22-abr-16</td>\n		</tr>\n	</tbody>\n</table>\n\n<p>&nbsp;</p>\n"\n', '1fd7303596', '#26a69a', 0, '2016-07-31 22:34:37', '2016-07-31 22:34:37'),
(2, 2, '2016-08-31 00:00:00', 'Primera encuesta', '<p>Describa de forma clara aspectos que caracterizan la encuesta a aplicar</p>\n', '8eadce56fd', 'hsv(256, 77%, 65%)', 0, '2016-07-31 23:04:54', '2016-07-31 23:04:54'),
(3, 1, '2016-09-01 00:00:00', 'Segunda encuesta', '<p>Describa de forma clara aspectos que caracterizan la encuesta a aplicar</p>\n', 'e1f94c0e74', 'hsv(0, 59%, 100%)', 0, '2016-08-01 16:30:07', '2016-08-01 16:30:07');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `section_id`, `description`, `category`, `rank`) VALUES
(2, 2, 'Se cumplieron con los objetivos y expectativas del curso', 3, 1),
(3, 2, 'La estructura y orden de los contenidos fue presentada de forma adecuada', 3, 2),
(4, 2, 'los contenidos abordados durante el curso, son aplicados a si puesto de trabajo', 3, 3),
(5, 2, 'Se abordaron adecuadamente las interrogantes hechas al facilitador', 3, 4),
(6, 2, 'Comentarios adicionales a los puntos anteriores', 1, 5),
(13, 3, 'Dominio y conocimiento para transmitir los conocimientos', 3, 1),
(14, 3, 'Desarrollo del tema de forma clara y precisa', 3, 2),
(15, 3, 'Uso metodologías de aprendizaje activo durante el desarrollo del curso', 3, 3),
(16, 3, 'Despertó el interés y animo de los participantes durante el desarrollo del curso', 3, 4),
(17, 3, 'El trato fue con empatia, generando un ambiente de confianza', 3, 5),
(18, 4, 'Se le notifico oportunamente y con antelación la asistencia al presente curso', 3, 1),
(19, 4, 'Se respetaron las fechas y horarios establecidos para el presente curso', 3, 2),
(20, 4, 'el confort y comodidad de las salas para impartir la capacitación es:', 3, 3),
(21, 4, 'Comentarios adicionales a los puntos anteriores', 1, 4),
(22, 3, 'Comentarios adicionales a los puntos anteriores', 1, 6),
(23, 2, 'los contenidos abordados durante el curso, son aplicados a si puesto de trabajo', 4, 6),
(24, 2, 'los contenidos abordados durante el curso, son aplicados a si puesto de trabajo', 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `schema_migrations`
--

CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schema_migrations`
--

INSERT INTO `schema_migrations` (`version`) VALUES
('20160623035933'),
('20160626002041'),
('20160628040404'),
('20160629011123'),
('20160629041242'),
('20160802200447'),
('20160802200800');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `my_poll_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `my_poll_id`, `name`, `rank`) VALUES
(2, 1, 'Evaluación del contenido', 1),
(3, 1, 'Evaluación del instructor', 2),
(4, 1, 'Coordinación y logística', 3),
(5, 2, 'Seccion 1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uid`, `username`, `email`, `path`, `created_at`, `updated_at`) VALUES
(1, '1', 'SA', 'luismartinez242011@gmail.com', 'http://localhost/CECNA/public/uploads/users/624156237_362468667145619_1462982085_n.jpg', '2016-07-31 22:32:42', '2016-08-04 09:56:48'),
(2, '2', 'luismartinez24@gmail.com', 'luismartinez24@gmail.com', 'http://localhost/CECNA/public/uploads/users/4748luis.jpg', '2016-07-31 22:51:04', '2016-07-31 22:51:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_answers_on_question_id` (`question_id`),
  ADD KEY `index_answers_on_competitor_id` (`competitor_id`);

--
-- Indexes for table `competitors`
--
ALTER TABLE `competitors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_competitors_on_my_poll_id` (`my_poll_id`);

--
-- Indexes for table `my_polls`
--
ALTER TABLE `my_polls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_my_polls_on_user_id` (`user_id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_options_on_question_id` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_questions_on_section_id` (`section_id`);

--
-- Indexes for table `schema_migrations`
--
ALTER TABLE `schema_migrations`
  ADD UNIQUE KEY `unique_schema_migrations` (`version`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_sections_on_my_poll_id` (`my_poll_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;
--
-- AUTO_INCREMENT for table `competitors`
--
ALTER TABLE `competitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `my_polls`
--
ALTER TABLE `my_polls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_rails_7eb1395254` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `fk_rails_cd4d94e160` FOREIGN KEY (`competitor_id`) REFERENCES `competitors` (`id`);

--
-- Constraints for table `competitors`
--
ALTER TABLE `competitors`
  ADD CONSTRAINT `fk_rails_6732ab4523` FOREIGN KEY (`my_poll_id`) REFERENCES `my_polls` (`id`);

--
-- Constraints for table `my_polls`
--
ALTER TABLE `my_polls`
  ADD CONSTRAINT `fk_rails_42f37a0c2c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `fk_rails_b5f2c2e5f1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_rails_b61392dca3` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`);

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `fk_rails_2382409063` FOREIGN KEY (`my_poll_id`) REFERENCES `my_polls` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
