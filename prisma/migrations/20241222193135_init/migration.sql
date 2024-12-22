-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ALUNO', 'TUTOR');

-- CreateEnum
CREATE TYPE "SchoolLevel" AS ENUM ('ENSINOMEDIO', 'GRADUACAO');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipoconta" "AccountType" NOT NULL DEFAULT 'ALUNO',
    "escolaridade" "SchoolLevel" NOT NULL,
    "curso" TEXT NOT NULL,
    "scheduleUrl" TEXT,
    "disciplines" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
