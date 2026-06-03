import { Layout } from 'antd'
import AppSider from '@/layout/AppSider'
import { Outlet } from 'react-router-dom'

const { Sider, Content } = Layout

const layoutStyle = {
    minHeight: '100vh',
}

const siderStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
}

const contentStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
}

function AppLayout() {
    return (
        <>
            <Layout style={layoutStyle}>
                <Sider width="8%" style={siderStyle}>
                    <AppSider />
                </Sider>
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
        </>
    )
}

export default AppLayout
