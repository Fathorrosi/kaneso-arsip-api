import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { PositionService } from '@api/services/Position/PositionService';
import { Service } from 'typedi';
import { PositionCreateRequest } from '@api/requests/Position/PositionCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { PositionUpdateRequest } from '@api/requests/Position/PositionUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/positions')
@UseBefore(AuthCheck)
export class PositionController extends ControllerBase {
  public constructor(private PositionService: PositionService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.PositionService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.PositionService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() Position: PositionCreateRequest) {
    return await this.PositionService.create(Position);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() Position: PositionUpdateRequest) {
    return await this.PositionService.updateOneById(id, Position);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.PositionService.deleteOneById(id);
  }
}
