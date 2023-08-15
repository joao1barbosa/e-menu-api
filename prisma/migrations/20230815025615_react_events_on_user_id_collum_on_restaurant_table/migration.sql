-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_userId_fkey";

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
