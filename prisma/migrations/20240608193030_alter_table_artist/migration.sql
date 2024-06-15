/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `artists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `artists_name_key` ON `artists`(`name`);
