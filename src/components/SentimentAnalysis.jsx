import { FiActivity } from "react-icons/fi";
import { FaSmile, FaComments } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const SentimentAnalysis = () => {
    return (
        <div className="w-[95%] md:max-w-md mx-auto">
            <div className="bg-[#0f1724] rounded-xl p-6 md:p-8 text-white shadow-lg">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="text-teal-400 text-xl">
                            <FiActivity />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold">Sentiment Analysis</h3>
                    </div>

                    <div className="flex items-center gap-2">
                        <BsThreeDots className="text-teal-500/70 text-lg" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-[#0b1220] rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-800/30 flex items-center justify-center text-teal-300">
                                <FaSmile className="text-2xl" />
                            </div>
                            <div>
                                <div className="text-white font-medium">Positive Mentions</div>
                                <div className="text-gray-400 text-sm">Last 24 hours</div>
                            </div>
                        </div>
                        <div className="text-teal-400 font-bold text-xl md:text-2xl">+2,451</div>
                    </div>

                    <div className="bg-[#0b1220] rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-800/30 flex items-center justify-center text-teal-300">
                                <FaComments className="text-2xl" />
                            </div>
                            <div>
                                <div className="text-white font-medium">Total Conversations</div>
                                <div className="text-gray-400 text-sm">Across platforms</div>
                            </div>
                        </div>
                        <div className="text-white font-bold text-xl md:text-2xl">14,290</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SentimentAnalysis;