/*
  Warnings:

  - You are about to drop the column `capacityEnrolled` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `capacityNonEnrolled` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `booklet` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `countryOfIOL` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `parentApproved` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `parentEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pastComp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `qualified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `regDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `scores` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `site` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `statusOfAttendance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Contest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContestParticipation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SiteHosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SiteStudents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContestParticipation" DROP CONSTRAINT "ContestParticipation_contestId_fkey";

-- DropForeignKey
ALTER TABLE "ContestParticipation" DROP CONSTRAINT "ContestParticipation_studentId_fkey";

-- DropForeignKey
ALTER TABLE "_SiteHosts" DROP CONSTRAINT "_SiteHosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_SiteHosts" DROP CONSTRAINT "_SiteHosts_B_fkey";

-- DropForeignKey
ALTER TABLE "_SiteStudents" DROP CONSTRAINT "_SiteStudents_A_fkey";

-- DropForeignKey
ALTER TABLE "_SiteStudents" DROP CONSTRAINT "_SiteStudents_B_fkey";

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "capacityEnrolled",
DROP COLUMN "capacityNonEnrolled";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthdate",
DROP COLUMN "booklet",
DROP COLUMN "city",
DROP COLUMN "countryOfIOL",
DROP COLUMN "gender",
DROP COLUMN "grade",
DROP COLUMN "languages",
DROP COLUMN "parentApproved",
DROP COLUMN "parentEmail",
DROP COLUMN "pastComp",
DROP COLUMN "phone",
DROP COLUMN "qualified",
DROP COLUMN "regDate",
DROP COLUMN "school",
DROP COLUMN "scores",
DROP COLUMN "site",
DROP COLUMN "state",
DROP COLUMN "statusOfAttendance",
DROP COLUMN "zip",
ALTER COLUMN "roleId" DROP DEFAULT;

-- DropTable
DROP TABLE "Contest";

-- DropTable
DROP TABLE "ContestParticipation";

-- DropTable
DROP TABLE "_SiteHosts";

-- DropTable
DROP TABLE "_SiteStudents";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "countryOfIOL" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "school" TEXT,
    "siteId" INTEGER,
    "languages" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
