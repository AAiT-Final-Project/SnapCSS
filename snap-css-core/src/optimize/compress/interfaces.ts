export interface Shorthand {
    shorthandName: string;
    shorthandProperties: string[];
}

export interface CSSObject {
    ruleSets: {
        name: string;
        params: string;
        rules: {
            selector: string;
            declarations: {
                property: string;
                value: string;
                type: string;
                unit: string;
                important: boolean;
            }[];
        }[];
    }[];
}
