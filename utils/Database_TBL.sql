create DATABASE nodejs_login;
USE nodejs_login;

CREATE TABLE users (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  password varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE user ( 
'id' INT NOT NULL AUTO_INCREMENT , 
'first_name' VARCHAR(45) NOT NULL , 
'last_name' VARCHAR(45) NOT NULL , 
'email' VARCHAR(45) NOT NULL , 
'phone' VARCHAR(45) NOT NULL , 
'comments' TEXT NOT NULL , 
'status' VARCHAR(10) NOT NULL DEFAULT 'active' ,
 PRIMARY KEY (`id`));
 
 INSERT INTO `user` 
(`id`, `first_name`,  `last_name`,    `email`,                 `phone`,         `comments`, `status`) VALUES
(NULL, 'Amanda',      'Nunes',        'anunes@ufc.com',        '012345 678910', '',          'active'),
(NULL, 'Alexander',   'Volkanovski',  'avolkanovski@ufc.com',  '012345 678910', '',          'active'),
(NULL, 'Khabib',      'Nurmagomedov', 'knurmagomedov@ufc.com', '012345 678910', '',          'active'),
(NULL, 'Kamaru',      'Usman',        'kusman@ufc.com',        '012345 678910', '',          'active'),
(NULL, 'Israel',      'Adesanya',     'iadesanya@ufc.com',     '012345 678910', '',          'active'),
(NULL, 'Henry',       'Cejudo',       'hcejudo@ufc.com',       '012345 678910', '',          'active'),
(NULL, 'Valentina',   'Shevchenko',   'vshevchenko@ufc.com',   '012345 678910', '',          'active'),
(NULL, 'Tyron',       'Woodley',      'twoodley@ufc.com',      '012345 678910', '',          'active'),
(NULL, 'Rose',        'Namajunas ',   'rnamajunas@ufc.com',    '012345 678910', '',          'active'),
(NULL, 'Tony',        'Ferguson ',    'tferguson@ufc.com',     '012345 678910', '',          'active'),
(NULL, 'Jorge',       'Masvidal ',    'jmasvidal@ufc.com',     '012345 678910', '',          'active'),
(NULL, 'Nate',        'Diaz ',        'ndiaz@ufc.com',         '012345 678910', '',          'active'),
(NULL, 'Conor',       'McGregor ',    'cmcGregor@ufc.com',     '012345 678910', '',          'active'),
(NULL, 'Cris',        'Cyborg ',      'ccyborg@ufc.com',       '012345 678910', '',          'active'),
(NULL, 'Tecia',       'Torres ',      'ttorres@ufc.com',       '012345 678910', '',          'active'),
(NULL, 'Ronda',       'Rousey ',      'rrousey@ufc.com',       '012345 678910', '',          'active'),
(NULL, 'Holly',       'Holm ',        'hholm@ufc.com',         '012345 678910', '',          'active'),
(NULL, 'Joanna',      'Jedrzejczyk ', 'jjedrzejczyk@ufc.com',  '012345 678910', '',          'active')