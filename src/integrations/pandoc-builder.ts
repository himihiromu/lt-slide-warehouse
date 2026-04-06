import * as childProcess from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import type { AstroIntegration } from 'astro';

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

const execFile = promisify(childProcess.execFile);

const defaultOptions = (): PandocOptions => ({
	theme: 'black',
	highlight: 'espresso',
	level: 2,
	slideDir: 'slides',
	template: 'src/slides/slide-template/slide-template.md',
	beforeFormat: 'markdown',
	outputFormat: 'revealjs',
	outputFolder: 'content/slides',
});

const getRunOptions = (
	options: Partial<PandocOptions>,
	baseOptions: PandocOptions,
): PandocOptions => ({
	theme: options.theme ?? baseOptions.theme,
	highlight: options.highlight ?? baseOptions.highlight,
	level: options.level ?? baseOptions.level,
	slideDir: options.slideDir ?? baseOptions.slideDir,
	template: options.template ?? baseOptions.template,
	beforeFormat: options.beforeFormat ?? baseOptions.beforeFormat,
	outputFormat: options.outputFormat ?? baseOptions.outputFormat,
	outputFolder: options.outputFolder ?? baseOptions.outputFolder,
});

const getPandocRunOptions = (options: PandocOptions): string[] => [
	'-V',
	`theme:${options.theme}`,
	`--highlight-style=${options.highlight}`,
	`--slide-level=${options.level}`,
	'--template',
	options.template,
	'-f',
	options.beforeFormat,
	'-t',
	options.outputFormat,
];

const ensureOutputFile = async (
	inputFile: string,
	outputFile: string,
	args: string[],
): Promise<void> => {
	const { stdout } = await execFile('pandoc', [...args, inputFile]);
	await fs.writeFile(outputFile, stdout, 'utf8');
};

export default (
	pandocOptions: Partial<PandocOptions> = {},
): AstroIntegration => ({
	name: 'pandoc-builder',
	hooks: {
		'astro:config:done': async ({ config, logger }) => {
			try {
				await execFile('pandoc', ['--version']);
			} catch (error) {
				logger.error('`pandoc` is required to build slides, but it was not found in PATH.');
				throw new Error(
					`pandoc is required to build slides: ${
						error instanceof Error ? error.message : String(error)
					}`,
				);
			}
			const options = getRunOptions(pandocOptions, defaultOptions());
			const args = getPandocRunOptions(options);
			const sourceDir = fileURLToPath(new URL(options.slideDir, config.srcDir));
			const outputDir = fileURLToPath(new URL(options.outputFolder, config.srcDir));

			await fs.mkdir(outputDir, { recursive: true });


			const slideEntries = await fs.readdir(sourceDir, { withFileTypes: true });
			const files = slideEntries
				.filter((entry) => entry.isFile())
				.filter((entry) => ['.md', '.mdx'].includes(path.extname(entry.name)))
				.filter((entry) => !entry.name.startsWith('.'))
				.map((entry) => entry.name);

			await Promise.all(
				files.map(async (file) => {
					const inputFile = path.join(sourceDir, file);
					const outputFile = path.join(
						outputDir,
						`${path.basename(file, path.extname(file))}.md`,
					);

					try {
						await ensureOutputFile(inputFile, outputFile, args);
					} catch (error) {
						throw new Error(
							`Failed to build slide "${file}": ${
								error instanceof Error ? error.message : String(error)
							}`,
						);
					}
				}),
			);
		},
	},
});
