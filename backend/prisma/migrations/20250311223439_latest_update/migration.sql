/*
  Warnings:

  - You are about to drop the `Problem` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eligibility` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openness` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Site` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InstitutionType" AS ENUM ('UNIVERSITY', 'HIGH_SCHOOL', 'OTHER');

-- CreateEnum
CREATE TYPE "EligibilityType" AS ENUM ('STUDENTS_ONLY', 'FACULTY_ONLY', 'OPEN_TO_ALL');

-- CreateEnum
CREATE TYPE "OpennessType" AS ENUM ('OPEN', 'RESTRICTED', 'PRIVATE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'HOST', 'ORGANIZER', 'WEBMASTER');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "name" "UserRole" NOT NULL;

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "eligibility" "EligibilityType" NOT NULL,
ADD COLUMN     "openness" "OpennessType" NOT NULL,
ADD COLUMN     "website" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "InstitutionType" NOT NULL;

-- DropTable
DROP TABLE "Problem";

-- CreateTable
CREATE TABLE "_SiteHosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SiteHosts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SiteStudents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SiteStudents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SiteHosts_B_index" ON "_SiteHosts"("B");

-- CreateIndex
CREATE INDEX "_SiteStudents_B_index" ON "_SiteStudents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "_SiteHosts" ADD CONSTRAINT "_SiteHosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteHosts" ADD CONSTRAINT "_SiteHosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteStudents" ADD CONSTRAINT "_SiteStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteStudents" ADD CONSTRAINT "_SiteStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
