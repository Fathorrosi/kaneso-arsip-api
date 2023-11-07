import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { SubjectService } from '@api/services/Subject/SubjectService';
import { Service } from 'typedi';
import { SubjectCreateRequest } from '@api/requests/Subject/SubjectCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { SubjectUpdateRequest } from '@api/requests/Subject/SubjectUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/subjects')
@UseBefore(AuthCheck)
export class SubjectController extends ControllerBase {
  public constructor(private SubjectService: SubjectService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.SubjectService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.SubjectService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() Subject: SubjectCreateRequest) {
    return await this.SubjectService.create(Subject);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() Subject: SubjectUpdateRequest) {
    return await this.SubjectService.updateOneById(id, Subject);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.SubjectService.deleteOneById(id);
  }
}
