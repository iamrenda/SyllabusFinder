import fetchAllClasses from "./fetchAllClasses";

async function storeClasses(major, setClasses) {
    try {
        const classes = await fetchAllClasses(major);

        if (!classes || Object.keys(classes).length === 0) {
            console.error("No classes fetched");
            throw new Error("クラス情報の取得に失敗しました。");
        }

        await chrome.storage.local.set({ classes });
        setClasses(classes);

        return;
    } catch (error) {
        console.error("Error storing classes:", error);
        throw new Error("クラス情報を保存できませんでした。");
    }
}

export default storeClasses;
