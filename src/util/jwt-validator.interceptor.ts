import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { InvalidToken } from './exception/invalid-token.exception';

@Injectable()
export class JwtValidatorInterceptor implements NestInterceptor {

  constructor(private jwtService: JwtService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const jwt = req?.headers['authorization'];

    // skip if is dev environment 
    if (process.env.ENV === 'dev') {
      return next.handle();
    }

    if (!this.validateJwt(jwt)) {
      throw new InvalidToken;
    }
    return next.handle();
  }

  // Verify header token with jwt
  validateJwt(token: string): Promise<boolean> {
    try {
      const verify = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET
      });

      return verify;
    } catch (error) {
      throw new InvalidToken('Invalid token');
    }
  }
}
