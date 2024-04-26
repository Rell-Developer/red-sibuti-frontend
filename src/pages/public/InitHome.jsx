import EmploymentSection from "./EmploymentSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import InfoSection from "./InfoSection.jsx";
import HomeCarousel from "./HomeCarousel.jsx";
const InitHome = () => {
    return (
        <main>
            {/* <header>
                <div>

                    <nav>

                    </nav>
                </div>
            </header> */}
            <section>
                <section className="w-full bg-gradient-to-b from-color5 to-sky-700 flex items-center" style={{height:"600px"}}>
                    <HomeCarousel/>
                </section>
                <InfoSection />
                <EmploymentSection/>
                <ServicesSection/>
            </section>
            <footer className="bg-color5 text-white p-3">
                Todos los derechos reservados @ Roque Lopez 
            </footer>
        </main>
    )
}

export default InitHome;