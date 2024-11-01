-- CreateTable
CREATE TABLE `teams` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imgUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rounds` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `acronym` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `datas` (
    `id` INTEGER NOT NULL,
    `day` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matches` (
    `id` INTEGER NOT NULL,
    `dataId` INTEGER NOT NULL,
    `roundId` INTEGER NOT NULL,
    `teamHomeId` INTEGER NOT NULL,
    `teamHomeGoals` INTEGER NOT NULL,
    `teamVisitId` INTEGER NOT NULL,
    `teamVisitGoals` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_teamHomeId_fkey` FOREIGN KEY (`teamHomeId`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_teamVisitId_fkey` FOREIGN KEY (`teamVisitId`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
