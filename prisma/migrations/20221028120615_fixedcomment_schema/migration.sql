/*
  Warnings:

  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "authorId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mobile" TEXT NOT NULL;
