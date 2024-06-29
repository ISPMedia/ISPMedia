/*
  Warnings:

  - You are about to drop the column `ownerId` on the `groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `groups` DROP FOREIGN KEY `groups_ownerId_fkey`;

-- AlterTable
ALTER TABLE `groups` DROP COLUMN `ownerId`;

-- CreateTable
CREATE TABLE `_GroupToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GroupToUser_AB_unique`(`A`, `B`),
    INDEX `_GroupToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlaylistToVideo` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PlaylistToVideo_AB_unique`(`A`, `B`),
    INDEX `_PlaylistToVideo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GroupToUser` ADD CONSTRAINT `_GroupToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToUser` ADD CONSTRAINT `_GroupToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistToVideo` ADD CONSTRAINT `_PlaylistToVideo_A_fkey` FOREIGN KEY (`A`) REFERENCES `playlists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistToVideo` ADD CONSTRAINT `_PlaylistToVideo_B_fkey` FOREIGN KEY (`B`) REFERENCES `videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
