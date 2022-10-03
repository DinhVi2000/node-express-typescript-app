import { Clazz } from "../schemas";

export class Attributes {
  static date = ["updated_at", "created_at", "deleted_at"];
  static common = {
    exclude: this.date,
  };
  static user = ["id", "email", "first_name", "last_name"];
}

export class Includes {
  static clazz = {
    model: Clazz,
    as: "clazz",
    attributes: Attributes.common,
  };
}
