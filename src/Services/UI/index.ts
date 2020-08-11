export const getBgImageUrl = (_src: string | string[]) => {
    if (typeof _src === 'string') {
        return 'url(' + _src + ')';
    } else {
        let urlStr = '';
        _src.forEach((src, i) => {
            urlStr += 'url(' + (src ? src : 'unknown') + ')' + ( i === _src.length - 1 ? '' : ',' )
        });
        return urlStr;
    }
}