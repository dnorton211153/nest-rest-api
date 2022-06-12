import { Controller, Get, Post, Put, Delete, Body, Req, Res, Param } from '@nestjs/common';
import { CreateItemDTO } from './dto/create-item.dto';
import { Request, Response } from 'express';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    // Express way: 
    // findAll(@Req() req: Request, @Res() res: Response): Response {
    findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Item> {
        console.log(`object id: ${id}`);
        return this.itemsService.findOne(id);
    }

    @Post()
    create(@Body() createItemDTO: CreateItemDTO): Promise<Item> {
        return this.itemsService.create(createItemDTO);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Item> {
        return this.itemsService.delete(id);
    }

    @Put(':id')
    update(@Param('id') id, @Body() createItemDTO: CreateItemDTO): Promise<Item> {
        return this.itemsService.update(id, createItemDTO);
    }
}
