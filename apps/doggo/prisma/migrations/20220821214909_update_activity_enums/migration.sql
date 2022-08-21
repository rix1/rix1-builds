/*
  Warnings:

  - The values [PLAY,UNKNOWN] on the enum `Activity` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Activity_new" AS ENUM ('WALK', 'POOP', 'FOOD', 'PEE', 'TRAINING', 'SOCIALIZE', 'OTHER');
ALTER TABLE "DogEvent" ALTER COLUMN "activity" TYPE "Activity_new" USING ("activity"::text::"Activity_new");
ALTER TYPE "Activity" RENAME TO "Activity_old";
ALTER TYPE "Activity_new" RENAME TO "Activity";
DROP TYPE "Activity_old";
COMMIT;

-- AlterTable
ALTER TABLE "DogEvent" ALTER COLUMN "activity" SET DEFAULT 'OTHER';
