import { z } from 'zod';

export const machineSchema = z.object({
  name: z.string()
    .min(5, "Machine name must be at least 3 characters")
    .max(20, "Machine name must be less than 20 characters")
    .regex(/^[a-zA-Z0-9\s\-]+$/, "Machine name can only contain letters, numbers, spaces and hyphens"),
  
  efficency: z.number()
    .min(0, "Efficency must be at least 0")
    .max(100, "Efficency must be at most 100"),
    
  location_id: z.number()
    .int("Location ID must be an integer")
    .positive("Location ID must be positive"),
    
  status_id: z.number()
    .int("Status ID must be an integer")
    .positive("Status ID must be positive")
});

// For updates (all fields optional)
export const machineUpdateSchema = machineSchema.partial();