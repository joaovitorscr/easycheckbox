/*
  Warnings:

  - You are about to drop the `CheckBoxes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CheckBoxes" DROP CONSTRAINT "CheckBoxes_authorId_fkey";

-- DropTable
DROP TABLE "CheckBoxes";
