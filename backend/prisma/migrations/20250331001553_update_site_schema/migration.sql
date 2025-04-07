/*
  Warnings:

  - The values [STUDENTS_ONLY,FACULTY_ONLY,OPEN_TO_ALL] on the enum `EligibilityType` will be removed. If these variants are still used in the database, this will fail.
  - The values [RESTRICTED,PRIVATE] on the enum `OpennessType` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `timezone` on the `Site` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Timezone" AS ENUM ('EST', 'CST', 'MST', 'PST', 'AST', 'HAST');

-- AlterEnum
BEGIN;
CREATE TYPE "EligibilityType_new" AS ENUM ('ALL_STUDENTS', 'ENROLLED_ONLY');
ALTER TABLE "Site" ALTER COLUMN "eligibility" TYPE "EligibilityType_new" USING ("eligibility"::text::"EligibilityType_new");
ALTER TYPE "EligibilityType" RENAME TO "EligibilityType_old";
ALTER TYPE "EligibilityType_new" RENAME TO "EligibilityType";
DROP TYPE "EligibilityType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OpennessType_new" AS ENUM ('CLOSED', 'OPEN', 'OPEN_BY_APPROVAL');
ALTER TABLE "Site" ALTER COLUMN "openness" TYPE "OpennessType_new" USING ("openness"::text::"OpennessType_new");
ALTER TYPE "OpennessType" RENAME TO "OpennessType_old";
ALTER TYPE "OpennessType_new" RENAME TO "OpennessType";
DROP TYPE "OpennessType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "capacityEnrolled" INTEGER,
ADD COLUMN     "capacityNonEnrolled" INTEGER,
DROP COLUMN "timezone",
ADD COLUMN     "timezone" "Timezone" NOT NULL;
