import React from "react";
import "./CardMoreNft.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdSell, MdDelete } from "react-icons/md";

export default function CardMoreNft({
  id,
  imgUrl,
  title,
  avatar,
  creatorUsername,
  price,
  onIconClick,
  onDelete,
  ownerId,
}) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="Card">
      <div className="w-full">
        <Link to={`/info/${id}`}>
          <div className="w-full h-[40vh] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={imgUrl}
              alt={title}
            />
          </div>
        </Link>

        <div className="text-white p-4 relative bg-zinc-900">
          <div>
            <h4 className="text-xl font-semibold mb-2">
              {title || "No Title"}
            </h4>
            <Link to={`/profile/${ownerId}`} className="flex items-center mb-2">
              <img src={avatar} />
              <h5>{creatorUsername}</h5>
            </Link>
          </div>
          <div className="flex justify-between mb-2 mt-5">
            <div>
              <h5 className="text-stone-400">Price $</h5>
              <h5 className="">{price}</h5>
            </div>
            <div className="flex items-center space-x-4">
              <MdSell
                className="w-[22px] cursor-pointer"
                onClick={onIconClick}
              />
              <MdDelete
                className="w-[22px] cursor-pointer"
                onClick={onDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
