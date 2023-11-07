import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { RoleService } from '@api/services/Role/RoleService';
import { Service } from 'typedi';
import { RoleCreateRequest } from '@api/requests/Role/RoleCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { RoleUpdateRequest } from '@api/requests/Role/RoleUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/roles')
@UseBefore(AuthCheck)
export class RoleController extends ControllerBase {
  public constructor(private RoleService: RoleService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.RoleService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.RoleService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() Role: RoleCreateRequest) {
    return await this.RoleService.create(Role);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() Role: RoleUpdateRequest) {
    return await this.RoleService.updateOneById(id, Role);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.RoleService.deleteOneById(id);
  }
}
