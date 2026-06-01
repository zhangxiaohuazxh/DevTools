import fs from 'fs';
import path from 'path';

interface Options {
    fileName: string
    version?: number | string
}

export const generateVersionPlugin = (options?: Options) => {
    return {
        name: "versionGenerator",
        apply: "build" as const,
        closeBundle() {
            try {
                let finalVersion: string = '1.0.0';
                if (options && options.version) {
                    finalVersion = String(options.version);
                } else if (process.env.npm_package_version) {
                    finalVersion = process.env.npm_package_version;
                } else {
                    // 如果以上都拿不到，直接去读根目录的 package.json
                    try {
                        const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));
                        if (pkg.version) finalVersion = pkg.version;
                    } catch (e) {
                        // 读取失败则保持默认值 '1.0.0'
                    }
                }
                const version: Options = {
                    fileName: "version.json",
                    version: finalVersion
                };
                const outDir = path.resolve(process.cwd(), 'dist');
                const filePath = path.resolve(outDir, version.fileName);
                const versionInfo = {
                    version,
                    buildTime: new Date().toLocaleString(),
                };
                if (!fs.existsSync(outDir)) {
                    fs.mkdirSync(outDir, {recursive: true});
                }
                fs.writeFileSync(filePath, JSON.stringify(versionInfo, null, 2), 'utf-8');
                console.log(`\n✨ [Vite Version Plugin] 成功将版本号写入到: ${filePath}\n`);
            } catch (error) {
                console.error('\n❌ [Vite Version Plugin] 写入版本号失败:', error, '\n');
            }
        }
    }
}