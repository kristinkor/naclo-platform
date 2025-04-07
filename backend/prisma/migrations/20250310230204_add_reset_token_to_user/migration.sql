/*
  Warnings:

  - You are about to drop the column `affiliation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `myGraders` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `scan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `special` on the `User` table. All the data in the column will be lost.
  - Added the required column `countryOfIOL` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "affiliation",
DROP COLUMN "country",
DROP COLUMN "myGraders",
DROP COLUMN "scan",
DROP COLUMN "special",
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "booklet" TEXT,
ADD COLUMN     "countryOfIOL" TEXT NOT NULL,
ADD COLUMN     "parentApproved" BOOLEAN,
ADD COLUMN     "parentEmail" TEXT,
ADD COLUMN     "school" TEXT,
ADD COLUMN     "statusOfAttendance" TEXT,
ALTER COLUMN "grade" DROP NOT NULL,
ALTER COLUMN "regDate" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "zip" DROP NOT NULL,
ALTER COLUMN "zip" SET DATA TYPE TEXT;
