import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'; 

@Injectable()
export class ItemsService {

    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) { }
    // private readonly items: Item[] = [
    //     {
    //         id: "32",
    //         name: 'Item 32',
    //         description: 'Description 32',
    //         qty: 32
    //     },
    //     {
    //         id: "5",
    //         name: 'Item 5',
    //         description: 'Description 5',
    //         qty: 5
    //     }
    // ];

    async findAll(): Promise<Item[]> {
        // return this.items;
        return await this.itemModel.find();
    }

    async findOne(id: string): Promise<Item> {
        // return this.items.find(item => item.id === id);
        return await this.itemModel.findOne({ _id: id });
    }

    async create(item: Item): Promise<Item> {
        // this.items.push(item);
        const newItem = new this.itemModel(item);
        return await newItem.save();
    }

    async delete(id: string): Promise<Item> {
        // const foundItem = this.items.find(item => item.id === id);
        // this.items.splice(this.items.indexOf(foundItem), 1);
        // return foundItem;
        return await this.itemModel.findByIdAndRemove(id);
    }

    async update(id: string, item: Item): Promise<Item> {
        // const foundItem = this.items.find(item => item.id === id);
        // foundItem.name = item.name;
        // foundItem.description = item.description;
        // foundItem.qty = item.qty;
        // return foundItem;
        return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
    }

}
