import { NavBar } from "../shared/components/navBar"

export const Home = () => {
    return (
        <section className="main">
            <NavBar />
            <h1 className="title-home">Pixel Purchases</h1>
            <p className="description">...</p>
            <button className="see_more-button">Veja mais</button>
        </section>
    )
}