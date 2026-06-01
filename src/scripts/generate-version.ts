import fs from 'fs'
import path from 'path'

interface Options {

}
export const generateVersionPlugin = (opt?: Options) => {
    console.log('配置对象', opt);
    return {
        name: "versionGenerator"
    }
}