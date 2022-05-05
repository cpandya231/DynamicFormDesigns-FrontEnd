
export class MasterForms {


    public static CREATE_USER_FORM_TEMPLATE: any = {
        "title": "Create User",
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
        }, {
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
        }, {
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
        }, {
            "label": "Password",
            "labelPosition": "top",
            "widget": {
                "type": "input"
            },

            "validateOn": "blur",
            "validate": {
                "required": true,
                "pattern": "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
                "customMessage": "Password should be alphanumeric and atleast 8 char long",

            },
            "key": "password",
            "tags": [],
            "type": "password",
            "input": true,
            "protected": true,
            "inputType": "text",
            "id": "eiq2vk"
        }, {
            "label": "Confirm Password",
            "labelPosition": "top",
            "widget": {
                "type": "input"
            },
            "validateOn": "blur",
            "validate": {
                "required": true,
                "custom": "valid=submission.data.confirmPassword==submission.data.password?true:\"Passwords should match\";",

            },
            "key": "confirmPassword",
            "type": "password",
            "input": true,
            "protected": true,
            "inputType": "text",
            "id": "emrmdwi"
        }, {
            "label": "Department",
            "labelPosition": "top",
            "widget": {
                "type": "input"
            },
            "validateOn": "blur",
            "validate": {
                "required": true,
            },
            "key": "department",
            "type": "textfield",
            "input": true,
            "inputType": "text",
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
}