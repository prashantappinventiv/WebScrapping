import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('');
    console.log(
      '*********************************REQUEST START*************************************',
    );
    console.log(`NEW REQUEST ---> ${req.method} ${req.originalUrl}`);
    console.log('req Type=======>', req.method.toUpperCase());
    console.log('req Path=======>', req.path);
    console.log('req Body=======>', req.body);
    console.log('req Params=====>', req.params);
    console.log(
      '********************************REQUEST ENDS******************************************',
    );
    next();
  }
}
