
export interface IAuditTrailItem {
    userName: string
    action?: string,
    type?: string,
    auditDt?: string,
    newState?: string,
    prevState?: string,


}