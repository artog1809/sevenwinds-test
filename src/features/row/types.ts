export interface RowState {
    rowList: Row[]
}

export interface Row {
    id: number,
    equipmentCosts: number,
    estimatedProfit: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    parentId: number | null,
    rowName: string,
    salary: number,
    supportCosts: number,
    child: Row[]
}   