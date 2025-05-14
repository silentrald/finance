import V1_Init_Upgrade from "./1-init";

export default function createDatabaseVersion() {
  return [
    V1_Init_Upgrade,
  ];
}
