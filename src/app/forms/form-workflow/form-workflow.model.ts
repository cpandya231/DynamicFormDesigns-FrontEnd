export interface IWorkflowStateModel {
    name: string;
    description: string;
    roles: any[];
    departments: Record<"id", number>[];
    id: number;
    parentId?: number;
    parentName?: string;
    sendBackAvailable?: boolean;
}

export interface IWorkflowTransitionModel {
    fromState: IWorkflowStateModel;
    toState: IWorkflowStateModel;
    id: number;
    workflow: {
        id: number;
        states: IWorkflowStateModel[]
    };
}

export interface IGetWorkflowStateTransitionsModel {
    workflowId: number;
    states: IWorkflowStateModel[];
    transitions: IWorkflowTransitionModel[];
}