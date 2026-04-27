import { z } from "zod";
import type { HasDBClient } from "../shared.ts";

const Input = z.object({
  id: z.number().int().min(0),
});

type Input = HasDBClient & z.infer<typeof Input>;

export default (input: Input): void => {
  const { id } = Input.parse(input);
  console.log(`Deleting insight id=${id}`);

  input.db.sql`DELETE FROM insights WHERE id = ${id}`;

  console.log("Insight deleted");
};
