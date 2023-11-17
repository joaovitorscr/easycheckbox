-- CreateTable
CREATE TABLE "CheckBoxes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "CheckBoxes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckBoxes" ADD CONSTRAINT "CheckBoxes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
