import ApiService from "./api_service";

export default function useApi(axiosIns) {
    const api = new ApiService(axiosIns)

    return {
        api,
    }
}