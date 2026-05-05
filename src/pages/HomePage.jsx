import GetInTouch from "../components/GetInTouch";
import Hero from "../components/Hero";
import OurPortfolio from "../components/OurPortfolio";
import SmallAboutUs from "../components/SmallAboutUs";
import SuccessCount from "../components/SuccessCount";

const HomePage = () => {
    return (
        <>
            <Hero></Hero>
            <OurPortfolio></OurPortfolio>
            <SuccessCount></SuccessCount>
            <SmallAboutUs></SmallAboutUs>
            <GetInTouch></GetInTouch>
        </>
    );
};

export default HomePage;    