/*
  Warnings:

  - You are about to drop the column `resetExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetExpires",
DROP COLUMN "resetToken",
ADD COLUMN     "affiliation" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "grade" INTEGER NOT NULL,
ADD COLUMN     "languages" TEXT,
ADD COLUMN     "myGraders" TEXT,
ADD COLUMN     "pastComp" INTEGER,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "qualified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "scan" TEXT,
ADD COLUMN     "scores" TEXT,
ADD COLUMN     "site" TEXT NOT NULL,
ADD COLUMN     "special" TEXT,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL,
ALTER COLUMN "roleId" SET DEFAULT 3;
