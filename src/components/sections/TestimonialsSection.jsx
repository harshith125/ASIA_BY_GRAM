import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Aisha K.",
        review: "The most authentic ramen I've had outside of Tokyo. The atmosphere is just pure magic!",
        rating: 5,
    },
    {
        id: 2,
        name: "Rahul M.",
        review: "Stunning visuals and even better food. The lobster noodles are a must-try.",
        rating: 5,
    },
    {
        id: 3,
        name: "Sneha R.",
        review: "A cinematic experience. The staff, the decor, the food - everything is top notch.",
        rating: 5,
    }
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-black relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2">Reviews</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white">What They Say</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-4 text-primary">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-zinc-300 italic mb-6 leading-relaxed">"{review.review}"</p>
                            <h4 className="text-white font-bold font-display tracking-wide">{review.name}</h4>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
