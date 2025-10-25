/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `Sound` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Sound` table. All the data in the column will be lost.
  - Added the required column `file_type` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sound" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "description" TEXT,
    "tags" TEXT,
    "file_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Sound" ("author", "description", "id", "slug", "tags", "title") SELECT "author", "description", "id", "slug", "tags", "title" FROM "Sound";
DROP TABLE "Sound";
ALTER TABLE "new_Sound" RENAME TO "Sound";
CREATE UNIQUE INDEX "Sound_slug_key" ON "Sound"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
