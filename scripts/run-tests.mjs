import {build} from 'esbuild';
import {readdir,mkdir,writeFile,rm} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
async function scan(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?scan(resolve(dir,e.name)):e.name.endsWith('.spec.ts')?[resolve(dir,e.name)]:[]))).flat();}
const root=process.cwd(), output=resolve(root,'.test-output');
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
const specs=await scan(resolve(root,'src'));
await writeFile(resolve(output,'entry.ts'),"import '@angular/compiler';\n"+specs.map(f=>'import '+JSON.stringify(f)+';').join('\n'));
await build({entryPoints:[resolve(output,'entry.ts')],outfile:resolve(output,'suite.mjs'),bundle:true,platform:'node',format:'esm',packages:'external',logLevel:'warning'});
const result=spawnSync(process.execPath,['--import','@angular/compiler','--test',resolve(output,'suite.mjs')],{stdio:'inherit'});
process.exit(result.status??1);
