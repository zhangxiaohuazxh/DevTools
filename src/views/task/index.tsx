import React, {useState} from "react"
import {
    Card,
    Space,
    Checkbox,
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
} from 'antd';
import '@/views/task/task.css'
import {HappyProvider} from '@ant-design/happy-work-theme';
import {
    EditOutlined,
    SettingOutlined,
    EllipsisOutlined,
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'


type FieldType = {
    name: string;
    taskName: string;
    startDate: Date;
    endDate?: Date;
    notify?: boolean
}

type DataNode = {
    title: string;
    key: string;
    isLeaf: boolean;
    children?: DataNode[];
}


type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const {DirectoryTree} = Tree;


export const Task: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOk = () => {
        console.log('ok');
        setIsModalOpen(!isModalOpen)
    }

    const editClickCallback = (operation: string) => {
        console.log('edit', operation);

    }

    const actions: React.ReactNode[] = [
        <EditOutlined onClick={() => editClickCallback('edit')} key="edit"/>,
        <SettingOutlined onClick={() => editClickCallback('setting')} key="setting"/>,
        <EllipsisOutlined onClick={() => editClickCallback('extension')} key="ellipsis"/>,
    ];

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onDatePickerChange = (type: string) => {
        console.log('onDatePickerChange', type);
    }

    const treeData: TreeDataNode[] = [
        {
            title: 'parent 0',
            key: '0-0',
            children: [
                {title: 'leaf 0-0', key: '0-0-0', isLeaf: true},
                {title: 'leaf 0-1', key: '0-0-1', isLeaf: true},
            ],
        },
        {
            title: 'parent 1',
            key: '0-1',
            children: [
                {title: 'leaf 1-0', key: '0-1-0', isLeaf: true},
                {title: 'leaf 1-1', key: '0-1-1', isLeaf: true},
            ],
        },
        {
            title: 'parent 2',
            key: '0-2'
        },
    ];

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    const allowDrop = (): boolean => {
        // console.log('allowDrop', dropNode, dropPosition);
        return true
    }

    const handleDeleteTreeLeaf = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('deleteTreeLeaf');
    }

    const handleAddTreeLeaf = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('addTreeLeaf');
    }

    const customTitleRender = (nodeData: DataNode) => {
        const isLeaf = nodeData.isLeaf;
        return <span>
            <span>{nodeData.title}</span>
           <span style={{marginLeft: '100px'}}>
                {!isLeaf && <PlusOutlined onClick={(event) => handleAddTreeLeaf(event)}/>}
               {}
               {isLeaf && <DeleteOutlined onClick={(event) => handleDeleteTreeLeaf(event)}/>}
           </span>
        </span>
    }

    return (<>
        <span className="taskContainer">
            <Space orientation="horizontal" wrap size={16}>
                <BorderBeam color={[{color: '#2f54eb', percent: 0},
                    {color: '#722ed1', percent: 44},
                    {color: '#ff85c0', percent: 100}]}>
                    <Card title="工作" actions={actions} style={{width: 300}}>
                        <p><Checkbox>1</Checkbox></p>
                        <p><Checkbox>2</Checkbox></p>
                        <p><Checkbox>3</Checkbox></p>
                    </Card>
                </BorderBeam>
            </Space>
            <Row gutter={24} style={{paddingTop: '10px'}}>
                <Col offset={1}>
                    <HappyProvider>
                        <Button size="large" onClick={() => setIsModalOpen(!isModalOpen)} type="primary">添加</Button>
                    </HappyProvider>
                </Col>
            </Row>

            <span>
                <Modal
                    title="任务配置"
                    closable={{'aria-label': 'Custom Close Button'}}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={() => setIsModalOpen(!isModalOpen)}
                >
                    <Form
                        name="basic"
                        labelCol={{span: 4}}
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 600}}
                        initialValues={{notify: false}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="任务名称"
                            name="taskName"
                            rules={[{required: true, message: '请指定任务名称'}]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="开始时间"
                            name="startDate"
                            rules={[{required: true, message: '请指定任务的开始时间'}]}
                        >
                            <DatePicker onChange={() => onDatePickerChange('startDate')}/>
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="截止时间"
                            name="endDate"
                            rules={[{required: false, message: '请指定任务的结束时间'}]}
                        >
                            <DatePicker onChange={() => onDatePickerChange('endDate')}/>
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="每日通知"
                            name="notify"
                            rules={[{required: false, message: '请选择是否进行通知'}]}
                        >
                            <Switch
                                checkedChildren={<CheckOutlined/>}
                                unCheckedChildren={<CloseOutlined/>}
                                defaultChecked
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="子项任务"
                            name="notify"
                            rules={[{required: false, message: '请选择是否进行通知'}]}
                        >
                            <DirectoryTree
                                multiple
                                draggable
                                defaultExpandAll
                                allowDrop={allowDrop}
                                onSelect={onSelect}
                                onExpand={onExpand}
                                treeData={treeData}
                                titleRender={(nodeData) => customTitleRender(nodeData as DataNode)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </span>
        </span>
    </>)
}
