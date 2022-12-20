const UploadBar = ({
  title,
  setTitle,
  url,
  hidden,
  setHidden,
  burnAfterRead,
  setBurnAfterRead,
  showModal,
  setShowModal
}) => {
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

  return (

    <div className="flex-col md:flex md:flex-row items-center justify-between px-3 py-2">
      <div className="flex-col md:flex md:flex-row">
        <div className="flex items-center p-0 md:p-1 pr-0">
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
              className="w-4 accent-orange-800"
              checked={hidden}
              onChange={handleHiddenChange} />
            <span
              className="absolute -left-6 md:-left-3 -top-2 hidden w-48 -translate-y-full rounded-lg bg-[#202020] px-2 py-1 text-center text-sm text-[#ddd] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#202020] after:content-[''] group-hover:flex"
            >Hides your media from the &quot;Latest media&quot; list
            </span>
          </div>

          <div className="group pl-3 relative inline-block">
            <label className="pr-2">Burn after read:</label>
            <input type="checkbox"
              className="w-4 accent-orange-800"
              checked={burnAfterRead}
              onChange={handleBurnAfterReadChange} />
            <span
              className="absolute left-12 -top-2 hidden w-48 -translate-y-full rounded-lg bg-[#202020] px-2 py-1 text-center text-sm text-[#ddd] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#202020] after:content-[''] group-hover:flex"
            >Media is deleted after being viewed once
            </span>
          </div>
        </div>
      </div>
      <div>
        <button type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-800 ease-linear transition-all duration-150">
          Create new media
        </button>
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
