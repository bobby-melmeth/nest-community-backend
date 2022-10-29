/*
  Warnings:

  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likes";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
