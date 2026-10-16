import { z } from "zod";

export const shippingOptions = ["Same day", "1-3 days", "1 week", "Custom"] as const;

export const EscrowCreateSchema = z.object({
  // The `error` option customises zod's built-in "expected string, received
  // undefined" for a *missing* field; the `.min(1)` covers an empty string.
  itemName: z
    .string({ error: "Item name is required." })
    .min(1, "Item name is required."),
  priceUSDC: z
    .string({ error: "Price is required." })
    .min(1, "Price is required.")
    .refine(
      (val) => {
        const num = Number(val);
        return !Number.isNaN(num) && num > 0;
      },
      "Price must be a positive number."
    ),
  description: z
    .string({ error: "Description is required." })
    .min(1, "Description is required."),
  shippingWindow: z.enum(shippingOptions, { error: "Invalid shipping window." }),
}).strict();

export type EscrowCreateValues = z.infer<typeof EscrowCreateSchema>;
export type ShippingWindow = z.infer<typeof EscrowCreateSchema.shape.shippingWindow>;
