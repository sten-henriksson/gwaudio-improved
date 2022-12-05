/*
  Warnings:

  - Changed the type of `unixtime` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `unixtime`,
    ADD COLUMN `unixtime` DATETIME(3) NOT NULL;
