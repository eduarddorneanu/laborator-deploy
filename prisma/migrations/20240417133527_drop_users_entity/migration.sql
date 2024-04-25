/*
  Warnings:

  - You are about to drop the column `owner_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_user_id_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "owner_id",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "users";

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");
