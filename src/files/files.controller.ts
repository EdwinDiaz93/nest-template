import { Response } from 'express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers'
import { ApiTags } from '@nestjs/swagger'
import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ConfigService } from '@nestjs/config';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly condfigService: ConfigService
  ) { }

  @Get('product/:imageName')
  finProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path)
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer,
    }),

  }))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File
  ) {

    if (!file) throw new BadRequestException(`Make sure that the file is a valid image`);

    const secureUrl = `${this.condfigService.get('HOST_API')}/files/product/${file.filename}`;

    return {
      secureUrl
    };
  }
}
