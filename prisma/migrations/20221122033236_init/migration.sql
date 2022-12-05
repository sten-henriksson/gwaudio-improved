/*
  Warnings:

  - You are about to alter the column `unixtime` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `unixtime` INTEGER UNSIGNED NOT NULL;
