import { contactMessageSchema } from '@schemas/contact-message.schema';
import { InferSelectModel } from 'drizzle-orm';

export type ContactMessageEntity = InferSelectModel<
  typeof contactMessageSchema
>;
