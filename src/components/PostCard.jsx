import { Link } from "react-router-dom";
import fileUploadService from "../appwrite/fileUploadService";
import PropTypes from 'prop-types'

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out bg-warmGray">
        {/* Featured Image */}
        <div className="h-48 bg-warmGray">
          <img
            src={fileUploadService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Title */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-primaryText hover:text-softTeal transition-colors">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
};

export default PostCard;
