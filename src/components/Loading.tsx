const Loading: React.FC = () => {
    return <div className="text-center mt-72">
        <h1 className="text-xl text-bold">Witamy!</h1><br/>
        <span className="loading loading-spinner loading-lg"></span><br/>
        <p className="mt-5">Trwa ładowanie storny...</p>
    </div>
}

export default Loading;