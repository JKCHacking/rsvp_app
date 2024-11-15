import api from "./axios";

const postVisitorApi = async (data: Array<Record<string, string>>) => {
    try {
        const response = await api.post("/visitor", data);
    } catch (error) {

    }
};
