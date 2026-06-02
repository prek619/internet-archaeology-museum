-- CreateTable
CREATE TABLE "Artifact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exhibitNumber" TEXT NOT NULL,
    "exhibitSequence" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "releaseYear" INTEGER,
    "inventor" TEXT,
    "purpose" TEXT NOT NULL,
    "failureReason" TEXT NOT NULL,
    "historicalImpact" TEXT,
    "curatorNote" TEXT,
    "imageUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DISCONTINUED',
    "sourceType" TEXT NOT NULL DEFAULT 'ADMIN',
    "suggestionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Artifact_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "Suggestion" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "releaseYear" INTEGER,
    "purpose" TEXT NOT NULL,
    "failureReason" TEXT NOT NULL,
    "submitterName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VisitorCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL DEFAULT 47291
);

-- CreateIndex
CREATE UNIQUE INDEX "Artifact_exhibitNumber_key" ON "Artifact"("exhibitNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Artifact_exhibitSequence_key" ON "Artifact"("exhibitSequence");

-- CreateIndex
CREATE UNIQUE INDEX "Artifact_suggestionId_key" ON "Artifact"("suggestionId");
