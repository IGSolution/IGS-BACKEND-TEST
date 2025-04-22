import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports:  [
    
    //passport module registration
    PassportModule.register({defaultStrategy:'jwt'}),
    /*
    //jwt module registration
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService) => {
        return {
          secret:config.get<string>("JWT_SECRET"),
          signOptions:{
            expiresIn: config.get<string | number>("JWT_EXPIRE")
          }
        }
      }
    }),
    */
   JwtModule.register({
    secret:"mysecretekey",
    signOptions:{expiresIn:"2d"}
   }),
    //user schema registration
    MongooseModule.forFeature([{name:'User',schema:UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
