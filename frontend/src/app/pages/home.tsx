import { NavBar } from "../shared/components/navBar"
import '../shared/styles/home.css'
export const Home = () => {
    return (
        <>
            <NavBar />
            <section className="main position-absolute top-50 start-50 translate-middle d-flex justify-content-start align-items-center" style={{width: '100%', height: '100%'}}>
                <div className="mx-5 d-flex flex-column flex-wrap gap-3" style={{width: '30%'}}>
                    <h1 className="title-home">Pixel Purchases</h1>
                    <p className="description">Bem-vindo ao nosso vibrante e inovador e-commerce, onde a conveniência se encontra com a qualidade em uma experiência de compras única! Explore um mundo de possibilidades em nosso catálogo diversificado, projetado para atender às suas necessidades e desejos mais exigentes.</p>
                    <button className="btn btn-outline-dark">Veja mais</button>
                </div>
            </section>
        </>
    )
}