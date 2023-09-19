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
    password: string;
    constructor() {
        this.password = '';
        this.id = '',
        this.name = '',
        this.email = '',
        this.roleId = '',
        this.provinceId = 0,
        this.role = new Role(),
        this.province = new Province()

    }
}