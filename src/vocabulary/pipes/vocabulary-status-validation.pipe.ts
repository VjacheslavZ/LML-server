import { BadRequestException, PipeTransform } from '@nestjs/common';
import { VocabularyStatus } from '../vocabulary-status.enum';

export class VocabularyStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    VocabularyStatus.WAITING,
    VocabularyStatus.IN_PROGRESS,
    VocabularyStatus.DONE,
  ];

  transform(value: any): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
