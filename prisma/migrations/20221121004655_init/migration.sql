/*
  Warnings:

  - A unique constraint covering the columns `[postLink]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postLink` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `postLink` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_postLink_key` ON `Post`(`postLink`);
