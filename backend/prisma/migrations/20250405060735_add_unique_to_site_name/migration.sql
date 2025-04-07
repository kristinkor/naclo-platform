/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_SiteHosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SiteHosts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SiteHosts_B_index" ON "_SiteHosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Site_name_key" ON "Site"("name");

-- AddForeignKey
ALTER TABLE "_SiteHosts" ADD CONSTRAINT "_SiteHosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteHosts" ADD CONSTRAINT "_SiteHosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
