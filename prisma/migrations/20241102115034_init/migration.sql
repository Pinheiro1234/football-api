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
CREATE TABLE `dates` (
    `id` INTEGER NOT NULL,
    `day` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matches` (
    `id` INTEGER NOT NULL,
    `dateId` INTEGER NULL,
    `roundId` INTEGER NOT NULL,
    `teamHomeId` INTEGER NULL,
    `teamHomeGoals` INTEGER NULL,
    `teamVisitId` INTEGER NULL,
    `teamVisitGoals` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `dates`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_roundId_fkey` FOREIGN KEY (`roundId`) REFERENCES `rounds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_teamHomeId_fkey` FOREIGN KEY (`teamHomeId`) REFERENCES `teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_teamVisitId_fkey` FOREIGN KEY (`teamVisitId`) REFERENCES `teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
