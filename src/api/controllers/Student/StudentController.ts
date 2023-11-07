import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams, UploadedFile } from 'routing-controllers';
import { StudentService } from '@api/services/Student/StudentService';
import { Service } from 'typedi';
import { StudentCreateRequest } from '@api/requests/Student/StudentCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { StudentUpdateRequest } from '@api/requests/Student/StudentUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
// import * as path from 'path';
// import * as multer from 'multer';


@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/students')
@UseBefore(AuthCheck)
export class StudentController extends ControllerBase {
  
  public constructor(private studentService: StudentService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.studentService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.studentService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() student: StudentCreateRequest) {

    return await this.studentService.create(student);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() student: StudentUpdateRequest) {
    return await this.studentService.updateOneById(id, student);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.studentService.deleteOneById(id);
  }

  @Post('/bulk-create')
  @HttpCode(201)
  public async bulkCreate(@Body() students: StudentCreateRequest[]) {
    console.log(students)
    return await this.studentService.bulkCreate(students);
  }

  // @Post('/upload-photo')
  // @HttpCode(201)
  // public async uploadPhoto(
  //   @UploadedFile('photo', { options: { required: true } }) photo: Express.Multer.File
  // ) {
  //   try {
  //     console.log(__dirname)
  //     // Handle the file upload and save it to a specific directory
  //     const photoPath = path.join(uploadDirectory, photo.filename);

  //     // Simpan file ke direktori dengan menggunakan metode multer
  //     photo.path = photoPath;


  //     return {
  //       success: 'File uploaded successfully',
  //       photoPath: `/uploads/${photo.filename}`,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       error: 'Server error',
  //     };
  //   }
  // }
}
