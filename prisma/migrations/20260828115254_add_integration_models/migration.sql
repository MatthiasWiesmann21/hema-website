-- CreateTable
CREATE TABLE `ApiConnection` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `baseUrl` VARCHAR(191) NOT NULL,
    `authType` VARCHAR(191) NOT NULL DEFAULT 'none',
    `authConfig` LONGTEXT NOT NULL,
    `defaultHeaders` LONGTEXT NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workflow` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `triggerType` VARCHAR(191) NOT NULL DEFAULT 'manual',
    `webhookKey` VARCHAR(191) NULL,
    `cronExpression` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `steps` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Workflow_webhookKey_key`(`webhookKey`),
    INDEX `Workflow_triggerType_idx`(`triggerType`),
    INDEX `Workflow_active_idx`(`active`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkflowExecution` (
    `id` VARCHAR(191) NOT NULL,
    `workflowId` VARCHAR(191) NOT NULL,
    `triggerType` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `inputPayload` LONGTEXT NOT NULL,
    `outputPayload` LONGTEXT NULL,
    `error` LONGTEXT NULL,
    `retryCount` INTEGER NOT NULL DEFAULT 0,
    `maxRetries` INTEGER NOT NULL DEFAULT 3,
    `durationMs` INTEGER NULL,
    `stepLogs` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completedAt` DATETIME(3) NULL,

    INDEX `WorkflowExecution_workflowId_idx`(`workflowId`),
    INDEX `WorkflowExecution_status_idx`(`status`),
    INDEX `WorkflowExecution_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
