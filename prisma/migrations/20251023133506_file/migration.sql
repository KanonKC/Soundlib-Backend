/*
  Warnings:

  - Added the required column `fileType` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sound" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "description" TEXT,
    "tags" TEXT,
    "filename" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Sound" ("author", "createdAt", "description", "id", "slug", "tags", "title", "updatedAt") SELECT "author", "createdAt", "description", "id", "slug", "tags", "title", "updatedAt" FROM "Sound";
DROP TABLE "Sound";
ALTER TABLE "new_Sound" RENAME TO "Sound";
CREATE UNIQUE INDEX "Sound_slug_key" ON "Sound"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
