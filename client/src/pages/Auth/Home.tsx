import Hero from "../../components/home/Hero";
import About from "../../components/home/About";
import Features from "../../components/home/Features";
import ActionCards from "../../components/home/ActionCards";
import HowItWorks from "../../components/home/HowItWorks";
import ActivityHeatmap from "../../components/home/ActivityHeatmap";
import CTA from "../../components/home/CTA";

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <ActionCards />
            <HowItWorks />
            <ActivityHeatmap/>
            <CTA/>
        </>
    );
};

export default Home;