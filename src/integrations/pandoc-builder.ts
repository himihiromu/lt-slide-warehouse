import * as child_process from 'child_process';
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import * as util from 'util';


export type PandocOptions = {
	theme: string;
    highlight: string;
    level: number;
    slideDir: string;
    template: string;
    beforeFormat: string;
    outputFormat: string;
    outputFolder: string;
};

const defaultOptions = (): PandocOptions => {
    return {
        theme: 'black',
        highlight: 'espresso',
        level: 2,
        slideDir: 'slides',
        template: 'src\\slides\\slide-template\\slide-template.md',
        beforeFormat: 'markdown',
        outputFormat: 'revealjs',
        outputFolder: 'content\\slides',
    }
}

const getRunOptions = (options: Partial<PandocOptions>, defaultOptions: PandocOptions): PandocOptions => {
    return {
        theme: options.theme ?? defaultOptions.theme,
        highlight: options.highlight ?? defaultOptions.highlight,
        level: options.level ?? defaultOptions.level,
        slideDir: options.slideDir ?? defaultOptions.slideDir,
        template: options.template ?? defaultOptions.template,
        beforeFormat: options.beforeFormat ?? defaultOptions.beforeFormat,
        outputFormat: options.outputFormat ?? defaultOptions.outputFormat,
        outputFolder: options.outputFolder ?? defaultOptions.outputFolder,
    }
}

const getPandocRunOptions = (options: PandocOptions): Array<string> => {
    const strOptions = new Array<string>();
	strOptions.concat(['-V', `theme:${options.theme}`])
	strOptions.push(`--highlight-style=${options.highlight}`)
	strOptions.push(`--slide-level=${options.level}`)
	strOptions.concat(['--template', options.template])
	strOptions.concat(['-f', options.beforeFormat])
	strOptions.concat(['-t', options.outputFormat])
    return [
        '-V', `theme:${options.theme}`,
        `--highlight-style=${options.highlight}`,
        `--slide-level=${options.level}`,
        '--template', options.template,
        '-f', options.beforeFormat,
        '-t', options.outputFormat
    ]
}

export default (pandocOpsions: Partial<PandocOptions> = {}): AstroIntegration => ({
  name: 'pandoc-builder',
  hooks: {
    "astro:config:done": async ({ 
        config,
    }) => {
        child_process.exec('pandoc --version', function(err) {
            if (err !== null){
                console.log('err', err);
                throw Error('not found pandoc')
            }
        })
        const execFile = util.promisify(child_process.execFile);
        const pandocOptions = getRunOptions(pandocOpsions, defaultOptions());
        const args = getPandocRunOptions(pandocOptions);
        fs.readdir(fileURLToPath(config.srcDir + 'slides'), (err, tmpFiles) => {
            if(err) throw err;
            
            tmpFiles.forEach(element => {
                const fileName = `${fileURLToPath(config.srcDir + 'slides')}\\${element}`
                const stats = fs.statSync(fileName);
                if (stats.isDirectory()) {
                    return
                }
                const outputFile = `${fileURLToPath(config.srcDir + 'content\\slides')}\\${path.basename(element, '.md') + '.md'}`
                console.log([...args, fileName])
                execFile('pandoc', [...args, fileName]).then((stdout) => {
                    fs.writeFileSync( outputFile , stdout.stdout );
                }).catch(
                    (err) => {
                        throw Error(`${err}: ${fileName}`);
                    }
                );
                
            });
        })


    //   const outDirPath = fileURLToPath(dir);

    //   await Promise.all(
    //     routes
    //       .filter((route) => {
    //         return (
    //           route.type === "page" &&
    //           route.pathname &&
    //           route.pathname !== "/" &&
    //           path.parse(route.component).name === "index"
    //         );
    //       })
    //       .map(async ({ pathname }) => {
    //         if (!pathname) return;
    //         // リネーム先のディレクトリパス
    //         const targetDirPath = path.join(outDirPath, pathname);
    //         // リネーム前のファイルパス
    //         const beforeFilePath = path.join(outDirPath, `${pathname}.html`);
    //         // リネーム先のファイルパス
    //         const afterFilePath = path.join(outDirPath, pathname, "index.html");
    //         await fs.mkdir(targetDirPath, { recursive: true });
    //         await fs.rename(beforeFilePath, afterFilePath);
    //       }),
    //   )
    //     .then(() => {
    //       logger.info('Success');
    //     })
    //     .catch((err) => {
    //       logger.error(err);
    //     });
    },
  },
})
