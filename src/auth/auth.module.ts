/* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from './schema/user.schema';
// import { PassportModule } from '@nestjs/passport';
// import { ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategy/jwt.strategy';
// import { LocalStrategy } from './strategy/local.strategy';

// @Module({
//   imports:  [
    
//     //passport module registration
//     PassportModule.register({defaultStrategy:'jwt'}),

//    JwtModule.register({
//     secret:"mysecretekey",
//     signOptions:{expiresIn:"2d"}
//    }),
//     //user schema registration
//     MongooseModule.forFeature([{name:'User',schema:UserSchema}])
//   ],
//   controllers: [AuthController],
//   providers: [AuthService,LocalStrategy, JwtStrategy],
//   exports:[JwtStrategy, PassportModule]
// })
// export class AuthModule {}

// /src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}