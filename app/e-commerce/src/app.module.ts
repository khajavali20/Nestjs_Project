import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { StripeModule } from './stripe/stripe.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    PaymentsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, { autoIndex: true }),
    UserModule,
    StripeModule.forRoot(process.env.STRIPE_KEY, { apiVersion: '2022-11-15' }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
