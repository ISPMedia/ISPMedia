/*
  Warnings:

  - You are about to drop the column `data_lancamento` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `music` table. All the data in the column will be lost.
  - You are about to drop the column `music` on the `music` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `music` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `videos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `release_date` to the `albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lyrics` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `music_music_key` ON `music`;

-- DropIndex
DROP INDEX `videos_video_key` ON `videos`;

-- AlterTable
ALTER TABLE `albums` DROP COLUMN `data_lancamento`,
    ADD COLUMN `release_date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `music` DROP COLUMN `duration`,
    DROP COLUMN `music`,
    DROP COLUMN `published`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL,
    ADD COLUMN `lyrics` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL,
    ADD COLUMN `path` VARCHAR(191) NOT NULL,
    ADD COLUMN `publisher` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `videos` DROP COLUMN `duration`,
    DROP COLUMN `video`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL,
    ADD COLUMN `path` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` BIGINT NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_GroupToPlaylist` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GroupToPlaylist_AB_unique`(`A`, `B`),
    INDEX `_GroupToPlaylist_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GroupToVideo` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GroupToVideo_AB_unique`(`A`, `B`),
    INDEX `_GroupToVideo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GroupToMusic` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GroupToMusic_AB_unique`(`A`, `B`),
    INDEX `_GroupToMusic_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AlbumToGroup` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AlbumToGroup_AB_unique`(`A`, `B`),
    INDEX `_AlbumToGroup_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `music_path_key` ON `music`(`path`);

-- CreateIndex
CREATE UNIQUE INDEX `videos_path_key` ON `videos`(`path`);

-- AddForeignKey
ALTER TABLE `_GroupToPlaylist` ADD CONSTRAINT `_GroupToPlaylist_A_fkey` FOREIGN KEY (`A`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToPlaylist` ADD CONSTRAINT `_GroupToPlaylist_B_fkey` FOREIGN KEY (`B`) REFERENCES `playlists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToVideo` ADD CONSTRAINT `_GroupToVideo_A_fkey` FOREIGN KEY (`A`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToVideo` ADD CONSTRAINT `_GroupToVideo_B_fkey` FOREIGN KEY (`B`) REFERENCES `videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToMusic` ADD CONSTRAINT `_GroupToMusic_A_fkey` FOREIGN KEY (`A`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToMusic` ADD CONSTRAINT `_GroupToMusic_B_fkey` FOREIGN KEY (`B`) REFERENCES `music`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlbumToGroup` ADD CONSTRAINT `_AlbumToGroup_A_fkey` FOREIGN KEY (`A`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlbumToGroup` ADD CONSTRAINT `_AlbumToGroup_B_fkey` FOREIGN KEY (`B`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
