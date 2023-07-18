/*
  Warnings:

  - You are about to drop the column `closed` on the `Transaction` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('staff', 'manager', 'admin', 'superadmin');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "closed";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "RoleEnumType" DEFAULT 'staff';
