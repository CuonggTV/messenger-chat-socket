import { UserDto } from "./dto/user.dto";

export default class User implements UserDto{
    id: string;
    name: string;
    avt: string;

    constructor(id: string, name: string, avt: string) {
        this.id = id;
        this.name = name;
        this.avt = avt;
    }
}