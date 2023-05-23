import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: true })
  password: string;
  /*
      @Prop({ required: true })
      roles: Role[];
      */
}
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
export type UserModel = Model<UserDocument>;
