import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { TeacherStaffService } from '@base/api/services/TeacherStaff/TeacherStaffService';
import { Service } from 'typedi';
import { TeacherStaffCreateRequest } from '@base/api/requests/TeacherStaff/TeacherStaffCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { TeacherStaffUpdateRequest } from '@base/api/requests/TeacherStaff/TeacherStaffUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/teachers')
@UseBefore(AuthCheck)
export class TeacherStaffController extends ControllerBase {
  public constructor(private teacherStaffService: TeacherStaffService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.teacherStaffService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.teacherStaffService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() TeacherStaff: TeacherStaffCreateRequest) {
    console.log(TeacherStaff);
    return await this.teacherStaffService.create(TeacherStaff);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() TeacherStaff: TeacherStaffUpdateRequest) {
    return await this.teacherStaffService.updateOneById(id, TeacherStaff);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.teacherStaffService.deleteOneById(id);
  }

  @Post('/bulk-create')
  @HttpCode(201)
  public async bulkCreate(@Body() teacherStaffCreateRequests: TeacherStaffCreateRequest[]) {
    return await this.teacherStaffService.bulkCreate(teacherStaffCreateRequests);
  }
}
