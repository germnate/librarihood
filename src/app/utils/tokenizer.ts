const ignoreList = ['the', 'a']

export function tokenizer(str: string | null | undefined) {
    // ignore all characters and into a space, effectively characters work the same as a space
    // use commas to any authors, titles, publishers, etc.
    if (!str) return [];
    const input = str.toLowerCase().replace(/[!@#\$%\^&\*\.()\+\{\}\[\]\?]/g, ' ').replace(/\s+/g, ' ').trim();
    const commaSeparatedTokens = input.split(',').map(each => each.trim());
    return commaSeparatedTokens.reduce((acc, token) => {
        const split = token.split(' ').filter(word => !ignoreList.includes(word))
        return acc.concat(split)
    }, commaSeparatedTokens)
}