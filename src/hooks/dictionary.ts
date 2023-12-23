import { remoteList } from "@/api/system/dict-data";
import { DictData } from "@/app/(admin)/system/dictionary/dict.type";
import { useCallback, useEffect, useState } from "react"

export const useDictionary = (code: string) => {
    const [data, setData] = useState<DictData[]>([]);

    useEffect(() => {
        getDictData(code);
    }, [code]);

    const getDictData = useCallback(async (dictType: string) => {
        try {
            let res = await remoteList({ dictType });
            let { list } = res.data;
            setData(list);
        } finally { }
    }, [code])


    return data;
}