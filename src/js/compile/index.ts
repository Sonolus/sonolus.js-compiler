import { Parser } from 'acorn'
import { Program } from 'estree'

export const compileJS = (js: string): Program =>
    Parser.parse(js, { ecmaVersion: 'latest', directSourceFile: js }) as unknown as Program
