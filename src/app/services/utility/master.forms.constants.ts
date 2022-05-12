import { formatDate } from "@angular/common";
import { DateUtil } from './DateUtil';
export class MasterForms {


    public static CREATE_USER_FORM_TEMPLATE: any = {
        "title": "Create User",
        "components": [

            {

                "columns": [{
                    "components": [{
                        "label": "First Name",
                        "labelPosition": "top",
                        "widget": {
                            "type": "input"
                        },

                        "validateOn": "blur",
                        "validate": {
                            "required": true,
                        },
                        "key": "firstName",
                        "type": "textfield",
                        "input": true,
                        "inputType": "text",
                        "id": "ehvvtgm"
                    }],
                    "width": 6,
                    "size": "md",
                    "currentWidth": 6
                },
                {
                    "components": [{
                        "label": "Last Name",
                        "labelPosition": "top",
                        "widget": {
                            "type": "input"
                        },
                        "validateOn": "blur",
                        "validate": {
                            "required": true,
                        },
                        "key": "lastName",
                        "type": "textfield",
                        "input": true,
                        "inputType": "text",
                        "id": "e25hyz"
                    },],
                    "width": 6,
                    "size": "md",
                    "currentWidth": 6
                },
                ],
                "key": "name-columns",
                "type": "columns",
                "labelPosition": "top",
                "id": "eftxofs"
            },

            {
                "label": "Email",
                "labelPosition": "top",
                "widget": {
                    "type": "input"
                },
                "validateOn": "blur",
                "validate": {
                    "required": true,
                },

                "kickbox": {
                    "enabled": true
                },
                "key": "email",
                "type": "email",
                "input": true,
                "inputType": "email",
                "id": "eza9ob"
            }, {
                "label": "Username",
                "labelPosition": "top",
                "widget": {
                    "type": "input"
                },
                "validateOn": "blur",
                "validate": {
                    "required": true,
                },
                "key": "username",
                "type": "textfield",
                "input": true,
                "inputType": "text",
                "id": "ey891p"
            },

            {
                "label": "Date Of Birth",
                "labelPosition": "top",
                "displayInTimezone": "utc",
                "useLocaleSettings": false,
                "allowInput": true,
                "format": DateUtil.DATE_FORMAT_SHORT,
                "enableDate": true,
                "datePicker": {
                    "disable": "",
                    "disableFunction": "",
                    "disableWeekends": false,
                    "disableWeekdays": false,
                    "minDate": null,
                    "maxDate": formatDate(new Date(), DateUtil.DATE_FORMAT_SHORT, 'en'),
                    "showWeeks": true,
                    "startingDay": 0,
                    "initDate": "",
                    "minMode": "day",
                    "maxMode": "year",
                    "yearRows": 4,
                    "yearColumns": 5
                },
                "enableTime": false,
                "enableMinDateInput": false,
                "enableMaxDateInput": false,
                "unique": false,
                "key": "dateOfBirth",
                "type": "datetime",
                "timezone": "utc",
                "input": true,
                "widget": {
                    "type": "calendar",
                    "displayInTimezone": "utc",
                    "locale": "en",
                    "useLocaleSettings": false,
                    "allowInput": true,
                    "mode": "single",
                    "enableTime": false,
                    "noCalendar": true,
                    "format": DateUtil.DATE_FORMAT_SHORT,
                    "hourIncrement": 1,
                    "minuteIncrement": 1,
                    "time_24hr": true,
                    "minDate": null,
                    "disabledDates": "",
                    "disableWeekends": false,
                    "disableWeekdays": false,
                    "disableFunction": "",
                    "maxDate": "2022-05-08"
                },
                "datepickerMode": "day",
                "id": "euoano"
            }, {
                "label": "Departments",
                "labelPosition": "top",
                "widget": "choicesjs",
                "dataSrc": "values",
                "data": {
                    "values": [],
                    "resource": "",
                    "json": "",
                    "url": "",
                    "custom": ""
                },
                "idPath": "id",
                "limit": 100,
                "template": "<span>{{ item.label }}</span>",
                "clearOnRefresh": false,
                "searchEnabled": true,
                "selectThreshold": 0.3,
                "validateOn": "change",
                "validate": {
                    "required": true,

                },
                "key": "departments",
                "type": "select",
                "input": true,
                "id": "ext18r"
            }, {
                "label": "Roles",
                "labelPosition": "top",
                "widget": "choicesjs",
                "dataSrc": "values",
                "data": {
                    "values": [],
                    "resource": "",
                    "json": "",
                    "url": "",
                    "custom": ""
                },
                "idPath": "id",
                "limit": 100,
                "template": "<span>{{ item.label }}</span>",
                "clearOnRefresh": false,
                "searchEnabled": true,
                "selectThreshold": 0.3,
                "validateOn": "change",
                "validate": {
                    "required": true,

                },

                "key": "roles",
                "type": "select",
                "input": true,
                "id": "ewz3b95"
            }]
    };

