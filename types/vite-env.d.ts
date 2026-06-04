/// <reference types="vite/client" />

// 这一行是关键：告诉 TS 所有 .json5 文件的导入都返回任意类型的对象
declare module '*.json5' {
    const value: Record<string, any> // 比 any 稍微严格一点，表示是一个对象
    export default value
}
