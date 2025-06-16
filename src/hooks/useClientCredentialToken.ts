import { useQuery } from "@tanstack/react-query"
import { getClientCredentialToken } from "../apis/authApi"
import { useEffect } from "react";

const useClientCredentialToken = (): string | undefined => {
    const { data } = useQuery({
        queryKey: ['client-credential-token'],
        queryFn: getClientCredentialToken,
        staleTime: 1000 * 60 * 50, // 50분 캐시
    });
    
    // useEffect로 토큰 저장 처리
    useEffect(() => {
        if (data?.access_token) {
            localStorage.setItem('spotify-client-token', data.access_token);
            localStorage.setItem('spotify-client-token-expires', 
                (Date.now() + (data.expires_in * 1000)).toString()
            );
        }
    }, [data]);
    
    // 캐시된 데이터가 없으면 localStorage에서 가져오기
    const storedToken = localStorage.getItem('spotify-client-token');
    const expiresAt = localStorage.getItem('spotify-client-token-expires');
    
    // 토큰 만료 체크
    if (storedToken && expiresAt && Date.now() < parseInt(expiresAt)) {
        return data?.access_token || storedToken;
    }
    
    // 만료된 토큰 제거
    if (storedToken && expiresAt && Date.now() >= parseInt(expiresAt)) {
        localStorage.removeItem('spotify-client-token');
        localStorage.removeItem('spotify-client-token-expires');
    }
    
    return data?.access_token;
};

export default useClientCredentialToken;