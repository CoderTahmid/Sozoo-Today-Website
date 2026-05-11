import Community from "../components/Community";
import CultureAtScale from "../components/CultureAtScale";
import FeaturedContent from "../components/FeaturedContent";
import SozooEntertainmentHero from "../components/SozooEntertainmentHero";
import SozooEntertainmentStats from "../components/SozooEntertainmentStats";

const SozooEntertainment = () => {
    return (
        <>
            <SozooEntertainmentHero></SozooEntertainmentHero>
            <CultureAtScale></CultureAtScale>
            <SozooEntertainmentStats></SozooEntertainmentStats>
            <FeaturedContent></FeaturedContent>
            <Community></Community>
        </>
    );
};

export default SozooEntertainment;