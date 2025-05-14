import { CategoryModel } from "@/models/category.model";
import { CategoryRepo, DatabaseClient } from "@/types/repo";

export default function createCategoryRepo({
  databaseClient,
}: {
  databaseClient: DatabaseClient;
}): CategoryRepo {
  return {
    async getCategories() {
      return await databaseClient.query<CategoryModel>(
        "SELECT * FROM categories;"
      );
    },
  };
}

