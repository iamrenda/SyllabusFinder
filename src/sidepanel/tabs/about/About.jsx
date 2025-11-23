function About() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">シラバスファインダー (Syllabus Finder)</h1>
            <p className="mb-2">
                シラバスファインダーは、青山学院大学学生のためだけに作られた Chrome 拡張機能です。ぜひご活用ください。
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
            <footer className="text-xs text-gray-500 mt-6">
                © 2025 渡部 廉.
                無断転載を禁じます。本拡張機能は個人によって製作されたものであり，青山学院大学の公式の機能ではありません．
                本拡張機能の利用によって，利用者及び第三者に生じた損害においては，責任を負わないものとします．
            </footer>
        </div>
    );
}

export default About;
