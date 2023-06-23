import { ApiProperty } from '@nestjs/swagger';

export class UploadReceiptDTO {
  @ApiProperty({ type: 'file', items: { type: 'file', items: { type: 'string', format: 'binary' } } })
  receipt: Express.Multer.File;

  public get receiptString(): string {
    return Buffer.from(this.receipt.buffer).toString('base64');
  }
}
