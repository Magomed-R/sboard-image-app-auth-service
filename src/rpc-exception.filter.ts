import { Catch, RpcExceptionFilter } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { RpcException } from '@nestjs/microservices'

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<{ message: string; code: number }> {
    return throwError(() => exception.getError())
  }
}
