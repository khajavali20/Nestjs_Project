import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'databases/user.schema';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    StripeModule.forRoot(process.env.STRIPE_KEY, { apiVersion: '2022-11-15' }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
