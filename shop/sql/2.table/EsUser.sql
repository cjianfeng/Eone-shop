/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2015-06-08 17:43:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `EsUser`
-- ----------------------------
DROP TABLE IF EXISTS `EsUser`;
CREATE TABLE `EsUser` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `userName` varchar(50) DEFAULT NULL COMMENT '用户名',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `gender` char(1) DEFAULT NULL COMMENT '性别(W:女；M:男)',
  `roleId` int(11) DEFAULT NULL COMMENT '角色id',
  `description` varchar(1000) DEFAULT NULL COMMENT '描述',
  `creator` varchar(50) NOT NULL COMMENT '创建人',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `modifier` varchar(50) NOT NULL COMMENT '修改人',
  `modifyTime` datetime NOT NULL COMMENT '修改时间',
  `recVer` int(10) NOT NULL COMMENT '版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of EsUser
-- ----------------------------
INSERT INTO `EsUser` VALUES ('1', 'admin', '123456', 'M', null, null, '1', '2015-06-08 15:10:05', '1', '2015-06-08 15:10:14', '1');
