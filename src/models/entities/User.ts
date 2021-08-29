import { EntitySchema } from 'typeorm';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export default new EntitySchema<User>({
  name: 'user',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      default: 30,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
});
