import { Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { validationPipe } from 'src/pipes/validation.pipe';

@Controller('uploadFile')
@ApiTags('Matches')
@UsePipes(validationPipe)
export class UploadFileController {
  @ApiOperation({ summary: 'Upload file' })
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          console.log(file);
          cb(null, file.fieldname + '-' + Date.now());
        },
      }),
    }),
  )
  uploadFile(@UploadedFile('file') file: Express.Multer.File) {
    console.log(file);
  }
}
