import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token") || null;

const decodeToken: IDecodeToken | null = token ? jwtDecode(token) : null;

export default decodeToken;
