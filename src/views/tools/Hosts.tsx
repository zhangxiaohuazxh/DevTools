import React, { useState } from 'react'
import {
    Flex,
    Space,
    Table,
    Tag,
    Button,
    Form,
    Input,
    InputNumber,
    Typography,
    Popconfirm,
} from 'antd'
import type { TableProps } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

type ClickType = 'edit' | 'delete' | 'copy'

interface RouteMapping {
    key: string
    seq?: number
    ip: string
    domain: string
    remark: string
    tags?: string[]
    editable?: boolean
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: any
    inputType: 'number' | 'text'
    record: RouteMapping
    index: number
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

const routes: RouteMapping[] = [
    {
        key: '1',
        domain: 'hubbo.cn',
        ip: '127.0.0.1',
        remark: '测试数据',
        seq: 1,
        tags: ['test', 'development', 'production'],
        editable: true,
    },
    {
        key: '2',
        domain: 'huawei.com',
        ip: '127.0.0.1',
        remark: '测试数据2',
        seq: 2,
        tags: ['test', 'development', 'production'],
        editable: true,
    },
]

export const Hosts: React.FC = () => {
    const [form] = Form.useForm()
    const [editingKey, setEditingKey] = useState('')
    const columns = [
        {
            title: '序号',
            dataIndex: 'seq',
            key: 'seq',
            width: 80,
            fixed: 'start',
            editable: true,
        },
        {
            title: '域名',
            dataIndex: 'domain',
            key: 'domain',
            fixed: 'start',
            editable: true,
        },
        {
            title: '地址',
            dataIndex: 'ip',
            key: 'ip',
            editable: true,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            editable: true,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (_: any, { tags }: RouteMapping) =>
                tags ? (
                    <Flex gap="small" align="center" wrap>
                        {tags.map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green'
                            if (tag === 'kawaii') {
                                color = 'volcano'
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            )
                        })}
                    </Flex>
                ) : (
                    <></>
                ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: RouteMapping) =>
                !isEditing(record) ? (
                    <Space size="medium">
                        <Button
                            color="primary"
                            variant="filled"
                            icon={<EditOutlined />}
                            onClick={() => rowClickedCallback('edit', record)}
                        />
                        <Button
                            color="primary"
                            variant="filled"
                            icon={<CopyOutlined />}
                            onClick={() => rowClickedCallback('copy', record)}
                        />
                        <Button
                            color="primary"
                            variant="filled"
                            icon={<DeleteOutlined />}
                            onClick={() => rowClickedCallback('delete', record)}
                        />
                    </Space>
                ) : (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{ marginInlineEnd: 8 }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ),
        },
    ]
    const edit = (record: Partial<RouteMapping> & { key: React.Key }) => {
        form.setFieldsValue({ ip: '', domain: '', remark: '', ...record })
        setEditingKey(record.key)
    }

    const rowClickedCallback = (type: ClickType, record: any) => {
        console.log('type {} record {}', type, record)
        if (type === 'edit') {
            edit(record)
        }
    }
    const isEditing = (record: RouteMapping) => record.key === editingKey
    const cancel = () => {
        setEditingKey('')
    }

    const save = async (key: React.Key) => {
        console.log('save', key)
    }
    // @ts-ignore
    const mergedColumns: TableProps<RouteMapping>['columns'] = columns.map((col) => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: RouteMapping) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    return (
        <>
            <Form form={form} component={false}>
                <Table<RouteMapping>
                    bordered
                    components={{
                        body: { cell: EditableCell },
                    }}
                    columns={mergedColumns}
                    dataSource={routes}
                    rowClassName="editable-row"
                    pagination={{ onChange: cancel }}
                    scroll={{ x: 'max-content' }}
                    style={{ width: '100%' }}
                />
            </Form>
        </>
    )
}
