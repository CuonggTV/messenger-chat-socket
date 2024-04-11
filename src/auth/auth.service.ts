import axios from "axios";
import { UserDto } from "../user/dto/user.dto";

const API_URL = "http://localhost:3000";

export default class AuthService{
    static getProfile(accessToken: string, onResponse: (error: Error | null, profile: UserDto | null) => void) {
        // Create a REQUEST toward BE API to get Profile
        axios.get<UserDto>(`${API_URL}/auth/profile`, {
            // Create header with accessToken
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                onResponse(null, res.data);
            })
            .catch((err) => {
                onResponse(err, null);
            });
    }
}

