import React, { useState, useEffect } from 'react'
import {
    Card,
    Space,
    BorderBeam,
    Row,
    Button,
    Col,
    Modal,
    Form,
    DatePicker,
    Switch,
    Tree,
    GetProps,
    TreeDataNode,
    type FormProps,
    Input,
    Tag,
} from 'antd'
import '@/views/task/task.css'
import { HappyProvider } from '@ant-design/happy-work-theme'
import {
    EditOutlined,
    SettingOutlined,
    EllipsisOutlined,
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
// @ts-ignore
import { Task as TaskType } from '@/types/tasks'

type FieldType = {
    name: string
    taskName: string
    startDate: Date
    endDate?: Date
    notify?: boolean
}

type DataNode = {
    title: string
    key: string
    isLeaf: boolean
    children?: DataNode[]
}

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>

const { DirectoryTree } = Tree

export const Task: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [tasks, setTasks] = useState<Array<TaskType>>([])

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                console.log('校验通过 Values:', values)
                // TODO 保存数据
                // setIsModalOpen(!isModalOpen)
            })
            .catch((errorInfo) => {
                // form.scrollToField()
                console.log('Validation Failed:', errorInfo)
            })
    }

    const editClickCallback = (operation: string, task: TaskType) => {
        console.log('edit', operation, task)
        if (operation === 'edit') {
            form.setFieldsValue({
                ...task,
                startDate: dayjs(task.startDate),
                endDate: task.endDate ? dayjs(task.endDate) : undefined,
            })
            setIsModalOpen(!isModalOpen)
        }
    }

    const addClickCallback = (_: string) => {
        setIsModalOpen(!isModalOpen)
    }

    const getActions = (task: TaskType) => {
        return [
            <EditOutlined onClick={() => editClickCallback('edit', task)} key="edit" />,
            <SettingOutlined onClick={() => editClickCallback('setting', task)} key="setting" />,
            <EllipsisOutlined
                onClick={() => editClickCallback('extension', task)}
                key="ellipsis"
            />,
        ]
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values)
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    const onDatePickerChange = (type: string) => {
        console.log('onDatePickerChange', type)
    }

    const treeData: TreeDataNode[] = [
        {
            title: 'parent 0',
            key: '0-0',
            children: [
                { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
                { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
            ],
        },
        {
            title: 'parent 1',
            key: '0-1',
            children: [
                { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
                { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
            ],
        },
        {
            title: 'parent 2',
            key: '0-2',
        },
    ]

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info)
    }

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        console.log('Trigger Expand', keys, info)
    }

    const allowDrop = (): boolean => {
        // console.log('allowDrop', dropNode, dropPosition);
        return true
    }

    const handleDeleteTreeLeaf = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('deleteTreeLeaf')
    }

    const handleAddTreeLeaf = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('addTreeLeaf')
    }

    const customTitleRender = (nodeData: DataNode) => {
        const isLeaf = nodeData.isLeaf
        return (
            <span>
                <span>{nodeData.title}</span>
                <span style={{ marginLeft: '100px' }}>
                    {!isLeaf && <PlusOutlined onClick={(event) => handleAddTreeLeaf(event)} />}
                    {}
                    {isLeaf && <DeleteOutlined onClick={(event) => handleDeleteTreeLeaf(event)} />}
                </span>
            </span>
        )
    }

    const tagRender = (task: TaskType) => {
        const config: any = {
            high: { color: 'red', text: '高' },
            medium: { color: 'orange', text: '中' },
            low: { color: 'blue', text: '低' },
        }
        let priorityType: string = 'low'
        if (!task.priority) {
            priorityType = 'low'
        } else if (task.priority > 50 && task.priority < 80) {
            priorityType = 'medium'
        } else {
            priorityType = 'high'
        }
        return (
            <Tag color={config[priorityType].color} style={{ marginRight: 0, fontSize: '12px' }}>
                {config[priorityType].text}
            </Tag>
        )
    }

    // 请求最新的任务数据
    useEffect(() => {
        fetch('/public/tasks.json', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                setTasks(data)
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error)
            })
    }, [])

    return (
        <>
            <span className="taskContainer">
                <Space orientation="horizontal" wrap size={16}>
                    {tasks.map((task: TaskType, _: number) => {
                        return (
                            <BorderBeam
                                color={[
                                    { color: '#2f54eb', percent: 0 },
                                    { color: '#722ed1', percent: 44 },
                                    { color: '#ff85c0', percent: 100 },
                                ]}
                            >
                                <Card
                                    title={
                                        <Space size={8}>
                                            {tagRender(task)}
                                            <span>{task.taskName}</span>
                                        </Space>
                                    }
                                    actions={getActions(task)}
                                    style={{ width: 300, marginLeft: 'auto', marginRight: 'auto' }}
                                    extra={
                                        <span
                                            style={{
                                                fontSize: '12px',
                                                color: 'rgba(0, 0, 0, 0.45)',
                                            }}
                                        >
                                            {task.startDate} ~ {task.endDate}
                                        </span>
                                    }
                                >
                                    {task.subItems?.map((subItem: TaskType, _subIndex: number) => {
                                        return (
                                            <ul key={subItem.taskName}>
                                                {/* <p>
                                                    <Checkbox>{subIndex + 1}</Checkbox>{' '}
                                                    {subItem.taskName}
                                                </p> */}
                                                <li>{subItem.taskName}</li>
                                            </ul>
                                        )
                                    })}
                                </Card>
                            </BorderBeam>
                        )
                    })}
                </Space>

                <Row gutter={24} style={{ paddingTop: '10px' }}>
                    <Col offset={1}>
                        <HappyProvider>
                            <Button
                                size="large"
                                onClick={() => addClickCallback('add')}
                                type="primary"
                            >
                                添加
                            </Button>
                        </HappyProvider>
                    </Col>
                </Row>

                <span>
                    <Modal
                        title="任务配置"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(!isModalOpen)}
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ notify: false }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                            scrollToFirstError={{ focus: true }}
                        >
                            <Form.Item<FieldType>
                                label="任务名称"
                                name="taskName"
                                rules={[{ required: true, message: '请指定任务名称' }]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="开始时间"
                                name="startDate"
                                rules={[{ required: true, message: '请指定任务的开始时间' }]}
                            >
                                <DatePicker onChange={() => onDatePickerChange('startDate')} />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="截止时间"
                                name="endDate"
                                rules={[{ required: false, message: '请指定任务的结束时间' }]}
                            >
                                <DatePicker onChange={() => onDatePickerChange('endDate')} />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="每日通知"
                                name="notify"
                                rules={[{ required: false, message: '请选择是否进行通知' }]}
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked
                                />
                            </Form.Item>
                            {false && (
                                <Form.Item<FieldType>
                                    label="子项任务"
                                    name="notify"
                                    rules={[{ required: false, message: '请选择是否进行通知' }]}
                                >
                                    <DirectoryTree
                                        multiple
                                        draggable
                                        defaultExpandAll
                                        allowDrop={allowDrop}
                                        onSelect={onSelect}
                                        onExpand={onExpand}
                                        treeData={treeData}
                                        titleRender={(nodeData) =>
                                            customTitleRender(nodeData as DataNode)
                                        }
                                    />
                                </Form.Item>
                            )}
                        </Form>
                    </Modal>
                </span>
            </span>
        </>
    )
}
