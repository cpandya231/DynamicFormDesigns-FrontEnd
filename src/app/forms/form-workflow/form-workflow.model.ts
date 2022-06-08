export interface IWorkflowStateModel {
    name: string;
    description: string;
    roles: Record<"id", number>[];
    departments: Record<"id", number>[];
    id: number;
    parentId?: number;
    parentName?: string;
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