export interface Task {
    // 任务名称
    taskName: string
    // 开始时间
    startDate: Date
    // 截止时间
    endDate?: Date
    // 是否进行通知
    notify: boolean
    // 创建时间
    createTime: Date
    // [0-50}低优先级  [51-80}中优 [80,100] 高优先级
    priority?: number
    // 关联人
    relationPersonList: Array<string>
    subItems?: Array<Task>
}
