import { UserSchema } from "./schemaType";

export interface CommentFormProps {
  author: {
    name: string;
    image: string;
    id: string;
  };
  currentUser?: UserSchema;
  parentId: string;
}
