const Banner: React.FC = () => {
    return (
        <div className="hero min-h-56" style={{backgroundImage: 'url(/images/odra.jpg)', backgroundPosition: '50% 70%'}}>
            <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <div className="flex justify-center mb-5">
                            <img className="w-36 h-36" src="images/icon_logo.png"/>
                        </div>
                    <h1 className="mb-5 text-5xl font-bold">
                        GiT
                    </h1>
                    <p className="mb-5 text-xl">Goalkeeper Gloves</p>
                </div>
            </div>
        </div>
    )
}

export default Banner;