    public static UPDATE_USER_FORM_TEMPLATE: any = MasterForms.CREATE_USER_FORM_TEMPLATE;

    public static CREATE_ROLE_FORM_TEMPLATE: any = {
        "components": [{
            "label": "Name",
            "labelPosition": "top",
            "widget": {
                "type": "input"
            },
            "validateOn": "blur",
            "validate": {
                "required": true,
            },
            "key": "name",
            "type": "textfield",
            "input": true,
            "inputType": "text",
            "id": "eqizbym"
        }, {
            "label": "Description",
            "labelPosition": "top",
            "widget": {
                "type": "input"
            },
            "validateOn": "blur",
            "validate": {
                "required": false,
            },
            "key": "description",
            "type": "textfield",
            "input": true,
            "inputType": "text",
            "id": "eyn7p3r"
        }, {
            "label": "Permissions",
            "labelPosition": "top",
            "widget": "choicesjs",
            "hidden": true,
            "multiple": true,
            "dataSrc": "values",
            "data": {
                "values": [],
                "resource": "",
                "json": "",
                "url": "",
                "custom": ""
            },

            "idPath": "id",
            "limit": 100,
            "template": "<span>{{ item.label }}</span>",
            "clearOnRefresh": false,
            "searchEnabled": true,
            "selectThreshold": 0.3,
            "validateOn": "change",
            "validate": {
                "required": false,
            },

            "key": "permissions",
            "type": "select",
            "input": true,
            "id": "e6cbwu7"
        },],
        "Name": "Create Role",
        "Id": 4,
        "CreatedBy": "Akash",
        "CreatedOn": "5/3/2022"
    }

