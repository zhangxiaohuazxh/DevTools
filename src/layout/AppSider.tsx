import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
    {
        key: '/task',
        label: '任务管理',
    },
    {
        key: '/tools',
        label: '工具',
        children: [
            { key: '/json', label: 'JSON' },
            { key: '/log', label: 'LOG' },
            { key: '/hosts', label: 'Hosts' },
        ],
    },
]

const AppSider: React.FC = () => {
    const navigate = useNavigate()

    const menuItemClickCallback: MenuProps['onClick'] = (e) => {
        navigate(e.key)
    }

    return (
        <Menu
            className="ant-menu"
            onClick={menuItemClickCallback}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    )
}

export default AppSider
