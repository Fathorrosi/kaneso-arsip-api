import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { DepartmentService } from '@api/services/Department/DepartmentService';
import { Service } from 'typedi';
import { DepartmentCreateRequest } from '@api/requests/Department/DepartmentCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { DepartmentUpdateRequest } from '@api/requests/Department/DepartmentUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/departments')
@UseBefore(AuthCheck)
export class DepartmentController extends ControllerBase {
  public constructor(private DepartmentService: DepartmentService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.DepartmentService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.DepartmentService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() Department: DepartmentCreateRequest) {
    return await this.DepartmentService.create(Department);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() Department: DepartmentUpdateRequest) {
    return await this.DepartmentService.updateOneById(id, Department);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.DepartmentService.deleteOneById(id);
  }
}
