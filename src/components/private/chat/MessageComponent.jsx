const MessageComponent = ({message}) => {
    return (
        <>
            <div className={`col-span-full flex flex-col my-1 ${message.own ? 'items-end':'items-start'}`}>
                <div className={`rounded-md shadow mx-3 mt-3 mb-1 max-w-xs ${message.own ? 'bg-color4 text-white':'bg-white'}`}>
                    <p className={`person my-2 mx-3 font-bold ${message.own ? 'hidden':''}`}>{message.author}</p>
                    <p className={`body my-2 mx-3 max-w-xs`}>{message.body}</p>
                </div>
                <p className={`mx-4 font text-color6 text-sm ${message.own ? 'text-right':''}`}>{message.createdAt}</p>
            </div>
        </>
    )
}

export default MessageComponent