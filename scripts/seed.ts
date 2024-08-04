const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
    try {
        const categories = [
            {
                name: "IT & Software",
                subCategories: {
                    create: [
                        { name: "Web Development" },
                        { name: "Data Science" },
                        { name: "Cybersecurity" },
                        { name: "Others" },
                    ]
                }
            },
            {
                name: "Business",
                subCategories: {
                    create: [
                        { name: "E-Commerce" },
                        { name: "Marketing" },
                        { name: "Finance" },
                        { name: "Others" },
                    ]
                }
            },
            {
                name: "Design",
                subCategories: {
                    create: [
                        { name: "Graphic Design" },
                        { name: "3D & Animation" },
                        { name: "Interior Design" },
                        { name: "Others" },
                    ]
                }
            },
            {
                name: "Health",
                subCategories: {
                    create: [
                        { name: "Fitness" },
                        { name: "Yoga" },
                        { name: "Nutrition" },
                        { name: "Others" },
                    ]
                }
            },
        ];

        // Sequentially create each category with its subcategories
        for (const category of categories) {
            await database.category.create({
                data: {
                    name: category.name,
                    subCategory: category.subCategories
                },
                include: {
                    subCategory: true,
                }
            });
        }

        await database.level.createMany({
            data: [
                { name: "Beginner" },
                { name: "Intermediate" },
                { name: "Expert" },
                { name: "All levels" }
            ]
        });

        console.log("Seeding successfully completed");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await database.$disconnect();
    }
}

main();
