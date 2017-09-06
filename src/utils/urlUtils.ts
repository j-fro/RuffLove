type QueryParams = { [param: string]: string };

export function buildQueryURL(base: string, params: QueryParams): string {
    const query = Object.entries(params).map(entry => entry.map(encodeURI).join('=')).join('&');
    if (base[base.length - 1] !== '?') {
        return `${base}?${query}`;
    } else {
        throw new Error(`Submitted a possibly malformed base URL: ${base}`);
    }
}
