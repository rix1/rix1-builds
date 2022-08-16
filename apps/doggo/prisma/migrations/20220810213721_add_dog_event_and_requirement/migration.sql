-- CreateEnum
CREATE TYPE "TimeSlot" AS ENUM ('ANY_TIME', 'MORNING', 'LUNCH', 'AFTER_NOON');

-- CreateEnum
CREATE TYPE "Activity" AS ENUM ('WALK', 'POOP', 'FOOD', 'PEE', 'PLAY');

-- CreateTable
CREATE TABLE "DogEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "activity" "Activity" NOT NULL,

    CONSTRAINT "DogEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" SERIAL NOT NULL,
    "activity" "Activity" NOT NULL,
    "timeslot" "TimeSlot" NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DogEvent" ADD CONSTRAINT "DogEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
