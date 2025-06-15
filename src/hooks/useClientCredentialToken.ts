import { useQuery } from "@tanstack/react-query"
import { getClientCredentialToken } from "../apis/authApi"

const useClientCredentialToken = (): string | undefined=> {
    const {data} = useQuery({
        queryKey:['client-credential-token'],
        queryFn: getClientCredentialToken
    })
    const clientVredentialToken = data?.access_token;
    return clientVredentialToken;
};

export default useClientCredentialToken;