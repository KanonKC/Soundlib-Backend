/*
  Warnings:

  - The primary key for the `Sound` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    "filename" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Sound" ("author", "createdAt", "description", "fileType", "filename", "id", "slug", "tags", "title", "updatedAt") SELECT "author", "createdAt", "description", "fileType", "filename", "id", "slug", "tags", "title", "updatedAt" FROM "Sound";
DROP TABLE "Sound";
ALTER TABLE "new_Sound" RENAME TO "Sound";
CREATE UNIQUE INDEX "Sound_slug_key" ON "Sound"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
