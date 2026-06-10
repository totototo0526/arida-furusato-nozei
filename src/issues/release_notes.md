# リリースノート（更新履歴）

システムへの機能追加や不具合修正など、リリース済みの対応履歴一覧です。

<div id="atlas-release-notes">
    <p>読み込み中...</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('atlas-release-notes');
    if (!container) return;

    const apiBase = window.location.origin.includes('localhost') ? 'https://atlas.totototo0526.xyz' : '';

    try {
        const res = await fetch(`${apiBase}/api/issues`);
        if (!res.ok) throw new Error('Failed to load');
        const allIssues = await res.json();

        // 完了済み(closed) のうち、"完了としてクローズ (completed)" されたものだけを抽出
        // ※「予定外の問題 (not_planned)」としてCloseされたものは除外されます
        const releases = allIssues.filter(i => {
            return i.state === 'closed' && i.state_reason === 'completed' && !i.pull_request;
        });

        if (releases.length === 0) {
            container.innerHTML = '<p style="color: gray;">まだリリースノートに掲載できる対応履歴がありません。（※GitHub上で `リリース` などのラベルを付けてCloseするとここに表示されます）</p>';
            return;
        }

        // 各チケットの「最後のコメント（対応内容）」を並列で取得する
        await Promise.all(releases.map(async (issue) => {
            try {
                const cRes = await fetch(`${apiBase}/api/issues/comments?issue_number=${issue.number}`);
                if (cRes.ok) {
                    const comments = await cRes.json();
                    if (comments.length > 0) {
                        issue.closingComment = comments[comments.length - 1].body;
                    }
                }
            } catch(e) {}
        }));

        // 月ごとにグルーピングする
        const grouped = {};
        releases.forEach(issue => {
            // closed_at が無い場合は created_at を使う
            const dateStr = issue.closed_at || issue.created_at;
            const date = new Date(dateStr);
            const monthKey = `${date.getFullYear()}年${date.getMonth() + 1}月`;
            if (!grouped[monthKey]) grouped[monthKey] = [];
            grouped[monthKey].push(issue);
        });

        const escapeHtml = (unsafe) => unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

        let html = '';
        for (const [month, issues] of Object.entries(grouped)) {
            html += `<h2 style="border-bottom: 2px solid var(--links); padding-bottom: 0.3em; margin-top: 1.5em;">${month}</h2>`;
            html += `<ul style="list-style-type: none; padding-left: 0;">`;
            
            issues.forEach(issue => {
                const closeDate = new Date(issue.closed_at || issue.created_at).toLocaleDateString('ja-JP');
                const safeTitle = escapeHtml(issue.title || 'タイトルなし');
                
                // コメントがあればコメントを優先、なければ本文を表示
                const contentToDisplay = issue.closingComment 
                    ? `**【対応内容】**\n${issue.closingComment}` 
                    : issue.body;

                const rawHtml = contentToDisplay ? marked.parse(contentToDisplay) : '';
                const safeBodyHtml = DOMPurify.sanitize(rawHtml);
                const bodyBlock = safeBodyHtml ? `<div class="issue-markdown-body" style="margin-top: 10px; padding: 15px; background: rgba(128,128,128,0.05); border-left: 3px solid #10b981; border-radius: 4px; font-size: 0.9em; line-height: 1.6;">${safeBodyHtml}</div>` : '';

                html += `
                    <li style="margin-bottom: 2em; padding-bottom: 1em; border-bottom: 1px dashed #eee;">
                        <div style="display: flex; align-items: baseline; gap: 10px;">
                            <span style="background: #10b981; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold;">リリース</span>
                            <span style="color: gray; font-size: 0.85em;">${closeDate}</span>
                        </div>
                        <h3 style="margin: 10px 0 0 0; font-size: 1.1em;">${safeTitle} <span style="font-weight: normal; color: gray; font-size: 0.8em;">(#${issue.number})</span></h3>
                        ${bodyBlock}
                    </li>
                `;
            });
            html += `</ul>`;
        }

        container.innerHTML = html;

    } catch (e) {
        container.innerHTML = '<p style="color:red;">更新履歴の読み込みに失敗しました。</p>';
    }
});
</script>
