export default class FileImportExport {
    public checkVueHTML(fileName: string): boolean {
        return fileName.endsWith('.html') || fileName.endsWith('.vue');
    }

    public extractCSSFromHtmlOrVue(importedFile: string): string {
        if (importedFile.indexOf('<style') === -1) {
            return '';
        }
        let start: number = importedFile.indexOf('<style>');
        if (start === -1) {
            start = importedFile.indexOf('<style scoped>') + 7;
        }
        const end: number = importedFile.indexOf('</style>');
        return importedFile.substring(start + 7, end);
    }

    public exportToVueHTML(toBeExported: string, content: string): string {
        let start: number = toBeExported.indexOf('<style>');
        if (start === -1) {
            start = toBeExported.indexOf('<style scoped>') + 7;
        }
        const end: number = toBeExported.indexOf('</style>');
        const parssedString =
            toBeExported.substring(0, start + 7) +
            '\n' + content +
            toBeExported.substr(end);

        return `data:text/plain;charset=utf-8, ${encodeURIComponent(
            parssedString
        )}`;
    }
}