import SyntaxHighlightList from './SyntaxHighlightList'
import { useState } from 'react'

const UploadBar = ({
  title,
  setTitle,
  url,
  hidden,
  setHidden,
  burnAfterRead,
  setBurnAfterRead,
  syntaxHighlight,
  setSyntaxHighlight,
  showModal,
  setShowModal,
  uploading,
}) => {
  const [syntaxButtonText, setSyntaxButtonText] = useState('Syntax highlight')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleHiddenChange = () => {
    setHidden(!hidden)

    if (hidden) {
      setBurnAfterRead(false)
    }
  }

  const handleBurnAfterReadChange = () => {
    setBurnAfterRead(!burnAfterRead)

    if (!burnAfterRead) {
      setHidden(true)
    }
  }

  const handleChooseSyntaxHighlight = (prismValue, text) => {
    setSyntaxHighlight(prismValue)
    setSyntaxButtonText(text)
  }

  return (
    <div className="flex-col lg:flex lg:flex-row items-center justify-between px-3 py-2">
      <div className="flex-col md:flex md:flex-row lg:flex lg:flex-row">
        <div className="flex items-center p-0 lg:p-1 pr-0">
          <label className="pr-2">Title:</label>
          <div>
            <input className="mr-0 rounded-lg bg-[#2b2b2b] p-1 pl-2 focus:outline-none focus:ring-0"
              placeholder="Untitled"
              value={title}
              onChange={handleTitleChange} />
          </div>
        </div>

        <div className="flex items-center py-3 md:pl-4">
          <div className="md:border-l border-r border-dotted pr-3 md:px-3 group relative inline-block">
            <label className="pr-2">Hidden:</label>
            <input type="checkbox"
              className="w-4 accent-orange-400"
              checked={hidden}
              onChange={handleHiddenChange} />
            <span
              className="absolute -left-6 lg:-left-3 -top-2 hidden w-48 -translate-y-full rounded-lg bg-[#202020] px-2 py-1 text-center text-sm text-[#ddd] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#202020] after:content-[''] group-hover:flex"
            >Hides your media from the &quot;Latest media&quot; list
            </span>
          </div>

          <div className="md:border-l border-r border-dotted pr-3 px-3 group relative inline-block">
            <label className="pr-2">Burn after read:</label>
            <input type="checkbox"
              className="w-4 accent-orange-400"
              checked={burnAfterRead}
              onChange={handleBurnAfterReadChange} />
            <span
              className="absolute left-12 -top-2 hidden w-48 -translate-y-full rounded-lg bg-[#202020] px-2 py-1 text-center text-sm text-[#ddd] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#202020] after:content-[''] group-hover:flex"
            >Media is deleted after being viewed once
            </span>
          </div>

          {syntaxHighlight &&
            <div className="dropdown relative inline-block border-dotted pl-3 place-content-between">
              <div>
                <button type="button"
                  className="dropdown-button inline-flex w-40 items-center rounded-lg bg-[#2b2b2b] p-1 px-4 text-center text-xs font-medium text-[#ddd] hover:rounded-t-lg">
                  <span className="mr-1 basis-11/12 text-left">{syntaxButtonText}</span>
                  <svg className="h-4 w-4 basis-1/12 fill-current" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <SyntaxHighlightList handleChooseSyntaxHighlight={handleChooseSyntaxHighlight} />
              </div>
            </div>}
        </div>
      </div>
      <div className="lg:pl-3">
        {uploading
          ? <button disabled type="submit"
            className="w-32 items-center rounded-lg bg-[#2b2b2b] py-2 px-4 text-center text-xs font-medium text-[#ddd] transition-all duration-150 ease-linear hover:bg-orange-400 hover:text-[#202020]">
            <svg aria-hidden="true" role="status" className="mr-3 inline h-4 w-4 animate-spin" viewBox="0 0 100 101"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor" />
            </svg>
            Loading...
          </button>
          : <button type="submit"
            className="items-center w-32 py-2 text-xs font-medium text-center text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-400 hover:text-[#202020] ease-linear transition-all duration-150">
            Create new media
          </button>}
      </div>
      <>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-2xl">
                <div
                  className="border-0 rounded-lg relative flex flex-col w-full bg-[#2b2b2b] outline-none focus:outline-none">

                  <div
                    className="flex items-start justify-between p-5 border-b border-solid border-[#403e3d] rounded-t">
                    <h3 className="text-2xl font-semibold">
                      Burn After Read
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                    </button>
                  </div>

                  <div className="relative px-6 py-3 flex-auto">
                    <div className="my-4 text-[#ddd] text-lg">
                      <div>
                        You have created a burn after read media. <strong className="text-red-500">This means that
                        it will be permanently deleted after it is opened for the first time.</strong>
                      </div>
                      <br />
                      <div>
                        Here is the link you can use to share the media:
                      </div>
                      <div className="font-bold text-orange-400">
                        {url}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-end p-4 border-t border-[#403e3d] border-solid rounded-b">
                    <button
                      className="inline-flex items-center py-2.5 px-4 border-2 border-[#403e3d] text-xs font-medium text-center text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-800 hover:border-[#2b2b2b] ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  )
}

export default UploadBar
