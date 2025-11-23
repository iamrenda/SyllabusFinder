function About() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Syllabus Finder シラバスファインダー</h1>
            <p className="mb-2">
                この拡張機能は、CoursePowerでの講義のシラバスを効率的にアクセスできるように作られました。少しでも便利に感じていただければ嬉しいです。（システム上、教室番号を含んだシラバスは検索できません。）
            </p>
            <p className="mb-2">
                バグ、要望等がありましたら、以下のGithubリポジトリにてIssueを立てていただけると幸いです。
            </p>
            <p className="mb-2">
                Github:
                <a href="https://github.com/Unknowncata/SyllabusFinder/" className="text-blue-500 underline">
                    https://github.com/Unknowncata/SyllabusFinder/
                </a>
            </p>
            <p className="mb-2">開発者：青山学院大学 情報テクノロジー学科 １年 渡部 廉</p>
        </div>
    );
}

export default About;
