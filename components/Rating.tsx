import { Star } from "lucide-react";

interface RatingProp {
  rating: number;
  ratersCount?: number;
}

const Rating = ({ rating, ratersCount }: RatingProp) => {
  return (
    <div className="flex gap-2 text-sm items-center justify-between w-40">
      <div className="flex bg-primary px-3 py-2 justify-between gap-2 rounded-full text-gray-50">
        <p>{rating}</p>
        <Star size={18} />
      </div>

      {ratersCount && <p className="text-gray-600"> Ratings</p>}
    </div>
  );
};

export default Rating;
