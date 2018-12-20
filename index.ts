import { make, cnc, cam } from '@makercam/makercam'
import makerjs from 'makerjs'
const { IMPERIAL, METRIC, state, units, tool, feed, speed, cut, icut, rapid, irapid, dwell, translate, rotate, scale, arc, ellipse, save, log, reset, gcode } = cam
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'
import 'monaco-editor/esm/vs/language/json/monaco.contribution'
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'

import 'monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget.js';
// import 'monaco-editor/esm/vs/editor/browser/widget/diffEditorWidget.js';
// import 'monaco-editor/esm/vs/editor/browser/widget/diffNavigator.js';
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/transpose.js';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js';
import 'monaco-editor/esm/vs/editor/contrib/codelens/codelensController.js';
import 'monaco-editor/esm/vs/editor/contrib/colorPicker/colorDetector.js';
import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js';
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js';
import 'monaco-editor/esm/vs/editor/contrib/cursorUndo/cursorUndo.js';
import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js';
import 'monaco-editor/esm/vs/editor/contrib/folding/folding.js';
import 'monaco-editor/esm/vs/editor/contrib/format/formatActions.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
import 'monaco-editor/esm/vs/editor/contrib/inPlaceReplace/inPlaceReplace.js';
import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/links/links.js';
import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js';
import 'monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.js';
import 'monaco-editor/esm/vs/editor/contrib/referenceSearch/referenceSearch.js';
import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js';
import 'monaco-editor/esm/vs/editor/contrib/smartSelect/smartSelect.js';
import 'monaco-editor/esm/vs/editor/contrib/snippet/snippetController2.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
import 'monaco-editor/esm/vs/editor/contrib/toggleTabFocusMode/toggleTabFocusMode.js';
import 'monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter.js';
import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickOutline.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickCommand.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

const fs = require('fs')

self.MonacoEnvironment = {
	getWorker: function (moduleId, label) {
		if (label === 'json') {
			return new Worker('node_modules/monaco-editor/esm/vs/language/json/json.worker.js')
		}
		if (label === 'css') {
			return new Worker('node_modules/monaco-editor/esm/vs/language/css/css.worker.js')
		}
		if (label === 'html') {
			return new Worker('node_modules/monaco-editor/esm/vs/language/html/html.worker.js')
		}
		if (label === 'typescript' || label === 'javascript') {
			return new Worker('node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js')
		}
		return new Worker('node_modules/monaco-editor/esm/vs/editor/editor.worker.js')
	}
}

monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/makercam/lib/angusOffset.d.ts', 'utf8'),
	'file:///node_modules/@makercam/makercam/angusOffset.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/makercam/lib/clipperOffset.d.ts', 'utf8'),
	'file:///node_modules/@makercam/makercam/clipperOffset.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/makercam/lib/index.d.ts', 'utf8'),
	'file:///node_modules/@makercam/makercam/index.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/makercam/lib/jscadOffset.d.ts', 'utf8'),
	'file:///node_modules/@makercam/makercam/jscadOffset.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/makercam/lib/make.d.ts', 'utf8'),
	'file:///node_modules/@makercam/makercam/make.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/makercam/lib/operations.d.ts', 'utf8'),
	'file:///node_modules/@makercam/makercam/operations.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/makerjs/dist/index.d.ts', 'utf8'),
	'file:///node_modules/@makercam/makerjs/index.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/openjscam/lib/constants.d.ts', 'utf8'),
	'file:///node_modules/@makercam/openjscam/constants.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/openjscam/lib/coordinate.d.ts', 'utf8'),
	'file:///node_modules/@makercam/openjscam/coordinate.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/openjscam/lib/index.d.ts', 'utf8'),
	'file:///node_modules/@makercam/openjscam/index.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/openjscam/lib/state.d.ts', 'utf8'),
	'file:///node_modules/@makercam/openjscam/state.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/openjscam/lib/utils.d.ts', 'utf8'),
	'file:///node_modules/@makercam/openjscam/utils.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('node_modules/@makercam/openjscam/lib/viewer.d.ts', 'utf8'),
	'file:///node_modules/@makercam/openjscam/viewer.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('export-makerjs.d.ts', 'utf8'),
	'export-makerjs.d.ts'
)
monaco.languages.typescript.typescriptDefaults.addExtraLib(
	fs.readFileSync('lib.es5.d.ts', 'utf8'),
	'lib.es5.d.ts'
)
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
	target: monaco.languages.typescript.ScriptTarget.ES5,
	noLib: true,
	allowNonTsExtensions: true
})
const model = monaco.editor.createModel(
	`const v = new makerjs.models.Square(10);
makercam.cam.feed(200)`,
    'typescript',
    monaco.Uri.parse('file:///index.ts')
);

setInterval(() => {
	monaco.languages.typescript.getTypeScriptWorker()
		.then(function(worker) {
			worker('file:///index.ts')
				.then(function(client) {
						client.getEmitOutput('file:///index.ts').then(function(r) {
							const src = r.outputFiles[0].text
							const func = new Function('IMPERIAL', 'METRIC', 'state', 'units', 'tool', 'feed', 'speed', 'cut', 'icut', 'rapid', 'irapid', 'dwell', 'translate', 'rotate', 'scale', 'arc', 'ellipse', 'save', 'log', 'reset', 'gcode', 'makerjs', 'make', 'cnc', src)
            				func(IMPERIAL, METRIC, state, units, tool, feed, speed, cut, icut, rapid, irapid, dwell, translate, rotate, scale, arc, ellipse, save, log, reset, gcode, makerjs, make, cnc)
						})
				});
		});
}, 15000)

monaco.editor.create(document.getElementById('container'), {
	language: 'typescript',
	theme: "vs-dark",
	lineNumbers: 'on',
	acceptSuggestionOnCommitCharacter: true,
	model: model
});

