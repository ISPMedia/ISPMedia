-- DropForeignKey
ALTER TABLE `music` DROP FOREIGN KEY `music_albumId_fkey`;

-- AlterTable
ALTER TABLE `music` MODIFY `albumId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `music` ADD CONSTRAINT `music_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
