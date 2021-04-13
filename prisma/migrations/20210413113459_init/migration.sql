-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pandascoreId" INTEGER NOT NULL,
    "teams" JSONB NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "logo" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tournamentId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tournament.id_unique" ON "Tournament"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ranking.id_unique" ON "Ranking"("id");

-- AddForeignKey
ALTER TABLE "Ranking" ADD FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
