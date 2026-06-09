// mdbookのMarkdownパーサーは ````mermaid を <pre><code class="language-mermaid"> に変換します。
// Mermaid.js がこれを解釈できるよう、 <div class="mermaid"> に置換してからレンダリングします。
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 動的にモジュールをインポート（通常のscriptタグ内でも動作します）
        const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
        
        mermaid.initialize({ startOnLoad: false });

        const mermaidBlocks = document.querySelectorAll("pre code.language-mermaid");
        mermaidBlocks.forEach(block => {
            const div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = block.textContent;
            // <pre>タグごと置換
            block.parentElement.replaceWith(div);
        });

        // 置換後にレンダリングを実行
        await mermaid.run();
    } catch (e) {
        console.error("Mermaidの読み込みに失敗しました:", e);
    }
});
