import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Editor, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { CodeElement, DefaultElement, Leaf } from './Elements';
import { CustomEditor } from './helpers';
const { toggleCodeBlock, toggleBoldMark } = CustomEditor;


const App = () => {
	const editor = useMemo(() => withReact(createEditor()), []);

	const [value, setValue] = useState([
		{
			type: 'paragraph',
			children: [{ text: 'A line of text in a paragraph' }]
		}
	]);

	const renderElement = useCallback(props => {
		switch (props.element.type) {
			case 'code':
				return <CodeElement {...props} />
			default:
				return <DefaultElement {...props} />
		};
	}, []);

	const renderLeaf = useCallback(props => {
		return <Leaf {...props} />
	}, []);

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={newValue => setValue(newValue)}
		>
			<div>
				<button 
					onMouseDown={event => {
						event.preventDefault();
						toggleBoldMark(editor);
				}}>
					Bold
				</button>

				<button
					onMouseDown={event => {
						event.preventDefault();
						toggleCodeBlock(editor);
					}}
				>
					Code Block
				</button>

			</div>
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={event => {
					if (!event.ctrlKey) return;
					switch (event.key) {
						case '`': {
							event.preventDefault()
							toggleCodeBlock(editor);
							break;
						}

						case 'b': {
							event.preventDefault();
							toggleBoldMark(editor);
							break;
						}
					}
				}}
			/>

		</Slate>
	);
};

export default App;