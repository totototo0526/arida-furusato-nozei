import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });

// mdbookのMarkdownパーサーは ````mermaid を <pre><code class="language-mermaid"> に変換します。
// Mermaid.js がこれを解釈できるよう、 <div class="mermaid"> に置換します。
document.addEventListener("DOMContentLoaded", () => {
    const mermaidBlocks = document.querySelectorAll("pre code.language-mermaid");
    mermaidBlocks.forEach(block => {
        const div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = block.textContent;
        // <pre>タグごと置換
        block.parentElement.replaceWith(div);
    });
    // 動的に要素を置換した後に再度レンダリングを実行
    mermaid.run();
});
