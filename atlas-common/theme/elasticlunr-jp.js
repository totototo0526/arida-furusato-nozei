window.elasticlunr.Index.load = (index) => {
  const storeDocs = index.documentStore.docs;
  const indexArr = Object.keys(storeDocs);

  return {
    search: (searchterm) => {
      if (!searchterm) return [];

      const term = searchterm.toLowerCase();
      const results = [];

      for (const ref of indexArr) {
        const doc = storeDocs[ref];
        // undefined チェックを行いつつ、テキストを結合
        const title = doc.title || "";
        const breadcrumbs = doc.breadcrumbs || "";
        const body = doc.body || "";
        
        const text = (title + " " + breadcrumbs + " " + body).toLowerCase();

        // 単純な部分一致（substring）による検索
        if (text.includes(term)) {
          let score = 1;
          if (title.toLowerCase().includes(term)) score += 10;
          if (breadcrumbs.toLowerCase().includes(term)) score += 5;

          results.push({
            doc: doc,
            ref: ref,
            score: score
          });
        }
      }

      // スコアが高い順にソート
      return results.sort((a, b) => b.score - a.score);
    }
  };
};
