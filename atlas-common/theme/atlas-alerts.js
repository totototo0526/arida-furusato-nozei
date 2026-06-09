document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('blockquote').forEach(bq => {
        const firstP = bq.querySelector('p');
        if (!firstP) return;
        
        const html = firstP.innerHTML;
        const text = firstP.textContent.trim();

        // 警告 (Warning) - 赤系
        if (text.startsWith('[!WARNING]') || text.startsWith('【警告】') || text.startsWith('警告:')) {
            bq.classList.add('alert-warning');
        } 
        // 注意 (Caution) - 黄色・オレンジ系
        else if (text.startsWith('[!CAUTION]') || text.startsWith('【注意】') || text.startsWith('注意:')) {
            bq.classList.add('alert-caution');
        }
        // 参考・Note - 青系 (デフォルト)
        else if (text.startsWith('[!NOTE]') || text.startsWith('【参考】') || text.startsWith('【メモ】')) {
            bq.classList.add('alert-note');
        }
    });
});
