import { DatabaseService } from "@/types/repo";
import { InitializerService } from "@/types/services";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";
import { Platform } from "@/types/index";
import { Result } from "@/types/result";

export default function createInitializerService({
  platform,
  databaseService,
}: {
  platform: Platform;
  databaseService: DatabaseService;
}): InitializerService {
  let initialized = false;

  return {
    async init() {
      if (initialized) {
        return Result.Ok(true);
      }

      try {
        if (platform === "web") {
          customElements.define("jeep-sqlite", JeepSqlite);
          const jeepSqliteElement = document.createElement("jeep-sqlite");
          document.body.appendChild(jeepSqliteElement);
          await customElements.whenDefined("jeep-sqlite");
        }

        const dbResult = await databaseService.init();
        if (dbResult.hasError()) {
          return dbResult.toError();
        }

        initialized = true;
        return Result.Ok(true);
      } catch (error: any) {
        return Result.Error("[services/initializer.service#init]", error);
      }
    },
  };
}
