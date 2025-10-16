import { z } from "zod";

export const parcelSchema = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  type: z.string(),
  weight: z.number(),
  address: z.string(),
  deliveryDate: z.string().optional(), 
  fee: z.number().optional()// optional now
});