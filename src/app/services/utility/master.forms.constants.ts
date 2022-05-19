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

    public static UPDATE_USER_FORM_TEMPLATE: any = {
        "title": "Update User",
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

    public static CREATE_DEPARTMENT_FORM_TEMPLATE: any = {
        "components": [{
            "label": "Parent Department",
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
            "key": "parentDepartment",
            "type": "select",
            "input": true,
            "id": "ext18r"
        }, {
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
            "id": "dqizbyl"
        }, {
            "label": "Code",
            "labelPosition": "top",
            "widget": {
                "type": "input"
            },
            "validateOn": "blur",
            "validate": {
                "required": false,
            },
            "key": "code",
            "type": "textfield",
            "input": true,
            "inputType": "text",
            "id": "dyn7p3r"
        }],
        "Name": "Create Department",
        "Id": 4,
        "CreatedBy": "Akash",
        "CreatedOn": "5/3/2022"
    }


    public static EDIT_DEPARTMENT_FORM_TEMPLATE: any = {
        "components": [{
            "label": "Parent Department",
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
            "key": "parentDepartment",
            "type": "select",
            "input": true,
            "id": "ext18r"
        }, , {
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
            "id": "dqizbyl"
        }, {
            "label": "Code",
            "labelPosition": "top",
            "widget": {
                "type": "input"
            },
            "validateOn": "blur",
            "validate": {
                "required": false,
            },
            "key": "code",
            "type": "textfield",
            "input": true,
            "inputType": "text",
            "id": "dyn7p3r"
        }],
        "Name": "Update Department",
        "Id": 4,
        "CreatedBy": "Akash",
        "CreatedOn": "5/3/2022"
    }



}