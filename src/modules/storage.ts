import { Result } from "@/types/result";
import { Preferences as plain } from "@capacitor/preferences";
import { SecureStoragePlugin as secure } from "capacitor-secure-storage-plugin";
import logger from "./logger";

// Possible key values
type StorageKey = "";
type EncryptedStorageKey = "";

// Default Values
const plainDefault: Record<StorageKey, string> = {
  "": "", // TODO: Remove this
};

const secureDefault: Record<
  EncryptedStorageKey, string
> = {
  "": "", // TODO: Remove this
};

export default {
  async get(key: StorageKey): Promise<Result<string>> {
    try {
      const result = await plain.get({ key });
      return Result.Ok(result.value ?? plainDefault[key]);
    } catch (error: any) {
      return Result.Error("[modules/storage#get]", error);
    }
  },

  async set(key: StorageKey, value: string): Promise<Result<void>> {
    try {
      await plain.set({ key, value });
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[modules/storage#set]", error);
    }
  },

  async remove(key: StorageKey): Promise<Result<void>> {
    try {
      await plain.remove({ key });
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[modules/storage#remove]", error);
    }
  },

  async getEncrypted(
    key: EncryptedStorageKey
  ): Promise<Result<string>> {
    try {
      const result = await secure.get({ key });
      return Result.Ok(result.value);
    } catch (error: any) {
      logger.warn("[modules/storage#getEncrypted] Could not get key, using default", error);
      return Result.Ok(secureDefault[key]);
    }
  },

  async setEncrypted(
    key: EncryptedStorageKey,
    value: string
  ): Promise<Result<void>> {
    try {
      await secure.set({ key, value });
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[modules/storage#setEncrypted]", error);
    }
  },

  async removeEncrypted(
    key: EncryptedStorageKey
  ): Promise<Result<void>> {
    try {
      await secure.remove({ key });
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[modules/storage#removeEncrypted]", error);
    }
  },
};
