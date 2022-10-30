import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParamPipe implements PipeTransform {
  constructor(private param: string) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new HttpException(
        `${this.param} param missing`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
