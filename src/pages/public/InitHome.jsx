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
                <section className="bg-color5 h-96 w-full">
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