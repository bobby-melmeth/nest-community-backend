/*
  Warnings:

  - Added the required column `country` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "postCode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
