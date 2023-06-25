const ShortAbout: React.FC = () => {
    return (
        <div className="flex flex-wrap md:flex-nowrap lg:m-20 m-10">
            <img draggable={false} src="images/marcin_fec1.png" className="rounded-lg drop-shadow-2xl lg:max-h-[35vw] sm:max-h-[60vw]"/>
            {/* TODO: ogarnąć skalowanie się tekstu */}
            <div className="m-10">
                <h1 className="font-bold lg:text-[3vw] md:text-[2.75vw]">Marka stworzona przez Marcina Fecia</h1><br/>
                <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint enim tenetur a aspernatur voluptates quibusdam corrupti non corporis eius saepe ab perferendis eveniet eaque, doloribus excepturi amet ducimus dolorum recusandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quod, eveniet numquam nostrum molestias pariatur unde neque voluptatum similique eos provident hic quasi quibusdam doloremque cumque?.</p>
            </div>
        </div>
    )
}

export default ShortAbout;