const Loading: React.FC = () => {
    return (
        <>
            <img 
                src="/images/icon_logo.png" 
                alt="Logo GiT" 
                className="max-h-20 animate-ping animate-infinite absolute z-0 top-52 m-auto left-0 right-0"
            />
            <div className="flex justify-center">
                <span className="loading loading-dots loading-lg absolute bottom-16 opacity-75"></span>
                {/* <span className="loading loading-spinner loading-lg absolute bottom-16"></span> */}
            </div>
        </>
    )
}

export default Loading;