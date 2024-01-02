import { Category } from "./category";
import { Tag } from "./tag";

export interface Article {
    id? : number;
    title : string;
    slug : string;
    description : string;
    content : string;
    created_at : Date;
    published_at :Date;
    rating : number;
    active : boolean;
    category : Category;
    tags : Tag[];
}
