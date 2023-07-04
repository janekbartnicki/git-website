const ShortAbout: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-center justify-items-center justify-self-center lg:md:flex-nowrap lg:m-20 m-10">
            <img draggable={false} src="images/marcin_fec1.png" className="rounded-lg drop-shadow-2xl lg:max-h-[35vw] sm:max-h-[60vw]"/>
            {/* TODO: ogarnąć skalowanie się tekstu */}
            <div className="m-10">
                <h1 className="font-bold text-5xl">Marka stworzona przez Marcina Feć</h1><br/>
                <p className="text-2xl">Marka GiT została stworzona przez wieloletniego zawodnika oraz trenera <b>Marcina Feć</b>. Grał on w takich klubach jak <b>Odra Opole</b> czy <b>Piast Gliwice</b>. Aktualnie prowadzi własną szkółkę bramkarską oraz zasila sztab szkoleniowy pierwszoligowej OKS Odry Opole jako trener bramkarzy.<br/><br/>W oparciu o doświadczenia między słupkami zaprojketował on serię <b>najwyższej jakości</b> rękawic bramkarskich. Oprócz znakomitych osiągów produkt cechuje także świetny wygląd i ergonomia.</p>
            </div>
        </div>
        // <div className="flex flex-row lg:flex-nowrap md:sm:flex-wrap justify-center justify-items-center justify-self-center lg:m-20 m-10">
        //     <img draggable={false} src="images/marcin_fec1.png" className="rounded-lg drop-shadow-2xl lg:max-h-[35vw] sm:max-h-[60vw]"/>
        //     {/* TODO: ogarnąć skalowanie się tekstu */}
        //     <div className="m-10">
        //         <h1 className="font-bold text-5xl">Marka stworzona przez Marcina Fecia</h1><br/>
        //         <p className="text-2xl">Marka GiT została stworzona przez wieloletniego zawodnika oraz trenera <b>Marcina Fecia</b>. Grał on w takich klubach jak <b>Odra Opole</b> czy <b>Piast Gliwice</b>. Aktualnie prowadzi własną szkółkę bramkarską oraz zasila sztab szkoleniowy pierwszoligowej OKS Odry Opole jako trener bramkarzy.<br/><br/>W oparciu o doświadczenia między słupkami zaprojketował on serię <b>najwyższej jakości</b> rękawic bramkarskich. Oprócz znakomitych osiągów produkt cechuje także świetny wygląd i ergonomia.</p>
        //     </div>
        // </div>
    )
}

export default ShortAbout;