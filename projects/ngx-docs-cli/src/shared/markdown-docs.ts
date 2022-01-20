export const markdownDocsClasses = md => {
    md.core.ruler.push('add-docs-classes', state => {
        // these opening tags should be decorated with an additonal class
        // so we can target them during styling
        const targetTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'ul', 'li', 'a', 'code', 'dl', 'dt', 'dd', 'abbr', 'strong', 'table'];

        function scan(token) {
            if (token.type.substr(-5) === '_open') {
                if (targetTags.includes(token.tag)) {
                    token.attrJoin('class', `docs-markdown--${token.tag}`);
                }
            }
        }

        for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
            scan(state.tokens[blkIdx]);
        }
    });
};
