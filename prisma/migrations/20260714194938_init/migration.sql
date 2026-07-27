-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "SlideType" AS ENUM ('TITLE', 'VERSE', 'CHORUS', 'BRIDGE', 'ENDING', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ProjectionType" AS ENUM ('HYMN', 'PROGRAM', 'SERVICE_LIST');

-- CreateEnum
CREATE TYPE "ProjectionStatus" AS ENUM ('WAITING', 'RUNNING', 'PAUSED', 'FINISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'OPERATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Background" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hymn" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "category" TEXT,
    "page" INTEGER,
    "lyrics" TEXT NOT NULL,
    "tags" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "useCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "backgroundId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hymn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HymnSection" (
    "id" TEXT NOT NULL,
    "hymnId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "SlideType" NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "HymnSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HymnSlide" (
    "id" TEXT NOT NULL,
    "hymnId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "SlideType" NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "HymnSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "presentedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramSlide" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "speaker" TEXT,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "backgroundId" TEXT,

    CONSTRAINT "ProgramSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceListSection" (
    "id" TEXT NOT NULL,
    "serviceListId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ServiceListSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceListItem" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "folder" INTEGER,
    "page" INTEGER,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ServiceListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projection" (
    "id" TEXT NOT NULL,
    "type" "ProjectionType" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "currentSlide" INTEGER NOT NULL DEFAULT 0,
    "status" "ProjectionStatus" NOT NULL DEFAULT 'WAITING',
    "createdById" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectionHistory" (
    "id" TEXT NOT NULL,
    "projectionId" TEXT NOT NULL,
    "slide" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Hymn" ADD CONSTRAINT "Hymn_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "Background"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HymnSection" ADD CONSTRAINT "HymnSection_hymnId_fkey" FOREIGN KEY ("hymnId") REFERENCES "Hymn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HymnSlide" ADD CONSTRAINT "HymnSlide_hymnId_fkey" FOREIGN KEY ("hymnId") REFERENCES "Hymn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramSlide" ADD CONSTRAINT "ProgramSlide_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramSlide" ADD CONSTRAINT "ProgramSlide_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "Background"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceListSection" ADD CONSTRAINT "ServiceListSection_serviceListId_fkey" FOREIGN KEY ("serviceListId") REFERENCES "ServiceList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceListItem" ADD CONSTRAINT "ServiceListItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ServiceListSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projection" ADD CONSTRAINT "Projection_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectionHistory" ADD CONSTRAINT "ProjectionHistory_projectionId_fkey" FOREIGN KEY ("projectionId") REFERENCES "Projection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
