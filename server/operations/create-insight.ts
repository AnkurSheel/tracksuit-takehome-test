import { z } from "zod";
import type { HasDBClient } from "../shared.ts";

const Input = z.object({
  brand: z.number().int().min(0),
  text: z.string().min(1),
});

type Input = HasDBClient & z.infer<typeof Input>;

export default (input: Input): void => {
  const { brand, text } = Input.parse(input);
  console.log(`Creating insight for brand=${brand}`);

  const createdAt = new Date().toISOString();

  input.db
    .sql`INSERT INTO insights (brand, createdAt, text) VALUES (${brand}, ${createdAt}, ${text})`;

  console.log("Insight created");
};
