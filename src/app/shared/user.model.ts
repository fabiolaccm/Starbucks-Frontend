import { Province } from "./province.model";
import { Role } from "./role.model";

export class User {
    id : string;
    name : string;
    email : string;
    roleId : string;
    provinceId : number;
    role: Role;
    province: Province;    
}