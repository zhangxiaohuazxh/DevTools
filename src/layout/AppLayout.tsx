import { Layout } from 'antd'
import AppSider from '@/layout/AppSider'
import { Outlet } from 'react-router-dom'
import '@/assets/style/layout.css'

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
            <Layout style={layoutStyle} className="window-layout">
                <Sider style={siderStyle} className="sidebar">
                    <AppSider />
                </Sider>
                <Content style={contentStyle} className="app-launcher">
                    <Outlet />
                </Content>
            </Layout>
        </>
    )
}

export default AppLayout
