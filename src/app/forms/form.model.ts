export interface IFormTemplateModel {
    formName: string;
    createdBy: string;
    createdOn: Date;
    components: IFormComponentModel[];
}

export interface IFormComponentModel {
    customClass: string;
    customDefaultValue: string;
    columns: IColumnModel[];
    conditional: {
        show: boolean;
        when: string;
        eq: string;
        json: string;
    };
    dataGridLabel: boolean;
    defaultValue: any;
    description: string;
    fileMaxSize?: string;
    fileMinSize?: string;
    fileNameTemplate?: string;
    filePattern?: string;
    id: string;
    input: true;
    inputType: string;
    key: string;
    properties: Record<string, any>;
    label: string;
    labelMargin: number;
    labelPosition: string;
    labelWidth: number;
    placeholder: any;
    prefix: number | string;
    spellcheck: boolean;
    suffix: number | string;
    tableView: boolean;
    tooltip: string;
    truncateMultipleSpaces: boolean;
    type: string;
    validate: {
        required: boolean, 
        minLength: number, 
        maxLength: number
    };
    validateOn: string;
}

export interface IColumnModel {
    components: IFormComponentModel[];
    currentWidth: number;
    offset: number;
    pull: number;
    push: number;
    size: string;
    width: number;
}