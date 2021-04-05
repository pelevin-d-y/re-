import React from 'react'
import classNames from 'classnames'
import {
  Editor,
  EditorState,
  ContentState,
  convertFromHTML,
  DefaultDraftBlockRenderMap,
} from 'draft-js'
import Immutable from 'immutable'
import { css } from 'astroturf'

interface Props {
  className?: string
}

const HtmlEditorModal: React.FC<Props> = ({ className }) => {
  const template =
    "<p>Hi Landon,</p><p>You recently introduced me to &lt;Intro Name&gt; (thanks again!).</p><p>&lt;Intro Name&gt; and I spoke about...</p> <p>Next steps are...</p><p>How's everything with you?</p><p>Best,</p><p>&lt;Client Name&gt;</p>"

  const blocksFromHTML = convertFromHTML(template)
  const draftJsState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )

  const blockRenderMap = Immutable.Map({
    paragraph: {
      element: 'p',
    },
  })

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    blockRenderMap
  )

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(draftJsState)
  )

  return (
    <div className={classNames(className, s.container)}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockRenderMap={extendedBlockRenderMap}
      />
    </div>
  )
}

const s = css`
  .container {

  }
`

export default HtmlEditorModal
