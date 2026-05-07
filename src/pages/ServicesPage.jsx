import BrandedContent from "../components/BrandedContent";
import CommunityManagement from "../components/CommunityManagement";
import OurServices from "../components/OurServices";
import SentimentAnalysis from "../components/SentimentAnalysis";
import ServicesHero from "../components/ServicesHero";

const ServicesPage = () => {
    return (
        <>
            <ServicesHero />
            <OurServices></OurServices>
            <SentimentAnalysis></SentimentAnalysis>
            <CommunityManagement></CommunityManagement>
            <BrandedContent></BrandedContent>
        </>
    );
};

export default ServicesPage;
