import { z } from "zod";

export const checkoutSchema = z.object({
  nombreCliente: z
    .string()
    .trim()
    .min(2, "Name is required (min. 2 characters)")
    .max(80, "Name is too long"),
  telefono: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number (8 to 15 digits)"),
  correo: z
    .string()
    .trim()
    .email("Enter a valid email")
    .or(z.literal("")),
});

export type DatosCliente = z.infer<typeof checkoutSchema>;

 