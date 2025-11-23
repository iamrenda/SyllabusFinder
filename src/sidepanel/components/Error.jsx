import Button from "./Button";

function Error({ handleClick }) {
    return (
        <div className="flex h-screen justify-center items-center flex-col gap-2.5">
            <p className="text-lg">エラー：</p>
            <h1 className="text-2xl">CoursePowerの講義一覧にアクセスしてください</h1>
            <Button handleClick={handleClick}>再読み込みする</Button>
        </div>
    );
}

export default Error;
