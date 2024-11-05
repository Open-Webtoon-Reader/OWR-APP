export function useApi(){
    const apiUrl = useCookie("apiUrl");

    async function testConnection(apiUrl){
        try{
            await useFetch(`${apiUrl}/api/v1/version`);
            return true;
        }catch (e){
            return false;
        }
    }

    return {
        testConnection
    };
}
