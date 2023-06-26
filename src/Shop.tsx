import Card from "./Card";

const Shop: React.FC = () => {
    return (
        <>
            <h1>Sklep</h1>
        <div className='lg:m-20 flex flex-wrap gap-10'>
            <Card
            header='Rękawice GiT 1'
            img='images/icon_logo.png'
            price='150'
            desc='Najpopularniejszy model cieszący się ogromną popularnością'
            isNew
            />
            <Card
            header='Rękawice GiT 2'
            img='images/icon_logo.png'
            price='150'
            desc='Najpopularniejszy model cieszący się ogromną popularnością'
            />
            <Card
            header='Rękawice GiT 3'
            img='images/icon_logo.png'
            price='150'
            desc='Najpopularniejszy model cieszący się ogromną popularnością'

            />
            <Card
            header='Rękawice GiT 3'
            img='images/icon_logo.png'
            price='150'
            desc='Najpopularniejszy model cieszący się ogromną popularnością'

            />
        </div>
        </>
    )
}

export default Shop;