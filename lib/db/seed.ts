import data from '@/lib/data';
import { connectToDatabase } from '.';
import Product from './models/product.model';
import { cwd } from 'process';
import { loadEnvConfig } from '@next/env';
import User from './models/user.model';


loadEnvConfig(cwd());

const main = async () => {
  try {
    const { products, users } = data

    // 1. Check if MONGODB_URI is defined *before* connecting:
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set.  Check your .env file.");
    }

    // 2. Connect to the database:
    await connectToDatabase(process.env.MONGODB_URI);
    await User.deleteMany()
    const createdUser = await User.insertMany(users)
    console.log(`Created ${createdUser}`)

    // 3. Clear existing products (important for seeding):
    const deletedCount = await Product.deleteMany();
    console.log(`Deleted ${deletedCount.deletedCount} products.`); // Helpful message

    // 4. Insert new products:
    const createdProducts = await Product.insertMany(products);
    console.log(`Inserted ${createdProducts.length} products.`); // More informative

    // 5. Success message:
    console.log({ message: 'Seeded database successfully' }); // Simplified message

    // 6. Exit with success code:
    process.exit(0);

  } catch (error) {
    // 7. Improved error logging:
    console.error("Error seeding database:", error); // Include the actual error object
    if (error instanceof Error) { // Check if error is an instance of Error
      console.error("Error message:", error.message); // Log the error message
    }
    

    // 8. Exit with error code:
    process.exit(1); // Non-zero exit code indicates failure
  }
};

main();