import JSON5 from 'json5'

export const json5Plugin = () => {
    return {
        name: 'vite-plugin-json5',
        transform(code: string, id: string) {
            if (id.endsWith('.json5')) {
                try {
                    const jsonObj = JSON5.parse(code)
                    return `export default ${JSON.stringify(jsonObj)};`
                } catch (error) {
                    console.log('json5 parse error')
                }
            }
            return code
        },
    }
}
