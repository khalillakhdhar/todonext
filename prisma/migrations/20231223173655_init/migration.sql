-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