    public static sample: any = {
        "formName": "test",
        "components": [{
            "label": "Columns",
            "labelWidth": "",
            "labelMargin": "",
            "columns": [{
                "components": [{
                    "label": "Text Field",
                    "labelPosition": "top",
                    "labelWidth": "",
                    "labelMargin": "",
                    "placeholder": "",
                    "description": "",
                    "tooltip": "",
                    "prefix": "",
                    "suffix": "",
                    "widget": {
                        "type": "input"
                    },
                    "customClass": "",
                    "autofocus": false,
                    "spellcheck": true,
                    "disabled": false,
                    "multiple": false,
                    "defaultValue": "",
                    "persistent": true,
                    "inputFormat": "plain",
                    "protected": false,
                    "dbIndex": false,
                    "case": "",
                    "truncateMultipleSpaces": false,
                    "encrypted": false,
                    "redrawOn": "",
                    "clearOnHide": true,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "calculateServer": false,
                    "allowCalculateOverride": false,
                    "validateOn": "change",
                    "validate": {
                        "required": false,
                        "minLength": "",
                        "maxLength": "",
                        "custom": "",
                        "customPrivate": false,
                        "strictDateValidation": false,
                        "multiple": false,
                        "unique": false,
                        "pattern": ""
                    },
                    "unique": false,
                    "key": "textField",
                    "conditional": {
                        "show": null,
                        "when": null,
                        "eq": ""
                    },
                    "type": "textfield",
                    "input": true,
                    "hidden": false,
                    "refreshOn": "",
                    "tableView": true,
                    "modalEdit": false,
                    "dataGridLabel": false,
                    "errorLabel": "",
                    "hideLabel": false,
                    "tabindex": "",
                    "attributes": {},
                    "overlay": {
                        "style": "",
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "showCharCount": false,
                    "showWordCount": false,
                    "properties": {},
                    "allowMultipleMasks": false,
                    "addons": [],
                    "mask": false,
                    "inputType": "text",
                    "inputMask": "",
                    "displayMask": "",
                    "id": "ep2yhj8"
                }],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0,
                "size": "md",
                "currentWidth": 6
            }, {
                "components": [{
                    "label": "Text Field",
                    "labelPosition": "top",
                    "labelWidth": "",
                    "labelMargin": "",
                    "placeholder": "",
                    "description": "",
                    "tooltip": "",
                    "prefix": "",
                    "suffix": "",
                    "widget": {
                        "type": "input"
                    },
                    "customClass": "",
                    "autofocus": false,
                    "spellcheck": true,
                    "disabled": false,
                    "multiple": false,
                    "defaultValue": "",
                    "persistent": true,
                    "inputFormat": "plain",
                    "protected": false,
                    "dbIndex": false,
                    "case": "",
                    "truncateMultipleSpaces": false,
                    "encrypted": false,
                    "redrawOn": "",
                    "clearOnHide": true,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "calculateServer": false,
                    "allowCalculateOverride": false,
                    "validateOn": "change",
                    "validate": {
                        "required": false,
                        "minLength": "",
                        "maxLength": "",
                        "custom": "",
                        "customPrivate": false,
                        "strictDateValidation": false,
                        "multiple": false,
                        "unique": false,
                        "pattern": ""
                    },
                    "unique": false,
                    "key": "textField1",
                    "conditional": {
                        "show": null,
                        "when": null,
                        "eq": ""
                    },
                    "type": "textfield",
                    "input": true,
                    "hidden": false,
                    "refreshOn": "",
                    "tableView": true,
                    "modalEdit": false,
                    "dataGridLabel": false,
                    "errorLabel": "",
                    "hideLabel": false,
                    "tabindex": "",
                    "attributes": {},
                    "overlay": {
                        "style": "",
                        "left": "",
                        "top": "",
                        "width": "",
                        "height": ""
                    },
                    "showCharCount": false,
                    "showWordCount": false,
                    "properties": {},
                    "allowMultipleMasks": false,
                    "addons": [],
                    "mask": false,
                    "inputType": "text",
                    "inputMask": "",
                    "displayMask": "",
                    "id": "en9nyuo"
                }],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0,
                "size": "md",
                "currentWidth": 6
            }],
            "autoAdjust": false,
            "customClass": "",
            "hidden": false,
            "hideLabel": false,
            "modalEdit": false,
            "key": "columns",
            "tags": [],
            "properties": {},
            "conditional": {
                "show": "",
                "when": "",
                "eq": "",
                "json": ""
            },
            "customConditional": "",
            "logic": [],
            "attributes": {},
            "overlay": {
                "style": "",
                "page": "",
                "left": "",
                "top": "",
                "width": "",
                "height": ""
            },
            "type": "columns",
            "input": false,
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": null,
            "protected": false,
            "unique": false,
            "persistent": false,
            "clearOnHide": false,
            "refreshOn": "",
            "redrawOn": "",
            "tableView": false,
            "dataGridLabel": false,
            "labelPosition": "top",
            "description": "",
            "errorLabel": "",
            "tooltip": "",
            "tabindex": "",
            "disabled": false,
            "autofocus": false,
            "dbIndex": false,
            "customDefaultValue": "",
            "calculateValue": "",
            "calculateServer": false,
            "widget": null,
            "validateOn": "change",
            "validate": {
                "required": false,
                "custom": "",
                "customPrivate": false,
                "strictDateValidation": false,
                "multiple": false,
                "unique": false
            },
            "allowCalculateOverride": false,
            "encrypted": false,
            "showCharCount": false,
            "showWordCount": false,
            "allowMultipleMasks": false,
            "addons": [],
            "tree": false,
            "lazyLoad": false,
            "id": "eftxofs"
        }]
    }
}