import React from 'react'
import { Flex, Space, Table, Tag, Button } from 'antd'
import type { TableProps } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface RouteMapping {
    seq?: number
    ip: string
    domain: string
    remark: string
    tags?: string[],
    editable?: boolean
}

type ClickType = 'edit' | 'delete' | 'copy'

export const Hosts: React.FC = () => {
    const routes: RouteMapping[] = [
        {
            domain: 'hubbo.cn',
            ip: '127.0.0.1',
            remark: '测试数据',
            seq: 1,
            tags: ['test', 'development', 'production'],
            editable:true
        },
        {
            domain: 'huawei.com',
            ip: '127.0.0.1',
            remark: '测试数据2',
            seq: 2,
            editable:true
        },
    ]
    const columns: TableProps<RouteMapping>['columns'] = [
        {
            title: '序号',
            dataIndex: 'seq',
            key: 'seq',
            width: 80,
            fixed: 'start',
        },
        {
            title: '域名',
            dataIndex: 'domain',
            key: 'domain',
            fixed: 'start',
        },
        {
            title: '地址',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, { tags }) =>
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
            render: (_, record) => (
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
            ),
        },
    ]

    const rowClickedCallback = (type: ClickType, record: any) => {
        console.log('type {} record {}', type, record)
    }

    return (
        <>
            <Table<RouteMapping>
                columns={columns}
                dataSource={routes}
                scroll={{ x: 'max-content' }}
                style={{ width: '100%' }}
            />
        </>
    )
}
