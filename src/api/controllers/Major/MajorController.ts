import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { MajorService } from '@base/api/services/Major/MajorService';
import { MajorCreateRequest } from '@base/api/requests/Major/MajorCreateRequest';
import { MajorUpdateRequest } from '@base/api/requests/Major/MajorUpdateRequest';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/majors')
@UseBefore(AuthCheck)
export class MajorController extends ControllerBase {
  public constructor(private MajorService: MajorService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.MajorService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.MajorService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() Major: MajorCreateRequest) {
    return await this.MajorService.create(Major);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() Major: MajorUpdateRequest) {
    return await this.MajorService.updateOneById(id, Major);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.MajorService.deleteOneById(id);
  }
}
