import React, { useContext, useEffect } from 'react'
import CodeMirrorContext from '@/contexts/CodeMirrorContext'
import { undo, redo } from '@codemirror/commands'
import { Icon } from '@iconify/react'

function posToOffset(doc, pos) {
	return doc.line(pos.line + 1).from + pos.ch
}

function offsetToPos(doc, offset) {
	let line = doc.lineAt(offset)
	return { line: line.number - 1, ch: offset - line.from }
}

const markdownCustomKeymap = []

const toolsbar = [
	{
		title: 'Bold',
		fn: function (cm) {
			cm.state.selection.ranges.map(r => {
				const selection = cm.state.sliceDoc(r.from, r.to)
				cm.dispatch({
					changes: {
						from: r.from,
						to: r.to,
						insert: '**' + selection + '**'
					}
				})
				if (selection) {
					cm.dispatch({
						selection: {
							anchor: r.from + 2,
							head: r.to + 2
						}
					})
				} else {
					cm.dispatch({ selection: { anchor: r.from + 2 } })
				}
				cm.focus()
			})
		},
		icon: <Icon icon="ant-design:bold-outlined" width="20" />
	},
	{
		title: 'Italic',
		fn: function (cm) {
			cm.state.selection.ranges.map(r => {
				const selection = cm.state.sliceDoc(r.from, r.to)
				cm.dispatch({
					changes: {
						from: r.from,
						to: r.to,
						insert: '*' + selection + '*'
					}
				})
				if (selection) {
					cm.dispatch({
						selection: {
							anchor: r.from + 1,
							head: r.to + 1
						}
					})
				} else {
					cm.dispatch({ selection: { anchor: r.from + 1 } })
				}
				cm.focus()
			})
		},
		icon: <Icon icon="ant-design:italic-outlined" width="20" />
	},
	{
		title: 'Strike',
		fn: function (cm) {
			cm.state.selection.ranges.map(r => {
				const selection = cm.state.sliceDoc(r.from, r.to)
				cm.dispatch({
					changes: {
						from: r.from,
						to: r.to,
						insert: '~~' + selection + '~~'
					}
				})
				if (selection) {
					cm.dispatch({
						selection: {
							anchor: r.from + 2,
							head: r.to + 2
						}
					})
				} else {
					cm.dispatch({ selection: { anchor: r.from + 2 } })
				}
				cm.focus()
			})
		},
		icon: <Icon icon="ant-design:strikethrough-outlined" width="20" />
	},
	{
		title: 'Heading1',
		fn: function (cm) {
			const cursor = cm.state.selection.main.head
			const { from, to, number, text } = cm.state.doc.lineAt(cursor)
			if (cm.state.sliceDoc(from, from + 2) === '# ') {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: text.slice(2, to)
					}
				})
				cm.dispatch({ selection: { anchor: to - 2 } })
			} else {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: '# ' + text
					}
				})
				cm.dispatch({ selection: { anchor: to + 2 } })
			}
			cm.focus()
		},
		icon: <Icon icon="ci:heading-h1" width="20" />
	},
	{
		title: 'Heading2',
		fn: function (cm) {
			const cursor = cm.state.selection.main.head
			const { from, to, number, text } = cm.state.doc.lineAt(cursor)
			if (cm.state.sliceDoc(from, from + 3) === '## ') {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: text.slice(3, to)
					}
				})
				cm.dispatch({ selection: { anchor: to - 3 } })
			} else {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: '## ' + text
					}
				})
				cm.dispatch({ selection: { anchor: to + 3 } })
			}
			cm.focus()
		},
		icon: <Icon icon="ci:heading-h2" width="20" />
	},
	{
		title: 'Heading3',
		fn: function (cm) {
			const cursor = cm.state.selection.main.head
			const { from, to, number, text } = cm.state.doc.lineAt(cursor)
			if (cm.state.sliceDoc(from, from + 4) === '### ') {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: text.slice(4, to)
					}
				})
				cm.dispatch({ selection: { anchor: to - 4 } })
			} else {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: '### ' + text
					}
				})
				cm.dispatch({ selection: { anchor: to + 4 } })
			}
			cm.focus()
		},
		icon: <Icon icon="ci:heading-h3" width="20" />
	},
	{
		title: 'Generic List',
		fn: function (cm) {
			const cursor = cm.state.selection.main.head
			const { from, to, number, text } = cm.state.doc.lineAt(cursor)
			if (cm.state.sliceDoc(from, from + 4) === '### ') {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: text.slice(4, to)
					}
				})
				cm.dispatch({ selection: { anchor: to - 4 } })
			} else {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: '### ' + text
					}
				})
				cm.dispatch({ selection: { anchor: to + 4 } })
			}
			cm.focus()
		},
		icon: <Icon icon="ant-design:unordered-list-outlined"/>
	},
	{
		title: 'Number List',
		fn: function (cm) {
			const cursor = cm.state.selection.main.head
			const { from, to, number, text } = cm.state.doc.lineAt(cursor)
			if (cm.state.sliceDoc(from, from + 4) === '### ') {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: text.slice(4, to)
					}
				})
				cm.dispatch({ selection: { anchor: to - 4 } })
			} else {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: '### ' + text
					}
				})
				cm.dispatch({ selection: { anchor: to + 4 } })
			}
			cm.focus()
		},
		icon: <Icon icon="ant-design:ordered-list-outlined" width="20" />
	},
	{
		title: 'Task List',
		fn: function (cm) {
			const cursor = cm.state.selection.main.head
			const { from, to, number, text } = cm.state.doc.lineAt(cursor)
			if (cm.state.sliceDoc(from, from + 4) === '### ') {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: text.slice(4, to)
					}
				})
				cm.dispatch({ selection: { anchor: to - 4 } })
			} else {
				cm.dispatch({
					changes: {
						from: from,
						to: to,
						insert: '### ' + text
					}
				})
				cm.dispatch({ selection: { anchor: to + 4 } })
			}
			cm.focus()
		},
		icon: <Icon icon="bi:list-check" width="20" />
	},
]

function ToolsBar() {
	const { cMEditor } = useContext(CodeMirrorContext)
	return (
		<div className="w-full h-11 flex justify-start items-center bg-gray-200 border border-gray-400 px-3">
			{cMEditor &&
				toolsbar.map(element => {
					return (
						<a
							key={element.title}
							title={element.title}
							href="#"
							tabIndex={'-1'}
							onClick={e => {
								e.preventDefault()
								element.fn(cMEditor)
							}}
							className="p-2 border hover:border-[#2c3e50] hover:bg-gray-50 rounded-md text-[#2c3e50]"
						>
							{element.icon}
						</a>
					)
				})}
		</div>
	)
}

export default ToolsBar
