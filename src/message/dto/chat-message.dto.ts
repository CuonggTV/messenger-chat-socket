import { UserDto } from "../../user/dto/user.dto";

export interface ChatMessageDto {
    from: UserDto,
    messages: string[]
}