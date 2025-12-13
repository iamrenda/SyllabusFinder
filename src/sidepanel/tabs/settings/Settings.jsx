import { FaRegTrashCan, FaRegUser } from "react-icons/fa6";
import { useContext } from "react";
import { SyllabusFinderContext } from "../../Context/SyllabusFinderContext";

function handleDataReset() {
    if (window.confirm("本当にこの拡張機能に保存されたデータを初期化しますか？")) {
        chrome.storage.local.clear().then(() => {
            alert("データが初期化されました。拡張機能を再設定してください。");
            window.location.reload();
        });
    }
}

function Settings() {
    const { selectedMajor } = useContext(SyllabusFinderContext);

    return (
        <ul className="flex gap-8 flex-col px-2.5 py-5">
            <li className="grid grid-cols-[1.6rem_auto] gap-3 items-center">
                <FaRegUser color="#1864AB" size={20} />
                <h2 className="text-lg">学科</h2>
                <p className="col-start-2 text-sm/normal text-gray-900">{selectedMajor}</p>
            </li>

            <li className="grid grid-cols-[1.6rem_auto] gap-3 items-center">
                <FaRegTrashCan color="#C92A2A" size={20} />
                <h2 className="text-lg">初期化</h2>
                <p className="col-start-2 text-xs/normal text-gray-600 ">
                    {`下のボタンをクリックすると、この拡張機能に保存されたデータ（あなたの学科、クラス一覧の情報、シラバスのリンク）が削除されます。
                            
                            もし新しい学期が始まり、クラスが変わりましたら下のボタンをクリックしてやり直してください。`}
                </p>
                <a
                    href=""
                    onClick={handleDataReset}
                    className="text-red-700 font-bold hover:underline grid col-start-2 text-sm"
                >
                    データを初期化する
                </a>
            </li>
        </ul>
    );
}

export default Settings;
