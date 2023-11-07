import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { StaffService } from '@api/services/Staff/StaffService';
import { Service } from 'typedi';
import { StaffCreateRequest } from '@api/requests/Staff/StaffCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { StaffUpdateRequest } from '@api/requests/Staff/StaffUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/staffs')
@UseBefore(AuthCheck)
export class StaffController extends ControllerBase {
  public constructor(private StaffService: StaffService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.StaffService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.StaffService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() Staff: StaffCreateRequest) {
    return await this.StaffService.create(Staff);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() Staff: StaffUpdateRequest) {
    return await this.StaffService.updateOneById(id, Staff);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.StaffService.deleteOneById(id);
  }
}
