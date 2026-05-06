import OurServices from "../components/OurServices";
import SentimentAnalysis from "../components/SentimentAnalysis";
import ServicesHero from "../components/ServicesHero";

const ServicesPage = () => {
    return (
        <>
            <ServicesHero />
            <OurServices></OurServices>
            <SentimentAnalysis></SentimentAnalysis>
        </>
    );
};

export default ServicesPage;
