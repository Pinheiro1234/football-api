/*
  Warnings:

  - You are about to drop the column `dataId` on the `matches` table. All the data in the column will be lost.
  - Added the required column `dateId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `matches` DROP COLUMN `dataId`,
    ADD COLUMN `dateId` INTEGER NOT NULL;
