export function convertToKebabCase(str: string): string {
    return str.toLowerCase().replace(/ /g, '-');
}

export function convertToCommaSeparated(str: string): string {
    return str.split(',').map(item => item.trim()).join(',');
}