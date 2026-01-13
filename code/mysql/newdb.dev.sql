CREATE DATABASE FactoryData;
USE     FactoryData;

-- 1. Drop all tables in reverse order (safe unlinking)
--DROP TABLE IF EXISTS machine_task;
--DROP TABLE IF EXISTS task;
--DROP TABLE IF EXISTS machine;
--DROP TABLE IF EXISTS sensor;
--DROP TABLE IF EXISTS users;
--DROP TABLE IF EXISTS role, status, priority, location, sensor_type;




CREATE TABLE role (
    role_id TINYINT AUTO_INCREMENT NOT NULL,
    name    VARCHAR(20) NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE status (
    status_id TINYINT AUTO_INCREMENT NOT NULL,
    value     VARCHAR(10) NOT NULL,
    PRIMARY KEY (status_id)
);

CREATE TABLE priority (
    priority_id TINYINT AUTO_INCREMENT NOT NULL,
    value       VARCHAR(20) NOT NULL,
    PRIMARY KEY (priority_id)
);

CREATE TABLE location (
    location_id TINYINT AUTO_INCREMENT NOT NULL,
    name        VARCHAR(20),
    PRIMARY KEY (location_id)
);

CREATE TABLE sensor_type (
    sensortype_id TINYINT AUTO_INCREMENT NOT NULL,
    name          VARCHAR(20) NOT NULL,
    PRIMARY KEY (sensortype_id)
);

-- Now core tables
CREATE TABLE users (
    user_id  TINYINT AUTO_INCREMENT NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email    VARCHAR(50) NOT NULL,
    role_id  TINYINT NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

CREATE TABLE sensor (
    sensor_id     TINYINT AUTO_INCREMENT NOT NULL,
    sensortype_id TINYINT NOT NULL,
    value         DECIMAL(10,2),
    PRIMARY KEY (sensor_id),
    FOREIGN KEY (sensortype_id) REFERENCES sensor_type(sensortype_id)
);

CREATE TABLE machine (
    machine_id  TINYINT AUTO_INCREMENT NOT NULL,
    name        VARCHAR(20) NOT NULL,
    location_id TINYINT NOT NULL,
    status_id   TINYINT NOT NULL,
    sensor_id   TINYINT ,
    PRIMARY KEY (machine_id),
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    FOREIGN KEY (status_id)   REFERENCES status(status_id),
    FOREIGN KEY (sensor_id)   REFERENCES sensor(sensor_id)
);

CREATE TABLE task (
    task_id     TINYINT AUTO_INCREMENT NOT NULL,
    user_id     TINYINT NOT NULL,
    description TEXT NOT NULL,
    priority_id TINYINT NOT NULL,
    deadline    DATETIME NOT NULL,
    status_id   TINYINT NOT NULL,
    startdate   DATETIME NOT NULL,
    PRIMARY KEY (task_id),
    FOREIGN KEY (user_id)     REFERENCES users(user_id),
    FOREIGN KEY (priority_id) REFERENCES priority(priority_id),
    FOREIGN KEY (status_id)   REFERENCES status(status_id)
);

-- Junction table LAST
CREATE TABLE machine_task (
    machinetask_id TINYINT AUTO_INCREMENT NOT NULL,
    machine_id     TINYINT NOT NULL,
    task_id        TINYINT NOT NULL,
    PRIMARY KEY (machinetask_id),
    FOREIGN KEY (machine_id) REFERENCES machine(machine_id),
    FOREIGN KEY (task_id)    REFERENCES task(task_id)
);