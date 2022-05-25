import React, { useEffect, useState, useRef } from 'react'
import ToolsBar from './ToolsBar'
import CodeMirror from './CodeMirror'
import Preview from '@/components/Preview'
import { CodeMirrorContext } from '@/contexts/index'
import { Icon } from '@iconify/react'
import style from './MardownEditor.module.css'
import { undo, redo } from '@codemirror/commands'
// const CodeMirrorContext = React.createContext();

const MarkdownEditor = () => {
	const [cMEditor, setCMEditor] = useState()
	const [content, setContent] = useState()
	const [isSyncScroll, setIsSyncScroll] = useState(true)
	const preview = useRef()

	useEffect(() => {
		if (cMEditor) {
			setContent(() => cMEditor.state.doc.toString())
		}
		return () => {}
	}, [cMEditor])

	useEffect(() => {
		if (cMEditor) {
			const editorScroll = cMEditor.scrollDOM
			const previewScroll = preview.current
			// console.log(preview.current)
			const syncScrollPosition = (scrolledPane, pane) => {
				const { scrollTop, scrollHeight, clientHeight } = scrolledPane

				const scrollTopOffset = scrollHeight - clientHeight
				/* Calculate the actual pane height */
				const paneHeight = pane.scrollHeight - clientHeight
				/* Adjust the scrollTop position of it accordingly */
				if (scrollTopOffset > 0) {
					pane.scrollTop = (paneHeight * scrollTop) / scrollTopOffset
				}
			}

			const removeEvents = (leftPane, rightPane) => {
				leftPane.onscroll = null
				if (isSyncScroll) rightPane.onscroll = null
				// preview
			}

			const handleSyncScroll = (leftPane, rightPane) => {
				syncScrollPosition(leftPane, rightPane)
				let isSyncLeftScroll = false
				let isSyncRightScroll = false
				leftPane.onscroll = function () {
					if (!isSyncLeftScroll) {
						isSyncRightScroll = true
						syncScrollPosition(leftPane, rightPane)
					}
					isSyncLeftScroll = false
				}

				rightPane.onscroll = function () {
					if (!isSyncRightScroll) {
						isSyncLeftScroll = true
						syncScrollPosition(rightPane, leftPane)
					}
					isSyncRightScroll = false
				}
			}

			isSyncScroll
				? // && preview
				  handleSyncScroll(editorScroll, previewScroll)
				: removeEvents(editorScroll, previewScroll)
		}

		return () => {}
		// }, [isSyncScroll, preview])
	}, [isSyncScroll, cMEditor, content])

	return (
		<CodeMirrorContext.Provider
			value={{ setCMEditor, setContent, cMEditor }}
		>
			<div className={style.main}>
				<ToolsBar />
				<div className="h-[calc(100%-48px)] w-full flex">
					<div className="w-[50%] text-base">
						<CodeMirror />
					</div>
					<div className="w-[50%]">
						{cMEditor && (
							<Preview
								content={content}
								className="px-8"
								ref={preview}
							/>
						)}
					</div>
				</div>
			</div>
		</CodeMirrorContext.Provider>
	)
}

export default MarkdownEditor
